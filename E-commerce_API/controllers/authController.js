const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../ีutils/AppError");

// 🎟 สร้าง JWT
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// สร้าง Cookie
const createSendToken = (user, res) => {
  const token = signToken(user._id);

  // Set cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict", // (None) => cross site, cookie จะ ไม่ถูกส่ง ถ้า user มาจากลิงก์ภายนอก (เช่น จากเว็บอื่นแล้วคลิกมาหาเรา)
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(200).json({
    status: "success",
    user: {
      id: user._id,
      email: user.email,
    },
  });
};

// ✅ Signup
exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // สร้าง user ใหม่
    const user = await User.create({ email, password });

    // สร้าง token แล้วส่งกลับเป็น cookie
    createSendToken(user, res);
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

    // สร้าง token แล้วส่งกลับเป็น cookie
    createSendToken(user, res);
  } catch (err) {
    next(err); // ส่ง err ให้ middleware
  }
};

// ✅ Logout
exports.logout = (req, res) => {
  // ส่ง cookie กลับไปที่ browser อีกครั้ง
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // ทำให้ cookie หมดอายุทันที
  });
  res.status(200).json({ status: "success", message: "Logged out" });
};
