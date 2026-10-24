import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Production (Render) में Secret File से और Local में config फोल्डर से ca.pem पढ़ें
const caCertPath = process.env.NODE_ENV === 'production'
  ? '/etc/secrets/ca.pem'
  : path.join(__dirname, 'ca.pem');

let caCert;
try {
  caCert = fs.readFileSync(caCertPath);
} catch (error) {
  console.warn(`⚠️ Warning: ca.pem not found at ${caCertPath}. SSL might fail.`);
}

// Aiven के लिए सीधा कनेक्शन (कोई SSH Tunnel नहीं)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Production में SQL queries log नहीं होंगी
    dialectOptions: {
      ssl: caCert ? {
        ca: caCert,
        rejectUnauthorized: true,
      } : false,
    },
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
    //अब यहाँ कोई SSH Tunnel नहीं है, सीधे Database से कनेक्ट होगा
    await sequelize.authenticate();
    console.log(' MySQL Connected successfully via Aiven');
    
    // Database tables और columns automatically sync करें
    await sequelize.sync({ alter: true });
    console.log(' Database schema synced (tables created/updated)');
    
  } catch (error) {
    console.error('MySQL Connection Error:', error.message);
    process.exit(1);
  }
};

export { sequelize, connectDB };



// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';
// dotenv.config();

// // ✅ sequelize को तुरंत बनाएं, न कि connectDB() के अंदर
// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.NODE_ENV === 'production' ? '127.0.0.1' : (process.env.DB_HOST),
//     port: process.env.NODE_ENV === 'production' ? 3307 : (process.env.DB_PORT),
//     dialect: 'mysql',
//     logging: false,
//     pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
//     define: {
//       timestamps: true,
//       underscored: true,
//       charset: 'utf8mb4',
//       collate: 'utf8mb4_unicode_ci',
//     },
//   }
// );

// const connectDB = async () => {
//   try {
//     if (process.env.NODE_ENV === 'production') {
//       // SSH टनल बनाने के लिए sshTunnel.js को import करें
//       const { createSSHTunnel } = await import('./sshTunnel.js');
//       await createSSHTunnel();
//       console.log(' SSH tunnel ready');
//     }
    
//     await sequelize.authenticate();
//     console.log(' MySQL Connected successfully');
    
//     // TEMPORARY FIX: Production में भी sync करें
//     // यह missing tables और columns automatically create कर देगा
//     //  Registration working होने के बाद इसे हटा दें या condition development पर वापस कर दें
//     await sequelize.sync({ alter: true });
//     console.log('Database schema synced (tables created/updated)');
    
//   } catch (error) {
//     console.error('MySQL Connection Error:', error.message);
//     process.exit(1);
//   }
// };

// export { sequelize, connectDB };