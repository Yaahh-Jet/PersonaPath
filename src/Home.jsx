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
          <a href="#features">Features</a>
          <button onClick={() => navigate('/login')} className="nav-link-btn">Log In</button>
          <button onClick={() => navigate('/signup')} className="nav-link-btn primary">Sign up</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Discover Your True Self Through Science and Ancient Wisdom</h1>
          <p className="hero-tagline">
            Unlock the deepest insights about your personality, potential, and life path with our comprehensive analysis.
          </p>
          <p className="hero-description">
            PersonaPath combines cutting-edge psychological assessments with time-honored astrological wisdom and palmistry to create a complete picture of who you are. Our free, personalized analysis helps you understand your strengths, navigate your relationships, and make confident career decisions.
          </p>
          <button className="hero-cta" onClick={() => navigate('/signup')}>
            Start Your Journey Free
          </button>
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
          <h2>The Perfect Fusion of Science, Spirit, and Tradition</h2>
          <p className="fusion-intro">
            Why choose between science and intuition when you can have both?
          </p>
          <p className="fusion-detail">
            Our revolutionary approach combines the scientifically validated MBTI personality framework with ancient astrological insights and the mystical art of palm reading. Each method reveals different facets of your personality—when combined, they create an incredibly accurate and comprehensive portrait of who you truly are.
          </p>
          <div className="fusion-stats">
            <div className="stat">
              <div className="stat-number">3</div>
              <div className="stat-label">Analysis Methods</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Free Forever</div>
            </div>
            <div className="stat">
              <div className="stat-number">∞</div>
              <div className="stat-label">Personal Growth</div>
            </div>
          </div>
        </div>
        <div className="fusion-visual">
          <div className="shape circle circle-3"></div>
          <div className="fusion-image">🌙</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2>What Makes PersonaPath Different</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>MBTI Personality Test</h3>
            <p>
              Take our comprehensive 60-question assessment based on the Myers-Briggs Type Indicator. 
              Discover your unique four-letter personality type and understand how you perceive the world, 
              make decisions, and interact with others.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>Astrological Insights</h3>
            <p>
              Your birth date holds cosmic secrets about your natural tendencies and life path. 
              We analyze your zodiac sign to reveal how celestial influences shape your personality, 
              relationships, and destiny.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🖐️</div>
            <h3>Palm Reading Analysis</h3>
            <p>
              Upload a photo of your palm and let our AI-powered system analyze your life lines, 
              heart lines, and more. Palmistry reveals insights about your emotional nature, 
              intellect, and life journey that complement your personality profile.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Career Guidance</h3>
            <p>
              Discover careers that align with your natural strengths and preferences. 
              We provide personalized career recommendations based on your personality type, 
              helping you find work that truly fulfills you.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💕</div>
            <h3>Relationship Insights</h3>
            <p>
              Understand how you love, what you need in relationships, and what partners 
              complement your personality. Learn to communicate better and build deeper connections.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Your Growth</h3>
            <p>
              Save your results and track how you evolve over time. Take tests periodically 
              to see how life experiences shape your personality and self-awareness.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how">
        <h2>Your Journey to Self-Discovery</h2>
        <p className="how-subtitle">
          Three simple steps to unlock profound insights about yourself
        </p>
        <div className="steps">
          <div className="step">
            <div className="step-num">1.</div>
            <div className="step-content">
              <h3>Take Our Comprehensive Assessment</h3>
              <p className="step-description">
                Begin with our 60-question MBTI personality test designed to reveal your core preferences 
                and tendencies. Then, enter your birth details for astrological analysis. Finally, 
                upload a clear photo of your palm for our AI-powered palmistry reading.
              </p>
              <div className="step-time">⏱️ Takes 15-20 minutes</div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">2.</div>
            <div className="step-content">
              <h3>We Analyze Your Unique Profile</h3>
              <p className="step-description">
                Our advanced algorithms process your responses using extensively researched psychological 
                frameworks. Simultaneously, we analyze your astrological chart and palm patterns. 
                Each system provides unique insights—together they create a holistic understanding 
                of your personality, strengths, challenges, and potential.
              </p>
              <div className="step-time">⚡ Instant results</div>
            </div>
          </div>
          <div className="step">
            <div className="step-num">3.</div>
            <div className="step-content">
              <h3>Receive Your Personalized Blueprint</h3>
              <p className="step-description">
                Get a detailed, beautifully designed report that combines all three analysis methods. 
                Discover your MBTI type with in-depth explanations, astrological insights about your 
                cosmic influences, palm reading revelations, plus personalized career recommendations 
                and relationship guidance. Your results are saved for future reference and growth tracking.
              </p>
              <div className="step-time">📱 Access anytime, anywhere</div>
            </div>
          </div>
        </div>
        <div className="cta-section">
          <h3>Ready to Begin?</h3>
          <p>Join thousands who've discovered their true potential</p>
          <button className="cta-btn" onClick={() => navigate('/signup')}>
            Get Started Free
          </button>
          <p className="cta-note">No credit card required • Takes 15 minutes • 100% Free</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">PersonaPath</div>
            <p>Discover your true self through science and wisdom</p>
          </div>
          <div className="footer-links">
            <a href="#how">How It Works</a>
            <a href="#features">Features</a>
            <a onClick={() => navigate('/login')}>Login</a>
            <a onClick={() => navigate('/signup')}>Sign Up</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PersonaPath. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}