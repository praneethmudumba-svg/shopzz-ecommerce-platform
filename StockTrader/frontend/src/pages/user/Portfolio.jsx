import {
  Line,
  Pie,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../context/useAppContext";


// Register Chart.js Components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);



function Portfolio() {

  const navigate = useNavigate();

  const {
    balance,
    portfolio,
    stocks,
    portfolioValue,
  } = useAppContext();


  // =================================
  // Company Icons
  // =================================

  const companyIcons = {

    AAPL: "🍎",
    MSFT: "🪟",
    GOOGL: "🔍",
    TSLA: "🚗",
    AMZN: "📦",
    META: "📘",
    NVDA: "🧠",
    NFLX: "🎬",
    JPM: "🏦",
    V: "💳",
    WMT: "🛒",
    DIS: "🏰",
    BAC: "💰",
    AMD: "⚙️",
    KO: "🥤",

  };


  // =================================
  // Helper: Get Current Price
  // =================================

  const getCurrentPrice = (symbol) => {

    const stock = stocks.find(
      (item) =>
        item.symbol === symbol
    );

    return stock
      ? stock.currentPrice
      : 0;

  };


  // =================================
  // Total Assets
  // =================================

  const totalAssets =
    balance + portfolioValue;


  // =================================
  // Calculate Portfolio Profit
  // =================================

  const holdingsData = portfolio.map((item) => {
    const currentPrice = getCurrentPrice(item.symbol);
    const currentValue = currentPrice * item.quantity;
    const investment = item.avgPrice * item.quantity;
    const profit = currentValue - investment;

    return {
      ...item,
      currentPrice,
      currentValue,
      investment,
      profit,
    };
  });

  const totalProfit = holdingsData.reduce(
    (sum, h) => sum + h.profit,
    0
  );


  // =================================
  // Best Performing Stock
  // =================================

  const bestStock =
    holdingsData.length > 0

      ? holdingsData.reduce(
          (best, current) =>

            current.profit >
            best.profit

              ? current

              : best
        )

      : null;


  // =================================
  // Portfolio Growth Chart
  // Demo data for now
  // =================================

  const growthData = {

    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
    ],

    datasets: [

      {

        label:
          "Portfolio Growth",

        data: [

          60000,
          72000,
          80000,
          88000,
          94000,
          totalAssets,

        ],

        borderColor:
          "#3B82F6",

        backgroundColor:
          "rgba(59,130,246,0.25)",

        fill: true,

        tension: 0.4,

        pointRadius: 5,

      },

    ],

  };


  // =================================
  // Portfolio Allocation Chart
  // =================================

  const allocationData = {

    labels:

      holdingsData.length > 0

        ? holdingsData.map(
            (item) =>
              item.symbol
          )

        : ["No Holdings"],

    datasets: [

      {

        data:

          holdingsData.length > 0

            ? holdingsData.map(
                (item) =>
                  item.currentValue
              )

            : [1],

        backgroundColor: [

          "#3B82F6",
          "#10B981",
          "#8B5CF6",
          "#F97316",
          "#EC4899",
          "#EAB308",

        ],

        borderWidth: 1,

      },

    ],

  };


  return (

    <div className="
      min-h-screen
      bg-slate-950
      text-white
      p-6
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* =========================
            Portfolio Header
        ========================= */}

        <div className="
          bg-gradient-to-r
          from-blue-900
          via-indigo-900
          to-purple-900
          rounded-3xl
          p-8
          border
          border-white/10
          shadow-xl
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-5
          ">

            <div>

              <h1 className="
                text-4xl
                font-black
              ">

                 My Portfolio

              </h1>

              <p className="
                mt-3
                text-blue-200
                text-lg
              ">

                Track your investments,
                analyze your profits,
                and grow your wealth.

              </p>

            </div>

            <button
              onClick={() =>
                navigate("/market")
              }
              className="
                bg-white
                text-blue-900
                px-6
                py-3
                rounded-xl
                font-bold
                hover:scale-105
                transition
              "
            >

               Buy More Stocks

            </button>

          </div>

        </div>


        {/* =========================
            Analytics Cards
        ========================= */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-5
          gap-5
          mt-8
        ">

          {/* Cash Balance */}

          <div className="
            bg-gradient-to-br
            from-green-600
            to-green-800
            rounded-3xl
            p-6
          ">

            <p className="text-green-100">
               Cash
            </p>

            <h2 className="
              text-2xl
              font-black
              mt-2
            ">

              ${balance.toFixed(2)}

            </h2>

          </div>


          {/* Investments */}

          <div className="
            bg-gradient-to-br
            from-blue-600
            to-blue-800
            rounded-3xl
            p-6
          ">

            <p className="text-blue-100">
               Investments
            </p>

            <h2 className="
              text-2xl
              font-black
              mt-2
            ">

              ${portfolioValue.toFixed(2)}

            </h2>

          </div>


          {/* Total Assets */}

          <div className="
            bg-gradient-to-br
            from-purple-600
            to-purple-800
            rounded-3xl
            p-6
          ">

            <p className="text-purple-100">
               Total Assets
            </p>

            <h2 className="
              text-2xl
              font-black
              mt-2
            ">

              ${totalAssets.toFixed(2)}

            </h2>

          </div>


          {/* Profit/Loss */}

          <div className={`
            rounded-3xl
            p-6
            ${
              totalProfit >= 0
              ? "bg-gradient-to-br from-emerald-600 to-green-800"
              : "bg-gradient-to-br from-red-600 to-red-800"
            }
          `}>

            <p>
               Profit/Loss
            </p>

            <h2 className="
              text-2xl
              font-black
              mt-2
            ">

              {totalProfit >= 0 ? "+" : ""}

              ${totalProfit.toFixed(2)}

            </h2>

          </div>


          {/* Holdings */}

          <div className="
            bg-gradient-to-br
            from-orange-500
            to-red-600
            rounded-3xl
            p-6
          ">

            <p className="text-orange-100">
               Holdings
            </p>

            <h2 className="
              text-2xl
              font-black
              mt-2
            ">

              {portfolio.length}

            </h2>

          </div>

        </div>


        {/* =========================
            Charts Section
        ========================= */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          mt-10
        ">

          {/* Growth Chart */}

          <div className="
            bg-slate-900
            rounded-3xl
            border
            border-white/10
            p-6
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-6
            ">

               Portfolio Growth

            </h2>

            <Line data={growthData} />

          </div>


          {/* Allocation Chart */}

          <div className="
            bg-slate-900
            rounded-3xl
            border
            border-white/10
            p-6
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-6
            ">

               Investment Allocation

            </h2>

            <div className="
              max-w-sm
              mx-auto
            ">

              <Pie data={allocationData} />

            </div>

          </div>

        </div>


        {/* =========================
            Best Performer
        ========================= */}

        {
          bestStock && (

            <div className="
              mt-8
              bg-gradient-to-r
              from-yellow-600
              to-orange-600
              rounded-3xl
              p-6
              shadow-lg
            ">

              <h2 className="
                text-2xl
                font-bold
              ">

                 Best Performing Stock

              </h2>

              <p className="
                text-xl
                mt-3
              ">

                {
                  companyIcons[
                    bestStock.symbol
                  ]
                }

                {" "}

                {bestStock.symbol}

              </p>

              <p className="
                mt-2
                text-lg
              ">

                Profit:

                {" "}

                ${bestStock.profit.toFixed(2)}

              </p>

            </div>

          )
        }


        {/* =========================
            Holdings Section
        ========================= */}

        <div className="
          mt-10
          bg-slate-900
          border
          border-white/10
          rounded-3xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">

             Your Holdings

          </h2>

          {
            holdingsData.length === 0 ? (

              <div className="
                text-center
                py-12
              ">

                <div className="text-6xl">

                  

                </div>

                <h3 className="
                  text-2xl
                  font-bold
                  mt-4
                ">

                  No Stocks In Portfolio

                </h3>

                <p className="
                  text-gray-400
                  mt-2
                ">

                  Start investing by exploring
                  the market and purchasing stocks.

                </p>

                <button
                  onClick={() =>
                    navigate("/market")
                  }
                  className="
                    mt-6
                    bg-blue-600
                    px-6
                    py-3
                    rounded-xl
                    hover:bg-blue-700
                    transition
                  "
                >

                  Explore Market

                </button>

              </div>

            ) : (

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              ">

                {
                  holdingsData.map((item) => (

                    <div
                      key={item.symbol}
                      className="
                        bg-gradient-to-br
                        from-slate-800
                        to-slate-900
                        border
                        border-white/10
                        rounded-3xl
                        p-6
                        hover:border-blue-500
                        hover:-translate-y-2
                        hover:shadow-lg
                        hover:shadow-blue-500/20
                        transition
                      "
                    >

                      {/* Company Header */}

                      <div className="
                        flex
                        justify-between
                        items-center
                      ">

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

                          <div className="
                            w-14
                            h-14
                            rounded-full
                            bg-white/10
                            flex
                            items-center
                            justify-center
                            text-3xl
                          ">

                            {
                              companyIcons[
                                item.symbol
                              ] || "📈"
                            }

                          </div>

                          <div>

                            <h3 className="
                              text-xl
                              font-bold
                            ">

                              {item.symbol}

                            </h3>

                            <p className="
                              text-gray-400
                            ">

                              {item.quantity}
                              {" "}Shares

                            </p>

                          </div>

                        </div>

                        <div className={
                          item.profit >= 0
                          ? "text-green-400 font-bold"
                          : "text-red-400 font-bold"
                        }>

                          {
                            item.profit >= 0
                            ? "▲"
                            : "▼"
                          }

                          ${Math.abs(item.profit)
                            .toFixed(2)}

                        </div>

                      </div>


                      {/* Investment Details */}

                      <div className="
                        mt-6
                        space-y-3
                        text-gray-300
                      ">

                        <div className="
                          flex
                          justify-between
                        ">

                          <span>
                            Average Price
                          </span>

                          <span>
                            ${item.avgPrice.toFixed(2)}
                          </span>

                        </div>

                        <div className="
                          flex
                          justify-between
                        ">

                          <span>
                            Current Price
                          </span>

                          <span>
                            ${item.currentPrice.toFixed(2)}
                          </span>

                        </div>

                        <div className="
                          flex
                          justify-between
                        ">

                          <span>
                            Current Value
                          </span>

                          <span>
                            ${item.currentValue.toFixed(2)}
                          </span>

                        </div>

                      </div>


                      {/* View Stock Button */}

                      <button
                        onClick={() =>
                          navigate(
                            `/stock/${item.symbol}`
                          )
                        }
                        className="
                          mt-6
                          w-full
                          bg-blue-600
                          py-3
                          rounded-xl
                          font-bold
                          hover:bg-blue-700
                          transition
                        "
                      >

                         View Stock

                      </button>

                    </div>

                  ))
                }

              </div>

            )
          }

        </div>

      </div>

    </div>

  );

}


export default Portfolio;