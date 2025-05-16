// routes/secret.routes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authProtect");

router.get("/secret", protect, (req, res) => {
  res.json({ message: `Welcome, ${req.user.email}` });
});

module.exports = router;
