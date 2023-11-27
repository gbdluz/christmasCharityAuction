from rest_framework import serializers
from src.apps.auction.models import  Bid, Auction
from django.contrib.auth.models import User


class EmptyAuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        exclude = ['user']


class AuctionSerializer(serializers.ModelSerializer):
    top_bid_value = serializers.SerializerMethodField('get_top_bid_value')
    top_bidder_firstname = serializers.SerializerMethodField('get_top_bidder_firstname')
    top_bidder_lastname = serializers.SerializerMethodField('get_top_bidder_lastname')

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

    class Meta:
        model = Auction
        fields = ['title', 'user', 'description', 'photo', 'num_of_winners',
                  'deadline', 'min_bid_value', 'auction_end_data', 'is_paid',
                  'is_collected', 'top_bid_value', 'top_bidder_firstname',
                  'top_bidder_lastname']

class BidListSerializer(serializers.ModelSerializer):
    bidder_firstname = serializers.SerializerMethodField('get_bidder_firstname')
    bidder_lastname = serializers.SerializerMethodField('get_bidder_lastname')

    def get_bidder_firstname(self, bid):
        return bid.user.first_name

    def get_bidder_lastname(self, bid):
        return bid.user.last_name

    class Meta:
        model = Bid
        fields = ['value', 'bidder_firstname', 'bidder_lastname']


class BidSerializer(serializers.Serializer):
    auction_id = serializers.IntegerField()
    value = serializers.IntegerField()

