//✅ server.js – ไฟล์เริ่มต้นรันเซิร์ฟเวอร์

require("dotenv").config(); // โหลดตัวแปรจาก .env

const app = require("./app"); // ดึง Express app ที่เราเขียนแยกไว้ใน app.js
const connectDB = require("./config/db"); // import connectDB

// กำหนดพอร์ต (ใช้ process.env.PORT ถ้ามี หรือ default ที่ 3000)
const PORT = process.env.PORT || 3000;

// เชื่อมต่อฐานข้อมูลก่อนเริ่ม server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
