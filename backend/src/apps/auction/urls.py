from django.urls import path
from src.apps.auction.views import AuctionViewSet, BidViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'auction', AuctionViewSet, basename='Auction')
router.register(r'bid', BidViewSet, basename='Bid')

urlpatterns = router.urls
