//✅ controllers/noteController.js – Logic หลักของแต่ละ endpoint

const Note = require("../model/ืnoteModel"); // import noteModel

// ดึงโน้ตทั้งหมดจากไฟล์ -> GET /api/notes
exports.getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.json(notes); // ส่ง response เป็น JSON
  } catch (err) {
    next(err);
  }
};

// GET /api/notes/:id
exports.getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    // * ข้อควรระวังการใช้ findById
    // 1.เมื่อมี params ที่ ผิดรูป เช่น 123abc Mongoose จะ throw error → ไปเข้า catch
    // 2. id ถูกต้องตามรูปแบบ 6648a2c43c3b9b5f12345678 (24 hex) แต่ไม่เจอใน DB note จะเป็น null
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

// สร้างโน้ตใหม่ -> POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    // * มั่นใจว่าข้อมูลมีครบแล้วเพราะใช้ middleware validate แลัว
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (err) {
    next(err);
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // แสดงค่าที่ update
      runValidators: true, // check ว่า req.body ถูกตาม schema ไหม
    });
    if (!updated) return res.status(404).json({ message: "Note note found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Note not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
