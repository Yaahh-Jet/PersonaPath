import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Oldresults.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

export default function Oldresults() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResults();
  }, []);

  async function fetchResults() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, redirecting to login');
        navigate('/login', { replace: true });
        return;
      }

      const base = (API_BASE || '').replace(/\/+$/, '') || 'http://localhost:5001';
      const url = `${base}/api/results`;

      console.log('Fetching results from:', url);
      console.log('Using token:', token.substring(0, 20) + '...');

      const resp = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response status:', resp.status);

      if (resp.status === 401) {
        console.log('Unauthorized, clearing token and redirecting');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login', { replace: true });
        return;
      }

      const data = await resp.json();
      console.log('Received data:', data);

      if (!resp.ok) {
        throw new Error(data.error || 'Failed to fetch results');
      }

      setResults(data.results || []);
    } catch (err) {
      console.error('Fetch results error:', err);
      setError(err.message || 'Failed to load results');
      // Don't redirect on network error - show error message instead
    } finally {
      setLoading(false);
    }
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  if (loading) {
    return (
      <div className="results-root">
        <header className="results-header">
          <div className="results-logo">LOGO</div>
          <button className="signout-link" onClick={handleSignOut}>Sign Out</button>
        </header>
        <div className="loading">Loading your results...</div>
      </div>
    );
  }

  return (
    <div className="results-root">
      <header className="results-header">
        <div className="results-logo">LOGO</div>
        <button className="signout-link" onClick={handleSignOut}>Sign Out</button>
      </header>

      <main className="results-content">
        <h1 className="results-title">Past Tests</h1>
        <p className="results-subtitle">Review your previous personality and astrology test results</p>

        {error && (
          <div className="error-message">
            {error}
            <button 
              className="btn-primary" 
              onClick={() => {setError(null); fetchResults();}}
              style={{marginTop: '12px'}}
            >
              Try Again
            </button>
          </div>
        )}

        {!error && results.length === 0 ? (
          <div className="no-results">
            <p>You haven't taken any tests yet</p>
            <button className="btn-primary" onClick={() => navigate('/test')}>
              Take Your First Test
            </button>
          </div>
        ) : !error && (
          <div className="results-list">
            {results.map((result) => (
              <div key={result._id} className="result-card">
                <div className="result-card-left">
                  <div className="result-mbti">{result.mbti}</div>
                  <div className="result-horoscope">{result.horoscope}</div>
                </div>

                <div className="result-card-center">
                  <div className="result-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="result-palm">
                    <div className="palm-type">{result.palmResult?.lineType || 'Palm Reading'}</div>
                    <div className="palm-prediction">{result.palmResult?.prediction || 'No prediction available'}</div>
                  </div>
                </div>

                <div className="result-card-right">
                  <div className="result-date">{formatDate(result.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="btn-back" onClick={() => navigate('/landing_test')}>
          Back to Dashboard
        </button>
      </main>
    </div>
  );
}