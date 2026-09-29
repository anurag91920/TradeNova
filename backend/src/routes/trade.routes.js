import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  getTradeHistory,
  getOpenPositions
} from '../controllers/trade.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';
import { validate, schemas } from '../middleware/validation.middleware.js';
import { tradeLimiter } from '../middleware/rateLimiter.js';
import { Trade } from '../models/index.js';

const router = express.Router();

router.use(authenticate);

router.post('/order', tradeLimiter, validate(schemas.trade), createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.delete('/orders/:id', cancelOrder);
router.get('/history', getTradeHistory);
router.get('/positions', getOpenPositions);

// Admin route
router.get('/admin/all', authorize('admin', 'superadmin'), async (req, res) => {
  try {
    const trades = await Trade.findAll({
      include: ['user'],
      order: [['createdAt', 'DESC']],
      limit: 100
    });
    res.json({ success: true, data: trades });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;