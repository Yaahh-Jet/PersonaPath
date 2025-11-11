import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth.js';

const router = express.Router();

// Define the UserResult schema/model
const userResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  mbti: String,
  horoscope: String,
  palmResult: {
    lineType: String,
    prediction: String
  },
  scores: {
    Introversion: Number,
    Intuition: Number,
    Thinking: Number,
    Judging: Number
  },
  dominantTraits: [String],
  analysisText: String,
  testType: String,
  version: Number,
  duration: Number,
  accuracyConfidence: Number
});

const UserResult = mongoose.models.UserResult || mongoose.model('UserResult', userResultSchema, 'user_results');

// GET /api/results - fetch all results for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    
    const results = await UserResult.find({ userId })
      .sort({ timestamp: -1 }) // newest first
      .lean();

    return res.json({ results });
  } catch (err) {
    console.error('Fetch results error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/results/:id - fetch single result by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const resultId = req.params.id;

    const result = await UserResult.findOne({ _id: resultId, userId }).lean();
    
    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    return res.json({ result });
  } catch (err) {
    console.error('Fetch result error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;