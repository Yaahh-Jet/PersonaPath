import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-root">
      {/* Navbar */}
      <nav className="home-nav">
        <div className="nav-logo">PersonaPath</div>
        <div className="nav-links">
          <a href="#how">How it works</a>
          <button onClick={() => navigate('/login')} className="nav-link-btn">Log In</button>
          <button onClick={() => navigate('/signup')} className="nav-link-btn primary">Sign up</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>We help you know what you truly are</h1>
          <p>Our team helps you take our personalized personality, and astrological test and use the deep insight about yourself for free.</p>
        </div>
        <div className="hero-shapes">
          <div className="shape star"></div>
          <div className="shape circle circle-1"></div>
          <div className="shape circle circle-2"></div>
        </div>
      </section>

      {/* Fusion Section */}
      <section className="fusion">
        <div className="fusion-text">
          <h2>The perfect fusion of personality and astrology</h2>
          <p>Combining the best of both worlds, we perform most scientifically advanced analysis of your astrological birthdate as well as psychological answers to generate a deep and accurate reading specific to you.</p>
        </div>
        <div className="fusion-visual">
          <div className="shape circle circle-3"></div>
          <div className="fusion-image">🌙</div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">1.</div>
            <div className="step-text">
              <strong>You take a personality test, and we scan your hand too</strong>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2.</div>
            <div className="step-text">
              <strong>We perform an analysis on your answers</strong> based on factors we blended from widely researched data each collect relevant information regarding your personality.
            </div>
          </div>
          <div className="step">
            <div className="step-num">3.</div>
            <div className="step-text">
              <strong>You receive a detailed report</strong> combining MBTI, astrological insights, and palm reading predictions tailored to your unique profile.
            </div>
          </div>
        </div>
        <button className="cta-btn" onClick={() => navigate('/login')}>Get Started</button>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 PersonaPath. All rights reserved.</p>
      </footer>
    </div>
  );
}