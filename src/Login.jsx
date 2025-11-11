import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goHome = () => navigate('/', { replace: true });

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      // store token and navigate home
      if (data.token) localStorage.setItem('persona_token', data.token);
      navigate('/', { replace: true });
    } catch (err) {
      setError('Network error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          {/* Back button (top-left) */}
          <button
            type="button"
            className="back-btn"
            onClick={goHome}
          >
            ← Back
          </button>

          <h1>LOGIN</h1>
          <hr className="divider" />
          <form className="auth-form" onSubmit={handleSubmit}>
            <input
              className="auth-input"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Logging in…' : 'Login'}
            </button>
          </form>
        </div>

        <div className="auth-right">
          <img
            className="auth-illustration"
            src="src\assets\4995233-removebg-preview.png"
            alt="illustration placeholder"
          />
        </div>
      </div>
    </div>
  );
}