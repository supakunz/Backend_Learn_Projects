const express = require("express");
const morgan = require("morgan");

const app = express();

const authRoutes = require("./routes/authRoutes");
const secretRoutes = require("./routes/secretRoutes");
const errorHandler = require("./middlewares/errorHandler");

app.use(morgan("dev")); // 'dev' = รูปแบบ log ที่อ่านง่าย
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", secretRoutes);

// Error middleware
app.use(errorHandler);

module.exports = app;
