const mongoose = require("mongoose");

// กำหนด schema สำหรับ Note
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
  },
  {
    timestamps: true, // เพิ่ม createdAt / updatedAt
  }
);

module.exports = mongoose.model("Note", noteSchema);
