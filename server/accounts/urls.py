from django.contrib import admin
from django.urls import path,include
from .views import RegisterView,MyUserInfoView,UserProfileViewSet
from rest_framework.routers import DefaultRouter

app_name = 'accounts'
router = DefaultRouter()
router.register('user/profile',UserProfileViewSet)

urlpatterns = [
    path('signup/',RegisterView.as_view(),name="create_user"),
    path('user/myprofiles/',MyUserInfoView.as_view(),name="user_info"),
    path('',include(router.urls))
]