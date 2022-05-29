from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser,PermissionsMixin
from django.utils import timezone
from datetime import datetime
from django.contrib.auth import get_user_model
from django.conf import settings


def return_icon_path(instance,filename):
    ext = filename.split('.')[-1]
    return '/'.join(['icon',str(instance.user_profile.id)+"_"+str(".")+str(ext)])

class UserManager(BaseUserManager):
    def create_user(self,email,password=None):
        """
            create and save a user
        """
        
        if not email:
            raise ValueError('Users must have an eamil-address')
        
        user = self.model(
            email = self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    def create_superuser(self,email,password=None):
        """
            create and save a superuser
        """
        user = self.create_user(
            email,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user
        
class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique= True,
        blank=False
    )
    is_active = models.BooleanField(
        verbose_name="active account",
        default=True
    )
    is_admin = models.BooleanField(
        verbose_name="super account",
        default=False
    )
    is_staff = models.BooleanField(
        verbose_name="staff user",
        default=False
    )
    joined_date = models.DateTimeField(
        verbose_name="joined services", 
        default=timezone.now
    )

    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRE_FIELDS = ['email']
    
    def __str__(self):
        return str(self.pk)+" : " +str(self.email)
    
    @property
    def is_superuser(self):
        return self.is_admin
    
    def has_module_perms(self,app_label):
        return self.is_admin
    
    def has_perm(self,perm,obj=None):
        return self.is_admin
    
class UserProfile(models.Model):
    nickname = models.CharField(
        verbose_name="nickname",
        max_length=255,
        blank=True,
        null=True,
    )
    user_profile = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name='user_profile',
        on_delete=models.CASCADE
    )
    created_on=models.DateTimeField(
        auto_now_add=True
    )
    update_at = models.DateTimeField(
        verbose_name="update date",
        default=timezone.now
    )
    account = models.CharField(
        verbose_name="unique account id",
        max_length=50,
        unique=True,
        blank=True,
        null=True
    )
    bio = models.TextField(
        verbose_name="bio",
        max_length=1000,
        blank=True
    )
    icon = models.ImageField(
        verbose_name="usericon",
        upload_to=return_icon_path,
        blank=True,
        null=True
    )
    link = models.URLField(
        verbose_name="url",
        max_length=1000,
        blank=True
    )
    
    def __str__(self):
        if self.nickname is not None:
            return str(self.id)+ " : " + self.nickname
        else:
            return str(self.id)
        