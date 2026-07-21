import {
  useState,
  useMemo,
  useEffect,
} from "react";

import {
  buyStockAPI,
  sellStockAPI,
} from "../services/tradeService";

import { getStocks } from "../services/stockService";
import AppContext from "./AppContext";

import {
  loginUser,
  registerUser,
  getProfile,
} from "../services/authService";

import { getPortfolio } from "../services/portfolioService";

import { getTransactions } from "../services/transactionService";

export const AppProvider = ({ children }) => {

  // Initial demo data
  

  


  // Authentication
  const [user, setUser] = useState(null);

  // Market Data
  const [stocks, setStocks] = useState([]);

  // Trading Account
  const [balance, setBalance] = useState(0);

  const [portfolio, setPortfolio] = useState([]);

  const [transactions, setTransactions] = useState([]);

  




  // ==========================================
  // Load Real Portfolio from Backend
  // ==========================================

  const loadPortfolio = async () => {

    try {

      const response = await getPortfolio();


      setBalance(response.balance);


      const formattedHoldings =
        response.holdings.map((item) => ({
          symbol: item.stock?.symbol || item.symbol,
          quantity: item.quantity,
          avgPrice: item.averagePrice,
        }));


      setPortfolio(formattedHoldings);


    } catch (error) {

      console.error(
        "Failed to load portfolio:",
        error
      );

    }

  };


  // ==========================================
// Load Real Transactions from Backend
// ==========================================

const loadTransactions = async () => {

  try {

    const response = await getTransactions();


    const formattedTransactions =
      response.transactions.map((item) => ({
        id: item._id,
        symbol: item.symbol,
        type: item.type,
        quantity: item.quantity,
        price: item.price,
        totalAmount: item.totalAmount,
        status: item.status,
        date: new Date(item.createdAt)
          .toLocaleString(),
      }));


    setTransactions(
      formattedTransactions
    );


  } catch (error) {

    console.error(
      "Failed to load transactions:",
      error
    );

  }

};


  // ==========================================
  // Restore Login Session
  // Runs when application starts
  // ==========================================

  useEffect(() => {

    const loadUser = async () => {

      try {

        // Check if JWT token exists
        const token = localStorage.getItem("token");


        if (!token) {
          return;
        }


        // Get user profile using token
        const response = await getProfile();


        // Restore user state
        setUser(response.user);

        await loadPortfolio();

        await loadTransactions();


        console.log(
          "Session restored:",
          response.user
        );


      } catch (error) {

        console.error(
          "Session restore failed:",
          error
        );


        // Invalid token
        localStorage.removeItem("token");

        setUser(null);

      }

    };


    loadUser();


  }, []);


  // ==========================================
  // Load Real Stocks from Backend
  // ==========================================

  useEffect(() => {

    const loadStocks = async () => {

      try {

        const response = await getStocks();


        setStocks(response.stocks);


        console.log(
          "Stocks Loaded:",
          response.stocks
        );


      } catch (error) {

        console.error(
          "Failed to load stocks:",
          error
        );

      }

    };


    loadStocks();


  }, []);


  // ==========================================
  // Real Login
  // Connects to Backend API
  // ==========================================

  const login = async (email, password) => {

    try {

      const response = await loginUser({
        email,
        password,
      });

      console.log("Login Response:", response);
      console.log("User Role:", response.user.role);


      // Store JWT Token
      localStorage.setItem(
        "token",
        response.token
      );


      // Store User Details
      setUser(
        response.user
      );

      await loadPortfolio();
      await loadTransactions();


      


      return {
        success: true,
        message: response.message,
      };


    } catch (error) {

      console.error(error);


      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed",
      };

    }

  };


  // ==========================================
  // Real Register
  // Connects to Backend API
  // ==========================================

  const register = async (name, email, password) => {

    try {

      const response = await registerUser({
        name,
        email,
        password,
      });


      // Store JWT Token
      localStorage.setItem(
        "token",
        response.token
      );


      // Store User Details
      setUser(
        response.user
      );

      await loadPortfolio();
      await loadTransactions();

    

      return {
        success: true,
        message: response.message,
      };


    } catch (error) {

      console.error(error);


      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed",
      };

    }

  };


  // ==========================================
  // Logout
  // ==========================================

const logout = () => {

  localStorage.removeItem("token");

  setUser(null);

  setBalance(0);

  setPortfolio([]);

  setTransactions([]);

};


  // ==========================================
  // Real Buy Stock
  // ==========================================

  const buyStock = async (
    stockId,
    quantity
  ) => {

    try {

      const response =
        await buyStockAPI(
          stockId,
          quantity
        );

      await loadPortfolio();
      await loadTransactions();

      return {
        success: true,
        message:
          response.message,
      };


    } catch (error) {

      console.error(error);

      return {

        success: false,

        message:
          error.response?.data?.message ||
          "Purchase failed",

      };

    }

  };


  // ==========================================
  // Real Sell Stock
  // ==========================================

  const sellStock = async (
    stockId,
    quantity
  ) => {

    try {

      const response =
        await sellStockAPI(
          stockId,
          quantity
        );

      await loadPortfolio();
      await loadTransactions();
      return {

        success: true,

        message:
          response.message,

      };


    } catch (error) {

      console.error(error);

      return {

        success: false,

        message:
          error.response?.data?.message ||
          "Sell failed",

      };

    }

  };


  // ==========================================
  // Reset Demo Account
  // ==========================================

  const resetAccount = () => {

  setBalance(0);

  setPortfolio([]);

  setTransactions([]);

};

  // ==========================================
  // Update Profile
  // ==========================================

  const updateProfile = (data) => {

    setUser((prev) => ({
      ...prev,
      ...data,
    }));

  };


  // ==========================================
  // Calculate Portfolio Value
  // ==========================================

  const portfolioValue = useMemo(() => {

    return portfolio.reduce(
      (total, item) => {

        const currentStock =
          stocks.find(
            (stock) =>
              stock.symbol === item.symbol
          );


        const currentPrice =
          currentStock?.currentPrice ||
          item.avgPrice;


        return (
          total +
          currentPrice * item.quantity
        );

      },
      0
    );

  }, [
    portfolio,
    stocks,
  ]);


  // ==========================================
  // Global Context Data
  // ==========================================

  const contextValue = {

    // Authentication
    user,
    login,
    register,
    logout,
    updateProfile,



    // Market
    stocks,
    setStocks,


    // Account
    balance,
    portfolio,
    transactions,
    portfolioValue,


    // Trading
    buyStock,
    sellStock,
    resetAccount,

  };


  return (

    <AppContext.Provider value={contextValue}>

      {children}

    </AppContext.Provider>

  );

};