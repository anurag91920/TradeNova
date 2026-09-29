import express from 'express';
import {
  getDashboardStats,
  getTradingVolume,
  getTopPerformingAssets
} from '../controllers/analytics.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/dashboard', getDashboardStats);
router.get('/volume', getTradingVolume);
router.get('/top-assets', getTopPerformingAssets);

export default router;