import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import resultsRoutes from './routes/results.js';
import palmRoutes from './routes/palm.js';
import readingRoutes from './routes/reading.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/palm', palmRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/reading', readingRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true, timestamp: new Date() }));

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/persona';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected to:', MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
