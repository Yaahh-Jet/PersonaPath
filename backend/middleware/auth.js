import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  try {
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const secret = process.env.JWT_SECRET || 'dev_jwt_secret_change_this_in_production';
    const decoded = jwt.verify(token, secret);
    
    console.log('Decoded user:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
}
