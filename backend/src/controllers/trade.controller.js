import { Trade, Order, Wallet, User } from '../models/index.js';
import { sequelize } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { cryptoService } from '../services/crypto.service.js';
import crypto from 'crypto';

const generateOrderId = () => {
  return 'TN' + Date.now() + crypto.randomBytes(4).toString('hex').toUpperCase();
};

// ==================== CREATE ORDER ====================
export const createOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { symbol, side, type, price, quantity, stopPrice } = req.body;
    const userId = req.userId;

    const wallet = await Wallet.findOne({ 
      where: { user_id: userId },
      transaction
    });

    if (!wallet) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'Wallet not found'
      });
    }

    let execPrice = parseFloat(price) || 0;
    if (type === 'MARKET') {
      try {
        execPrice = await cryptoService.getMarketPrice(symbol);
      } catch (err) {
        execPrice = parseFloat(price) || 50000;
      }
    }

    const total = execPrice * parseFloat(quantity);

    if (side === 'BUY' && parseFloat(wallet.balance) < total) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance',
        availableBalance: wallet.balance,
        requiredAmount: total
      });
    }

    const order = await Order.create({
      userId,
      orderId: generateOrderId(),
      symbol,
      side,
      type,
      price: execPrice,
      quantity,
      total,
      stopPrice: stopPrice || null,
      status: type === 'MARKET' ? 'FILLED' : 'PENDING',
      executedAt: type === 'MARKET' ? new Date() : null
    }, { transaction });

    if (type === 'MARKET') {
      await Wallet.decrement(
        { balance: total },
        { where: { id: wallet.id }, transaction }
      );

      await Trade.create({
        userId,
        symbol,
        type: side,
        orderType: 'MARKET',
        price: execPrice,
        quantity,
        total,
        fee: total * 0.001,
        status: 'FILLED',
        executedAt: new Date()
      }, { transaction });
    }

    await transaction.commit();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });

  } catch (error) {
    await transaction.rollback();
    logger.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
};

// ==================== GET ORDERS ====================
export const getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const { status, symbol, limit = 50, offset = 0 } = req.query;

    const where = { user_id: userId };
    if (status) where.status = status;
    if (symbol) where.symbol = symbol;

    const orders = await Order.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: orders.rows,
      pagination: {
        total: orders.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    logger.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    });
  }
};

// ==================== GET ORDER BY ID ====================
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const order = await Order.findOne({
      where: { id, user_id: userId }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    logger.error('Get order by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    });
  }
};

// ==================== CANCEL ORDER ⭐ ====================
export const cancelOrder = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { id } = req.params;
    const userId = req.userId;

    const order = await Order.findOne({
      where: { id, user_id: userId },
      transaction
    });

    if (!order) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.status === 'FILLED') {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel filled order'
      });
    }

    if (order.status === 'CANCELLED') {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Order already cancelled'
      });
    }

    await order.update({
      status: 'CANCELLED',
      cancelledAt: new Date()
    }, { transaction });

    if (order.type !== 'MARKET' && order.side === 'BUY') {
      const wallet = await Wallet.findOne({
        where: { user_id: userId },
        transaction
      });

      if (wallet) {
        await Wallet.increment(
          { balance: order.total },
          { where: { id: wallet.id }, transaction }
        );
      }
    }

    await transaction.commit();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });

  } catch (error) {
    await transaction.rollback();
    logger.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order',
      error: error.message
    });
  }
};

// ==================== GET TRADE HISTORY ====================
export const getTradeHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { symbol, limit = 50, offset = 0, startDate, endDate } = req.query;

    const where = { user_id: userId };
    if (symbol) where.symbol = symbol;
    if (startDate && endDate) {
      where.created_at = {
        [sequelize.Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const trades = await Trade.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: trades.rows,
      pagination: {
        total: trades.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    logger.error('Get trade history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trade history',
      error: error.message
    });
  }
};

// ==================== GET OPEN POSITIONS ====================
export const getOpenPositions = async (req, res) => {
  try {
    const userId = req.userId;

    const positions = await Order.findAll({
      where: {
        user_id: userId,
        status: ['PENDING', 'PARTIALLY_FILLED']
      },
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: positions,
      count: positions.length
    });
  } catch (error) {
    logger.error('Get open positions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch open positions',
      error: error.message
    });
  }
};

// Default export (optional, for safety)
export default {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  getTradeHistory,
  getOpenPositions
};