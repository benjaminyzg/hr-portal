from django.contrib import admin
from .models import LeaveRequest, ClaimRequest, TransportClaimItem, PurchaseRequest

# Register your models here
admin.site.register(LeaveRequest)
admin.site.register(ClaimRequest)
admin.site.register(TransportClaimItem)
admin.site.register(PurchaseRequest)