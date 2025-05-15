const express = require("express");
const router = express.Router(); // สร้าง router object ของ Express

//import controller fuction แต่ละอัน
const { login, signup } = require("../controllers/authController");

// สร้าง endpoint สำหรับ Note โดยแยก function ตามหน้าที่
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
