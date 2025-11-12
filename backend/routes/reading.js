import express from 'express';
import jwt from 'jsonwebtoken';
import auth from '../middleware/auth.js';
import { JWT_SECRET } from '../config/jwt.js';

const router = express.Router();

// Optional auth: attach user if a valid token is present; otherwise ignore
function authOptional(req, _res, next) {
  const hdr = req.headers.authorization || '';
  if (hdr.startsWith('Bearer ')) {
    try {
      const decoded = jwt.verify(hdr.slice(7), JWT_SECRET);
      req.user = { userId: decoded.userId };
    } catch {
      // ignore invalid token
    }
  }
  next();
}

router.post('/submit', authOptional, async (req, res) => {
  try {
    const { answers } = req.body || {};
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: 'answers must be an array' });
    }
    // Simple demo response (no uuid)
    const score = Math.round(((answers.length || 1) * 73) % 101);
    return res.json({
      reading: { score, createdAt: new Date().toISOString() }
    });
  } catch (err) {
    console.error('reading/submit error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/horoscope', auth, (req, res) => {
  const { dob } = req.body || {};
  if (!dob) return res.status(400).json({ error: 'dob required' });
  const sign = getZodiac(dob);
  return res.json({ sign, description: build(sign) });
});

function getZodiac(dob) {
  const d = new Date(`${dob}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return 'Unknown';
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

function build(sign) {
  const map = {
    Aries:'Bold energy', Taurus:'Steady persistence', Gemini:'Adaptive mind', Cancer:'Emotional depth',
    Leo:'Radiant presence', Virgo:'Analytical service', Libra:'Balanced diplomacy', Scorpio:'Intense focus',
    Sagittarius:'Expansive vision', Capricorn:'Structured ambition', Aquarius:'Innovative outlook', Pisces:'Dreamy empathy'
  };
  return map[sign] || 'Unique pattern';
}

export default router;
