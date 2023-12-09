from django.urls import path
from src.apps.auction.views import AuctionViewSet, BidViewSet, UserBidAuctionsView
from rest_framework import routers

from src.apps.auction.views import UserEditView

router = routers.SimpleRouter()
router.register(r'auction', AuctionViewSet, basename='Auction')
router.register(r'bid', BidViewSet, basename='Bid')

urlpatterns = [
    path('user/change_details', UserEditView.as_view(), name="change_user_details"),
    path('user/bid_auctions', UserBidAuctionsView.as_view(), name="get_user_bid_auctions")
] + router.urls
