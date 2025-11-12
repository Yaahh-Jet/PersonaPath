import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landing_test.css';

export default function LandingTest() {
  const navigate = useNavigate();

  function startNewTest() {
    navigate('/newtest'); // Goes to test selection/prep
  }

  function viewOldResults() {
    navigate('/oldresults'); // Goes to past results
  }

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  return (
    <div className="landing-root">
      <header className="landing-header">
        <div className="landing-logo">PersonaPath</div>
        <button className="signout-link" onClick={handleSignOut}>Sign Out</button>
      </header>

      <main className="landing-hero">
        <h1 className="landing-title">
          Discover your personality
          <br />
          and astrology insights
        </h1>

        <div className="landing-cards">
          <button className="card card--muted" onClick={viewOldResults}>
            <div className="card-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="4" y="11" width="4" height="9" rx="1.5" fill="currentColor"/>
                <rect x="10" y="7" width="4" height="13" rx="1.5" fill="currentColor"/>
                <rect x="16" y="4" width="4" height="16" rx="1.5" fill="currentColor"/>
              </svg>
            </div>
            <div className="card-text">
              <div className="card-title">See older results</div>
            </div>
          </button>

          <button className="card card--accent" onClick={startNewTest}>
            <div className="card-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                <line x1="12" y1="3" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="12" y1="19" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="21" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="5" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="card-text">
              <div className="card-title">Take a new test</div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}