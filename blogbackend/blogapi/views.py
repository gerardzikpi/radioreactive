from rest_framework import viewsets
from .models import BlogUser, BlogPost  
from .serializers import BlogUserSerializer,BlogPostSerializer

# Create your views here.
class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    

class BlogUserViewSet(viewsets.ModelViewSet):
    queryset = BlogUser.objects.all()
    serializer_class = BlogUserSerializer
    user=queryset
    