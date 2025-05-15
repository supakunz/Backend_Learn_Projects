const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // ปิดโปรแกรมถ้าเชื่อม DB ไม่ได้
  }
};

module.exports = connectDB;
