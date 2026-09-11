from django.contrib.auth.models import User
from rest_framework import serializers
from .models import LeaveRequest, ClaimRequest, TransportClaimItem, PurchaseRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active']

class TransportClaimItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransportClaimItem
        fields = '__all__'

class LeaveRequestSerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source='employee.username')

    class Meta:
        model = LeaveRequest
        fields = '__all__'
        read_only_fields = ['employee', 'status', 'created_at']

class ClaimRequestSerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source='employee.username')
    transport_items = TransportClaimItemSerializer(many=True, read_only=True)

    class Meta:
        model = ClaimRequest
        fields = '__all__'
        read_only_fields = ['employee', 'status', 'created_at']

class PurchaseRequestSerializer(serializers.ModelSerializer):
    employee_name = serializers.ReadOnlyField(source='employee.username')

    class Meta:
        model = PurchaseRequest
        fields = '__all__'
        read_only_fields = ['employee', 'status', 'created_at']