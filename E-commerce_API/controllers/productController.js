const Product = require("../model/productModel");

// สร้างสินค้า (admin เท่านั้น)
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    console.log("Create Product");
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// ดึงสินค้าทั้งหมด
exports.getAllProducts = async (req, res, next) => {
  try {
    const product = await Product.find();
    console.log("Get Product");
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// ดึงสินค้าทีละตัวด้วย Id
exports.getProductsById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    console.log("Get Product By Id");
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// แก้ไขสินค้า (admin เท่านั้น)
exports.updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updated) return res.status(404).json({ message: "Product not found" });
    console.log("Update Product");
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// ลบสินค้า (admin เท่านั้น)
exports.deleteProdect = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    console.log("Delete Product");
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
};
