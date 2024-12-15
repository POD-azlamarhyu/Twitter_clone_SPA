from rest_framework import permissions,status,viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView,UpdateAPIView,RetrieveAPIView
from django.contrib.auth import get_user_model
from .serializers import UserInfoSerializer,UserMyProfileSerializer,UserSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import JsonResponse,Http404
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import UserProfile
# Create your views here.

User = get_user_model()

class RegisterView(APIView):
    permission_classes = (AllowAny,)
    
    def post(self,request):
        try:
            data = request.data
            email = data['email']
            password = data['password']
            
            if not User.objects.filter(email=email).exists():
                User.objects.create_user(
                    email=email,
                    password=password
                )
                return Response(
                    {'success':'ユーザを作成しました'},
                    status=status.HTTP_201_CREATED
                )
            else:
                
                return Response(
                    {'error':'このメールアドレスは既に登録されてます'},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        except:
            return Response(
                {'error':'問題が発生しました'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
class MyUserInfoView(ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserMyProfileSerializer
    
    def get_queryset(self):
        # print(self.request.user)
        # print(self.queryset)
        
        return self.queryset.filter(user_profile=self.request.user)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserInfoSerializer
    
    def perform_create(self,serizalizer):
        serizalizer.save(user_profile=self.request.user)