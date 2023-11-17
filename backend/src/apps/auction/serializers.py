from rest_framework import serializers
from src.apps.auction.models import Auction, Bid


class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        exclude = ['user']


class BidSerializer(serializers.Serializer):
    auction_id = serializers.IntegerField()
    value = serializers.IntegerField()
