from django.contrib import admin
from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.utils.translation import gettext
from .models import UserProfile
# Register your models here.

User = get_user_model()


class AccountAdmin(BaseUserAdmin):
    
    ordering = ['id']
    list_display = ['email']
    fieldsets = (
        (None, {'fields': ('email', 'password',)}),
        (gettext('Personal info'), {'fields': ()}),
        (
            gettext('Permissions'), 
            {
                'fields': (
                    'is_staff',
                    'is_admin',
                )
            }
        ),   
        (gettext('Important dates'),{'fields':('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2',),
        }),
    )
    search_fields = ('email',)
    ordering=('email',)
    
    


admin.site.register(User)
admin.site.register(UserProfile)
