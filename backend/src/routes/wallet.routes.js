import express from 'express';
import {
  getWallet,
  deposit,
  withdraw,
  getTransactionHistory
} from '../controllers/wallet.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getWallet);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.get('/transactions', getTransactionHistory);

export default router;