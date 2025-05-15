//✅ app.js – ตั้งค่าหลักของแอป

const express = require("express");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json()); // Middleware: ให้ Express อ่าน body ที่เป็น JSON ได้
app.use("/api/notes", noteRoutes); // กำหนดให้ endpoint `/api/notes` ใช้ router ที่เรา

app.use(errorHandler); // Middleware ดักจับ error

module.exports = app; // ส่งออก app เพื่อให้ server.js ใช้ได้
