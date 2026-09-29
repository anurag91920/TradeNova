import { Trade, Order, Wallet } from '../models/index.js';
import { sequelize } from '../config/database.js';
import { logger } from '../utils/logger.js';

// ==================== DASHBOARD STATS ====================
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.userId;

    const totalTrades = await Trade.count({
      where: { user_id: userId }
    });

    const profitResult = await Trade.sum('total', {
      where: { 
        user_id: userId,
        status: 'FILLED'
      }
    });

    const winningTrades = await Trade.count({
      where: { 
        user_id: userId,
        status: 'FILLED',
        type: 'SELL'
      }
    });

    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

    const activeOrders = await Order.count({
      where: { 
        user_id: userId,
        status: ['PENDING', 'PARTIALLY_FILLED']
      }
    });

    const wallet = await Wallet.findOne({
      where: { user_id: userId }
    });

    const recentTrades = await Trade.findAll({
      where: { user_id: userId },
      limit: 10,
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        summary: {
          totalTrades,
          totalProfit: parseFloat(profitResult) || 0,
          winRate: parseFloat(winRate.toFixed(2)),
          activeOrders,
          balance: parseFloat(wallet?.balance) || 0,
          lockedBalance: parseFloat(wallet?.lockedBalance) || 0
        },
        recentTrades
      }
    });
  } catch (error) {
    logger.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard stats',
      error: error.message
    });
  }
};

// ==================== TRADING VOLUME ====================
export const getTradingVolume = async (req, res) => {
  try {
    const userId = req.userId;
    const { period = '7d' } = req.query;

    let days = 7;
    if (period === '24h') days = 1;
    if (period === '30d') days = 30;
    if (period === '90d') days = 90;

    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const volumeData = await Trade.findAll({
      where: {
        user_id: userId,
        status: 'FILLED',
        created_at: {
          [sequelize.Op.gte]: startDate
        }
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('created_at')), 'date'],
        [sequelize.fn('SUM', sequelize.col('total')), 'volume'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'trades']
      ],
      group: [sequelize.fn('DATE', sequelize.col('created_at'))],
      order: [[sequelize.fn('DATE', sequelize.col('created_at')), 'ASC']]
    });

    res.json({
      success: true,
      data: volumeData,
      period
    });
  } catch (error) {
    logger.error('Get trading volume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch trading volume',
      error: error.message
    });
  }
};

// ==================== TOP PERFORMING ASSETS ====================
export const getTopPerformingAssets = async (req, res) => {
  try {
    const userId = req.userId;

    const topAssets = await Trade.findAll({
      where: {
        user_id: userId,
        status: 'FILLED'
      },
      attributes: [
        'symbol',
        [sequelize.fn('COUNT', sequelize.col('id')), 'tradeCount'],
        [sequelize.fn('SUM', sequelize.col('total')), 'totalVolume'],
        [sequelize.fn('AVG', sequelize.col('price')), 'avgPrice']
      ],
      group: ['symbol'],
      order: [[sequelize.fn('SUM', sequelize.col('total')), 'DESC']],
      limit: 10
    });

    res.json({
      success: true,
      data: topAssets
    });
  } catch (error) {
    logger.error('Get top performing assets error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch top assets',
      error: error.message
    });
  }
};

export default {
  getDashboardStats,
  getTradingVolume,
  getTopPerformingAssets
};