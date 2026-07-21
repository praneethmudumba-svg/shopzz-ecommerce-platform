const Stock = require("../models/Stock");


// ==========================================
// Create Stock
// POST /api/stocks
// ADMIN ONLY
// ==========================================

const createStock = async (req, res) => {
  try {

    const {
      symbol,
      companyName,
      currentPrice,
      sector,
      marketCap,
      volume,
    } = req.body;


    // Validate required fields
    if (
      !symbol ||
      !companyName ||
      !currentPrice
    ) {
      return res.status(400).json({
        message: "Symbol, company name and price are required",
      });
    }


    // Check existing stock
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
      symbol,
      companyName,
      currentPrice,
      sector,
      marketCap,
      volume,
    });


    // Response
    res.status(201).json({
      message: "Stock created successfully",
      stock,
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==========================================
// Get All Stocks
// GET /api/stocks
// PUBLIC
// ==========================================

const getAllStocks = async (req, res) => {
  try {

    const stocks = await Stock.find({
      isActive: true,
    });

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

// ==========================================
// Get Single Stock
// GET /api/stocks/:id
// PUBLIC
// ==========================================

const getStockById = async (req, res) => {
  try {

    const stock = await Stock.findById(req.params.id);

    // Check stock exists
    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }

    res.status(200).json({
      stock,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

// ==========================================
// Update Stock
// PUT /api/stocks/:id
// ADMIN ONLY
// ==========================================

const updateStock = async (req, res) => {
  try {

    const stock = await Stock.findById(req.params.id);


    // Check if stock exists
    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }


    // Update stock fields
    stock.symbol =
      req.body.symbol || stock.symbol;

    stock.companyName =
      req.body.companyName || stock.companyName;

    stock.currentPrice =
      req.body.currentPrice || stock.currentPrice;

    stock.sector =
      req.body.sector || stock.sector;

    stock.marketCap =
      req.body.marketCap || stock.marketCap;

    stock.volume =
      req.body.volume || stock.volume;

    stock.priceChange =
      req.body.priceChange || stock.priceChange;

    stock.changePercentage =
      req.body.changePercentage || stock.changePercentage;

    stock.isActive =
      req.body.isActive ?? stock.isActive;


    const updatedStock = await stock.save();


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

// ==========================================
// Delete Stock
// DELETE /api/stocks/:id
// ADMIN ONLY
// ==========================================

const deleteStock = async (req, res) => {
  try {

    const stock = await Stock.findById(req.params.id);


    // Check if stock exists
    if (!stock) {
      return res.status(404).json({
        message: "Stock not found",
      });
    }


    // Delete stock
    await stock.deleteOne();


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

module.exports = {
  createStock,
  getAllStocks,
  getStockById,
  updateStock,
  deleteStock,
};