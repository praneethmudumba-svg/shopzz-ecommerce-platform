import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";

function Home() {

  const navigate = useNavigate();

  const { stocks } = useAppContext();

  const featuredStocks = stocks.slice(0, 4);

  return (

    <div className="bg-slate-950 text-white overflow-hidden">

      {/* ===============================
            HERO SECTION
      =============================== */}

      <section className="relative min-h-screen flex items-center">

        {/* Background Glow */}

        <div
          className="
            absolute
            top-20 left-10
            w-72 h-72
            bg-blue-600/30
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-20 right-10
            w-80 h-80
            bg-purple-600/30
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            grid
            md:grid-cols-2
            gap-12
            items-center
            relative
            z-10
          "
        >

          {/* Left Side Content */}

          <div>

            <span
              className="
                text-blue-400
                font-semibold
                tracking-[5px]
              "
            >
              NEXT GENERATION TRADING
            </span>

            <h1
              className="
                mt-6
                text-5xl
                md:text-7xl
                font-black
                leading-tight
              "
            >

              Trade The

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-blue-400
                  via-cyan-300
                  to-purple-500
                  bg-clip-text
                  text-transparent
                "
              >
                Future Of Investing
              </span>

            </h1>

            <p
              className="
                mt-8
                text-lg
                text-gray-400
                leading-relaxed
                max-w-xl
              "
            >
              Experience a professional virtual stock
              trading platform with real-time market
              simulation, portfolio management, and
              powerful analytics.
            </p>

            {/* Action Buttons */}

            <div className="mt-10 flex flex-wrap gap-5">

              <button
                onClick={() => navigate("/register")}
                className="
                  px-8 py-4
                  rounded-full
                  font-semibold
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  hover:scale-105
                  transition
                  shadow-lg
                  shadow-blue-500/40
                "
              >
                Start Trading →
              </button>

              <button
                onClick={() => navigate("/market")}
                className="
                  px-8 py-4
                  rounded-full
                  border
                  border-white/20
                  bg-white/5
                  backdrop-blur-md
                  hover:bg-white/10
                  transition
                "
              >
                Explore Market
              </button>

            </div>

            {/* Mini Stats */}

            <div
              className="
                mt-12
                flex
                gap-10
                flex-wrap
              "
            >

              <div>
                <h2 className="text-3xl font-bold text-green-400">
                  15+
                </h2>
                <p className="text-gray-500">
                  Stocks Available
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-cyan-400">
                  $100K
                </h2>
                <p className="text-gray-500">
                  Virtual Balance
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-purple-400">
                  24/7
                </h2>
                <p className="text-gray-500">
                  Market Access
                </p>
              </div>

            </div>

          </div>

          {/* Right Side Market Cards */}

          <div className="space-y-5">

            {
              featuredStocks.map((stock) => (

                <div
                  key={stock._id}
                  className="
                    bg-white/5
                    border
                    border-white/10
                    rounded-2xl
                    backdrop-blur-lg
                    p-5
                    hover:scale-105
                    transition
                    duration-300
                  "
                >

                  <div className="flex justify-between">

                    <div>
                      <h2 className="text-2xl font-bold">
                        {stock.symbol}
                      </h2>
                      <p className="text-gray-400">
                        {stock.companyName}
                      </p>
                    </div>

                    <div
                      className={
                        stock.changePercentage >= 0
                          ? "text-green-400 font-bold"
                          : "text-red-400 font-bold"
                      }
                    >
                      {
                        stock.changePercentage >= 0
                          ? "▲"
                          : "▼"
                      }
                      {
                        Math.abs(
                          stock.changePercentage
                        ).toFixed(2)
                      }%
                    </div>

                  </div>

                  <h3 className="text-3xl font-bold mt-5">
                    ${stock.currentPrice.toFixed(2)}
                  </h3>

                </div>

              ))
            }

          </div>

        </div>

      </section>

      {/* ===============================
          PLATFORM STATISTICS
      =============================== */}

      <section className="py-20 bg-slate-900">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Trusted Virtual Trading Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-8
              text-center
              hover:-translate-y-2
              transition
            ">
              <h3 className="text-5xl font-black text-blue-400">
                15+
              </h3>
              <p className="mt-3 text-gray-400">
                Available Stocks
              </p>
            </div>

            <div className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-8
              text-center
              hover:-translate-y-2
              transition
            ">
              <h3 className="text-5xl font-black text-green-400">
                $100K
              </h3>
              <p className="mt-3 text-gray-400">
                Virtual Capital
              </p>
            </div>

            <div className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-8
              text-center
              hover:-translate-y-2
              transition
            ">
              <h3 className="text-5xl font-black text-purple-400">
                24/7
              </h3>
              <p className="mt-3 text-gray-400">
                Trading Access
              </p>
            </div>

            <div className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-8
              text-center
              hover:-translate-y-2
              transition
            ">
              <h3 className="text-5xl font-black text-cyan-400">
                100%
              </h3>
              <p className="mt-3 text-gray-400">
                Secure Authentication
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* ===============================
          FEATURED STOCKS
      =============================== */}

      <section className="py-20 bg-slate-950">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-10">

            <h2 className="text-4xl font-bold">
              Trending Stocks
            </h2>

            <button
              onClick={() => navigate("/market")}
              className="
                px-6 py-3
                rounded-full
                bg-blue-600
                hover:bg-blue-700
                transition
              "
            >
              View Market →
            </button>

          </div>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          ">

            {
              featuredStocks.map((stock) => (

                <div
                  key={stock._id}
                  className="
                    bg-slate-900
                    border border-white/10
                    rounded-3xl
                    p-6
                    hover:border-blue-500
                    hover:scale-105
                    transition
                  "
                >

                  <div className="flex justify-between">

                    <div>
                      <h3 className="text-2xl font-bold">
                        {stock.symbol}
                      </h3>
                      <p className="text-gray-400 mt-2">
                        {stock.companyName}
                      </p>
                    </div>

                    <span
                      className={
                        stock.changePercentage >= 0
                          ? "text-green-400 font-bold"
                          : "text-red-400 font-bold"
                      }
                    >
                      {
                        stock.changePercentage >= 0
                          ? "▲"
                          : "▼"
                      }
                      {
                        Math.abs(stock.changePercentage)
                        .toFixed(2)
                      }%
                    </span>

                  </div>

                  <h2 className="text-3xl font-bold mt-8">
                    ${stock.currentPrice.toFixed(2)}
                  </h2>

                  <p className="text-gray-400 mt-3">
                    Sector: {stock.sector}
                  </p>

                  <button
                    onClick={() => navigate("/market")}
                    className="
                      mt-6
                      w-full
                      bg-gradient-to-r
                      from-blue-600
                      to-cyan-500
                      py-3
                      rounded-xl
                      font-semibold
                      hover:opacity-90
                      transition
                    "
                  >
                    Trade Now
                  </button>

                </div>

              ))
            }

          </div>

        </div>

      </section>

      {/* ===============================
          WHY CHOOSE STOCKTRADER
      =============================== */}

      <section className="py-20 bg-slate-900">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="
            text-4xl
            font-bold
            text-center
            mb-14
          ">
            Why Choose StockTrader?
          </h2>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          ">

            <div className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-8
              hover:-translate-y-2
              transition
            ">
              <div className="text-5xl mb-5">
                
              </div>
              <h3 className="text-xl font-bold mb-3">
                Virtual Trading
              </h3>
              <p className="text-gray-400">
                Practice buying and selling stocks with
                virtual money without any financial risk.
              </p>
            </div>

            <div className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-8
              hover:-translate-y-2
              transition
            ">
              <div className="text-5xl mb-5">
                
              </div>
              <h3 className="text-xl font-bold mb-3">
                Portfolio Management
              </h3>
              <p className="text-gray-400">
                Monitor your holdings, account balance,
                profits, and investment performance.
              </p>
            </div>

            <div className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-8
              hover:-translate-y-2
              transition
            ">
              <div className="text-5xl mb-5">
                
              </div>
              <h3 className="text-xl font-bold mb-3">
                Secure Authentication
              </h3>
              <p className="text-gray-400">
                JWT based authentication and encrypted
                passwords protect your account securely.
              </p>
            </div>

            <div className="
              bg-white/5
              border border-white/10
              rounded-2xl
              p-8
              hover:-translate-y-2
              transition
            ">
              <div className="text-5xl mb-5">
                
              </div>
              <h3 className="text-xl font-bold mb-3">
                Market Analytics
              </h3>
              <p className="text-gray-400">
                Analyze stock movements and make smarter
                investment decisions using market insights.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>

  );

}

export default Home;