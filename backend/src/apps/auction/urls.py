from django.urls import path
from src.apps.auction.views import AuctionViewSet, BidViewSet
from rest_framework import routers

from src.apps.auction.views import UserEditView

router = routers.SimpleRouter()
router.register(r'auction', AuctionViewSet, basename='Auction')
router.register(r'bid', BidViewSet, basename='Bid')

urlpatterns = [
    path('user/change_details', UserEditView.as_view(), name="user")
] + router.urls
