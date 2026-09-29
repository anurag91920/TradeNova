import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id',
    unique: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  balance: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0
  },
  lockedBalance: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    field: 'locked_balance'
  },
  currency: {
    type: DataTypes.STRING(10),
    defaultValue: 'USD'
  },
  totalDeposited: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    field: 'total_deposited'
  },
  totalWithdrawn: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    field: 'total_withdrawn'
  },
  totalProfit: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    field: 'total_profit'
  }
}, {
  tableName: 'wallets',
  underscored: true,
  timestamps: true
});

export default Wallet;