const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const secretRoutes = require("./routes/secretRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(morgan("dev")); // 'dev' = รูปแบบ log ที่อ่านง่าย
app.use(express.json());
app.use(cookieParser()); // อนุญาตให่ส่ง cookie => req.cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api", secretRoutes);

// Error middleware
app.use(errorHandler);

module.exports = app;
