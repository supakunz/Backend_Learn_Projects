//✅ routes/noteRoutes.js – จัดการเส้นทาง (routes) ของ Note

const express = require("express");
const router = express.Router(); // สร้าง router object ของ Express
const validateNote = require("../middlewares/validateNote"); // middleware validate title and content

//import controller fuction แต่ละอัน
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

// สร้าง endpoint สำหรับ Note โดยแยก function ตามหน้าที่
router.get("/", getAllNotes); // GET /api/notes → ดึงโน้ตทั้งหมด
router.get("/:id", getNoteById); // GET /api/notes/:id → ดึงโน้ตตาม id
router.post("/", validateNote, createNote); // POST /api/notes → สร้างโน้ตใหม่
router.put("/:id", validateNote, updateNote); // PUT /api/notes/:id → อัปเดตโน้ต
router.delete("/:id", deleteNote); // DELETE /api/notes/:id → ลบโน้ต

module.exports = router; // ส่ง router ออกให้ app.js ใช้งาน
