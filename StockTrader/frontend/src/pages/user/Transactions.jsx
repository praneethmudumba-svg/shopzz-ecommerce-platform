import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../context/useAppContext";


function Transactions() {

  const navigate = useNavigate();

  const {
    transactions,
  } = useAppContext();


  // =================================
  // Search & Filter States
  // =================================

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");


  // =================================
  // Filter Transactions
  // =================================

  const filteredTransactions =
    transactions.filter((transaction) => {

      const matchesSearch =

        transaction.symbol
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        transaction.type
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =

        filter === "ALL"

        ||

        transaction.type === filter;

      return (
        matchesSearch &&
        matchesFilter
      );

    });


  // =================================
  // Analytics Calculations
  // =================================

  const totalTrades =
    transactions.length;

  const buyOrders =
    transactions.filter(
      (item) =>
        item.type === "BUY"
    ).length;

  const sellOrders =
    transactions.filter(
      (item) =>
        item.type === "SELL"
    ).length;

  const tradingVolume =
    transactions.reduce(
      (total, item) =>

        total +
        (item.price * item.quantity),

      0
    );


  // =================================
  // Most Traded Stock
  // =================================

  const stockCount = {};

  transactions.forEach((item) => {

    stockCount[item.symbol] =
      (stockCount[item.symbol] || 0)
      + item.quantity;

  });

  const mostTraded =

    Object.keys(stockCount)
      .length > 0

      ? Object.entries(stockCount)
          .reduce((a, b) =>

            a[1] > b[1]

            ? a

            : b
          )

      : null;


  // =================================
  // Largest Transaction
  // =================================

  const largestTrade =

    transactions.length > 0

      ? transactions.reduce(
          (largest, current) =>

            (current.price *
             current.quantity)

            >

            (largest.price *
             largest.quantity)

              ? current

              : largest

        )

      : null;


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
            Premium Header
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

                📜 Trading History

              </h1>

              <p className="
                mt-3
                text-blue-200
                text-lg
              ">

                Analyze your trades,
                monitor your activity,
                and improve your strategy.

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

              📈 Trade More Stocks

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
          lg:grid-cols-4
          gap-5
          mt-8
        ">

          <div className="
            bg-gradient-to-br
            from-blue-600
            to-blue-800
            rounded-3xl
            p-6
          ">

            <p className="text-blue-100">
              💼 Total Trades
            </p>

            <h2 className="
              text-3xl
              font-black
              mt-2
            ">

              {totalTrades}

            </h2>

          </div>

          <div className="
            bg-gradient-to-br
            from-green-600
            to-green-800
            rounded-3xl
            p-6
          ">

            <p className="text-green-100">
              🟢 Buy Orders
            </p>

            <h2 className="
              text-3xl
              font-black
              mt-2
            ">

              {buyOrders}

            </h2>

          </div>

          <div className="
            bg-gradient-to-br
            from-red-600
            to-red-800
            rounded-3xl
            p-6
          ">

            <p className="text-red-100">
              🔴 Sell Orders
            </p>

            <h2 className="
              text-3xl
              font-black
              mt-2
            ">

              {sellOrders}

            </h2>

          </div>

          <div className="
            bg-gradient-to-br
            from-purple-600
            to-purple-800
            rounded-3xl
            p-6
          ">

            <p className="text-purple-100">
              💰 Trading Volume
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
            Search & Filter
        ========================= */}

        <div className="
          mt-8
          bg-slate-900
          border
          border-white/10
          rounded-3xl
          p-6
        ">

          <input
            type="text"
            placeholder="🔍 Search AAPL, BUY, SELL..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              bg-slate-800
              border
              border-white/10
              rounded-xl
              p-3
              mb-5
              text-white
              outline-none
            "
          />

          <div className="flex gap-3">

            {
              [
                "ALL",
                "BUY",
                "SELL",
              ].map((type) => (

                <button
                  key={type}
                  onClick={() =>
                    setFilter(type)
                  }
                  className={`
                    px-5
                    py-2
                    rounded-xl
                    font-semibold
                    transition

                    ${
                      filter === type
                      ? "bg-blue-600"
                      : "bg-white/10 hover:bg-white/20"
                    }
                  `}
                >

                  {type}

                </button>

              ))
            }

          </div>

        </div>


        {/* =========================
            Trading Insights
        ========================= */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          mt-8
        ">

          <div className="
            bg-gradient-to-r
            from-yellow-600
            to-orange-600
            rounded-3xl
            p-6
          ">

            <h2 className="
              text-xl
              font-bold
            ">

              🏆 Most Traded Stock

            </h2>

            <p className="
              text-2xl
              font-black
              mt-3
            ">

              {
                mostTraded
                ? `${mostTraded[0]} (${mostTraded[1]} shares)`
                : "No Data"
              }

            </p>

          </div>

          <div className="
            bg-gradient-to-r
            from-pink-600
            to-red-600
            rounded-3xl
            p-6
          ">

            <h2 className="
              text-xl
              font-bold
            ">

              🔥 Largest Trade

            </h2>

            <p className="
              text-2xl
              font-black
              mt-3
            ">

              {
                largestTrade
                ? `${largestTrade.symbol} - $${(
                    largestTrade.price *
                    largestTrade.quantity
                  ).toFixed(2)}`
                : "No Data"
              }

            </p>

          </div>

        </div>


        {/* =========================
            Transaction Activity
        ========================= */}

        <div className="
          mt-8
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

            📜 Recent Trading Activity

          </h2>

          {
            filteredTransactions.length === 0 ? (

              <div className="
                text-center
                py-12
              ">

                <div className="text-6xl">

                  📭

                </div>

                <h3 className="
                  text-2xl
                  font-bold
                  mt-4
                ">

                  No Transactions Found

                </h3>

                <p className="
                  text-gray-400
                  mt-2
                ">

                  Start trading or change your
                  search filters.

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

              <div className="space-y-5">

                {
                  filteredTransactions.map((trx) => {

                    const totalValue =
                      trx.quantity *
                      trx.price;

                    return (

                      <div
                        key={trx.id}
                        className="
                          bg-gradient-to-br
                          from-slate-800
                          to-slate-900
                          border
                          border-white/10
                          rounded-3xl
                          p-6
                          hover:border-blue-500
                          hover:-translate-y-1
                          hover:shadow-lg
                          hover:shadow-blue-500/20
                          transition
                        "
                      >

                        {/* Header */}

                        <div className="
                          flex
                          flex-col
                          md:flex-row
                          justify-between
                          gap-4
                        ">

                          <div>

                            <h3 className="
                              text-2xl
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
                              mt-1
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
                                "Completed"
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


                        {/* Transaction Details */}

                        <div className="
                          grid
                          grid-cols-2
                          md:grid-cols-4
                          gap-5
                          mt-6
                        ">

                          <div>

                            <p className="text-gray-400">

                              Shares

                            </p>

                            <h4 className="
                              text-xl
                              font-bold
                            ">

                              {trx.quantity}

                            </h4>

                          </div>

                          <div>

                            <p className="text-gray-400">

                              Price

                            </p>

                            <h4 className="
                              text-xl
                              font-bold
                            ">

                              $
                              {trx.price.toFixed(2)}

                            </h4>

                          </div>

                          <div>

                            <p className="text-gray-400">

                              Total Value

                            </p>

                            <h4 className="
                              text-xl
                              font-bold
                            ">

                              $
                              {totalValue.toFixed(2)}

                            </h4>

                          </div>

                          <div>

                            <button
                              onClick={() =>
                                navigate(
                                  `/stock/${trx.symbol}`
                                )
                              }
                              className="
                                mt-4
                                bg-blue-600
                                px-4
                                py-2
                                rounded-xl
                                hover:bg-blue-700
                                transition
                              "
                            >

                              View Stock

                            </button>

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


export default Transactions;