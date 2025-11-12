import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Oldresults.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

export default function Oldresults() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You need to login to view results');
      setLoading(false);
      return;
    }
    fetchResults();
  }, []);

  async function fetchResults() {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view saved results');
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/results`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 401) {
        setError('Session expired. Please login again.');
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to fetch results');
      }

      const data = await res.json();
      setResults(data.results || []);
    } catch (e) {
      console.error('Fetch error:', e);
      setError(e.message || 'Failed to load results');
    } finally {
      setLoading(false);
    }
  }

  function handleBack() { navigate('/landing_test'); }
  function handleSignOut() { localStorage.clear(); navigate('/', { replace: true }); }
  function handleLogin() { navigate('/login'); }

  function formatDate(ts) {
    // Handle MongoDB $date format or ISO string
    const dateValue = ts?.$date || ts;
    const d = dateValue ? new Date(dateValue) : null;
    return d && !isNaN(d) ? d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'Unknown date';
  }

  if (loading) {
    return (
      <div className="results-root">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="results-root">
      <header className="results-header">
        <div className="results-logo">PersonaPath</div>
        <div className="header-actions">
          <button className="back-btn" onClick={handleBack}>← Back to Dashboard</button>
          <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
      </header>

      <main className="results-content">
        <h1 className="results-title">Your Test History</h1>

        {error && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{error}</span>
            {String(error).toLowerCase().includes('login') && (
              <button className="btn-primary" onClick={handleLogin}>Go to Login</button>
            )}
          </div>
        )}

        {!error && results.length === 0 ? (
          <div className="no-results">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p>No results yet. Take your first personality test!</p>
            <button className="btn-primary" onClick={() => navigate('/test')}>Take Test Now</button>
          </div>
        ) : !error && (
          <div className="results-grid">
            {results.map((r, i) => (
              <div key={r._id || r._id?.$oid || i} className="result-card">
                <div className="card-header">
                  <span className="test-date">{formatDate(r.timestamp)}</span>
                  <span className="mbti-badge">{r.mbti || 'Unknown'}</span>
                </div>
                <div className="card-content">
                  {r.horoscope && r.horoscope !== 'Not available' && (
                    <div className="info-row">
                      <span className="label">Horoscope:</span>
                      <span className="value">{r.horoscope}</span>
                    </div>
                  )}
                  {r.palmResult?.lineType && (
                    <div className="info-row">
                      <span className="label">Palm Reading:</span>
                      <span className="value">{r.palmResult.lineType}</span>
                    </div>
                  )}
                  {r.palmResult?.prediction && (
                    <div className="info-row">
                      <span className="label">Prediction:</span>
                      <span className="value">{r.palmResult.prediction}</span>
                    </div>
                  )}
                  {r.scores && (
                    <div className="scores-section">
                      <div className="label">Personality Scores:</div>
                      {Object.entries(r.scores).map(([trait, score]) => (
                        <div key={trait} className="score-row">
                          <span className="score-label">{trait}</span>
                          <div className="score-bar">
                            <div className="score-fill" style={{ width: `${score}%` }}></div>
                            <span className="score-text">{score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {Array.isArray(r.dominantTraits) && r.dominantTraits.length > 0 && (
                    <div className="traits-section">
                      <div className="label">Dominant Traits:</div>
                      <div className="trait-tags">
                        {r.dominantTraits.map((t, idx) => <span key={idx} className="trait-tag">{t}</span>)}
                      </div>
                    </div>
                  )}
                  {r.analysisText && (
                    <div className="analysis-section">
                      <div className="label">Analysis:</div>
                      <p className="analysis-text">{r.analysisText}</p>
                    </div>
                  )}
                  {r.testType && (
                    <div className="meta-info">
                      <span>Test: {r.testType}</span>
                      {r.duration ? <span> • Duration: {Math.floor(r.duration/60)}m {r.duration%60}s</span> : null}
                      {r.accuracyConfidence ? <span> • Confidence: {(r.accuracyConfidence*100).toFixed(0)}%</span> : null}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}