readme_content_v2 = """# HR Management Portal (`hr-portal`)

An all-in-one staff self-service HR portal designed to streamline leave management, healthcare & optical expense reimbursements, travel allowances, and procurement workflows.

---

## 📌 Overview

The **HR Management Portal** provides a centralized platform for employees to submit and track their leave, log health and travel expense claims, and raise purchase requests. Built to improve operational clarity and operational efficiency, it standardizes workflows across leave administration, claims processing, and procurement.

---

## ✨ Key Features

### 📅 1. Leave & Medical Certificate Management
* **Medical Certificate (MC) Submissions:** Upload and track medical certificate records seamlessly.
* **Leave Entitlements & Balances:** Real-time tracking of annual, statutory, and company leave balances.
* **Statutory & Mandatory Leave:** Manage statutory entitlements such as **Childcare Leave**.
* **Compassionate Leave:** Dedicated submission and approval tracking for compassionate leave.

---

### 💳 2. Claims & Reimbursements
* **Medical & Dental Claims:** Submit and monitor outpatient medical and dental expenses.
* **Prescription Glass / Optical Claims:** Track optical reimbursement entitlements and claim prescription eyewear expenses.
* **Transportation Claims (Itemized):**
  * Fuel expenses (Petrol & Diesel)
  * Electronic Road Pricing (ERP) tolls
  * Parking / Carpark charges
  * Distance-based Mileage claims
* **Transportation Allowance:** Regular monthly/fixed travel allowance claims.
* **Meal Allowances:** Claim eligible staff meal and overtime meal expenses.

---

### 🛒 3. Procurement & Purchase Requests (PR)
* **Purchase Request (PR) Tracking:** Initiate, approve, and audit corporate procurement purchase requests.

---

## 📐 Portal Structure & Architecture
```text
hr-portal/
├── apps/ / src/
│   ├── modules/
│   │   ├── auth/                # SSO, JWT, and Role-Based Access Control (RBAC)
│   │   ├── leave/               # MC, Entitlements, Childcare & Compassionate Leave
│   │   ├── claims/              # Medical, Dental, Prescription Glass, Meals, Transport
│   │   │   ├── medical/         # Outpatient & Optical (Glasses) claims
│   │   │   ├── transport/       # Petrol, Diesel, ERP, Carpark & Mileage logs
│   │   │   └── meals/           # Meal allowance submissions
│   │   └── procurement/         # Purchase Request (PR) lifecycle & approval workflows
│   ├── components/              # Shared UI components (Forms, Tables, File Uploaders)
│   └── api/                     # Backend routes & controller endpoints
├── docs/                        # API specifications & deployment guides
└── database/                    # Migrations, schemas, and seeds
```

---

## 🛠️ Technology Stack

*(Customize based on your technical stack)*

* **Frontend:** React / Next.js / Vue.js / Tailwind CSS
* **Backend:** Node.js (Express/NestJS) / Python (FastAPI/Django) / Go
* **Database:** PostgreSQL / MySQL / MongoDB
* **Authentication:** Role-Based Access Control (RBAC), SSO / OAuth 2.0 / JWT

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+) or Python (v3.10+)
* Database instance (PostgreSQL/MySQL)

### Installation

```bash
# Clone the repository
git clone [https://github.com/benjaminyzg/hr-portal.git](https://github.com/benjaminyzg/hr-portal.git)

# Navigate into the project directory
cd hr-portal

# Install dependencies
npm install  # or pip install -r requirements.txt

# Environment setup
cp .env.example .env

# Run development server
npm run dev
