import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './FinalResults.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001';

const MBTI_DETAILS = {
  I: { letter: 'I', full: 'Introversion', desc: 'Energized by quiet time and deep reflection' },
  E: { letter: 'E', full: 'Extraversion', desc: 'Energized by social interaction and external stimulation' },
  S: { letter: 'S', full: 'Sensing', desc: 'Focus on concrete facts and present realities' },
  N: { letter: 'N', full: 'Intuition', desc: 'Focus on patterns, possibilities, and future potential' },
  T: { letter: 'T', full: 'Thinking', desc: 'Make decisions based on logic and objective analysis' },
  F: { letter: 'F', full: 'Feeling', desc: 'Make decisions based on values and emotional impact' },
  J: { letter: 'J', full: 'Judging', desc: 'Prefer structure, planning, and closure' },
  P: { letter: 'P', full: 'Perceiving', desc: 'Prefer flexibility, spontaneity, and open options' }
};

const MBTI_CAREERS = {
  INTJ: ['Architect', 'Software Developer', 'Scientist', 'Strategic Planner', 'Engineer'],
  INTP: ['Data Analyst', 'Programmer', 'Mathematician', 'Researcher', 'Philosopher'],
  ENTJ: ['Executive', 'Entrepreneur', 'Lawyer', 'Business Consultant', 'Manager'],
  ENTP: ['Inventor', 'Marketing Strategist', 'Consultant', 'Engineer', 'Journalist'],
  INFJ: ['Counselor', 'Psychologist', 'Writer', 'Teacher', 'Social Worker'],
  INFP: ['Writer', 'Artist', 'Therapist', 'Designer', 'Non-profit Worker'],
  ENFJ: ['Teacher', 'HR Manager', 'Public Relations', 'Life Coach', 'Event Coordinator'],
  ENFP: ['Creative Director', 'Journalist', 'Motivational Speaker', 'Counselor', 'Designer'],
  ISTJ: ['Accountant', 'Auditor', 'Military Officer', 'Data Analyst', 'Administrator'],
  ISFJ: ['Nurse', 'Teacher', 'Administrator', 'Social Worker', 'Interior Designer'],
  ESTJ: ['Manager', 'Judge', 'Police Officer', 'Business Executive', 'Financial Officer'],
  ESFJ: ['Event Planner', 'HR Professional', 'Teacher', 'Healthcare Administrator', 'Sales'],
  ISTP: ['Mechanic', 'Engineer', 'Pilot', 'Forensic Analyst', 'Carpenter'],
  ISFP: ['Artist', 'Designer', 'Chef', 'Veterinarian', 'Musician'],
  ESTP: ['Entrepreneur', 'Sales', 'Paramedic', 'Marketing', 'Athletic Coach'],
  ESFP: ['Performer', 'Event Planner', 'Travel Agent', 'Social Media Manager', 'Chef']
};

const MBTI_LOVE = {
  INTJ: 'Values intellectual connection and loyalty. Seeks a partner who respects independence.',
  INTP: 'Appreciates mental stimulation and deep conversations. Needs space for reflection.',
  ENTJ: 'Looks for ambition and competence. Values direct communication and shared goals.',
  ENTP: 'Enjoys playful debates and intellectual challenges. Needs variety and spontaneity.',
  INFJ: 'Seeks deep emotional connection and authenticity. Values empathy and meaningful conversation.',
  INFP: 'Romantic and idealistic. Needs emotional depth and creative expression.',
  ENFJ: 'Warm and supportive. Seeks harmony and emotional intimacy in relationships.',
  ENFP: 'Enthusiastic and affectionate. Values authenticity and emotional connection.',
  ISTJ: 'Reliable and committed. Values tradition, stability, and practical support.',
  ISFJ: 'Nurturing and devoted. Shows love through acts of service and loyalty.',
  ESTJ: 'Direct and dependable. Values honesty, structure, and shared responsibilities.',
  ESFJ: 'Caring and supportive. Expresses love through attentiveness and social connection.',
  ISTP: 'Independent and practical. Shows affection through actions rather than words.',
  ISFP: 'Gentle and caring. Expresses love through creativity and quality time.',
  ESTP: 'Spontaneous and fun-loving. Values excitement and living in the moment.',
  ESFP: 'Warm and entertaining. Shows love through enthusiasm and shared experiences.'
};

