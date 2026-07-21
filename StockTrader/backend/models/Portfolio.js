const mongoose = require("mongoose");

const holdingSchema = new mongoose.Schema(
  {
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },

    symbol: {
      type: String,
      required: true,
      uppercase: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    averagePrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    _id: false,
  }
);


const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    balance: {
      type: Number,
      default: 100000,
      min: 0,
    },

    holdings: {
      type: [holdingSchema],
      default: [],
    },

    totalInvestment: {
      type: Number,
      default: 0,
    },

    totalProfitLoss: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);


const Portfolio = mongoose.model(
  "Portfolio",
  portfolioSchema
);

module.exports = Portfolio;