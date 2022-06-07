from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,UpdateAPIView,RetrieveAPIView
from .serializer import TweetSerializer,CommentSerializer,TweetListSerializer
from .models import Comment,Tweet
from rest_framework.response import Response


# Create your views here.

class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    
    def perform_create(self,serializer):
        # print(self.request.user)
        serializer.save(user_tweet=self.request.user)
        


class TweetListView(ListAPIView):
    
    queryset = Tweet.objects.all().order_by('-created_on')
    serializer_class = TweetSerializer
        
        
class CommentListView(ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        # print(self.request.query_params)
        query = self.request.query_params.get("tid",None)
        qs = {}
        if query is not None:
            qs= self.queryset.filter(tweet=query)
            qs=qs.order_by('-created_on')
        return qs
        
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    
    def perform_create(self, serializer):
        serializer.save(user_comment=self.request.user)