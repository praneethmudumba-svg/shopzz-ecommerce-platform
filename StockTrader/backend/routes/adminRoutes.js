const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/adminMiddleware");

const {
  adminTest,
  addStock,

  // User Management
  getAllUsers,
  deleteUser,

  // Stock Management
  getAllStocks,
  updateStock,
  deleteStock,
  toggleStockStatus,

  getAllTransactions,

} = require("../controllers/adminController");

const router = express.Router();


// ===============================
// Test Admin Access
// GET /api/admin/test
// ===============================

router.get(
  "/test",
  protect,
  adminOnly,
  adminTest
);


// ===============================
// Get All Users
// GET /api/admin/users
// ===============================

router.get(
  "/users",
  protect,
  adminOnly,
  getAllUsers
);


// ===============================
// Delete User
// DELETE /api/admin/users/:id
// ===============================

router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

// ===============================
// Get All Stocks
// GET /api/admin/stocks
// ===============================

router.get(
  "/stocks",
  protect,
  adminOnly,
  getAllStocks
);

// ===============================
// Add New Stock
// POST /api/admin/stocks
// ===============================

router.post(
  "/stocks",
  protect,
  adminOnly,
  addStock
);

// ===============================
// Update Stock
// PUT /api/admin/stocks/:id
// ===============================

router.put(
  "/stocks/:id",
  protect,
  adminOnly,
  updateStock
);

// ===============================
// Delete Stock
// DELETE /api/admin/stocks/:id
// ===============================

router.delete(
  "/stocks/:id",
  protect,
  adminOnly,
  deleteStock
);

// ===============================
// Toggle Stock Active/Inactive
// PATCH /api/admin/stocks/:id/status
// ===============================

router.patch(
  "/stocks/:id/status",
  protect,
  adminOnly,
  toggleStockStatus
);

// ===============================
// Get All Transactions
// GET /api/admin/transactions
// ===============================

router.get(
  "/transactions",
  protect,
  adminOnly,
  getAllTransactions
);

module.exports = router;