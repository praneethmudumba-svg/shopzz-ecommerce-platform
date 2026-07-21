const bcrypt = require("bcryptjs");

const User = require("../models/User");
const Portfolio = require("../models/Portfolio");

const generateToken = require("../utils/generateToken");


// ==========================================
// Register User
// POST /api/auth/register
// ==========================================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide all fields",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create default portfolio
    await Portfolio.create({
      user: user._id,
      balance: 100000,
      holdings: [],
    });

    // Send response
    res.status(201).json({
      message: "Registration successful",
      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ==========================================
// Login User
// POST /api/auth/login
// ==========================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    // Check user exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    // Invalid password
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Login success
    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id),

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ==========================================
// Get Current User Profile
// GET /api/auth/profile
// ==========================================

const getUserProfile = async (req, res) => {
  try {

    res.status(200).json({
      message: "Profile fetched successfully",

      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
      },
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ==========================================
// Export Controllers
// ==========================================

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};