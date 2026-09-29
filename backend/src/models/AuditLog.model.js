import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const AuditLog = sequelize.define('AuditLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'SET NULL'
  },
  action: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  entity: {
    type: DataTypes.STRING(50)
  },
  entityId: {
    type: DataTypes.INTEGER,
    field: 'entity_id'
  },
  changes: {
    type: DataTypes.JSON
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    field: 'ip_address'
  },
  userAgent: {
    type: DataTypes.STRING(255),
    field: 'user_agent'
  },
  status: {
    type: DataTypes.ENUM('SUCCESS', 'FAILURE', 'PENDING'),
    defaultValue: 'SUCCESS'
  },
  error: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'audit_logs',
  underscored: true,
  timestamps: true,
  updatedAt: false,
  indexes: [
    { fields: ['user_id'] },
    { fields: ['action'] },
    { fields: ['created_at'] }
  ]
});

export default AuditLog;