from rest_framework import viewsets, permissions
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions
from .models import LeaveRequest, ClaimRequest, PurchaseRequest
from .serializers import LeaveRequestSerializer, ClaimRequestSerializer, PurchaseRequestSerializer, UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]  # Restrict endpoint to Admins only

class LeaveRequestViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveRequestSerializer
    permission_classes = [permissions.AllowAny]  # Allow open access for local dev

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff:
                return LeaveRequest.objects.all().order_by('-created_at')
            return LeaveRequest.objects.filter(employee=user).order_by('-created_at')
        # Fallback for unauthenticated dev testing
        return LeaveRequest.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(employee=user)

class ClaimRequestViewSet(viewsets.ModelViewSet):
    serializer_class = ClaimRequestSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff:
                return ClaimRequest.objects.all().order_by('-created_at')
            return ClaimRequest.objects.filter(employee=user).order_by('-created_at')
        return ClaimRequest.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(employee=user)

class PurchaseRequestViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseRequestSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff:
                return PurchaseRequest.objects.all().order_by('-created_at')
            return PurchaseRequest.objects.filter(employee=user).order_by('-created_at')
        return PurchaseRequest.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(employee=user)