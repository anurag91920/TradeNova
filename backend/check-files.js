import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredFiles = [
  'src/app.js',
  'src/config/database.js',
  'src/config/redis.js',
  'src/models/index.js',
  'src/models/User.model.js',
  'src/models/Trade.model.js',
  'src/models/Wallet.model.js',
  'src/models/Order.model.js',
  'src/models/AuditLog.model.js',
  'src/controllers/auth.controller.js',
  'src/controllers/trade.controller.js',
  'src/controllers/wallet.controller.js',
  'src/controllers/analytics.controller.js',
  'src/controllers/settings.controller.js',
  'src/routes/auth.routes.js',
  'src/routes/trade.routes.js',
  'src/routes/wallet.routes.js',
  'src/routes/analytics.routes.js',
  'src/routes/settings.routes.js',
  'src/middleware/auth.middleware.js',
  'src/middleware/error.middleware.js',
  'src/middleware/logger.middleware.js',
  'src/middleware/validation.middleware.js',
  'src/middleware/rateLimiter.js',
  'src/services/crypto.service.js',
  'src/services/email.service.js',
  'src/utils/logger.js',
  'src/utils/encryption.js',
  'src/utils/validators.js',
  'src/socket/index.js',
  'src/socket/events.js',
  'server.js',
  '.env',
  'package.json'
];

console.log('\n📋 Checking required files...\n');

let missing = 0;
let present = 0;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  const icon = exists ? '✅' : '❌';
  console.log(`${icon} ${file}`);
  if (exists) present++; else missing++;
});

console.log(`\n📊 Summary: ${present} present, ${missing} missing\n`);

if (missing > 0) {
  console.log('⚠️  Create the missing files above and run again.\n');
  process.exit(1);
} else {
  console.log('✨ All files present! You can run: npm start\n');
}