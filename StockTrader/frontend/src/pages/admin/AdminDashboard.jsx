import {
  Pie,
  Bar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useAppContext } from "../../context/useAppContext";


// Register Chart Components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function AdminDashboard() {


  const {
    stocks,
    transactions,
    user,
  } = useAppContext();



  // ============================
  // Admin Statistics
  // ============================

  const totalUsers = 1; // Temporary


  const totalStocks =
    stocks.length;


  const totalTrades =
    transactions.length;



  const marketValue =
    stocks.reduce(
      (total, stock) =>
        total + stock.currentPrice,
      0
    );



  const tradingVolume =
    transactions.reduce(
      (total, trx) =>
        total +
        (trx.quantity * trx.price),
      0
    );



  // ============================
  // Highest Price Stock
  // ============================

  const highestStock =
    stocks.length > 0
      ? stocks.reduce(
          (highest, current) =>
            current.currentPrice >
            highest.currentPrice
              ? current
              : highest
        )
      : null;



  // ============================
  // Most Traded Stock
  // ============================

  const stockCount = {};


  transactions.forEach((trx) => {

    stockCount[trx.symbol] =
      (stockCount[trx.symbol] || 0)
      + trx.quantity;

  });


  const mostTraded =
    Object.keys(stockCount).length > 0
      ? Object.entries(stockCount)
          .reduce(
            (a, b) =>
              a[1] > b[1]
                ? a
                : b
          )
      : null;



  // ============================
  // Stock Distribution Chart
  // ============================

  const stockDistribution = {

    labels:
      stocks.map(
        (stock) =>
          stock.symbol
      ),


    datasets: [

      {
        label:
          "Stock Prices",

        data:
          stocks.map(
            (stock) =>
              stock.currentPrice
          ),


        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#8B5CF6",
          "#F97316",
          "#EC4899",
          "#EAB308",
          "#06B6D4",
        ],

        borderWidth: 1,

      },

    ],

  };



  // ============================
  // Buy vs Sell Chart
  // ============================

  const tradingChart = {

    labels: [
      "BUY",
      "SELL",
    ],


    datasets: [

      {

        label:
          "Trading Activity",


        data: [

          transactions.filter(
            (trx) =>
              trx.type === "BUY"
          ).length,


          transactions.filter(
            (trx) =>
              trx.type === "SELL"
          ).length,

        ],


        backgroundColor: [
          "#22C55E",
          "#EF4444",
        ],

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
            Admin Header
        ========================= */}

        <div className="
          bg-gradient-to-r
          from-purple-900
          via-indigo-900
          to-blue-900
          rounded-3xl
          p-8
          border border-white/10
          shadow-xl
        ">


          <div className="
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-6
          ">


            <div>

              <h1 className="
                text-4xl
                font-black
              ">

                👑 Admin Control Center

              </h1>


              <p className="
                text-gray-300
                mt-3
                text-lg
              ">

                Welcome back, {user?.name}

              </p>


              <p className="
                text-blue-300
                mt-2
              ">

                Monitor users, stocks, transactions
                and platform performance.

              </p>


            </div>


            <div className="
              bg-green-500/20
              border border-green-500/40
              rounded-2xl
              px-6 py-4
              text-center
            ">

              <h3 className="
                text-green-300
                font-bold
              ">

                🟢 SYSTEM ONLINE

              </h3>


              <p className="
                text-sm
                text-gray-300
                mt-1
              ">

                Real-time monitoring active

              </p>

            </div>


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


          {/* Users */}

          <div className="
            bg-blue-600/20
            border border-blue-500/30
            rounded-3xl
            p-6
            hover:scale-105
            transition
          ">

            <p className="text-blue-300">
              👥 Users
            </p>


            <h2 className="
              text-3xl
              font-black
              mt-2
            ">
              {totalUsers}
            </h2>

          </div>



          {/* Stocks */}

          <div className="
            bg-green-600/20
            border border-green-500/30
            rounded-3xl
            p-6
            hover:scale-105
            transition
          ">

            <p className="text-green-300">
              📈 Stocks
            </p>


            <h2 className="
              text-3xl
              font-black
              mt-2
            ">
              {totalStocks}
            </h2>

          </div>



          {/* Trades */}

          <div className="
            bg-purple-600/20
            border border-purple-500/30
            rounded-3xl
            p-6
            hover:scale-105
            transition
          ">

            <p className="text-purple-300">
              📜 Trades
            </p>


            <h2 className="
              text-3xl
              font-black
              mt-2
            ">
              {totalTrades}
            </h2>

          </div>



          {/* Market Value */}

          <div className="
            bg-orange-600/20
            border border-orange-500/30
            rounded-3xl
            p-6
            hover:scale-105
            transition
          ">

            <p className="text-orange-300">
              💰 Market Value
            </p>


            <h2 className="
              text-2xl
              font-black
              mt-2
            ">
              ${marketValue.toFixed(2)}
            </h2>

          </div>



          {/* Trading Volume */}

          <div className="
            bg-cyan-600/20
            border border-cyan-500/30
            rounded-3xl
            p-6
            hover:scale-105
            transition
          ">

            <p className="text-cyan-300">
              ⚡ Volume
            </p>


            <h2 className="
              text-2xl
              font-black
              mt-2
            ">
              ${tradingVolume.toFixed(2)}
            </h2>

          </div>


        </div>



        {/* =========================
            Market Insights
        ========================= */}

        <div className="
          grid
          md:grid-cols-3
          gap-6
          mt-8
        ">


          <div className="
            bg-slate-900
            border border-white/10
            rounded-3xl
            p-6
          ">

            <h3 className="text-xl font-bold">
              🏆 Top Stock
            </h3>

            <p className="mt-3 text-gray-300">
              {highestStock
                ? highestStock.symbol
                : "No Data"}
            </p>

          </div>



          <div className="
            bg-slate-900
            border border-white/10
            rounded-3xl
            p-6
          ">

            <h3 className="text-xl font-bold">
              🔥 Most Traded
            </h3>

            <p className="mt-3 text-gray-300">
              {mostTraded
                ? mostTraded[0]
                : "No Data"}
            </p>

          </div>



          <div className="
            bg-slate-900
            border border-white/10
            rounded-3xl
            p-6
          ">

            <h3 className="text-xl font-bold">
              🟢 Market Status
            </h3>

            <p className="mt-3 text-green-400">
              LIVE
            </p>

          </div>


        </div>



        {/* =========================
            Charts
        ========================= */}

        <div className="
          grid
          lg:grid-cols-2
          gap-6
          mt-8
        ">


          {/* Stock Distribution */}

          <div className="
            bg-slate-900
            border border-white/10
            rounded-3xl
            p-6
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-5
            ">

              📈 Stock Distribution

            </h2>


            <Pie data={stockDistribution} />

          </div>



          {/* Trading Activity */}

          <div className="
            bg-slate-900
            border border-white/10
            rounded-3xl
            p-6
          ">

            <h2 className="
              text-2xl
              font-bold
              mb-5
            ">

              📊 BUY vs SELL Activity

            </h2>


            <Bar data={tradingChart} />

          </div>


        </div>

                {/* =========================
            Quick Admin Actions
        ========================= */}

        <div className="
          mt-8
          bg-slate-900
          border border-white/10
          rounded-3xl
          p-6
        ">


          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">

            ⚡ Quick Admin Actions

          </h2>


          <div className="
            grid
            grid-cols-1
            md:grid-cols-4
            gap-4
          ">


            <button
              className="
                bg-blue-600
                hover:bg-blue-700
                p-4
                rounded-2xl
                font-semibold
                transition
                hover:scale-105
              "
            >
              ➕ Add New Stock
            </button>


            <button
              className="
                bg-green-600
                hover:bg-green-700
                p-4
                rounded-2xl
                font-semibold
                transition
                hover:scale-105
              "
            >
              👥 Manage Users
            </button>


            <button
              className="
                bg-purple-600
                hover:bg-purple-700
                p-4
                rounded-2xl
                font-semibold
                transition
                hover:scale-105
              "
            >
              📈 Manage Stocks
            </button>


            <button
              className="
                bg-orange-600
                hover:bg-orange-700
                p-4
                rounded-2xl
                font-semibold
                transition
                hover:scale-105
              "
            >
              📜 View Trades
            </button>


          </div>


        </div>



        {/* =========================
            Recent Trading Activity
        ========================= */}


        <div className="
          mt-8
          bg-slate-900
          border border-white/10
          rounded-3xl
          p-6
        ">


          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">

            📜 Recent Platform Activity

          </h2>


          {
            transactions.length === 0 ? (


              <div className="
                text-center
                py-10
              ">


                <div className="text-6xl">
                  📭
                </div>


                <h3 className="
                  text-2xl
                  font-bold
                  mt-4
                ">

                  No Trading Activity

                </h3>


                <p className="
                  text-gray-400
                  mt-2
                ">

                  User transactions will appear here.

                </p>


              </div>


            ) : (


              <div className="
                space-y-5
              ">


                {
                  transactions
                    .slice(0, 5)
                    .map((trx) => {


                    const totalValue =
                      trx.quantity *
                      trx.price;


                    return (


                      <div
                        key={trx.id}
                        className="
                          bg-gradient-to-r
                          from-slate-800
                          to-slate-900
                          border
                          border-white/10
                          rounded-2xl
                          p-5
                          hover:border-blue-500
                          transition
                        "
                      >


                        <div className="
                          flex
                          flex-col
                          md:flex-row
                          justify-between
                          gap-4
                        ">


                          <div>


                            <h3 className="
                              text-xl
                              font-bold
                            ">


                              {
                                trx.type === "BUY"
                                  ? "🟢 BUY"
                                  : "🔴 SELL"
                              }

                              {" "}

                              {trx.symbol}


                            </h3>


                            <p className="
                              text-gray-400
                              mt-2
                            ">

                              Transaction ID:
                              {" "}
                              {trx.id}

                            </p>


                          </div>



                          <div className="
                            text-left
                            md:text-right
                          ">


                            <p className="
                              text-blue-400
                              font-semibold
                            ">

                              {
                                trx.status ||
                                "COMPLETED"
                              }

                            </p>


                            <p className="
                              text-gray-500
                              mt-1
                            ">

                              {trx.date}

                            </p>


                          </div>


                        </div>



                        <div className="
                          grid
                          grid-cols-2
                          md:grid-cols-3
                          gap-4
                          mt-5
                        ">


                          <div>

                            <p className="text-gray-400">
                              Shares
                            </p>


                            <h4 className="font-bold">
                              {trx.quantity}
                            </h4>

                          </div>


                          <div>

                            <p className="text-gray-400">
                              Price
                            </p>


                            <h4 className="font-bold">
                              ${trx.price.toFixed(2)}
                            </h4>

                          </div>


                          <div>

                            <p className="text-gray-400">
                              Total Value
                            </p>


                            <h4 className="font-bold">
                              ${totalValue.toFixed(2)}
                            </h4>

                          </div>


                        </div>


                      </div>


                    );


                  })

                }


              </div>


            )

          }


        </div>


      </div>


    </div>

  );

}


export default AdminDashboard;