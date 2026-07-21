const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");

const router = express.Router();


// Register User
// POST /api/auth/register
router.post("/register", registerUser);


// Login User
// POST /api/auth/login
router.post("/login", loginUser);

// Get Logged In User Profile
// GET /api/auth/profile
router.get("/profile", protect, getUserProfile);


module.exports = router;

