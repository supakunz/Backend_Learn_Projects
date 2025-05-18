const Cart = require("../model/cartModel");
const Product = require("../model/productModel");

// 🔍 ดึงข้อมูลตะกร้าของผู้ใช้
exports.getCart = async (req, res, next) => {
  try {
    // ค้นหาตะกร้าของผู้ใช้ที่ล็อกอินอยู่ (ใช้ token -> req.user._id)
    // .populate() คือดึงข้อมูลสินค้าจาก product collection มาด้วย (ชื่อ ราคา เป็นต้น)
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    // ถ้ายังไม่มีตะกร้า ให้ส่งกลับ array ว่าง
    if (!cart) return res.json({ items: [] });

    res.json(cart); // ตอบกลับข้อมูลตะกร้า
  } catch (err) {
    next(err); // ส่ง error ไปให้ middleware จัดการ
  }
};

// ➕ เพิ่มสินค้าหรืออัปเดตจำนวน
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    // ตรวจสอบว่าสินค้าที่ต้องการเพิ่มมีอยู่จริงไหม
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ค้นหาตะกร้าของผู้ใช้
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      // ถ้ายังไม่มีตะกร้า สร้างใหม่และใส่สินค้าชิ้นแรก
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }],
      });
    } else {
      // ถ้ามีตะกร้าแล้ว ตรวจสอบว่าสินค้านี้มีอยู่ในตะกร้าหรือยัง
      const itemIndex = cart.items.findIndex(
        // จะ return ออกมาเป็น index ถ้าไม่มีจะเป็น -1
        (item) => item.product.equals(productId)
      );

      console.log(itemIndex);

      if (itemIndex > -1) {
        // ถ้ามีอยู่แล้ว → เพิ่มจำนวนเข้าไป
        cart.items[itemIndex].quantity += quantity;
      } else {
        // ถ้ายังไม่มี → เพิ่มสินค้าเข้าไปใหม่
        cart.items.push({ product: productId, quantity });
      }

      await cart.save(); // บันทึกตะกร้าใหม่
    }

    res.json(cart); // ส่งตะกร้าที่อัปเดตกลับไป
  } catch (err) {
    next(err);
  }
};

// ❌ ลบสินค้าออกจากตะกร้า
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // กรองเอาสินค้าที่ไม่ใช่ productId ที่ต้องการลบออกมาเก็บไว้
    cart.items = cart.items.filter((item) => !item.product.equals(productId));

    await cart.save();
    res.json(cart); // ส่งตะกร้าที่อัปเดตกลับ
  } catch (err) {
    next(err);
  }
};

// 🔄 แก้ไขจำนวนสินค้า
exports.updateQuantity = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // ค้นหาสินค้าที่ต้องการแก้ไขจำนวน
    const item = cart.items.find((item) => item.product.equals(productId));
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity; // แก้ไขจำนวน
    await cart.save();

    res.json(cart);
  } catch (err) {
    next(err);
  }
};
