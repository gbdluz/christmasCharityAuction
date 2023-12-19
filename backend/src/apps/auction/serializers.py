from rest_framework import serializers
from src.apps.auction.models import Bid, Auction


class EmptyAuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        exclude = ['user']


class AuctionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField(max_length=200)
    user = serializers.IntegerField()
    user_firstname = serializers.CharField(max_length=200)
    user_lastname = serializers.CharField(max_length=200)
    description = serializers.CharField(allow_null=True)
    photo_url = serializers.CharField(allow_null=True)
    deadline = serializers.DateField(allow_null=True)
    min_bid_value = serializers.IntegerField(allow_null=True)
    auction_end_data = serializers.DateField(allow_null=True)
    is_paid = serializers.BooleanField(default=False)
    is_collected = serializers.BooleanField(default=False)
    num_of_winners = serializers.IntegerField(allow_null=True)
    top_bid_value = serializers.IntegerField(allow_null=True)
    top_bidder_firstname = serializers.CharField(allow_null=True)
    top_bidder_lastname = serializers.CharField(allow_null=True)


class BidListSerializer(serializers.ModelSerializer):
    bidder_firstname = serializers.SerializerMethodField('get_bidder_firstname')
    bidder_lastname = serializers.SerializerMethodField('get_bidder_lastname')
    bidder_id = serializers.SerializerMethodField('get_bidder_id')

    def get_bidder_firstname(self, bid):
        return bid.user.first_name

    def get_bidder_lastname(self, bid):
        return bid.user.last_name

    def get_bidder_id(self, bid):
        return bid.user.id

    class Meta:
        model = Bid
        fields = ['value', 'bidder_id', 'bidder_firstname', 'bidder_lastname']


class BidSerializer(serializers.Serializer):
    auction_id = serializers.IntegerField()
    value = serializers.IntegerField()


class UserEditSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=50)
    last_name = serializers.CharField(max_length=50)


class UserIdSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()


class UserBidAuctionsSerializer(serializers.Serializer):
    auctions = serializers.ListField(child=serializers.IntegerField())