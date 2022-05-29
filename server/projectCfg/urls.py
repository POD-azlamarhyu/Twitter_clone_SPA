
from unicodedata import name
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('accounts.urls')),
    path('auth/account/',include('djoser.urls.jwt')),
    # path('auth/jwt/login/',TokenObtainPairView.as_view()),
    # path('auth/jwt/refresh/',TokenRefreshView.as_view(),name="token_refresh"),
    # path('auth/jwt/verify/',TokenVerifyView.as_view(),name="token_verify"),
    path('api/',include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root = settings.MEDIA_ROOT
    )