import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goHome = () => navigate('/', { replace: true });
  // after signup go to landing_test
  const goToLanding = () => navigate('/landing_test', { replace: true });

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      if (data.token) localStorage.setItem('persona_token', data.token);
      goToLanding();
    } catch (err) {
      console.error(err);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <button
            type="button"
            className="back-btn"
            onClick={goHome}
          >
            ← Back
          </button>

          <h1>SIGN UP</h1>
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
              name="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="auth-input"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              className="auth-input"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <div style={{ color: 'crimson', marginBottom: 8 }}>{error}</div>}

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Signing up…' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className="auth-right">
          <img
            className="auth-illustration"
            src="https://via.placeholder.com/420x300?text=Illustration"
            alt="illustration placeholder"
          />
        </div>
      </div>
    </div>
  );
}