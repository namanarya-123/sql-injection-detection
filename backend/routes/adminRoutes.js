import express from 'express';
import { getLogs, getAnalytics, blockIp } from '../controllers/adminController.js';
import { protect, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorizeAdmin);
router.get('/logs', getLogs);
router.get('/analytics', getAnalytics);
router.post('/block-ip', blockIp);

export default router;
