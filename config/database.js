const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // ✅ إزالة الخيارات غير الضرورية
    console.log("✅ Database Connected Successfully");
  } catch (err) {
    console.error(`❌ Database connection failed: ${err.message}`);
    process.exit(1);
  }
};

module.exports = dbConnection;
