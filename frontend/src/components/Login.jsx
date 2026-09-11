import React, { useState } from 'react';
import { loginUser } from '../api';

export default function Login({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
    try {
      const res = await loginUser(credentials);
      // Store access token in browser storage
      localStorage.setItem('token', res.data.access);
      setError('');
      onLoginSuccess(credentials.username);
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div style={{ maxWidth: '360px', margin: '60px auto', padding: '25px', border: '1px solid #ccc', borderRadius: '8px', background: '#ffffff', color: '#000000' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000000' }}>HR Portal Login</h2>
      
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', background: '#ffffff', color: '#000000', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#000000' }}>Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', background: '#ffffff', color: '#000000', border: '1px solid #ccc', borderRadius: '4px' }}
            required
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
    </div>
  );
}