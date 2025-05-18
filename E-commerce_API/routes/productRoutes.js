const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProdect,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middlewares/authProtect");

// Public
router.get("/", getAllProducts);
router.get("/:id", getProductsById);

// Admin only
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProdect);

module.exports = router;
