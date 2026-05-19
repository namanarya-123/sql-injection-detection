import express from 'express';
import { scanQuery, getHistory } from '../controllers/scanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/query', protect, scanQuery);
router.get('/history', protect, getHistory);

export default router;
