from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime

# Create your models here.
User = get_user_model()

def return_tweet_image_path(instance,filename):
    ext = filename.split('.')[-1]
    return '/'.join(['tweet',str(instance.id).zfill(5)+str(instance.user_tweet.id).zfill(10)+str(instance.created_on)+str(".")+str(ext)])

def return_comment_image_path(instance,filename):
    ext = filename.split('.')[-1]
    return '/'.join(['comment',str(instance.tweet.id).zfill(10)+str(instance.user_comment.id).zfill(10)+str(instance.created_on)+str(".")+str(ext)])

class Tweet(models.Model):
    text = models.TextField(
        verbose_name="tweet",max_length=500
    )
    user_tweet = models.ForeignKey(
        User,
        related_name='user_tweet',
        on_delete=models.CASCADE
    )
    tweet_img = models.ImageField(
        verbose_name="tweet image",
        blank=True,
        null=True,
        upload_to=return_tweet_image_path
    )
    created_on = models.DateTimeField(
        verbose_name="tweet date",
        editable=False,
        auto_now_add=True
    )
    update_on = models.DateTimeField(
        verbose_name="tweet edit at",
        auto_now=True,
    )
    tweet_like = models.ManyToManyField(
        User,
        related_name="tweet_like",
        blank=True    
    )
    
    def __str__(self):
        return  str(self.id)+" : "+self.text
    
class Comment(models.Model):
    text = models.TextField(
        verbose_name="comment",max_length=500
    )
    user_comment = models.ForeignKey(
        User,
        related_name="user_comment",
        on_delete=models.CASCADE,
    )
    tweet = models.ForeignKey(
        Tweet,
        related_name="origin_tweet",
        on_delete=models.CASCADE
    )
    comment_img = models.ImageField(
        verbose_name="comment image",
        blank=True,
        null=True,
        upload_to=return_comment_image_path
    )
    created_on=models.DateTimeField(
        auto_now_add=True,
        editable=False,
        null=True,
        blank=True
    )
    comment_like = models.ManyToManyField(
        User,
        related_name="comment_like",
        blank=True    
    )
    update_on = models.DateTimeField(
        verbose_name="comment edit at",
        default=timezone.now,
        null=True,
        blank=True
    )
    
    def __str__(self):
        return str(self.id)+" : "+self.text
