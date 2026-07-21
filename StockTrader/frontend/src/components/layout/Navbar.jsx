import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAppContext();


  const isActive = (path) => {
    return location.pathname === path;
  };


  const navClass = (path) =>
    `
      px-4 py-2 rounded-full
      transition-all duration-300
      ${
        isActive(path)
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      }
    `;


  return (

    <nav
      className="
        sticky top-0 z-50
        bg-slate-950/70
        backdrop-blur-xl
        border-b border-white/10
        shadow-lg shadow-blue-500/10
      "
    >

      <div
        className="
          max-w-7xl mx-auto
          px-8 py-4
          flex items-center justify-between
        "
      >


        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="
            flex items-center gap-3
            cursor-pointer group
          "
        >

          <div
            className="
              w-11 h-11 rounded-full
              bg-gradient-to-r
              from-blue-500 via-cyan-400 to-purple-500
              flex items-center justify-center
              text-xl
              shadow-lg shadow-blue-500/50
              group-hover:scale-110
              transition duration-300
            "
          >
            📈
          </div>


          <div>

            <h1
              className="
                text-2xl font-bold
                bg-gradient-to-r
                from-blue-400 via-cyan-300 to-purple-400
                text-transparent bg-clip-text
              "
            >
              StockTrader
            </h1>


            <p className="text-xs text-gray-400">
              Trade Smart. Invest Better.
            </p>

          </div>

        </div>


        {/* Center Navigation */}
        <div className="flex items-center gap-2">


          {/* Guest Navigation */}
          {!user && (
            <>

              <button
                onClick={() => navigate("/")}
                className={navClass("/")}
              >
                Home
              </button>


              <button
                onClick={() => navigate("/market")}
                className={navClass("/market")}
              >
                Market
              </button>


              <button
                onClick={() => navigate("/login")}
                className={navClass("/login")}
              >
                Login
              </button>


              <button
                onClick={() => navigate("/register")}
                className="
                  px-5 py-2 rounded-full
                  bg-gradient-to-r
                  from-blue-600 to-cyan-500
                  hover:scale-105
                  transition
                  text-white
                  font-semibold
                "
              >
                Get Started
              </button>

            </>
          )}


          {/* User Navigation */}
          {user?.role?.toLowerCase() === "user" && (
            <>

              <button
                onClick={() => navigate("/dashboard")}
                className={navClass("/dashboard")}
              >
                Dashboard
              </button>


              <button
                onClick={() => navigate("/market")}
                className={navClass("/market")}
              >
                Market
              </button>


              <button
                onClick={() => navigate("/portfolio")}
                className={navClass("/portfolio")}
              >
                Portfolio
              </button>


              <button
                onClick={() => navigate("/transactions")}
                className={navClass("/transactions")}
              >
                History
              </button>


              <button
                onClick={() => navigate("/profile")}
                className={navClass("/profile")}
              >
                Profile
              </button>

            </>
          )}


          {/* Admin Navigation */}
          {user?.role?.toLowerCase() === "admin" && (
            <>

              <button
                onClick={() => navigate("/admin-dashboard")}
                className={navClass("/admin-dashboard")}
              >
                Dashboard
              </button>


              <button
                onClick={() => navigate("/admin-users")}
                className={navClass("/admin-users")}
              >
                Users
              </button>


              <button
                onClick={() => navigate("/admin-stocks")}
                className={navClass("/admin-stocks")}
              >
                Stocks
              </button>


              <button
                onClick={() => navigate("/admin-transactions")}
                className={navClass("/admin-transactions")}
              >
                Trades
              </button>


              <button
                onClick={() => navigate("/profile")}
                className={navClass("/profile")}
              >
                Profile
              </button>

            </>
          )}

        </div>


        {/* Right Side */}
        <div className="flex items-center gap-4">


          {/* Market Status */}
          <div
            className="
              hidden md:flex items-center gap-2
              bg-green-500/15
              px-3 py-2 rounded-full
              border border-green-500/30
            "
          >

            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>


            <span className="text-green-300 text-sm font-medium">
              MARKET LIVE
            </span>

          </div>


          {/* User Info */}
          {user && (
            <>

              <div
                className="
                  flex items-center gap-3
                  bg-white/5
                  border border-white/10
                  rounded-full
                  px-3 py-2
                "
              >

                <div
                  className="
                    w-9 h-9 rounded-full
                    bg-gradient-to-r
                    from-blue-500 to-purple-500
                    flex items-center justify-center
                    font-bold text-white
                  "
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>


                <div className="hidden lg:block">

                  <p className="text-sm text-white font-medium">
                    {user.name}
                  </p>


                  <p
                    className={`
                      text-xs font-semibold
                      ${
                        user.role.toLowerCase() === "admin"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }
                    `}
                  >
                    {user.role}
                  </p>

                </div>

              </div>


              <button
                onClick={logout}
                className="
                  px-4 py-2 rounded-full
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  transition duration-300
                  hover:scale-105
                "
              >
                Logout
              </button>

            </>
          )}

        </div>

      </div>

    </nav>

  );

}


export default Navbar;