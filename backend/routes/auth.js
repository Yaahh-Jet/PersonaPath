import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email and password are required' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedUsername = String(username).trim();

    const existing = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }]
    });

    if (existing) {
      return res.status(409).json({ error: 'User with that email or username already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashed
    });

    await user.save();

    return res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: 'emailOrUsername and password are required' });
    }

    const lookup = String(emailOrUsername).trim().toLowerCase();
    // try find by email or username (username stored as-is)
    const user = await User.findOne({
      $or: [{ email: lookup }, { username: String(emailOrUsername).trim() }]
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_this_in_production';
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });

    return res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
