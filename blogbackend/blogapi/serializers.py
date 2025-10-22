from rest_framework import serializers
from .models import BlogPost,BlogUser

class BlogPostSerializer(serializers.HyperlinkedModelSerializer):
    model = BlogPost
    fields = 'heading','content','author','created_at','updated_at','status'

class BlogUserSerializer(serializers.HyperlinkedModelSerializer):
    model = BlogUser
    fields = '__all__'