import express from 'express';
import multer from 'multer';
import auth from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// POST /api/palm/analyze
router.post('/analyze', auth, upload.any(), async (req, res) => {
  try {
    // Accept multiple possible field names from the client
    const file = (req.files || []).find(f =>
      ['image', 'file', 'palmImage', 'photo'].includes(f.fieldname)
    );

    if (!file) return res.status(400).json({ error: 'No image file received' });

    // TODO: call your real palm service here, e.g. const result = await analyze(file.buffer)
    // Temporary safe fallback so UI can proceed:
    const result = {
      lineType: 'Head Line',
      prediction: 'Analytical and pragmatic decision-making.',
      confidence: 0.87
    };

    return res.json({ ok: true, result });
  } catch (e) {
    console.error('Palm analyze error:', e);
    return res.status(500).json({ error: 'Palm analysis failed' });
  }
});

export default router;