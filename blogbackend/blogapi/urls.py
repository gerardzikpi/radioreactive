from django.urls import path
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from .views import BlogPostViewSet, BlogUserViewSet

router = routers.DefaultRouter()
router.register(r'posts', BlogPostViewSet)
router.register(r'user', BlogUserViewSet, basename='user')

# router.urls provides the viewset routes (e.g. /api/posts/, /api/user/)
urlpatterns = router.urls + [
	# token auth endpoint: POST {username, password} -> {token}
	path('token-auth/', obtain_auth_token, name='api-token-auth'),
]