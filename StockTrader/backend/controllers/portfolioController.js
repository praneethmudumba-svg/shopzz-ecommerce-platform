const Portfolio = require("../models/Portfolio");


// ==========================================
// Get Current User Portfolio
// GET /api/portfolio
// PROTECTED
// ==========================================

const getPortfolio = async (req, res) => {

  try {

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


    res.status(200).json({
      balance: portfolio.balance,

      holdings: portfolio.holdings,

      totalInvestment:
        portfolio.totalInvestment,

      totalProfitLoss:
        portfolio.totalProfitLoss,
    });


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

};


module.exports = {
  getPortfolio,
};