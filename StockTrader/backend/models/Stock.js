const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: [true, "Stock symbol is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },

    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    currentPrice: {
      type: Number,
      required: [true, "Stock price is required"],
      min: 0,
    },

    priceChange: {
      type: Number,
      default: 0,
    },

    changePercentage: {
      type: Number,
      default: 0,
    },

    sector: {
      type: String,
      default: "Unknown",
    },

    marketCap: {
      type: Number,
      default: 0,
    },

    volume: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;