from django.urls import path,include
from .views import CommentViewSet,TweetListView,TweetViewSet,CommentListView,TweetListTopThousandView
from rest_framework.routers import DefaultRouter

app_name="api_tweet"

router = DefaultRouter()
router.register('comment', CommentViewSet)
router.register('tweet',TweetViewSet)

urlpatterns = [
    path('tweetlist/',TweetListView.as_view(), name="tweet_list"),
    path('commentlist/',CommentListView.as_view(),name="comment_list"),
    path('tweet/list/',TweetListTopThousandView.as_view(),name="tweet_top_thousand"),
    path('',include(router.urls))
]