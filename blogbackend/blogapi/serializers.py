from rest_framework import serializers
from .models import BlogPost,BlogUser

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = 'heading','content','author','created_at','updated_at','status'

class BlogUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogUser
        fields = '__all__'