const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const stockRoutes = require("./routes/stockRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");

// Load environment variables
dotenv.config();

connectDB();

// Initialize Express
const app = express();


// Middlewares

// Enable CORS
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/stocks", stockRoutes);

app.use("/api/trades", tradeRoutes);

app.use("/api/portfolio", portfolioRoutes);


// Test route
app.get("/", (req, res) => {
  res.json({
    message: "StockTrader Backend API Running Successfully 🚀",
  });
});



// Server port
const PORT = process.env.PORT || 5000;


// Start server
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}`
  );
});