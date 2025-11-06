import React from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });
  //adding function to navigate from signup page to landing_test.jsx page after clicking on signup button
  const goToLanding = () => navigate('/landing_test', { replace: true });
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
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <input className="auth-input" name="username" placeholder="Username" />
            <input className="auth-input" name="email" type="email" placeholder="Email address" />
            <input className="auth-input" name="password" type="password" placeholder="Password" />
            <input className="auth-input" name="confirmPassword" type="password" placeholder="Confirm Password" />
            <button className="auth-btn" type="button" onClick={goToLanding}>Sign Up</button>
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