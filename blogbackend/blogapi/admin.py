from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import BlogPost,BlogUser

# Register your models here.

class BlogUserAdmin(UserAdmin):
    model = BlogUser
    list_display =['username','is_staff','is_active']
    list_filter = ['is_staff','is_superuser']
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active','is_superuser','groups','user_permissions')}),
        ('Personal Info', {'fields': ('email','bio')}),
        ('Important dates', {'fields': ('last_login',)}),
        )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username',  'password1', 'password2', 'is_staff','is_superuser', 'is_active')}),
        )
    search_fields = ('username',)
    ordering = ('username',)

admin.site.register(BlogPost)
admin.site.register(BlogUser, BlogUserAdmin)
