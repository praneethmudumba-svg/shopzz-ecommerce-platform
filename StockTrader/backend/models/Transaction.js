const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    // User who performed the trade
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Stock being traded
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },

    // Stock symbol for quick access
    symbol: {
      type: String,
      required: true,
      uppercase: true,
    },

    // Buy or Sell
    type: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },

    // Number of shares
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    // Price per share during transaction
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    // Total transaction amount
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Transaction status
    status: {
      type: String,
      enum: [
        "COMPLETED",
        "PENDING",
        "FAILED",
      ],
      default: "COMPLETED",
    },

    // Optional notes
    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema
);

module.exports = Transaction;