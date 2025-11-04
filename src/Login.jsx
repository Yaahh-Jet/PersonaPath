import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });

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
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <input className="auth-input" name="username" placeholder="Username" />
            <input className="auth-input" name="password" type="password" placeholder="Password" />
            <button className="auth-btn" type="submit">Login</button>
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