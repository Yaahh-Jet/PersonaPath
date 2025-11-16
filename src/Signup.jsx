import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const goHome = () => navigate('/', { replace: true });
  const goToLanding = () => navigate('/landing_test', { replace: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const base = (API_BASE || '').replace(/\/+$/, '') || 'http://localhost:5001';
      const signupUrl = `${base}/api/auth/signup`;
      
      const resp = await fetch(signupUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await resp.json();

      if (!resp.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      // After successful signup, automatically log them in to get a token
      const loginUrl = `${base}/api/auth/login`;
      const loginResp = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername: username, password })
      });

      const loginData = await loginResp.json();
      
      if (loginResp.ok && loginData.token) {
        // Save token and user info
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('user', JSON.stringify(loginData.user));
      }

      // Navigate to landing page
      goToLanding();
    } catch (err) {
      console.error(err);
      setError('Network or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <button type="button" className="back-btn" onClick={goHome}>
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

            {error && <div className="auth-error">{error}</div>}

            <button className="auth-btn" type="submit" disabled={loading}>
              {loading ? 'Signing up…' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className="auth-right">
          <img
            className="auth-illustration"
            src="src\20943394.jpg"
            alt="illustration placeholder"
          />
        </div>
      </div>
    </div>
  );
}