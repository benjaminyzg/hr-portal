import React, { useState } from 'react';
import LeaveTracker from './components/LeaveTracker.jsx';
import ClaimsManager from './components/ClaimsManager.jsx';
import Login from './components/Login.jsx';
import AdminPortal from './components/AdminPortal.jsx';

export default function App() {
  const [tab, setTab] = useState('leave');
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLoginSuccess={(username) => setUser(username)} />;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <header style={{ background: '#333', color: '#fff', padding: '15px 30px', display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '20px' }}>HR Management Portal</h1>
          <button onClick={() => setTab('leave')} style={{ padding: '6px 12px', background: tab === 'leave' ? '#007bff' : '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Leave & MC</button>
          <button onClick={() => setTab('claims')} style={{ padding: '6px 12px', background: tab === 'claims' ? '#007bff' : '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Claims & Expenses</button>
          <button onClick={() => setTab('admin')} style={{ padding: '6px 12px', background: tab === 'admin' ? '#007bff' : '#555', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Users & Admin</button>
        </div>
        <div>
          <span style={{ marginRight: '15px' }}>Welcome, <strong>{user}</strong></span>
          <button onClick={() => setUser(null)} style={{ padding: '6px 12px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
        </div>
      </header>

      <main>
        {tab === 'leave' && <LeaveTracker />}
        {tab === 'claims' && <ClaimsManager />}
        {tab === 'admin' && <AdminPortal />}
      </main>
    </div>
  );
}