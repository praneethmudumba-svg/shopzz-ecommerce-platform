const express = require("express");

const router = express.Router();

const {
  getPortfolio,
} = require("../controllers/portfolioController");

const {
  protect,
} = require("../middleware/authMiddleware");


// ==========================================
// Get Current User Portfolio
// GET /api/portfolio
// PROTECTED
// ==========================================

router.get(
  "/",
  protect,
  getPortfolio
);


module.exports = router;