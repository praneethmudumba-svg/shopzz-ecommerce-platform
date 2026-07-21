const express = require("express");

const {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
} = require("../controllers/stockController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  adminOnly,
} = require("../middleware/adminMiddleware");


const router = express.Router();

// Get All Stocks
// GET /api/stocks
//PUBLIC

router.get(
  "/",
  getAllStocks
);

// Create Stock
// POST /api/stocks
// ADMIN ONLY

router.post(
  "/",
  protect,
  adminOnly,
  createStock,
);

// Get Single Stock
// GET /api/stocks/:id
// PUBLIC

router.get(
  "/:id",
  getStockById
);

// Delete Stock
// DELETE /api/stocks/:id
// ADMIN ONLY

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteStock
);

// Update Stock
// PUT /api/stocks/:id
// ADMIN ONLY

router.put(
  "/:id",
  protect,
  adminOnly,
  updateStock
);

module.exports = router;