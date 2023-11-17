from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from drf_spectacular.utils import extend_schema, OpenApiResponse

from src.apps.auction.models import Auction, Bid
from src.apps.auction.serializers import AuctionSerializer, BidSerializer
from src.apps.auction.consts import BID_INCREMENT


class AuctionViewSet(
    viewsets.GenericViewSet,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    permission_classes = (IsAuthenticated,)
    serializer_class = AuctionSerializer

    def get_queryset(self):
        user = self.request.user
        return Auction.objects.filter(user=user)

    def create(self, request):
        user = request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(status=status.HTTP_201_CREATED)

    @action(url_path='list', detail=False)
    def get_all_auctions(self, request):
        data = Auction.objects.all()
        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class BidViewSet(viewsets.GenericViewSet, mixins.DestroyModelMixin):
    permission_classes = (IsAuthenticated,)
    serializer_class = BidSerializer

    def get_queryset(self):
        user = self.request.user
        return Bid.objects.filter(user=user)

    @extend_schema(
        responses={
            201: OpenApiResponse(description="Created or udpated"),
            400: OpenApiResponse(description="Bid value is too low"),
            404: OpenApiResponse(description="No auction with given id")
        }
    )
    def create(self, request):
        auction_id, value = request.data["auction_id"], request.data["value"]
        auction = get_object_or_404(Auction, id=auction_id)
        user = request.user

        # Only allow bid creation if this is first bid of the user in an offer
        # and it exceeds current leader by at least 10 (BID_INCREMENT in consts)
        if auction.bid_set.count() > 0:
            max_auction_bid = max(auction.bid_set.values_list('value', flat=True))
            if max_auction_bid + BID_INCREMENT > value:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            if (auction.min_bid_value and value <= auction.min_bid_value) or value <= 0:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        Bid.objects.update_or_create(
            user=user,
            auction=auction,
            defaults={'value': value}
        )
        return Response(status=status.HTTP_201_CREATED)
