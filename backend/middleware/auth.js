import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export default function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Convert string to ObjectId for MongoDB queries
    req.userId = new mongoose.Types.ObjectId(decoded.userId);
    
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
