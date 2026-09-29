import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Trade = sequelize.define('Trade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  symbol: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('BUY', 'SELL'),
    allowNull: false
  },
  orderType: {
    type: DataTypes.ENUM('MARKET', 'LIMIT', 'STOP_LOSS', 'TAKE_PROFIT'),
    field: 'order_type',
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  quantity: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false
  },
  fee: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'FILLED', 'PARTIALLY_FILLED', 'CANCELLED', 'FAILED'),
    defaultValue: 'PENDING'
  },
  executedAt: {
    type: DataTypes.DATE,
    field: 'executed_at'
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'trades',
  underscored: true,
  timestamps: true,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['symbol'] },
    { fields: ['status'] },
    { fields: ['created_at'] }
  ]
});

export default Trade;