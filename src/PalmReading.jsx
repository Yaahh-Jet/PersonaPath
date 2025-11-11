import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PalmReading.css';

export default function PalmReading() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert('Please upload a palm photo first');
      return;
    }
    // TODO: Process palm reading
    alert('Palm reading analysis coming soon!');
    navigate('/landing_test');
  };

  return (
    <div className="palm-reading-root">
      <header className="palm-header">
        <div className="palm-logo">LOGO</div>
        <button className="back-link" onClick={() => navigate('/landing_test')}>
          Exit
        </button>
      </header>

      <main className="palm-content">
        <h1 className="palm-title">Palm Reading</h1>
        <p className="palm-subtitle">Upload a clear photo of your palm for personalized insights</p>

        <div className="upload-section">
          <div className="upload-card">
            {!preview ? (
              <div className="upload-placeholder">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Click to upload or drag and drop</p>
                <span>PNG, JPG up to 10MB</span>
              </div>
            ) : (
              <div className="preview-container">
                <img src={preview} alt="Palm preview" className="palm-preview" />
                <button className="remove-btn" onClick={() => { setPreview(null); setSelectedFile(null); }}>
                  Remove
                </button>
              </div>
            )}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileSelect}
              className="file-input"
            />
          </div>

          <div className="tips-card">
            <h3>Tips for best results:</h3>
            <ul>
              <li>Use good lighting</li>
              <li>Keep your hand flat and relaxed</li>
              <li>Capture your dominant hand</li>
              <li>Ensure lines are clearly visible</li>
            </ul>
          </div>
        </div>

        <button 
          className="submit-btn" 
          onClick={handleSubmit}
          disabled={!selectedFile}
        >
          Analyze Palm
        </button>
      </main>
    </div>
  );
}