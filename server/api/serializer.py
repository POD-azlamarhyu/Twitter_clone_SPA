from dataclasses import field
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Tweet,Comment

User = get_user_model()

class TweetSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d",read_only=True)
    update_on = serializers.DateTimeField(format="%Y-%m-%d",read_only=True)
    
    class Meta:
        model = Tweet
        fields = ('id','text','user_tweet','created_on','tweet_img','update_on','tweet_like')
        extra_kwargs = {'user_tweet' : {'read_only': True}}
        
        
class TweetListSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d",read_only=True)
    update_on = serializers.DateTimeField(format="%Y-%m-%d",read_only=True)
    
    class Meta:
        model = Tweet
        field ='__all__'
        
class CommentSerializer(serializers.ModelSerializer):
    created_on = serializers.DateTimeField(format="%Y-%m-%d",read_only=True)
    
    class Meta:
        model = Comment
        fields = ('id','text','user_comment','tweet','comment_img','created_on','update_on','comment_like')
        extra_kwargs = {'user_comment': {'read_only':True}}
    