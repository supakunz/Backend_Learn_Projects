const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
      min: 0, // ค่าต่ำสุด
    },
    imageUrl: String,
    stock: {
      type: Number,
      default: 0, // ค่าเริ่มต้น
    },
    category: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
