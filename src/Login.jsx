import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Added ?v=2 to force reload

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

export default function Login() {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goHome = () => navigate('/', { replace: true });
  const goToLanding = () => navigate('/landing_test', { replace: true });

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!emailOrUsername || !password) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    try {
      const base = (API_BASE || '').replace(/\/+$/, '') || 'http://localhost:5001';
      const url = `${base}/api/auth/login`;
      console.log('Login POST ->', url);

      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password })
      });

      console.log('Response status:', resp.status, resp.statusText);
      const contentType = resp.headers.get('content-type') || '';
      const body = contentType.includes('application/json') ? await resp.json() : await resp.text();

      if (!resp.ok) {
        const msg = typeof body === 'string' ? body : (body.error || JSON.stringify(body));
        throw new Error(msg || `Request failed: ${resp.status}`);
      }

      // success: store token/user and navigate to landing page
      if (body.token) localStorage.setItem('token', body.token);
      if (body.user) localStorage.setItem('user', JSON.stringify(body.user));
      goToLanding();
    } catch (err) {
      console.error('Login error:', err);
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <button type="button" className="back-btn" onClick={goHome}>
            ← Back
          </button>

          <h1>LOGIN</h1>
          <hr className="divider" />

          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="auth-input"
              name="emailOrUsername"
              placeholder="Username or Email"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="auth-error" style={{ color: '#ffb3b3', marginBottom: 8 }}>{error}</div>}

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Login'}
            </button>
          </form>
        </div>

        <div className="auth-right">
          <img
            className="auth-illustration"
            src="src\4995233-removebg-preview.png"
            alt="illustration placeholder"
          />
        </div>
      </div>
    </div>
  );
}