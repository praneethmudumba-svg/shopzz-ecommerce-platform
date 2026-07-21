const express = require("express");

const {
  buyStock,
  sellStock,
  getPortfolio,
  getTransactions,
} = require("../controllers/tradeController");

const {
  protect,
} = require("../middleware/authMiddleware");

console.log("protect:", protect);
console.log("buyStock:", buyStock);

const router = express.Router();

router.post(
  "/buy",
  protect,
  buyStock
);

router.post(
  "/sell",
  protect,
  sellStock
);

// Get User Portfolio
// GET /api/trades/portfolio
router.get(
  "/portfolio",
  protect,
  getPortfolio
);

// Get Transaction History
// GET /api/trades/transactions

router.get(
  "/transactions",
  protect,
  getTransactions
);


module.exports = router;