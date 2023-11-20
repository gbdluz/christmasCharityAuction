from django.shortcuts import render

# Create your views here.

from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.discord.views import DiscordOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client


class DiscordLogin(SocialLoginView):
    adapter_class = DiscordOAuth2Adapter
    callback_url = "http://127.0.0.1:3000/"
    client_class = OAuth2Client
