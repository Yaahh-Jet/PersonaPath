const mongoose = require('mongoose');

const ReadingSchema = new mongoose.Schema({
  summary: { type: String },
  score: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  passwordHash: { type: String, required: true },
  profile: { type: mongoose.Schema.Types.Mixed },
  readingResults: [ReadingSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
