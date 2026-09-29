import { Wallet, Trade } from '../models/index.js';
import { sequelize } from '../config/database.js';
import { logger } from '../utils/logger.js';

// ==================== GET WALLET ====================
export const getWallet = async (req, res) => {
  try {
    const userId = req.userId;

    let wallet = await Wallet.findOne({
      where: { user_id: userId }
    });

    if (!wallet) {
      // Auto-create wallet if missing
      wallet = await Wallet.create({
        userId,
        balance: 0,
        currency: 'USD'
      });
    }

    const recentTrades = await Trade.findAll({
      where: { user_id: userId },
      limit: 10,
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        wallet,
        recentTrades
      }
    });
  } catch (error) {
    logger.error('Get wallet error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch wallet',
      error: error.message
    });
  }
};

// ==================== DEPOSIT ====================
export const deposit = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.userId;
    const { amount, currency = 'USD' } = req.body;

    if (amount <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Deposit amount must be greater than 0'
      });
    }

    let wallet = await Wallet.findOne({
      where: { user_id: userId },
      transaction
    });

    if (!wallet) {
      wallet = await Wallet.create({
        userId,
        balance: 0,
        currency
      }, { transaction });
    }

    await Wallet.increment(
      { 
        balance: amount,
        totalDeposited: amount
      },
      { where: { id: wallet.id }, transaction }
    );

    await transaction.commit();

    const updatedWallet = await Wallet.findOne({
      where: { user_id: userId }
    });

    res.json({
      success: true,
      message: 'Deposit successful',
      data: {
        wallet: updatedWallet,
        depositedAmount: amount,
        currency
      }
    });

  } catch (error) {
    await transaction.rollback();
    logger.error('Deposit error:', error);
    res.status(500).json({
      success: false,
      message: 'Deposit failed',
      error: error.message
    });
  }
};

// ==================== WITHDRAW ====================
export const withdraw = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.userId;
    const { amount, address, currency = 'USD' } = req.body;

    if (amount <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Withdrawal amount must be greater than 0'
      });
    }

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

    if (parseFloat(wallet.balance) < amount) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance',
        availableBalance: wallet.balance,
        requestedAmount: amount
      });
    }

    await Wallet.decrement(
      { 
        balance: amount,
        totalWithdrawn: amount
      },
      { where: { id: wallet.id }, transaction }
    );

    await transaction.commit();

    const updatedWallet = await Wallet.findOne({
      where: { user_id: userId }
    });

    res.json({
      success: true,
      message: 'Withdrawal initiated successfully',
      data: {
        wallet: updatedWallet,
        withdrawnAmount: amount,
        address,
        currency,
        status: 'PENDING'
      }
    });

  } catch (error) {
    await transaction.rollback();
    logger.error('Withdrawal error:', error);
    res.status(500).json({
      success: false,
      message: 'Withdrawal failed',
      error: error.message
    });
  }
};

// ==================== GET TRANSACTIONS ====================
export const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 50, offset = 0 } = req.query;

    const transactions = await Trade.findAndCountAll({
      where: { user_id: userId },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: transactions.rows,
      pagination: {
        total: transactions.count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    logger.error('Get transaction history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction history',
      error: error.message
    });
  }
};

export default {
  getWallet,
  deposit,
  withdraw,
  getTransactionHistory
};