import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMBTIQuestions, calculateMBTI } from './services/mbtiService.js';
import './Mbtitest.css';

export default function Mbtitest() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    try {
      const data = await fetchMBTIQuestions();
      setQuestions(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load questions:', err);
      setError('Failed to load test questions');
      setLoading(false);
    }
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleAnswer = (answerValue) => {
    // answerValue: -2 (strongly disagree) to +2 (strongly agree)
    const newResponse = {
      questionId: currentQuestion.id,
      dimension: currentQuestion.dimension,
      direction: currentQuestion.direction,
      answer: answerValue
    };

    const updatedResponses = [...responses];
    const existingIndex = responses.findIndex(r => r.questionId === currentQuestion.id);
    
    if (existingIndex >= 0) {
      updatedResponses[existingIndex] = newResponse;
    } else {
      updatedResponses.push(newResponse);
    }

    setResponses(updatedResponses);

    // Auto-advance to next question
    if (currentQuestionIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    } else {
      // Test complete
      handleFinish(updatedResponses);
    }
  };

  const handleFinish = (finalResponses) => {
    const result = calculateMBTI(finalResponses);
    console.log('MBTI Result:', result);
    
    // Store result in localStorage
    localStorage.setItem('mbtiResult', JSON.stringify(result));
    
    // Navigate to results page
    navigate('/mbti-results');
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      navigate('/landing_test');
    }
  };

  // Get current response if exists
  const currentResponse = responses.find(r => r.questionId === currentQuestion?.id);
  const selectedAnswer = currentResponse?.answer;

  if (loading) {
    return (
      <div className="mbtitest-root">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading test questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mbtitest-root">
        <div className="error-screen">
          <p>{error}</p>
          <button onClick={() => navigate('/landing_test')}>Back to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mbtitest-root">
      <header className="mbtitest-header">
        <div className="mbtitest-logo">LOGO</div>
        <div className="progress-info">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <button className="exit-btn" onClick={handleExit}>
          Exit Test
        </button>
      </header>

      <main className="mbtitest-content">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        <div className="question-card">
          <h2 className="question-text">
            {currentQuestion?.text}
          </h2>

          <div className="answer-options">
            <button 
              className={`answer-btn ${selectedAnswer === -2 ? 'selected' : ''}`}
              onClick={() => handleAnswer(-2)}
            >
              <span className="answer-label">Strongly Disagree</span>
            </button>
            <button 
              className={`answer-btn ${selectedAnswer === -1 ? 'selected' : ''}`}
              onClick={() => handleAnswer(-1)}
            >
              <span className="answer-label">Disagree</span>
            </button>
            <button 
              className={`answer-btn ${selectedAnswer === 0 ? 'selected' : ''}`}
              onClick={() => handleAnswer(0)}
            >
              <span className="answer-label">Neutral</span>
            </button>
            <button 
              className={`answer-btn ${selectedAnswer === 1 ? 'selected' : ''}`}
              onClick={() => handleAnswer(1)}
            >
              <span className="answer-label">Agree</span>
            </button>
            <button 
              className={`answer-btn ${selectedAnswer === 2 ? 'selected' : ''}`}
              onClick={() => handleAnswer(2)}
            >
              <span className="answer-label">Strongly Agree</span>
            </button>
          </div>
        </div>

        <div className="navigation-buttons">
          <button 
            className="nav-btn" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button 
            className="nav-btn nav-btn--primary"
            onClick={handleNext}
            disabled={currentQuestionIndex === totalQuestions - 1 || !selectedAnswer}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </main>
    </div>
  );
}