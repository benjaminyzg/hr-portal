"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)
from portal.views import (
    LeaveRequestViewSet, 
    ClaimRequestViewSet, 
    PurchaseRequestViewSet, 
    UserViewSet  # <--- Add UserViewSet here
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'leaves', LeaveRequestViewSet, basename='leave')
router.register(r'claims', ClaimRequestViewSet, basename='claim')
router.register(r'purchases', PurchaseRequestViewSet, basename='purchase')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]