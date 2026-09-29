import express from 'express';
import {
  getSettings,
  updateProfile,
  updatePassword,
  toggleTwoFactor
} from '../controllers/settings.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getSettings);
router.put('/profile', updateProfile);
router.put('/password', updatePassword);
router.put('/two-factor', toggleTwoFactor);

export default router;