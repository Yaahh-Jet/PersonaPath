import mongoose from 'mongoose';

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
  testType: { type: String, default: 'full' },
  version: { type: Number, default: 2 },
  duration: Number,
  accuracyConfidence: Number
});

export default mongoose.model('UserResult', userResultSchema, 'user_results');