from dataclasses import field, fields
from rest_framework import serializers,exceptions
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()
        


        
class UserMyProfileSerializer(serializers.ModelSerializer):
    
    # user=UserSerializer()
    
    class Meta:
        model = UserProfile
        fields = (
            'id',
            'nickname',
            'user_profile',
            'account',
            'bio',
            'icon',
            'link',
            'created_on',
            'update_at',
        )
class UserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = User()
        fields = "__all__"
        
class UserInfoSerializer(serializers.ModelSerializer):
    
    created_on = serializers.DateTimeField(format="%Y-%m-%d",read_only=True)
    update_at = serializers.DateTimeField(format="%Y-%m-%d",read_only=True)
    
    
    class Meta:
        model = UserProfile
        fields = ('id','nickname','user_profile','account','bio','icon','link','created_on','update_at')
        extra_kwargs = {'user_profile':{'read_only':True}}