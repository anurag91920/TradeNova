import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { User, Wallet } from '../models/index.js';
import { sequelize } from '../config/database.js';
import { logger } from '../utils/logger.js';

const generateTokens = (userId, email, role) => {
  const accessToken = jwt.sign(
    { id: userId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
  
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
  
  return { accessToken, refreshToken };
};

// ==================== REGISTER ====================
export const register = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { email, password, username, fullName } = req.body;
    
    // ✅ Use imported Op, not sequelize.Op
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }]
      },
      transaction
    });
    
    if (existingUser) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Email or username already exists'
      });
    }
    
    const user = await User.create({
      email,
      password,
      username,
      fullName: fullName || username
    }, { transaction });
    
    await Wallet.create({
      userId: user.id,
      balance: 10000,
      currency: 'USD',
      totalDeposited: 10000
    }, { transaction });
    
    await transaction.commit();
    
    const tokens = generateTokens(user.id, user.email, user.role);
    
    await User.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: user.id } }
    );
    
    logger.info(`New user registered: ${email}`);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          role: user.role
        },
        ...tokens
      }
    });
  } catch (error) {
    await transaction.rollback();
    logger.error('Registration error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    await User.update(
      { lastLogin: new Date() },
      { where: { id: user.id } }
    );
    
    const tokens = generateTokens(user.id, user.email, user.role);
    
    await User.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: user.id } }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
          twoFactorEnabled: user.twoFactorEnabled
        },
        ...tokens
      }
    });
  } catch (error) {
    logger.error('Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error.message
    });
  }
};

// ==================== REFRESH TOKEN ====================
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token required'
      });
    }
    
    const decoded = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
    );
    
    const user = await User.findByPk(decoded.id);
    
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token'
      });
    }
    
    const tokens = generateTokens(user.id, user.email, user.role);
    
    await User.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: user.id } }
    );
    
    res.json({
      success: true,
      ...tokens
    });
  } catch (error) {
    logger.error('Refresh token error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token',
      error: error.message
    });
  }
};

// ==================== LOGOUT ====================
export const logout = async (req, res) => {
  try {
    const userId = req.userId;
    await User.update(
      { refreshToken: null },
      { where: { id: userId } }
    );
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    logger.error('Logout error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: error.message
    });
  }
};

// ==================== GET PROFILE ====================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: { exclude: ['password', 'refreshToken'] },
      include: [{ association: 'wallet' }]
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Get profile error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: error.message
    });
  }
};

export default {
  register,
  login,
  refreshToken,
  logout,
  getProfile
};