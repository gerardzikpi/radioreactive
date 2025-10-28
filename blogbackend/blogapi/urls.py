from django.urls import path,include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView	
from .views import BlogPostViewSet, BlogUserViewSet

router = routers.DefaultRouter()
router.register(r'posts', BlogPostViewSet)
router.register(r'user', BlogUserViewSet, basename='user')

# router.urls provides the viewset routes (e.g. /api/posts/, /api/user/)
urlpatterns = [
	# token auth endpoint: POST {username, password} -> {token}
    path('',include(router.urls)),
	path('token-auth/', obtain_auth_token, name='api-token-auth'),
    path('token/',TokenObtainPairView.as_view(), name='token_obtain_pair'),
	path('token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
]