import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Newtest.css';

export default function Newtest() {
  const navigate = useNavigate();

  const handleBeginTest = () => {
    navigate('/mbti-test');
  };

  const handleGoBack = () => {
    navigate('/landing_test');
  };

  return (
    <div className="newtest-root">
      <header className="newtest-header">
        <div className="newtest-logo">LOGO</div>
        <button className="back-link" onClick={handleGoBack}>
          ← Back to Dashboard
        </button>
      </header>

      <main className="newtest-content">
        <h1 className="newtest-title">Before You Begin</h1>
        
        <div className="newtest-card">
          <div className="info-section">
            <h2>What to Expect</h2>
            
            <div className="info-item">
              <div className="info-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="info-text">
                <h3>Approximately 60 questions</h3>
                <p>Comprehensive MBTI personality assessment and astrological analysis</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="info-text">
                <h3>Picture for palm reading</h3>
                <p>Upload a clear photo of your palm for personalized insights</p>
              </div>
            </div>

            <div className="time-estimate">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>This will take roughly <strong>15 minutes</strong></span>
            </div>
          </div>

          <div className="continue-section">
            <p className="continue-prompt">Ready to discover your true self?</p>
            <button className="btn-begin" onClick={handleBeginTest}>
              Begin Test
            </button>
            <button className="btn-cancel" onClick={handleGoBack}>
              Maybe Later
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}