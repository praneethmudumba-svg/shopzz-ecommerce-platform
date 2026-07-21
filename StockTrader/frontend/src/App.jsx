import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Public Pages
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Market from "./pages/public/Market";

// User Pages
import Dashboard from "./pages/user/Dashboard";
import StockDetails from "./pages/user/StockDetails";
import Portfolio from "./pages/user/Portfolio";
import Transactions from "./pages/user/Transactions";
import Profile from "./pages/user/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageStocks from "./pages/admin/ManageStocks";
import ManageTransactions from "./pages/admin/ManageTransactions";

import { useAppContext } from "./context/useAppContext";


function App() {

  const { user } = useAppContext();


  return (
    <>
      <Navbar />

      <main>

        <Routes>

          {/* ========================
              Public Routes
          ======================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/market"
            element={<Market />}
          />


          {/* ========================
              User Routes
          ======================== */}

          <Route
            path="/dashboard"
            element={
              user?.role?.toLowerCase() === "user"
                ? <Dashboard />
                : <Unauthorized />
            }
          />


          {/* IMPORTANT FIX */}
          <Route
            path="/stock/:symbol"
            element={
              user
                ? <StockDetails />
                : <Unauthorized />
            }
          />


          <Route
            path="/portfolio"
            element={
              user?.role?.toLowerCase() === "user"
                ? <Portfolio />
                : <Unauthorized />
            }
          />


          <Route
            path="/transactions"
            element={
              user?.role?.toLowerCase() === "user"
                ? <Transactions />
                : <Unauthorized />
            }
          />


          <Route
            path="/profile"
            element={
              user
                ? <Profile />
                : <Unauthorized />
            }
          />


          {/* ========================
              Admin Routes
          ======================== */}

          <Route
            path="/admin-dashboard"
            element={
              user?.role?.toLowerCase() === "admin"
                ? <AdminDashboard />
                : <Unauthorized />
            }
          />


          <Route
            path="/admin-users"
            element={
              user?.role?.toLowerCase() === "admin"
                ? <ManageUsers />
                : <Unauthorized />
            }
          />


          <Route
            path="/admin-stocks"
            element={
              user?.role?.toLowerCase() === "admin"
                ? <ManageStocks />
                : <Unauthorized />
            }
          />


          <Route
            path="/admin-transactions"
            element={
              user?.role?.toLowerCase() === "admin"
                ? <ManageTransactions />
                : <Unauthorized />
            }
          />


          {/* ========================
              404 Route
          ======================== */}

          <Route
            path="*"
            element={<NotFound />}
          />


        </Routes>

      </main>

      <Footer />

    </>
  );

}


// ========================
// Unauthorized Component
// ========================

function Unauthorized() {

  const navigate = useNavigate();


  return (

    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-red-600">
        Access Denied
      </h1>


      <p className="mt-3 text-gray-600">
        You are not authorized to view this page.
      </p>


      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Go Home
      </button>

    </div>

  );

}


// ========================
// 404 Component
// ========================

function NotFound() {

  const navigate = useNavigate();


  return (

    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-6xl font-bold">
        404
      </h1>


      <p className="mt-3 text-gray-600">
        Page Not Found
      </p>


      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Go Home
      </button>

    </div>

  );

}


export default App;