const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authProtect");
const {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
} = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateQuantity);
router.delete("/delete", protect, removeFromCart);

module.exports = router;
