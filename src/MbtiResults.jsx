import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MbtiResults.css';

export default function MbtiResults() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const storedResult = localStorage.getItem('mbtiResult');
    if (!storedResult) {
      navigate('/mbti-test');
      return;
    }
    setResult(JSON.parse(storedResult));
  }, [navigate]);

  const handleRetry = () => {
    localStorage.removeItem('mbtiResult');
    navigate('/mbti-test');
  };

  const handleContinue = () => {
    navigate('/palm-reading');
  };

  if (!result) {
    return (
      <div className="mbti-results-root">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading results...</p>
        </div>
      </div>
    );
  }

  const explanations = {
    E: { letter: 'E', name: 'Extraversion', description: 'You gain energy from social interactions and external activities. You tend to be outgoing, action-oriented, and enjoy being around people.' },
    I: { letter: 'I', name: 'Introversion', description: 'You gain energy from solitude and inner reflection. You tend to be more reserved, thoughtful, and prefer deeper one-on-one connections.' },
    S: { letter: 'S', name: 'Sensing', description: 'You focus on concrete facts and practical details. You trust information from your five senses and prefer proven methods.' },
    N: { letter: 'N', name: 'Intuition', description: 'You focus on patterns, possibilities, and abstract concepts. You trust insights and enjoy exploring new ideas and theories.' },
    T: { letter: 'T', name: 'Thinking', description: 'You make decisions based on logic and objective analysis. You value truth, fairness, and consistent principles.' },
    F: { letter: 'F', name: 'Feeling', description: 'You make decisions based on values and how they affect people. You value harmony, empathy, and personal connections.' },
    J: { letter: 'J', name: 'Judging', description: 'You prefer structure, planning, and organization. You like to have things decided and enjoy completing tasks systematically.' },
    P: { letter: 'P', name: 'Perceiving', description: 'You prefer flexibility and spontaneity. You like to keep your options open and adapt to new information as it comes.' }
  };

  const typeLetters = result.type.split('');

  return (
    <div className="mbti-results-root">
      <header className="results-header">
        <div className="results-logo">LOGO</div>
        <button className="home-link" onClick={() => navigate('/landing_test')}>
          Back to Dashboard
        </button>
      </header>

      <main className="results-content">
        <div className="results-hero">
          <h1 className="results-title">Your Personality Type</h1>
          <div className="mbti-type-badge">{result.type}</div>
          <p className="results-subtitle">Here's what each letter means:</p>
        </div>

        <div className="explanations-grid">
          {typeLetters.map((letter, index) => {
            const explanation = explanations[letter];
            const dimension = index === 0 ? 'E/I' : index === 1 ? 'S/N' : index === 2 ? 'T/F' : 'J/P';
            const percentage = result.scores[explanation.name] || 50;

            return (
              <div key={index} className="explanation-card">
                <div className="card-header">
                  <div className="letter-badge">{explanation.letter}</div>
                  <h3>{explanation.name}</h3>
                </div>
                <p className="explanation-text">{explanation.description}</p>
                
                <div className="percentage-bar">
                  <div className="percentage-label">
                    <span>{explanation.name}</span>
                    <span className="percentage-value">{percentage}%</span>
                  </div>
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="actions-section">
          <h2>What would you like to do next?</h2>
          <div className="action-buttons">
            <button className="action-btn action-btn--secondary" onClick={handleRetry}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M1 4v6h6M23 20v-6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Retake MBTI Test</span>
            </button>
            <button className="action-btn action-btn--primary" onClick={handleContinue}>
              <span>Continue to Palm Reading</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}