export default function FinalResults() {
  const navigate = useNavigate();
  const [mbtiType, setMbtiType] = useState('');
  const [horoscope, setHoroscope] = useState(null);
  const [palmResult, setPalmResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const hasSaved = useRef(false); // Track if already saved

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      // Load from localStorage
      const answers = localStorage.getItem('mbtiAnswers');
      const horo = localStorage.getItem('horoscope');
      const palm = localStorage.getItem('palmResult');

      if (horo) setHoroscope(JSON.parse(horo));
      if (palm) setPalmResult(JSON.parse(palm));

      // Calculate MBTI type from answers
      if (answers) {
        const parsedAnswers = JSON.parse(answers);
        const type = calculateMBTI(parsedAnswers);
        setMbtiType(type);
        
        // Save to backend only once
        if (!hasSaved.current) {
          hasSaved.current = true;
          await saveResults(type, horo ? JSON.parse(horo) : null, palm ? JSON.parse(palm) : null);
        }
      }
    } catch (e) {
      console.error('Error loading results:', e);
    }
  };

  const calculateMBTI = (answers) => {
    // Simplified calculation - adjust based on your question mapping
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    answers.forEach((answer, idx) => {
      if (!answer) return;
      
      // Map questions to dimensions (every 15 questions per dimension)
      const dimension = Math.floor(idx / 15);
      const value = answer - 3; // Convert 1-5 to -2 to 2
      
      if (dimension === 0) { // E/I
        if (value > 0) scores.E += value;
        else scores.I += Math.abs(value);
      } else if (dimension === 1) { // S/N
        if (value > 0) scores.N += value;
        else scores.S += Math.abs(value);
      } else if (dimension === 2) { // T/F
        if (value > 0) scores.T += value;
        else scores.F += Math.abs(value);
      } else if (dimension === 3) { // J/P
        if (value > 0) scores.J += value;
        else scores.P += Math.abs(value);
      }
    });

    const type = 
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.S > scores.N ? 'S' : 'N') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P');

    return type;
  };

  const saveResults = async (type, horo, palm) => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      const res = await fetch(`${API_BASE}/api/results/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({
          mbtiType: type,
          horoscope: horo,
          palmReading: palm,
          timestamp: new Date().toISOString()
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSaved(data.saved !== false); // true if saved to account, false if guest
        console.log('Results saved:', data);
      } else {
        const err = await res.json().catch(() => ({}));
        console.error('Save failed:', err);
        // Don't block UI if save fails
      }
    } catch (e) {
      console.error('Error saving results:', e);
      // Don't block UI if save fails
    } finally {
      setSaving(false);
    }
  };

  const letters = mbtiType.split('');

  return (
    <div className="final-results-root">
      <div className="final-results-container">
        <header className="results-hero">
          <button onClick={() => navigate('/landing_test')} className="back-link">← Dashboard</button>
          <h1 className="results-title">Your Complete Personality Profile</h1>
          {saved && <span className="saved-badge">✓ Saved</span>}
        </header>

        {/* MBTI Type Display */}
        {mbtiType && (
          <section className="mbti-section">
            <div className="mbti-type-card">
              <h2>Your MBTI Type</h2>
              <div className="type-display">{mbtiType}</div>
              <div className="type-breakdown">
                {letters.map((letter, idx) => (
                  <div key={idx} className="letter-card">
                    <div className="letter-badge">{letter}</div>
                    <div className="letter-name">{MBTI_DETAILS[letter].full}</div>
                    <div className="letter-desc">{MBTI_DETAILS[letter].desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Career Recommendations */}
        {mbtiType && MBTI_CAREERS[mbtiType] && (
          <section className="insight-section">
            <h2>Ideal Career Paths</h2>
            <div className="career-grid">
              {MBTI_CAREERS[mbtiType].map((career, idx) => (
                <div key={idx} className="career-card">{career}</div>
              ))}
            </div>
          </section>
        )}

        {/* Love & Relationships */}
        {mbtiType && MBTI_LOVE[mbtiType] && (
          <section className="insight-section">
            <h2>Love & Relationships</h2>
            <div className="love-card">
              <p>{MBTI_LOVE[mbtiType]}</p>
            </div>
          </section>
        )}

        {/* Horoscope */}
        {horoscope && (
          <section className="insight-section">
            <h2>Astrological Profile</h2>
            <div className="horoscope-card">
              <div className="horo-header">
                <span className="zodiac-icon">✨</span>
                <span className="zodiac-sign">{horoscope.sign}</span>
                <span className="birth-date">{new Date(horoscope.dob).toLocaleDateString()}</span>
              </div>
              <p className="horo-desc">{horoscope.description}</p>
            </div>
          </section>
        )}

        {/* Palm Reading */}
        {palmResult && !palmResult.skipped && (
          <section className="insight-section">
            <h2>Palm Reading Insights</h2>
            <div className="palm-card">
              <p className="palm-line">{palmResult.lineType || 'Life Line Analysis'}</p>
              <p className="palm-prediction">{palmResult.prediction || palmResult.message || 'Your palm reveals a balanced and thoughtful approach to life.'}</p>
            </div>
          </section>
        )}

        {/* Integrated Analysis */}
        {mbtiType && horoscope && (
          <section className="insight-section integrated">
            <h2>Your Unique Blend</h2>
            <div className="integrated-card">
              <p>
                As an <strong>{mbtiType}</strong> {horoscope.sign}, you combine {MBTI_DETAILS[letters[0]].desc.toLowerCase()} with the {horoscope.sign} traits of {horoscope.description.toLowerCase()}
              </p>
              <p>
                This unique combination suggests you're someone who balances logical thinking with intuitive insights, making you well-suited for roles that require both analytical skills and creative problem-solving.
              </p>
            </div>
          </section>
        )}

        <div className="actions-footer">
          <button onClick={() => navigate('/newtest')} className="btn-retake">Take Another Test</button>
          <button onClick={() => navigate('/oldresults')} className="btn-history">View History</button>
        </div>
      </div>
    </div>
  );
}