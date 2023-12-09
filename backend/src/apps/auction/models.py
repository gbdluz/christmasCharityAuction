from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class Auction(models.Model):
    title = models.CharField(max_length=200)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    photo_url = models.CharField(blank=True, null=True, max_length=200)
    num_of_winners = models.IntegerField(default=1)
    deadline = models.DateField(blank=True, null=True)
    min_bid_value = models.IntegerField(blank=True, null=True)
    auction_end_data = models.DateField(blank=True, null=True)
    is_paid = models.BooleanField(default=False)
    is_collected = models.BooleanField(default=False)


class Bid(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)
    value = models.IntegerField()


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_profile")
    discord_id = models.IntegerField(blank=True, null=True)
    favourite_auctions = models.ManyToManyField(Auction, related_name="interested_users")


# this method to generate profile when user is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


# this method to update profile when user is updated
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.user_profile.save()
