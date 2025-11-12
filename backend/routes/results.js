import express from 'express';
import mongoose from 'mongoose';
import auth from '../middleware/auth.js';
import UserResult from '../models/UserResult.js';

const router = express.Router();

// GET /api/results - Get all user results
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching results for userId:', req.userId);
    
    const results = await UserResult.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean(); // Use lean() for better performance
    
    console.log('Found results:', results.length);
    
    res.json({ results });
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({ error: 'Failed to fetch results', details: error.message });
  }
});

// POST /api/results/save - Save new test result
router.post('/save', async (req, res) => {
  try {
    const { mbtiType, horoscope, palmReading, timestamp } = req.body;
    
    // Try to get userId from auth header if present
    const token = req.headers.authorization?.replace('Bearer ', '');
    let userId = null;

    if (token) {
      try {
        const jwt = await import('jsonwebtoken');
        const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        userId = new mongoose.Types.ObjectId(decoded.userId);
        console.log('Saving result for userId:', userId);
      } catch (e) {
        console.error('Token verification failed:', e.message);
      }
    }

    if (!userId) {
      return res.json({ message: 'Results recorded (guest mode)', saved: false });
    }

    // Calculate scores and traits from mbtiType
    const scores = calculateScores(mbtiType);
    const dominantTraits = calculateTraits(mbtiType);

    const result = new UserResult({
      userId,
      timestamp: timestamp || new Date(),
      mbti: mbtiType,
      horoscope: horoscope?.sign || 'Unknown',
      palmResult: {
        lineType: palmReading?.lineType || 'Not analyzed',
        prediction: palmReading?.prediction || 'Not available'
      },
      scores,
      dominantTraits,
      analysisText: generateAnalysis(mbtiType),
      testType: 'full',
      version: 2,
      duration: null,
      accuracyConfidence: 0.85
    });

    await result.save();
    console.log('Result saved successfully');
    res.json({ message: 'Results saved successfully', result, saved: true });
  } catch (error) {
    console.error('Save results error:', error);
    res.status(500).json({ error: 'Failed to save results', details: error.message });
  }
});

// Helper functions
function calculateScores(mbtiType) {
  const scores = {};
  const letters = mbtiType.split('');
  
  const dimensions = {
    'E': 'Extraversion', 'I': 'Introversion',
    'S': 'Sensing', 'N': 'Intuition',
    'T': 'Thinking', 'F': 'Feeling',
    'J': 'Judging', 'P': 'Perceiving'
  };
  
  letters.forEach(letter => {
    const dimension = dimensions[letter];
    if (dimension) {
      scores[dimension] = Math.floor(Math.random() * 20) + 70;
    }
  });
  
  return scores;
}

function calculateTraits(mbtiType) {
  const traitMap = {
    'INTJ': ['Strategic', 'Independent', 'Focused'],
    'INTP': ['Analytical', 'Curious', 'Logical'],
    'ENTJ': ['Leadership', 'Decisive', 'Ambitious'],
    'ENTP': ['Innovative', 'Adaptable', 'Debater'],
    'INFJ': ['Insightful', 'Empathetic', 'Idealistic'],
    'INFP': ['Creative', 'Compassionate', 'Authentic'],
    'ENFJ': ['Charismatic', 'Supportive', 'Organized'],
    'ENFP': ['Enthusiastic', 'Imaginative', 'Social'],
    'ISTJ': ['Reliable', 'Practical', 'Detail-oriented'],
    'ISFJ': ['Caring', 'Responsible', 'Loyal'],
    'ESTJ': ['Efficient', 'Direct', 'Organized'],
    'ESFJ': ['Warm', 'Cooperative', 'Helpful'],
    'ISTP': ['Practical', 'Independent', 'Observant'],
    'ISFP': ['Artistic', 'Gentle', 'Flexible'],
    'ESTP': ['Energetic', 'Bold', 'Pragmatic'],
    'ESFP': ['Spontaneous', 'Friendly', 'Entertaining']
  };
  
  return traitMap[mbtiType] || ['Unique', 'Complex', 'Individualistic'];
}

function generateAnalysis(mbtiType) {
  const analysisMap = {
    'INTJ': 'You are a deep thinker who values logic and structure. Often visionary, with a plan for everything.',
    'INTP': 'You love exploring ideas and theories. Your analytical mind thrives on solving complex problems.',
    'ENTJ': 'Natural leader with strategic thinking. You excel at organizing people and resources toward goals.',
    'ENTP': 'Quick-witted innovator who enjoys intellectual challenges and debate.',
    'INFJ': 'Deeply insightful and compassionate. You seek meaning and connection in everything you do.',
    'INFP': 'Guided by ideals and values. Your creativity and empathy make you a natural healer.',
    'ENFJ': 'Charismatic and inspiring. You naturally bring out the best in others.',
    'ENFP': 'Enthusiastic and creative. You see possibilities everywhere and inspire others with your energy.',
    'ISTJ': 'Dependable and organized. You value tradition and take your responsibilities seriously.',
    'ISFJ': 'Warm and conscientious. You take care of others with dedication and loyalty.',
    'ESTJ': 'Practical and efficient. You excel at managing projects and bringing order to chaos.',
    'ESFJ': 'Sociable and caring. You create harmony and help others feel welcome.',
    'ISTP': 'Cool and practical. You excel at understanding how things work.',
    'ISFP': 'Artistic and sensitive. You appreciate beauty and live authentically.',
    'ESTP': 'Bold and energetic. You live in the moment and thrive on action.',
    'ESFP': 'Outgoing and spontaneous. You bring joy and excitement wherever you go.'
  };
  
  return analysisMap[mbtiType] || 'You have a unique personality that combines multiple fascinating traits.';
}

export default router;