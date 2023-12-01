from rest_framework import serializers
from src.apps.auction.models import Bid, Auction


class EmptyAuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        exclude = ['user']


class AuctionSerializer(serializers.ModelSerializer):
    top_bid_value = serializers.SerializerMethodField('get_top_bid_value')
    top_bidder_firstname = serializers.SerializerMethodField('get_top_bidder_firstname')
    top_bidder_lastname = serializers.SerializerMethodField('get_top_bidder_lastname')
    user_firstname = serializers.SerializerMethodField('get_auction_owner_firstname')
    user_lastname = serializers.SerializerMethodField('get_auction_owner_lastname')

    def get_top_bid(self, auction: Auction):
        return auction.bid_set.all().order_by('-value').first() if len(auction.bid_set.all()) > 0 else None

    def get_top_bid_value(self, auction: Auction):
        return getattr(self.get_top_bid(auction), 'value', None)

    def get_top_bidder(self, auction: Auction):
        return getattr(self.get_top_bid(auction), 'user', None)

    def get_top_bidder_firstname(self, auction: Auction):
        return getattr(self.get_top_bidder(auction), 'first_name', None)

    def get_top_bidder_lastname(self, auction: Auction):
        return getattr(self.get_top_bidder(auction), 'last_name', None)

    def get_auction_owner_firstname(self, auction: Auction):
        return getattr(auction.user, 'first_name', None)

    def get_auction_owner_lastname(self, auction: Auction):
        return getattr(auction.user, 'last_name', None)

    class Meta:
        model = Auction
        fields = ['title', 'user', 'user_firstname', 'user_lastname', 'description', 'photo', 'num_of_winners',
                  'deadline', 'min_bid_value', 'auction_end_data', 'is_paid', 'is_collected', 'top_bid_value',
                  'top_bidder_firstname', 'top_bidder_lastname']


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
