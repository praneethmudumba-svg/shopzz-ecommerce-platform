import {
  useState,
  useEffect,
} from "react";

import API from "../../services/api";


function ManageTransactions() {


  // ================================
  // States
  // ================================

  const [transactions, setTransactions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("ALL");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ================================
  // Load All Transactions
  // GET /api/admin/transactions
  // ================================

  const fetchTransactions = async () => {

    try {

      setLoading(true);


      const response =
        await API.get(
          "/admin/transactions"
        );


      setTransactions(
        response.data.transactions
      );


      setError("");


    } catch (error) {

      console.error(
        "Transaction loading failed:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Unable to load transactions"
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchTransactions();

  }, []);


  // ================================
  // Filter Transactions
  // ================================

  const filteredTransactions =
    transactions.filter((transaction) => {


      const matchesSearch =

        transaction.symbol
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        transaction.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        transaction.user?.email
          ?.toLowerCase()
          .includes(search.toLowerCase())

        ||

        transaction._id
          .toLowerCase()
          .includes(search.toLowerCase());



      const matchesFilter =

        filter === "ALL" ||

        transaction.type === filter;


      return (
        matchesSearch &&
        matchesFilter
      );

    });



  // ================================
  // Analytics
  // ================================


  const totalTrades =
    transactions.length;


  const buyTrades =
    transactions.filter(
      (trx) =>
        trx.type === "BUY"
    ).length;


  const sellTrades =
    transactions.filter(
      (trx) =>
        trx.type === "SELL"
    ).length;



  const tradingVolume =
    transactions.reduce(
      (total, trx) =>
        total + trx.totalAmount,
      0
    );

      return (

    <div className="min-h-screen bg-slate-950 text-white p-6">

      <div className="max-w-7xl mx-auto">


        {/* ===============================
             Header
        =============================== */}

        <div
          className="
            bg-gradient-to-r
            from-purple-900
            via-blue-900
            to-cyan-900
            rounded-3xl
            p-8
            border border-white/10
          "
        >

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">


            <div>

              <h1 className="text-4xl font-black">
                📜 Transaction Management Center
              </h1>


              <p className="text-gray-300 mt-3">
                Monitor all trading activity across the platform.
              </p>

            </div>


            <div
              className="
                bg-green-500/20
                border
                border-green-500/30
                px-6
                py-4
                rounded-2xl
              "
            >

              <p className="text-green-300 font-bold">
                🔐 ADMIN MONITORING
              </p>


              <p className="text-sm text-gray-300">
                Real-time trade analytics
              </p>

            </div>

          </div>

        </div>


        {/* ===============================
             Analytics Cards
        =============================== */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">


          {/* Total Trades */}

          <div className="bg-blue-600/20 border border-blue-500/30 rounded-3xl p-6">

            <p className="text-blue-300">
              📜 Total Trades
            </p>


            <h2 className="text-4xl font-black mt-2">
              {totalTrades}
            </h2>

          </div>


          {/* BUY Orders */}

          <div className="bg-green-600/20 border border-green-500/30 rounded-3xl p-6">

            <p className="text-green-300">
              🟢 BUY Orders
            </p>


            <h2 className="text-4xl font-black mt-2">
              {buyTrades}
            </h2>

          </div>


          {/* SELL Orders */}

          <div className="bg-red-600/20 border border-red-500/30 rounded-3xl p-6">

            <p className="text-red-300">
              🔴 SELL Orders
            </p>


            <h2 className="text-4xl font-black mt-2">
              {sellTrades}
            </h2>

          </div>


          {/* Trading Volume */}

          <div className="bg-purple-600/20 border border-purple-500/30 rounded-3xl p-6">

            <p className="text-purple-300">
              💰 Trading Volume
            </p>


            <h2 className="text-2xl font-black mt-2">
              ${tradingVolume.toLocaleString()}
            </h2>

          </div>


        </div>



        {/* ===============================
             Search & Filter Controls
        =============================== */}

        <div
          className="
            mt-8
            bg-slate-900
            border border-white/10
            rounded-3xl
            p-6
            flex flex-col md:flex-row gap-4
          "
        >


          {/* Search */}

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="
            Search by user, email, stock or transaction ID..."
            className="
              flex-1
              p-4
              rounded-2xl
              bg-slate-800
              border border-white/10
              focus:outline-none
              focus:border-blue-500
            "
          />
                    <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by user, email, stock or transaction ID..."
            className="
              flex-1
              p-4
              rounded-2xl
              bg-slate-800
              border border-white/10
              focus:outline-none
              focus:border-blue-500
            "
          />


          {/* Filter */}

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="
              p-4
              rounded-2xl
              bg-slate-800
              border border-white/10
              focus:outline-none
              focus:border-blue-500
            "
          >

            <option value="ALL">
              All Trades
            </option>


            <option value="BUY">
              BUY Orders
            </option>


            <option value="SELL">
              SELL Orders
            </option>

          </select>


        </div>
                {/* ===============================
             Transactions List
        =============================== */}

        {
          loading ? (

            <div
              className="
                mt-8
                text-center
                text-xl
                text-gray-400
              "
            >
              Loading transactions...
            </div>

          ) : error ? (

            <div
              className="
                mt-8
                bg-red-500/20
                border border-red-500/30
                text-red-300
                rounded-3xl
                p-6
                text-center
              "
            >

              ❌ {error}

            </div>

          ) : filteredTransactions.length === 0 ? (

            <div
              className="
                mt-8
                bg-slate-900
                border border-white/10
                rounded-3xl
                p-10
                text-center
              "
            >

              <div className="text-6xl">
                📭
              </div>


              <h2 className="text-2xl font-bold mt-4">

                No Transactions Found

              </h2>


              <p className="text-gray-400 mt-2">

                No trades match your search.

              </p>

            </div>

          ) : (

            <div
              className="
                mt-8
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >

              {
                filteredTransactions.map((transaction) => (

                  <div
                    key={transaction._id}
                    className="
                      bg-gradient-to-br
                      from-slate-900
                      to-slate-800
                      rounded-3xl
                      p-6
                      border border-white/10
                      hover:border-blue-500
                      hover:-translate-y-2
                      transition
                    "
                  >


                    {/* Header */}

                    <div className="flex justify-between">

                      <div>

                        <h2 className="text-xl font-black">

                          {transaction.symbol}

                        </h2>


                        <p className="text-gray-400 text-sm">

                          ID:
                          {transaction._id.slice(0, 10)}...

                        </p>

                      </div>


                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          font-bold
                          ${
                            transaction.type === "BUY"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                          }
                        `}
                      >

                        {transaction.type}

                      </span>


                    </div>


                    {/* User Details */}

                    <div className="mt-5 space-y-2">


                      <p>

                        👤 User:
                        <span className="font-semibold">

                          {" "}
                          {transaction.user?.name}

                        </span>

                      </p>


                      <p>

                        📧 Email:
                        <span className="text-gray-300">

                          {" "}
                          {transaction.user?.email}

                        </span>

                      </p>


                      <p>

                        📦 Quantity:
                        <span className="font-semibold">

                          {" "}
                          {transaction.quantity}

                        </span>

                      </p>


                      <p>

                        💲 Price:
                        <span className="font-semibold">

                          {" "}
                          ${transaction.price.toFixed(2)}

                        </span>

                      </p>


                      <p>

                        💰 Total:
                        <span className="font-bold text-yellow-300">

                          {" "}
                          ${transaction.totalAmount.toFixed(2)}

                        </span>

                      </p>


                      <p>

                        📊 Status:
                        <span
                          className={
                            transaction.status === "COMPLETED"
                              ? "text-green-400 font-bold"
                              : transaction.status === "PENDING"
                              ? "text-yellow-400 font-bold"
                              : "text-red-400 font-bold"
                          }
                        >

                          {" "}
                          {transaction.status}

                        </span>

                      </p>


                      <p>

                        📅 Date:
                        <span className="text-gray-300">

                          {" "}
                          {new Date(
                            transaction.createdAt
                          ).toLocaleString()}

                        </span>

                      </p>


                    </div>


                  </div>

                ))
              }

            </div>

          )

        }
              </div>

    </div>

  );

}

export default ManageTransactions;