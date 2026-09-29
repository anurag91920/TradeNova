import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  }
);

// Test connection
// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('MySQL Connected successfully');
    
//     // Sync models (use { alter: true } for development)
//     if (process.env.NODE_ENV === 'development') {
//       await sequelize.sync({ alter: true });
//       console.log('Database synced');
//     }
//   } catch (error) {
//     console.error('MySQL Connection Error:', error.message);
//     process.exit(1);
//   }
// };



const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Connected successfully');

    if (process.env.NODE_ENV === 'development') {
      // First run: force: true to recreate tables with new columns
      // After that, change to: alter: true
      await sequelize.sync({ force: true });
      console.log('Database recreated with fresh schema');
    }
  } catch (error) {
    console.error('MySQL Connection Error:', error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };