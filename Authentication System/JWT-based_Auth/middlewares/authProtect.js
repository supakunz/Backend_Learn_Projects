const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const AppError = require("../ีutils/AppError");

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 🔐 ตรวจว่าใส่ token มารึเปล่า
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      // ตรวจสอบว่ามี header และ รูปแบบส่งมาถูกต้องไหม
      return next(new AppError("Not authenticated", 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 หา user จาก token
    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError("User no longer exists", 401));

    req.user = user; // แนบ user เข้า req.user
    next();
  } catch (err) {
    next(new AppError("Invalid token", 401));
  }
};
