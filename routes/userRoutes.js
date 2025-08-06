const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all users (admin only)
router.get("/", protect, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

module.exports = router;
