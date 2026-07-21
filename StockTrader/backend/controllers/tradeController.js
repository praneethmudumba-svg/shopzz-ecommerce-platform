const Stock = require("../models/Stock");
const Portfolio = require("../models/Portfolio");
const Transaction = require("../models/Transaction");


// ==========================================
// Buy Stock
// POST /api/trades/buy
// PROTECTED
// ==========================================

const buyStock = async (req, res) => {
  try {

    const { stockId, quantity } = req.body;


    // Validate input
    if (!stockId || !quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Invalid stock and quantity",
      });
    }


    // Find stock
    const stock = await Stock.findById(stockId);

    if (!stock || !stock.isActive) {
      return res.status(404).json({
        message: "Stock not available",
      });
    }


    // Find user's portfolio
    const portfolio = await Portfolio.findOne({
      user: req.user._id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }


    // Calculate total purchase amount
    const totalCost =
      stock.currentPrice * quantity;


    // Check balance
    if (portfolio.balance < totalCost) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }


    // Deduct balance
    portfolio.balance -= totalCost;


    // Check if user already owns this stock
    const existingHolding =
      portfolio.holdings.find(
        (item) =>
          item.stock.toString() === stockId
      );


    if (existingHolding) {

      // Existing investment value
      const oldValue =
        existingHolding.averagePrice *
        existingHolding.quantity;


      // Add shares
      existingHolding.quantity += quantity;


      // Update average buying price
      existingHolding.averagePrice =
        (
          oldValue + totalCost
        ) /
        existingHolding.quantity;


    } else {

      // Add new stock holding
      portfolio.holdings.push({
        stock: stock._id,
        symbol: stock.symbol,
        quantity,
        averagePrice: stock.currentPrice,
      });

    }


    // Save updated portfolio
    await portfolio.save();


    // Create transaction history
    await Transaction.create({
      user: req.user._id,
      stock: stock._id,
      symbol: stock.symbol,
      type: "BUY",
      quantity,
      price: stock.currentPrice,
      totalAmount: totalCost,
      status: "COMPLETED",
    });


    // Send response
    res.status(200).json({
      message: "Stock purchased successfully",

      purchase: {
        symbol: stock.symbol,
        quantity,
        price: stock.currentPrice,
        totalCost,
      },

      remainingBalance: portfolio.balance,
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// ==========================================
// Sell Stock
// POST /api/trades/sell
// PROTECTED
// ==========================================

const sellStock = async (req, res) => {
  try {

    const { stockId, quantity } = req.body;


    // Validate input
    if (!stockId || !quantity || quantity <= 0) {
      return res.status(400).json({
        message: "Invalid stock and quantity",
      });
    }


    // Find stock
    const stock = await Stock.findById(stockId);

    if (!stock || !stock.isActive) {
      return res.status(404).json({
        message: "Stock not available",
      });
    }


    // Find portfolio
    const portfolio = await Portfolio.findOne({
      user: req.user._id,
    });

    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }


    // Find holding
    const holding = portfolio.holdings.find(
      (item) =>
        item.stock.toString() === stockId
    );


    // Check ownership
    if (!holding) {
      return res.status(400).json({
        message: "You do not own this stock",
      });
    }


    // Check quantity
    if (holding.quantity < quantity) {
      return res.status(400).json({
        message: "Not enough shares to sell",
      });
    }


    // Calculate sale amount
    const saleAmount =
      stock.currentPrice * quantity;


    // Add money back to balance
    portfolio.balance += saleAmount;


    // Reduce quantity
    holding.quantity -= quantity;


    // Remove holding if zero shares remain
    portfolio.holdings =
      portfolio.holdings.filter(
        (item) => item.quantity > 0
      );


    // Save portfolio
    await portfolio.save();


    // Create transaction
    await Transaction.create({
      user: req.user._id,
      stock: stock._id,
      symbol: stock.symbol,
      type: "SELL",
      quantity,
      price: stock.currentPrice,
      totalAmount: saleAmount,
      status: "COMPLETED",
    });


    // Response
    res.status(200).json({
      message: "Stock sold successfully",

      sale: {
        symbol: stock.symbol,
        quantity,
        price: stock.currentPrice,
        totalAmount: saleAmount,
      },

      remainingBalance: portfolio.balance,
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==========================================
// Get Portfolio
// GET /api/trades/portfolio
// PROTECTED
// ==========================================

const getPortfolio = async (req, res) => {
  try {

    // Find portfolio and load stock details
    const portfolio = await Portfolio.findOne({
      user: req.user._id,
    }).populate(
      "holdings.stock",
      "symbol companyName currentPrice"
    );


    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
      });
    }


    let totalInvestment = 0;
    let totalCurrentValue = 0;


    const holdings = portfolio.holdings.map(
      (item) => {

        const investment =
          item.averagePrice *
          item.quantity;


        const currentValue =
          item.stock.currentPrice *
          item.quantity;


        const profitLoss =
          currentValue - investment;


        totalInvestment += investment;

        totalCurrentValue += currentValue;


        return {
          stockId: item.stock._id,
          symbol: item.symbol,
          companyName:
            item.stock.companyName,

          quantity:
            item.quantity,

          averagePrice:
            item.averagePrice,

          currentPrice:
            item.stock.currentPrice,

          investment,
          currentValue,
          profitLoss,
        };
      }
    );


    res.status(200).json({
      balance: portfolio.balance,

      holdings,

      summary: {
        totalInvestment,
        totalCurrentValue,

        totalProfitLoss:
          totalCurrentValue -
          totalInvestment,
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
// Get Transaction History
// GET /api/trades/transactions
// PROTECTED
// ==========================================

const getTransactions = async (req, res) => {
  try {

    // Find user's transactions
    const transactions = await Transaction.find({
      user: req.user._id,
    })
      .sort({
        createdAt: -1,
      });


    // Send response
    res.status(200).json({
      count: transactions.length,
      transactions,
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
  buyStock,
  sellStock,
  getPortfolio,
  getTransactions,
};