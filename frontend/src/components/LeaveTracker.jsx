import React, { useState, useEffect } from 'react';
import { fetchLeaves, submitLeave } from '../api';

export default function LeaveTracker() {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    leave_type: 'MEDICAL',
    start_date: '',
    end_date: '',
    total_days: 1,
    reason: '',
  });

  useEffect(() => {
    loadLeaves();
  }, []);
  const loadLeaves = async () => {
    try {
      const res = await fetchLeaves();
      setLeaves(res.data);
    } catch (err) {
      console.error('Failed to load leaves:', err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitLeave(formData);
      setFormData({ leave_type: 'MEDICAL', start_date: '', end_date: '', total_days: 1, reason: '' });
      loadLeaves();
    } catch (err) {
      console.error('Error submitting leave:', err);
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
      <h2 style={{ color: '#000000' }}>📅 Leave & MC Management</h2>
      
      {/* Leave Application Form */}
      <form onSubmit={handleSubmit} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e9ecef' }}>
        <h3 style={{ marginTop: 0, color: '#000000' }}>Submit Leave / MC</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Type: </label>
          <select 
            value={formData.leave_type} 
            onChange={(e) => setFormData({ ...formData, leave_type: e.target.value })}
            style={{ ...inputStyle, width: '100%' }}
          >
            <option value="ANNUAL">Annual Leave</option>
            <option value="MEDICAL">Medical Certificate (MC)</option>
            <option value="CHILDCARE">Statutory Childcare Leave</option>
            <option value="COMPASSIONATE">Compassionate Leave</option>
          </select>
        </div>

        <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Start Date: </label>
            <input 
              type="date" 
              value={formData.start_date} 
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} 
              required 
              style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>End Date: </label>
            <input 
              type="date" 
              value={formData.end_date} 
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} 
              required 
              style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Reason: </label>
          <textarea 
            value={formData.reason} 
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })} 
            required 
            rows="3"
            style={{ ...inputStyle, width: '100%', boxSizing: 'border-box', resize: 'vertical' }} 
          />
        </div>

        <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Submit Request
        </button>
      </form>

      {/* Leave History List */}
      <h3 style={{ color: '#000000' }}>Leave History</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', color: '#000000', borderColor: '#dee2e6' }}>
        <thead>
          <tr style={{ background: '#e9ecef' }}>
            <th>Type</th>
            <th>Dates</th>
            <th>Days</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center', color: '#6c757d' }}>No leave requests submitted yet.</td>
            </tr>
          ) : (
            leaves.map((item) => (
              <tr key={item.id}>
                <td>{item.leave_type}</td>
                <td>{item.start_date} to {item.end_date}</td>
                <td>{item.total_days}</td>
                <td><strong>{item.status}</strong></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}