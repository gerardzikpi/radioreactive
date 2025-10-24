from django.urls import path
from rest_framework import routers
from .views import BlogPostViewSet,BlogUserViewSet

router =routers.DefaultRouter()
router.register(r'posts',BlogPostViewSet)
router.register(r'user',BlogUserViewSet,basename='user')

urlpatterns =router.urls 