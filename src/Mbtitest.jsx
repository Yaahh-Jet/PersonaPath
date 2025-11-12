import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mbtitest.css';

const OPTIONS = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];

const MBTI_QUESTIONS = [
  "You enjoy vibrant social events with lots of people.",
  "You often spend time exploring unrealistic yet intriguing ideas.",
  "Your travel plans are usually well thought out.",
  "It is often difficult for you to relate to other people’s feelings.",
  "Your mood can change very quickly.",
  "You rarely worry about how your actions affect other people.",
  "You often contemplate the reasons for human existence.",
  "Logic is usually more important than heart when making important decisions.",
  "Your home and work environments are quite tidy.",
  "You do not mind being at the center of attention.",
  "Keeping your options open is more important than having a to-do list.",
  "You often think about what you should have said in a conversation long after it has taken place.",
  "If your friend is sad about something, you are more likely to offer emotional support than suggest ways to deal with the problem.",
  "People can rarely upset you.",
  "You often rely on other people to be the ones to start a conversation and keep it going.",
  "You rarely second-guess the choices that you have made.",
  "You become bored or lose interest when the discussion gets highly theoretical.",
  "You find it easy to empathize with a person whose experiences are very different from yours.",
  "You usually postpone finalizing decisions for as long as possible.",
  "You rarely feel insecure.",
  "You prefer to be alone rather than with a group of people.",
  "You often feel overwhelmed.",
  "You complete tasks efficiently without procrastinating.",
  "You enjoy participating in group activities.",
  "You like books and movies that make you come up with your own interpretation of the ending.",
  "Your happiness comes more from helping others accomplish things than your own accomplishments.",
  "You are interested in so many things that you find it difficult to choose what to try next.",
  "You are prone to worrying that things will take a turn for the worse.",
  "You avoid leadership roles in group settings.",
  "You are definitely not an artistic type of person.",
  "You think the world would be a better place if people relied more on rationality and less on their feelings.",
  "You prefer to do your chores before allowing yourself to relax.",
  "You enjoy watching people argue.",
  "You tend to avoid drawing attention to yourself.",
  "Your mood often fluctuates.",
  "You lose patience with people who are not as efficient as you.",
  "You often end up doing things at the last possible moment.",
  "You have always been fascinated by the question of what happens after death.",
  "You usually prefer to be around others rather than on your own.",
  "You become bored with routine.",
  "You are more of a detail-oriented than a big picture person.",
  "You are very affectionate with people you care about.",
  "You have a careful and methodical approach to life.",
  "You are prone to experiencing anxiety.",
  "You often feel as if you have to justify yourself to other people.",
  "Your personal work style is closer to spontaneous bursts of energy than organized and consistent efforts.",
  "You find it difficult to introduce yourself to other people.",
  "You often get so lost in thoughts that you ignore or forget your surroundings.",
  "You are usually highly motivated and energetic.",
  "Winning a debate matters less to you than making sure no one gets upset.",
  "You rarely get carried away by fantasies and ideas.",
  "You find yourself drawn to places with busy, bustling atmospheres.",
  "You are more likely to trust your experience than your imagination.",
  "You worry too much about what other people think.",
  "If the room is full, you stay closer to the walls, avoiding the center.",
  "You have a tendency to procrastinate.",
  "You feel more comfortable following a schedule than being spontaneous.",
  "You enjoy being spontaneous and flexible.",
  "You value tradition and established methods.",
  "You are comfortable making decisions quickly.",
  "You prefer to have detailed plans before starting a project."
];

export default function Mbtitest() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Instantly load hardcoded questions
    setQuestions(MBTI_QUESTIONS.map((text, idx) => ({ id: idx + 1, text })));
    setAnswers(Array(MBTI_QUESTIONS.length).fill(null));
  }, []);

  function handleSelect(optionValue) {
    const updated = [...answers];
    updated[current] = optionValue;
    setAnswers(updated);

    if (current < questions.length - 1) {
      setTimeout(() => setCurrent(current + 1), 180);
    } else {
      localStorage.setItem('mbtiAnswers', JSON.stringify(updated));
      navigate('/horoscope');
    }
  }

  function handleBack() {
    if (current > 0) setCurrent(current - 1);
  }

  if (!questions.length) {
    return <div className="mbtitest-root"><div className="loading-screen">Loading...</div></div>;
  }

  const q = questions[current];

  return (
    <div className="mbtitest-root">
      <div className="mbti-card">
        <div className="mbti-progress">
          Question {current + 1} / {questions.length}
          <div className="bar">
            <div className="fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        <h2 className="question-text">{q.text}</h2>
        <div className="options-row">
          {OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`option-btn${answers[current] === opt.value ? ' selected' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div style={{marginTop:24,display:'flex',justifyContent:'space-between'}}>
          <button className="option-btn" onClick={handleBack} disabled={current === 0}>← Back</button>
        </div>
      </div>
    </div>
  );
}