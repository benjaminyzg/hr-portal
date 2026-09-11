# HR Management Portal (`hr-portal`)

An all-in-one staff self-service HR portal designed to streamline leave management, expense claims reimbursement, and procurement workflows.

---

## 📌 Overview

The **HR Management Portal** provides a centralized platform for employees to submit and track their leave, log expense claims, and raise purchase requests. Designed with modularity and clarity in mind, it simplifies administrative tasks for both staff and HR administrators.

---

## ✨ Key Features

### 📅 1. Leave & Medical Certificate Management
* **Medical Certificate (MC) Tracking:** Submit and monitor MC status seamlessly.
* **Leave Entitlements:** View real-time balances for vacation, annual, and standard leave allowances.
* **Statutory & Mandatory Leave:** Manage statutory leave entitlements, including **Childcare Leave**.
* **Compassionate Leave:** Dedicated request tracking for compassionate and special leave.

---

### 💳 2. Claims & Reimbursements
* **Medical & Dental Claims:** Submit and track reimbursement requests for health and dental expenses.
* **Transportation Claims:** Detailed expense log supporting:
  * Petrol & Diesel charges
  * Electronic Road Pricing (ERP)
  * Carpark fees
  * Mileage tracking
* **Transportation Allowance Claims:** Regular travel allowance management.
* **Meal Allowances:** Claim reimbursement for eligible staff meal expenses.

---

### 🛒 3. Procurement & Purchase Requests (PR)
* **Purchase Request (PR) Workflow:** Create, submit, and track approval status for corporate procurement requests.

---

## 🛠️ Technology Stack

*(Customize based on your application architecture)*

* **Frontend:** React / Next.js / Vue.js
* **Backend:** Node.js / Python / Go / PHP
* **Database:** PostgreSQL / MySQL / MongoDB
* **Authentication:** OAuth 2.0 / JWT / SSO Integration

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+) / Python (v3.10+)
* Database instance (PostgreSQL/MySQL)

### Installation

```bash
# Clone the repository
git clone [https://github.com/benjaminyzg/hr-portal.git](https://github.com/benjaminyzg/hr-portal.git)

# Navigate to the project directory
cd hr-portal

# Install dependencies
npm install  # or pip install -r requirements.txt

# Configure environment variables
cp .env.example .env

# Run the development server
npm run dev
