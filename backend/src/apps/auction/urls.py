from django.urls import path
from src.apps.auction.views import AuctionViewSet, BidViewSet, UserBidAuctionsViewSet
from rest_framework import routers

from src.apps.auction.views import UserEditView

router = routers.SimpleRouter()
router.register(r'auction', AuctionViewSet, basename='Auction')
router.register(r'bid', BidViewSet, basename='Bid')
router.register(r'user/bid_auctions', UserBidAuctionsViewSet, basename='BidAuctions')

urlpatterns = [
    path('user/change_details', UserEditView.as_view(), name="change_user_details"),
] + router.urls
