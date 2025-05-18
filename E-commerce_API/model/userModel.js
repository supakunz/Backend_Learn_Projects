const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already in use"], // email ต้องไม่ซ้ำกันใน collection
    lowercase: true, // แปลงค่าที่รับเข้ามาให้เป็นตัวพิมพ์เล็กก่อนบันทึกลงฐานข้อมูล
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"], // ตรวจสอบว่า email ถูกต้อง
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"], // ต้องมีความยาวอย่างน้อย 6 ตัวอักษร
  },
  role: {
    type: String,
    enum: ["user", "admin"], // ✅ รับได้เฉพาะค่าเหล่านี้
    default: "user", // 🟢 ถ้าไม่ได้ใส่ค่า จะใช้ "user" เป็นค่าเริ่มต้น
  },
});

// 🔐 Hash password ก่อน save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // ถ้า password ไม่ได้เปลี่ยน ไม่ต้อง hash ซ้ำ
  this.password = await bcrypt.hash(this.password, 12); // hash password ด้วย bcrypt
  next();
});

// 🔍 เพิ่ม method เปรียบเทียบ password
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
