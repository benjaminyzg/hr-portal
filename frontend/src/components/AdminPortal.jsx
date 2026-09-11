import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../api';

export default function AdminPortal() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetchUsers();
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', color: '#000000' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000000' }}>⚙️ Users & Administration</h2>
      
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff', color: '#000000', borderColor: '#dee2e6' }}>
        <thead>
          <tr style={{ background: '#e9ecef' }}>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email || 'N/A'}</td>
              <td><strong>{u.is_staff ? 'Administrator' : 'Employee'}</strong></td>
              <td>{u.is_active ? 'Active' : 'Disabled'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}