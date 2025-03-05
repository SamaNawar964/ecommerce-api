const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./config/logger'); // ✅ استيراد Winston Logger

// ✅ تحميل المتغيرات البيئية من ملف config.env
dotenv.config({ path: 'config.env' });

// ✅ استدعاء الاتصال بقاعدة البيانات
const dbConnection = require('./config/database');

// ✅ التعامل مع الأخطاء غير المتوقعة داخل التطبيق
process.on('uncaughtException', (err) => {
  logger.error(`🔥 Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// ✅ الاتصال بقاعدة البيانات باستخدام async/await
(async () => {
  try {
    await dbConnection();
    logger.info("✅ Database Connected Successfully");
  } catch (err) {
    logger.error(`❌ Database connection failed: ${err.message}`);
    process.exit(1);
  }
})();

// ✅ إنشاء التطبيق باستخدام Express
const app = express();

// ✅ تمكين CORS للسماح بالطلبات من أي نطاق
app.use(cors());

// ✅ تمكين استقبال JSON من الطلبات
app.use(express.json());

// ✅ تمكين الـ Logger في وضع التطوير
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  logger.info("🚀 Running in development mode");
}

// ✅ تسجيل الطلبات باستخدام Winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// ✅ تحميل الراوتات
const categoryRoute = require('./routes/categoryRoute');
app.use('/api/v1/categories', categoryRoute);

// ✅ إدارة الأخطاء بشكل شامل
app.use((err, req, res, next) => {
  logger.error(`❌ Error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ✅ تشغيل السيرفر
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
});

// ✅ التعامل مع الرفض غير المعالج
process.on('unhandledRejection', (err) => {
  logger.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

// ✅ التعامل مع إغلاق السيرفر بشكل نظيف عند الضغط على Ctrl+C
process.on('SIGINT', async () => {
  logger.warn("🚦 Server shutting down...");
  await mongoose.connection.close();
  server.close(() => {
    logger.info("👋 Server closed.");
    process.exit(0);
  });
});
