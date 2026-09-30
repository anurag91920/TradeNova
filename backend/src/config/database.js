import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { createSSHTunnel } from './sshTunnel.js';
dotenv.config();

let sequelize = null;
let tunnelServer = null;

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      console.log('🔌 Creating SSH tunnel to Hostim.dev...');
      tunnelServer = await createSSHTunnel();
      
      sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: '127.0.0.1',
          port: 3307,
          dialect: 'mysql',
          logging: false,
          pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
          define: {
            timestamps: true,
            underscored: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
          },
        }
      );
    } else {
      sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT || 3306,
          dialect: 'mysql',
          logging: console.log,
          define: {
            timestamps: true,
            underscored: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
          },
        }
      );
    }
    
    await sequelize.authenticate();
    console.log('✅ MySQL Connected successfully');
    
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('✅ Database synced');
    }
  } catch (error) {
    console.error('❌ MySQL Connection Error:', error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };