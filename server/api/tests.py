from django.test import TestCase
from .models import Tweet,Comment
from django.urls import reverse,resolve
from .views import TweetViewSet,CommentViewSet,TweetListView,CommentListView
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

# Create your tests here.
class TestModelClass(TestCase):
    
    def test_is_empty(self):
        """
        expected normal
        """
        saved_tweets = Tweet.objects.all()
        self.assertEqual(saved_tweets.count(),0) 
        
        saved_comment = Comment.objects.all()
        self.assertEqual(saved_comment.count(),0)
        
    
    
    def test_is_one(self):
        '''
        expected normal
        '''
        tweet = Tweet(text="mankomankomankomanko. chinkochinko",user_tweet=3)
        tweet.save()
        
        save_tweet = Tweet.objects.all()
        self.assertEqual(save_tweet.count(),1)
        
    def test_saving_content_and_retrieving_content(self):
        '''
        expected normal
        '''
        
        tweet = Tweet()
        post_text = "水素の音ぉ〜〜〜〜"
        post_user = 4
        tweet.text = post_text
        tweet.user_tweet = post_user
        
        tweet.save()
        
        save_tweet = Tweet.objects.all()
        now_save_tweet = save_tweet[0]
        self.assertEqual(now_save_tweet.text,post_text)
        self.assertEqual(now_save_tweet.user_tweet,post_user)
    
    def test_saving_content_and_updating_content(self):
        '''
        expected normal
        '''
        
        tweet = Tweet()
        post_text = "水素の音ぉ〜〜〜〜"
        post_user = 4
        tweet.text = post_text
        tweet.user_tweet = post_user
        
        tweet.save()
        
        save_tweet = Tweet.objects.all()
        now_save_tweet = save_tweet[0]
        self.assertEqual(now_save_tweet.text,post_text)
        self.assertEqual(now_save_tweet.user_tweet,post_user)
        
        post_text = "あああぁ〜〜〜　水素の音ぉ！！！"
        tweet.text = post_text
        
        tweet.save()
        
        save_tweet = Tweet.objects.all()
        now_save_tweet = save_tweet[0]
        self.assertEqual(now_save_tweet.text,post_text)
        self.assertEqual(now_save_tweet.user_tweet,post_user)
        
class TestAPIView(TestCase):
    
    tweet_api_url = "/api/tweet/"
    comment_api_url = "/api/comment/"
    
    def setUp(self):
        User.objects.create(email="bigwave@iphone.ac.jp",password="h93oalk4nx")
        User.objects.create(email="waratteirune.obasan@musashiseki.co.jp",password="h93oalk4nx")
        User.objects.create(email="ba-dac.nozawamasako@odakyu.jp",password="h93oalk4nx")
        User.objects.create(email="sex.is.good@inokashira.ac.jp",password="h93oalk4nx")
        User.objects.create(email="kitaharasann@nihon-u.ac.jp",password="h93oalk4nx")
        Tweet.objects.create(text="乗るしか無いでしょうね，このビックウェーブにねぇ",user_tweet=1)
        Tweet.objects.create(text="その心，笑ってるね？",user_tweet=2)
        Tweet.objects.create(text="あ”あ”ぁ，叩き殺してやる！！",user_tweet=3)
        Tweet.objects.create(text="性の喜びを知りやがって・・・・・・・・",user_tweet=4)
        Tweet.objects.create(text="ものを売るってレベルじゃねぇぞぉ！？",user_tweet=5)
        
    