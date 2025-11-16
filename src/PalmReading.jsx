import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PalmReading.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

export default function PalmReading() {
  const navigate = useNavigate();
  const [horoscope, setHoroscope] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Force DOB page first
  useEffect(() => {
    let h = null;
    try { h = JSON.parse(localStorage.getItem('horoscope') || 'null'); } catch {}
    if (!h || !h.sign || !h.dob) {
      navigate('/horoscope', { replace: true });
      return;
    }
    setHoroscope(h);
  }, [navigate]);

  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);

  const onPick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setError('');
  };
  
  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setError('');
    }
  };

  const analyze = async () => {
    console.log('Analyze clicked, file:', file);
    if (!file) return setError('Select a palm image first.');
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      const form = new FormData();
      form.append('image', file);

      console.log('Sending request to:', `${API_BASE.replace(/\/+$/,'')}/api/palm/analyze`);
      const res = await fetch(`${API_BASE.replace(/\/+$/,'')}/api/palm/analyze`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: form
      });

      console.log('Response status:', res.status);

      if (res.status === 401) {
        setError('Session expired. Please login again.');
        setLoading(false);
        return;
      }
      
      const text = await res.text();
      console.log('Response text:', text);
      let data = {};
      try { data = text ? JSON.parse(text) : {}; } catch {}
      
      if (!res.ok) throw new Error(data?.error || 'Palm analysis failed');

      const result = data.result || data;
      console.log('Saving palm result:', result);
      localStorage.setItem('palmResult', JSON.stringify(result));
      
      console.log('Navigating to /final-results');
      navigate('/final-results');
    } catch (e) {
      console.error('Analysis error:', e);
      setError(e.message || 'Failed to analyze image.');
    } finally {
      setLoading(false);
    }
  };

  const skipPalm = () => {
    console.log('Skip clicked, navigating to /final-results');
    localStorage.setItem('palmResult', JSON.stringify({ skipped: true }));
    navigate('/final-results');
  };

  return (
    <div className="palm-root">
      <div className="palm-container">
        <header className="palm-header">
          <button className="link-btn" onClick={() => navigate(-1)}>← Back</button>
        </header>

        {horoscope && (
          <div className="horoscope-summary">
            <div className="hs-left">
              <div className="hs-sign">{horoscope.sign}</div>
              <div className="hs-date">{new Date(horoscope.dob).toLocaleDateString()}</div>
            </div>
            <div className="hs-desc">{horoscope.description || 'Personalized notes based on your sign.'}</div>
            <button className="edit-btn" onClick={() => navigate('/horoscope')}>Edit</button>
          </div>
        )}

        <main className="palm-card" onDrop={onDrop} onDragOver={(e)=>e.preventDefault()}>
          <h1>Palm Reading</h1>
          <p className="muted">Upload a clear photo of your <b>dominant</b> hand's palm.</p>

          <label className="dropzone">
            <input type="file" accept="image/*" onChange={onPick} hidden />
            {!preview ? (
              <div className="dz-inner">
                <span className="dz-icon">🖐️</span>
                <span>Drag & drop here, or click to browse</span>
              </div>
            ) : (
              <img className="preview" src={preview} alt="Palm preview" />
            )}
          </label>

          {error && <div className="palm-error">{error}</div>}

          <div className="actions">
            <button className="btn-secondary" onClick={skipPalm} disabled={loading}>
              Skip for now
            </button>
            <button className="btn-primary" onClick={analyze} disabled={loading || !file}>
              {loading ? 'Analyzing…' : 'Analyze & View Results'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}