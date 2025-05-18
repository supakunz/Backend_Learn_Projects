const mongoose = require("mongoose");

// โครงสร้างย่อยของสินค้าแต่ละชิ้นในตะกร้า
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId, // อ้างอิงไปยังสินค้า
    ref: "Product", // ชื่อ model ของสินค้า
    required: true,
  },
  quantity: {
    type: Number, // จำนวนสินค้าที่เพิ่มในตะกร้า
    required: true,
    min: 1,
  },
});

// โครงสร้างหลักของตะกร้า
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // อ้างอิงไปยังผู้ใช้
      ref: "User",
      required: true,
      unique: true, // 1 user มีตะกร้าได้เพียง 1 อัน
    },
    items: [cartItemSchema], // รายการสินค้าในตะกร้า (array ของ cartItem)
  },
  { timestamps: true }
); // เพิ่ม createdAt และ updatedAt ให้ด้วย

module.exports = mongoose.model("Cart", cartSchema);
