const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../ีutils/AppError");

// 🎟 สร้าง JWT
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// ✅ Signup
exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // สร้าง user ใหม่
    const user = await User.create({ email, password });

    // สร้าง token แล้วส่งกลับ
    const token = signToken(user._id);

    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    next(err); // ส่ง err ให้ middleware
  }
};

// ✅ Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ตรวจสอบข้อมูล email, password
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400)); // ส่ง err ให้ middleware => ที่สร้างจาก AppError
    }

    // หา user จาก email
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid email or password", 401));
    }

    // สร้าง token แล้วส่งกลับ
    const token = signToken(user._id);

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    next(err); // ส่ง err ให้ middleware
  }
};
