import {
  useState,
  useEffect,
} from "react";

import API from "../../services/api";


function ManageStocks() {


  // =====================================
  // States
  // =====================================

  const [stocks, setStocks] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  const [newStock, setNewStock] = useState({
    symbol: "",
    companyName: "",
    currentPrice: "",
    changePercentage: "",
    sector: "",
    volume: "",
  });


  // =====================================
  // Load Real Stocks
  // =====================================

  const fetchStocks = async () => {

    try {

      setLoading(true);


      const response =
        await API.get("/admin/stocks");


      setStocks(
        response.data.stocks
      );


      setError("");


    } catch (error) {

      console.error(
        "Failed to fetch stocks:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Unable to load stocks"
      );


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchStocks();

  }, []);



  // =====================================
  // Search Filter
  // =====================================

  const filteredStocks =
    stocks.filter((stock) =>

      stock.symbol
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      stock.companyName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );



  // =====================================
  // Analytics
  // =====================================


  const totalStocks =
    stocks.length;


  const activeStocks =
    stocks.filter(
      (stock) =>
        stock.isActive
    ).length;


  const inactiveStocks =
    stocks.filter(
      (stock) =>
        !stock.isActive
    ).length;


  const totalVolume =
    stocks.reduce(
      (total, stock) =>
        total + stock.volume,
      0
    );

      // =====================================
  // Form Input Handler
  // =====================================

  const handleChange = (e) => {

    setNewStock({
      ...newStock,
      [e.target.name]: e.target.value,
    });

  };


  // =====================================
  // Add New Stock
  // POST /api/admin/stocks
  // =====================================

  const addStock = async (e) => {

    e.preventDefault();


    try {

      await API.post(
        "/admin/stocks",
        {
          ...newStock,

          currentPrice:
            Number(newStock.currentPrice),

          changePercentage:
            Number(newStock.changePercentage),

          volume:
            Number(newStock.volume),
        }
      );


      // Refresh stock list
      await fetchStocks();


      // Clear form
      setNewStock({
        symbol: "",
        companyName: "",
        currentPrice: "",
        changePercentage: "",
        sector: "",
        volume: "",
      });


      alert(
        "Stock added successfully!"
      );


    } catch (error) {

      console.error(
        "Add stock failed:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to add stock"
      );

    }

  };



  // =====================================
  // Delete Stock
  // DELETE /api/admin/stocks/:id
  // =====================================

  const deleteStock = async (
    id,
    symbol
  ) => {


    const confirmDelete =
      window.confirm(
        `Are you sure you want to delete ${symbol}?`
      );


    if (!confirmDelete) {
      return;
    }


    try {

      await API.delete(
        `/admin/stocks/${id}`
      );


      await fetchStocks();


      alert(
        "Stock deleted successfully!"
      );


    } catch (error) {

      console.error(
        "Delete failed:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to delete stock"
      );

    }

  };



  // =====================================
  // Toggle Stock Status
  // PATCH /api/admin/stocks/:id/status
  // =====================================

  const toggleStatus = async (
    id
  ) => {

    try {


      await API.patch(
        `/admin/stocks/${id}/status`
      );


      await fetchStocks();


    } catch (error) {


      console.error(
        "Status update failed:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to update stock status"
      );

    }

  };

    return (

    <div
      className="
        min-h-screen
        bg-slate-950
        text-white
        p-6
      "
    >

      <div className="max-w-7xl mx-auto">


        {/* =========================
             Header
        ========================= */}

        <div
          className="
            bg-gradient-to-r
            from-green-900
            via-emerald-900
            to-teal-900
            rounded-3xl
            p-8
            border border-white/10
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              justify-between
              items-center
              gap-6
            "
          >


            <div>

              <h1
                className="
                  text-4xl
                  font-black
                "
              >

                📈 Stock Management Center

              </h1>


              <p
                className="
                  text-gray-300
                  mt-3
                "
              >

                Manage market listings,
                prices and stock performance.

              </p>

            </div>


            <div
              className="
                bg-green-500/20
                border border-green-500/30
                px-6 py-4
                rounded-2xl
              "
            >

              <p className="text-green-300 font-bold">

                📊 MARKET CONTROL

              </p>


              <p className="text-sm text-gray-300">

                Real-time stock management

              </p>

            </div>


          </div>

        </div>


        {/* =========================
             Analytics
        ========================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-4
            gap-5
            mt-8
          "
        >


          <div className="bg-blue-600/20 border border-blue-500/30 rounded-3xl p-6">

            <p className="text-blue-300">
              📈 Total Stocks
            </p>


            <h2 className="text-4xl font-black mt-2">

              {totalStocks}

            </h2>

          </div>



          <div className="bg-green-600/20 border border-green-500/30 rounded-3xl p-6">

            <p className="text-green-300">
              🟢 Active
            </p>


            <h2 className="text-4xl font-black mt-2">

              {activeStocks}

            </h2>

          </div>



          <div className="bg-red-600/20 border border-red-500/30 rounded-3xl p-6">

            <p className="text-red-300">
              🔴 Inactive
            </p>


            <h2 className="text-4xl font-black mt-2">

              {inactiveStocks}

            </h2>

          </div>



          <div className="bg-purple-600/20 border border-purple-500/30 rounded-3xl p-6">

            <p className="text-purple-300">
              ⚡ Total Volume
            </p>


            <h2 className="text-2xl font-black mt-2">

              {totalVolume.toLocaleString()}

            </h2>

          </div>


        </div>



        {/* =========================
             Search
        ========================= */}

        <div
          className="
            mt-8
            bg-slate-900
            rounded-3xl
            p-6
            border border-white/10
          "
        >

          <h2 className="text-2xl font-bold mb-4">

            🔍 Search Stocks

          </h2>


          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by symbol or company..."
            className="
              w-full
              p-4
              rounded-2xl
              bg-slate-800
              border border-white/10
              focus:outline-none
              focus:border-green-500
            "
          />

        </div>



        {/* =========================
             Add Stock Form
        ========================= */}

        <div
          className="
            mt-8
            bg-slate-900
            rounded-3xl
            p-6
            border border-white/10
          "
        >

          <h2 className="text-2xl font-bold mb-5">

            ➕ Add New Stock

          </h2>


          <form
            onSubmit={addStock}
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
            "
          >


            <input
              name="symbol"
              value={newStock.symbol}
              onChange={handleChange}
              placeholder="Symbol (AAPL)"
              className="p-3 rounded-xl bg-slate-800 border border-white/10"
              required
            />


            <input
              name="companyName"
              value={newStock.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="p-3 rounded-xl bg-slate-800 border border-white/10"
              required
            />


            <input
              type="number"
              name="currentPrice"
              value={newStock.currentPrice}
              onChange={handleChange}
              placeholder="Current Price"
              className="p-3 rounded-xl bg-slate-800 border border-white/10"
              required
            />


            <input
              type="number"
              name="changePercentage"
              value={newStock.changePercentage}
              onChange={handleChange}
              placeholder="Change %"
              className="p-3 rounded-xl bg-slate-800 border border-white/10"
            />


            <input
              name="sector"
              value={newStock.sector}
              onChange={handleChange}
              placeholder="Sector"
              className="p-3 rounded-xl bg-slate-800 border border-white/10"
            />


            <input
              type="number"
              name="volume"
              value={newStock.volume}
              onChange={handleChange}
              placeholder="Volume"
              className="p-3 rounded-xl bg-slate-800 border border-white/10"
            />


            <button
              className="
                md:col-span-3
                bg-green-600
                hover:bg-green-700
                py-3
                rounded-xl
                font-bold
                transition
              "
            >

              ➕ Add Stock

            </button>


          </form>


        </div>

                {/* =========================
             Stock Listing
        ========================= */}

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
              Loading stocks...
            </div>

          ) : error ? (

            <div
              className="
                mt-8
                bg-red-500/20
                text-red-300
                p-5
                rounded-2xl
                border border-red-500/30
              "
            >
              ❌ {error}
            </div>

          ) : filteredStocks.length === 0 ? (

            <div
              className="
                mt-8
                bg-slate-900
                border border-white/10
                rounded-3xl
                p-12
                text-center
              "
            >

              <div className="text-6xl">
                📭
              </div>

              <h2 className="text-2xl font-bold mt-4">
                No Stocks Found
              </h2>

              <p className="text-gray-400 mt-2">
                No stocks match your search.
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
                filteredStocks.map((stock) => (

                  <div
                    key={stock._id}
                    className="
                      bg-gradient-to-br
                      from-slate-900
                      to-slate-800
                      rounded-3xl
                      p-6
                      border border-white/10
                      hover:border-green-500
                      hover:-translate-y-2
                      transition
                    "
                  >

                    {/* Header */}

                    <div className="flex justify-between">

                      <div>

                        <h2 className="text-3xl font-black">

                          {stock.symbol}

                        </h2>

                        <p className="text-gray-400">

                          {stock.companyName}

                        </p>

                      </div>


                      <span
                        className={`
                          px-3
                          py-2
                          rounded-full
                          font-semibold
                          h-fit
                          ${
                            stock.isActive
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                          }
                        `}
                      >

                        {
                          stock.isActive
                            ? "🟢 ACTIVE"
                            : "🔴 INACTIVE"
                        }

                      </span>

                    </div>



                    {/* Stock Details */}

                    <div className="mt-5 space-y-2">

                      <p>
                        💲 Price:
                        <span className="font-bold">
                          {" "}
                          ${stock.currentPrice}
                        </span>
                      </p>


                      <p>
                        📈 Change:
                        <span
                          className={
                            stock.changePercentage >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {" "}
                          {stock.changePercentage >= 0
                            ? "+"
                            : ""}
                          {stock.changePercentage}%
                        </span>
                      </p>


                      <p>
                        🏢 Sector:
                        <span className="font-semibold">
                          {" "}
                          {stock.sector}
                        </span>
                      </p>


                      <p>
                        ⚡ Volume:
                        <span className="font-semibold">
                          {" "}
                          {stock.volume.toLocaleString()}
                        </span>
                      </p>

                    </div>



                    {/* Actions */}

                    <div
                      className="
                        mt-6
                        flex
                        gap-3
                      "
                    >

                      <button
                        onClick={() =>
                          toggleStatus(stock._id)
                        }
                        className="
                          flex-1
                          bg-blue-600
                          hover:bg-blue-700
                          py-2
                          rounded-xl
                          font-semibold
                          transition
                        "
                      >

                        🔄 Toggle

                      </button>


                      <button
                        onClick={() =>
                          deleteStock(
                            stock._id,
                            stock.symbol
                          )
                        }
                        className="
                          flex-1
                          bg-red-600
                          hover:bg-red-700
                          py-2
                          rounded-xl
                          font-semibold
                          transition
                        "
                      >

                        🗑 Delete

                      </button>


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


export default ManageStocks;