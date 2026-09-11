from django.db import models
from django.contrib.auth.models import User

# ==========================================
# 1. LEAVE & MC MANAGEMENT
# ==========================================

class LeaveType(models.TextChoices):
    ANNUAL = 'ANNUAL', 'Annual Leave'
    MEDICAL = 'MEDICAL', 'Medical Certificate (MC)'
    CHILDCARE = 'CHILDCARE', 'Statutory Childcare Leave'
    COMPASSIONATE = 'COMPASSIONATE', 'Compassionate Leave'

class LeaveStatus(models.TextChoices):
    PENDING = 'PENDING', 'Pending Approval'
    APPROVED = 'APPROVED', 'Approved'
    REJECTED = 'REJECTED', 'Rejected'
    CANCELLED = 'CANCELLED', 'Cancelled'

class LeaveRequest(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leave_requests', null=True, blank=True)
    leave_type = models.CharField(max_length=20, choices=LeaveType.choices)
    start_date = models.DateField()
    end_date = models.DateField()
    total_days = models.DecimalField(max_digits=4, decimal_places=1)
    reason = models.TextField()
    status = models.CharField(max_length=15, choices=LeaveStatus.choices, default=LeaveStatus.PENDING)
    mc_attachment = models.FileField(upload_to='mc_docs/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        user = self.employee.username if self.employee else 'Anonymous'
        return f"{user} - {self.get_leave_type_display()} ({self.start_date})"

# ==========================================
# 2. CLAIMS & REIMBURSEMENTS
# ==========================================

class ClaimCategory(models.TextChoices):
    MEDICAL = 'MEDICAL', 'Medical Claim'
    DENTAL = 'DENTAL', 'Dental Claim'
    OPTICAL = 'OPTICAL', 'Prescription Glass / Optical'
    TRANSPORT_ALLOWANCE = 'TRANSPORT_ALLOWANCE', 'Transportation Allowance'
    MEAL = 'MEAL', 'Meal Allowance'

class ClaimRequest(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='claims', null=True, blank=True)
    category = models.CharField(max_length=30, choices=ClaimCategory.choices)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    expense_date = models.DateField()
    description = models.TextField()
    receipt = models.FileField(upload_to='receipts/')
    status = models.CharField(max_length=15, choices=LeaveStatus.choices, default=LeaveStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.employee.username} - {self.get_category_display()} (${self.amount})"

class TransportClaimType(models.TextChoices):
    PETROL = 'PETROL', 'Petrol'
    DIESEL = 'DIESEL', 'Diesel'
    ERP = 'ERP', 'ERP Toll'
    PARKING = 'PARKING', 'Carpark Charges'
    MILEAGE = 'MILEAGE', 'Distance Mileage'

class TransportClaimItem(models.Model):
    claim = models.ForeignKey(ClaimRequest, on_delete=models.CASCADE, related_name='transport_items')
    transport_type = models.CharField(max_length=15, choices=TransportClaimType.choices)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    distance_km = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True) # For mileage
    trip_details = models.CharField(max_length=255, help_text="e.g. From Office to Client Site")

# ==========================================
# 3. PROCUREMENT & PURCHASE REQUESTS (PR)
# ==========================================

class PurchaseRequest(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchase_requests', null=True, blank=True)
    item_title = models.CharField(max_length=255)
    justification = models.TextField()
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2)
    vendor_quotation = models.FileField(upload_to='quotations/', null=True, blank=True)
    status = models.CharField(max_length=15, choices=LeaveStatus.choices, default=LeaveStatus.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"PR #{self.id} - {self.item_title} (${self.estimated_cost})"