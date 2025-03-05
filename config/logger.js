const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// ✅ تنسيق الرسائل المسجلة
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
});

// ✅ إنشاء نظام التسجيل باستخدام Winston
const logger = createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
  transports: [
    new transports.Console({ format: combine(colorize(), logFormat) }), // ✅ طباعة الملخص في الكونسول
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // ✅ تسجيل الأخطاء في ملف
    new transports.File({ filename: 'logs/combined.log' }) // ✅ تسجيل جميع الأنشطة
  ]
});

module.exports = logger;
