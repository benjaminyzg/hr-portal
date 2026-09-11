import React, { useState, useEffect } from 'react';
import { fetchClaims, submitClaim } from '../api';

export default function ClaimsManager() {
  const [claims, setClaims] = useState([]);
  const [formData, setFormData] = useState({
    category: 'MEDICAL',
    amount: '',
    expense_date: '',
    description: '',
  });
  useEffect(() => {
    loadClaims();
  }, []);
  const loadClaims = async () => {
    try {
      const res = await fetchClaims();
      setClaims(res.data);
    } catch (err) {
      console.error('Failed to load claims:', err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitClaim(formData);
      setFormData({ category: 'MEDICAL', amount: '', expense_date: '', description: '' });
      loadClaims();
    } catch (err) {
      console.error('Error submitting claim:', err);
    }
  };
	const inputStyle = {
			background: '#ffffff',
			color: '#000000',
			border: '1px solid #ccc',
			borderRadius: '4px',
			padding: '6px 10px',
	};
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#000000' }}>
      <h2 style={{ color: '#000000' }}>💳 Claims & Reimbursements</h2>
      
      <form onSubmit={handleSubmit} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e9ecef' }}>
        <h3 style={{ marginTop: 0, color: '#000000' }}>Submit Claim</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Category: </label>
          <select 
            value={formData.category} 
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            style={{ ...inputStyle, width: '100%' }}
          >
            <option value="MEDICAL">Medical Claim</option>
            <option value="DENTAL">Dental Claim</option>
            <option value="OPTICAL">Prescription Glass / Optical</option>
            <option value="TRANSPORT_ALLOWANCE">Transport Allowance / Mileage / ERP</option>
            <option value="MEAL">Meal Allowance</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Amount ($): </label>
            <input 
              type="number" 
              step="0.01" 
              value={formData.amount} 
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })} 
              required 
              style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Date: </label>
            <input 
              type="date" 
              value={formData.expense_date} 
              onChange={(e) => setFormData({ ...formData, expense_date: e.target.value })} 
              required 
              style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Description: </label>
          <input 
            type="text" 
            value={formData.description} 
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
            required 
            style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <button type="submit" style={{ padding: '8px 16px', background: '#28a745', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Submit Claim
        </button>
      </form>

      <h3 style={{ color: '#000000' }}>Claim History</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', color: '#000000', borderColor: '#dee2e6' }}>
        <thead>
          <tr style={{ background: '#e9ecef' }}>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', color: '#6c757d' }}>No claims submitted yet.</td>
            </tr>
          ) : (
            claims.map((claim) => (
              <tr key={claim.id}>
                <td>{claim.category}</td>
                <td>${claim.amount}</td>
                <td>{claim.expense_date}</td>
                <td><strong>{claim.status}</strong></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}