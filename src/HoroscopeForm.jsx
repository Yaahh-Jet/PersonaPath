import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HoroscopeForm.css';

export default function HoroscopeForm() {
  const navigate = useNavigate();
  const [dob, setDob] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  function getZodiac(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const m = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return 'Aquarius';
    if ((m === 2 && day >= 19) || (m === 3 && day <= 20)) return 'Pisces';
    if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return 'Aries';
    if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return 'Taurus';
    if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return 'Gemini';
    if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return 'Cancer';
    if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return 'Leo';
    if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return 'Virgo';
    if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return 'Libra';
    if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return 'Scorpio';
    if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return 'Sagittarius';
    return 'Capricorn';
  }
  function desc(sign) {
    const map = { Aries:'Bold energy and initiative.', Taurus:'Steady persistence and comfort seeking.', Gemini:'Curious and communicative.', Cancer:'Intuitive and caring.', Leo:'Expressive leadership.', Virgo:'Analytical and helpful.', Libra:'Balanced and diplomatic.', Scorpio:'Intense and transformative.', Sagittarius:'Optimistic explorer.', Capricorn:'Disciplined and pragmatic.', Aquarius:'Innovative humanitarian.', Pisces:'Imaginative and empathetic.' };
    return map[sign] || '';
  }
  function onSubmit(e) {
    e.preventDefault();
    setError('');
    if (!dob) return setError('Date of birth required');
    const sign = getZodiac(dob);
    localStorage.setItem('horoscope', JSON.stringify({ dob, time: time || null, location: location || null, sign, description: desc(sign) }));
    navigate('/palm'); // Next step
  }

  return (
    <div className="horoscope-form-root">
      <form className="horoscope-form" onSubmit={onSubmit}>
        <h1>Birth Details</h1>
        <label> Date of Birth <input type="date" value={dob} onChange={e=>setDob(e.target.value)} required /></label>
        <label> Birth Time (optional) <input type="time" value={time} onChange={e=>setTime(e.target.value)} /></label>
        <label> Birth Location (optional) <input type="text" placeholder="City, Country" value={location} onChange={e=>setLocation(e.target.value)} /></label>
        {error && <div className="form-error">{error}</div>}
        <div className="form-actions"><button type="submit">Continue</button></div>
      </form>
    </div>
  );
}