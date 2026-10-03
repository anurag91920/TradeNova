import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// ✅ sequelize को तुरंत बनाएं, न कि connectDB() के अंदर
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.NODE_ENV === 'production' ? '127.0.0.1' : (process.env.DB_HOST),
    port: process.env.NODE_ENV === 'production' ? 3307 : (process.env.DB_PORT),
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

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      // SSH टनल बनाने के लिए sshTunnel.js को import करें
      const { createSSHTunnel } = await import('./sshTunnel.js');
      await createSSHTunnel();
      console.log(' SSH tunnel ready');
    }
    
    await sequelize.authenticate();
    console.log(' MySQL Connected successfully');
    
    // TEMPORARY FIX: Production में भी sync करें
    // यह missing tables और columns automatically create कर देगा
    //  Registration working होने के बाद इसे हटा दें या condition development पर वापस कर दें
    await sequelize.sync({ alter: true });
    console.log('Database schema synced (tables created/updated)');
    
  } catch (error) {
    console.error('MySQL Connection Error:', error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };