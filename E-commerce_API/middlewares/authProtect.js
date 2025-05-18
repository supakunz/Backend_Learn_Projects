const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const AppError = require("../ีutils/AppError");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Bearer <token>

    // 🔐 ตรวจว่าใส่ token มารึเปล่า
    if (!token) {
      // ตรวจสอบว่ามี token ใน cookie ไหม
      return next(new AppError("Not authenticated", 401));
    }

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

exports.adminOnly = (req, res, next) => {
  if (req.user.role != "admin")
    return res.status(403).json({ message: "Access denied" });
  next();
};
