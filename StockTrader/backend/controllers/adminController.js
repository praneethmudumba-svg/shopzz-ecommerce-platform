const Stock = require("../models/Stock");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
// ========================================
// Test Admin Access
// GET /api/admin/test
// ========================================

const adminTest = async (req, res) => {

  try {

    res.status(200).json({
      message: "Welcome Admin",
      admin: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// ========================================
// Add New Stock
// POST /api/admin/stocks
// ========================================

const addStock = async (req, res) => {

  try {

    const {
      symbol,
      companyName,
      currentPrice,
      changePercentage,
      sector,
      volume,
    } = req.body;


    // Check duplicate stock
    const existingStock = await Stock.findOne({
      symbol,
    });


    if (existingStock) {

      return res.status(400).json({
        message: "Stock already exists",
      });

    }


    // Create stock
    const stock = await Stock.create({

      symbol: symbol.toUpperCase(),

      companyName,

      currentPrice,

      changePercentage,

      sector,

      volume,

    });


    res.status(201).json({

      message: "Stock added successfully",

      stock,

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Server Error",

    });

  }

};

// ========================================
// Get All Users
// GET /api/admin/users
// ========================================

const getAllUsers = async (req, res) => {

  try {

    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });


    res.status(200).json({
      count: users.length,
      users,
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ========================================
// Delete User
// DELETE /api/admin/users/:id
// ========================================

const deleteUser = async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    );


    if (!user) {

      return res.status(404).json({
        message: "User not found",
      });

    }


    // Prevent deleting another admin
    if (user.role === "ADMIN") {

      return res.status(403).json({
        message: "Admin account cannot be deleted",
      });

    }


    await User.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({
      message: "User deleted successfully",
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


// ========================================
// Get All Stocks
// GET /api/admin/stocks
// ========================================

const getAllStocks = async (req, res) => {

  try {

    const stocks = await Stock.find({})
      .sort({ createdAt: -1 });


    res.status(200).json({
      count: stocks.length,
      stocks,
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ========================================
// Update Stock
// PUT /api/admin/stocks/:id
// ========================================

const updateStock = async (req, res) => {

  try {

    const stock = await Stock.findById(
      req.params.id
    );


    if (!stock) {

      return res.status(404).json({
        message: "Stock not found",
      });

    }


    const updatedStock =
      await Stock.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new: true,
          runValidators: true,
        }

      );


    res.status(200).json({

      message: "Stock updated successfully",

      stock: updatedStock,

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({

      message: "Server Error",

    });

  }

};

// ========================================
// Delete Stock
// DELETE /api/admin/stocks/:id
// ========================================

const deleteStock = async (req, res) => {

  try {

    const stock = await Stock.findById(
      req.params.id
    );


    if (!stock) {

      return res.status(404).json({
        message: "Stock not found",
      });

    }


    await Stock.findByIdAndDelete(
      req.params.id
    );


    res.status(200).json({
      message: "Stock deleted successfully",
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ========================================
// Toggle Stock Status
// PATCH /api/admin/stocks/:id/status
// ========================================

const toggleStockStatus = async (req, res) => {

  try {

    const stock = await Stock.findById(
      req.params.id
    );


    if (!stock) {

      return res.status(404).json({
        message: "Stock not found",
      });

    }


    stock.isActive = !stock.isActive;


    await stock.save();


    res.status(200).json({

      message: `Stock ${
        stock.isActive
          ? "Activated"
          : "Deactivated"
      } successfully`,

      stock,

    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ========================================
// Get All Transactions
// GET /api/admin/transactions
// ========================================

const getAllTransactions = async (req, res) => {

  try {

    const transactions = await Transaction.find({})

      // Get user details
      .populate(
        "user",
        "name email role"
      )

      // Get stock details
      .populate(
        "stock",
        "symbol companyName"
      )

      // Latest transactions first
      .sort({
        createdAt: -1,
      });


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

// Export Controllers

module.exports = {
  getAllStocks,
  updateStock,
  deleteStock,
  toggleStockStatus,

  adminTest,

  addStock,

  getAllUsers,

  deleteUser, 

  getAllTransactions,

};