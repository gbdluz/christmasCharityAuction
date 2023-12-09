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
        top_bid = self.get_top_bid(auction)
        return top_bid.value if top_bid else None

    def get_top_bidder(self, auction: Auction):
        top_bid = self.get_top_bid(auction)
        return top_bid.user if top_bid else None

    def get_top_bidder_firstname(self, auction: Auction):
        top_bidder = self.get_top_bidder(auction)
        return top_bidder.first_name if top_bidder else None

    def get_top_bidder_lastname(self, auction: Auction):
        top_bidder = self.get_top_bidder(auction)
        return top_bidder.last_name if top_bidder else None

    def get_auction_owner_firstname(self, auction: Auction):
        return auction.user.first_name if auction.user else None

    def get_auction_owner_lastname(self, auction: Auction):
        return auction.user.last_name if auction.user else None

    class Meta:
        model = Auction
        fields = ['id', 'title', 'user', 'user_firstname', 'user_lastname', 'description', 'photo_url', 'num_of_winners',
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


class UserBidAuctionsSerializer(serializers.ModelSerializer):
    auction_id = serializers.SerializerMethodField('get_auction_id')
    auction_top_bid = serializers.SerializerMethodField('get_auction_top_bid')

    def get_auction_id(self, Bid):
        return Bid.auction.id

    def get_auction_top_bid(self, Bid):
        return Bid.auction.bid_set.all().order_by('-value').first().value

    class Meta:
        model = Bid
        fields = ['auction_id', 'value', 'auction_top_bid']
