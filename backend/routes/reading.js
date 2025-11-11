const express = require('express');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// POST /api/reading/submit
// Accepts { answers: [...] }
// If authenticated, attaches to user; otherwise returns result but doesn't persist
router.post('/submit', authOptional, async (req, res) => {
  try {
    const { answers } = req.body;
    if (!Array.isArray(answers)) return res.status(400).json({ error: 'answers must be an array' });

    // Very simple demo algorithm for reading
    const score = Math.max(0, Math.min(100, Math.floor(answers.length ? (answers.length * 7.3) % 101 : Math.random() * 100)));
    const summary = `Demo reading based on ${answers.length} answers.`;
    const reading = { id: uuidv4(), summary, score, createdAt: new Date() };

    if (req.user && req.user.id) {
      // attach to user
      const user = await User.findById(req.user.id);
      if (user) {
        user.readingResults = user.readingResults || [];
        user.readingResults.push(reading);
        await user.save();
      }
    }

    res.json({ reading });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/reading/:id
router.get('/:id', authOptional, async (req, res) => {
  try {
    const id = req.params.id;
    if (req.user && req.user.id) {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      const found = (user.readingResults || []).find((r) => r.id === id);
      if (!found) return res.status(404).json({ error: 'Reading not found' });
      return res.json({ reading: found });
    }
    return res.status(401).json({ error: 'Authentication required to fetch saved reading' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Helper middleware: try to read token, but don't fail if missing
function authOptional(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next();
  if (!authHeader.startsWith('Bearer ')) return next();
  const token = authHeader.split(' ')[1];
  try {
    const jwt = require('jsonwebtoken');
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_jwt_secret');
    req.user = payload;
  } catch (err) {
    // ignore invalid token, continue as anonymous
  }
  return next();
}

module.exports = router;
