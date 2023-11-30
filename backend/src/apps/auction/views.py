from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema, OpenApiResponse

from src.apps.auction.models import Bid, Auction
from src.apps.auction.serializers import EmptyAuctionSerializer, BidSerializer, AuctionSerializer, BidListSerializer, \
    UserEditSerializer
from src.apps.auction.consts import BID_INCREMENT


class AuctionViewSet(
    viewsets.GenericViewSet,
    mixins.UpdateModelMixin,
):
    permission_classes = (IsAuthenticated,)
    serializer_class = EmptyAuctionSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            return Auction.objects.all()
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
        serializer = AuctionSerializer(data=data, many=True)
        serializer.is_valid()
        return Response(status=status.HTTP_200_OK, data=serializer.data)

    @action(url_path='bids', detail=True)
    def get_all_bids(self, request, pk: int):
        auction = Auction.objects.get(pk=pk)
        serializer = BidListSerializer(data=auction.bid_set.order_by('-value'), many=True)
        serializer.is_valid()
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class BidViewSet(viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = BidSerializer

    def get_queryset(self):
        user = self.request.user
        return Bid.objects.filter(user=user)

    @extend_schema(
        responses={
            201: OpenApiResponse(response={'user_id': int}, description="Created or udpated"),
            400: OpenApiResponse(description="Bid value is too low"),
            403: OpenApiResponse(description="The user cannot overbid their own bid if its the highest bid"),
            404: OpenApiResponse(description="No auction with given id")
        }
    )
    def create(self, request):
        auction_id, value = request.data["auction_id"], request.data["value"]
        try:
            auction = Auction.objects.get(id=auction_id)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        user = request.user

        # Only allow bid creation if this is first bid of the user in an offer
        # and it exceeds current leader by at least 10 (BID_INCREMENT in consts)
        if auction.bid_set.count() > 0:
            top_bid = auction.bid_set.all().order_by('-value').first()
            if top_bid.user == request.user:
                return Response(status=status.HTTP_403_FORBIDDEN)
            if top_bid.value + BID_INCREMENT > value:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            value_to_beat = auction.min_bid_value
            if value_to_beat is None:
                value_to_beat = BID_INCREMENT
            if value < value_to_beat:
                return Response(status=status.HTTP_400_BAD_REQUEST)

        Bid.objects.update_or_create(
            user=user,
            auction=auction,
            defaults={'value': value}
        )
        return Response(status=status.HTTP_201_CREATED, data={'user_id': request.user.id})


class UserEditView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserEditSerializer


    def post(self, request):
        serializer = UserEditSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        user.first_name = serializer.data['first_name']
        user.last_name = serializer.data['last_name']
        user.save()
        return Response(status=status.HTTP_200_OK)


