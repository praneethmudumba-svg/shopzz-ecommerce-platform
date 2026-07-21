import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext";


function Market() {


  const { stocks } = useAppContext();

  const navigate = useNavigate();


  // ===============================
  // States
  // ===============================

  const [search, setSearch] = useState("");

  const [selectedSector, setSelectedSector] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");


  // ===============================
  // Company Logos
  // ===============================

  const companyIcons = {

    AAPL: "🍎",
    MSFT: "🪟",
    GOOGL: "🔎",
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
    KO: "🥤"

  };


  // ===============================
  // Market Analytics
  // ===============================

  const topGainer = useMemo(() => {

    return [...stocks].sort(
      (a, b) =>
        b.changePercentage -
        a.changePercentage
    )[0];

  }, [stocks]);


  const topLoser = useMemo(() => {

    return [...stocks].sort(
      (a, b) =>
        a.changePercentage -
        b.changePercentage
    )[0];

  }, [stocks]);


  // ===============================
  // Filter + Sort Logic
  // ===============================

  const filteredStocks = useMemo(() => {


    let result = stocks.filter((stock) => {


      const matchesSearch =

        stock.symbol
          .toLowerCase()
          .includes(search.toLowerCase())

        ||

        stock.companyName
          .toLowerCase()
          .includes(search.toLowerCase());


      const matchesSector =

        selectedSector === "All"

        ||

        stock.sector === selectedSector;


      return (
        matchesSearch &&
        matchesSector
      );


    });


    switch (sortBy) {


      case "gainers":

        result.sort(
          (a, b) =>
            b.changePercentage -
            a.changePercentage
        );

        break;



      case "losers":

        result.sort(
          (a, b) =>
            a.changePercentage -
            b.changePercentage
        );

        break;



      case "volume":

        result.sort(
          (a, b) =>
            b.volume -
            a.volume
        );

        break;



      case "price":

        result.sort(
          (a, b) =>
            b.currentPrice -
            a.currentPrice
        );

        break;


      default:
        break;

    }


    return result;


  }, [
    stocks,
    search,
    selectedSector,
    sortBy
  ]);



  return (

    <div className="min-h-screen bg-slate-950 text-white">


      <div className="max-w-7xl mx-auto px-6 py-10">


        {/* ===============================
            Header
        =============================== */}


        <div className="mb-10">


          <h1
            className="
              text-5xl
              font-black
              bg-gradient-to-r
              from-blue-400
              via-cyan-300
              to-purple-400
              bg-clip-text
              text-transparent
            "
          >

             Global Stock Market

          </h1>


          <p className="
            text-gray-400
            mt-4
            text-lg
            max-w-3xl
          ">

            Discover leading companies,
            analyze price movements,
            and build your virtual
            investment portfolio.

          </p>


        </div>

                {/* ===============================
            Market Summary
        =============================== */}

        <div className="
          grid 
          grid-cols-1 
          md:grid-cols-4 
          gap-5 
          mb-10
        ">


          {/* Market Status */}
          <div className="
            bg-green-500/10
            border border-green-500/30
            rounded-2xl
            p-5
          ">

            <h3 className="text-green-400 font-bold">
              🟢 MARKET LIVE
            </h3>

            <p className="text-gray-300 mt-2">
              Trading Simulation Active
            </p>

          </div>



          {/* Total Stocks */}
          <div className="
            bg-blue-500/10
            border border-blue-500/30
            rounded-2xl
            p-5
          ">

            <h3 className="text-blue-400 font-bold">
               STOCKS
            </h3>


            <p className="text-3xl font-black mt-2">

              {stocks.length}

            </p>

          </div>



          {/* Top Gainer */}
          <div className="
            bg-purple-500/10
            border border-purple-500/30
            rounded-2xl
            p-5
          ">

            <h3 className="text-purple-400 font-bold">
               TOP GAINER
            </h3>


            <p className="mt-2 font-bold">

              {
                topGainer?.symbol
              }

            </p>


            <p className="text-green-400">

              +{
                topGainer?.changePercentage
                  .toFixed(2)
              }%

            </p>


          </div>




          {/* Top Loser */}
          <div className="
            bg-red-500/10
            border border-red-500/30
            rounded-2xl
            p-5
          ">

            <h3 className="text-red-400 font-bold">
               TOP LOSER
            </h3>


            <p className="mt-2 font-bold">

              {
                topLoser?.symbol
              }

            </p>


            <p className="text-red-400">

              {
                topLoser?.changePercentage
                  .toFixed(2)
              }%

            </p>


          </div>


        </div>




        {/* ===============================
            Search & Controls
        =============================== */}

        <div className="
          flex 
          flex-col 
          lg:flex-row 
          gap-4 
          mb-10
        ">


          {/* Search */}
          <div className="relative flex-1">


            <span className="
              absolute 
              left-4 
              top-3
              text-gray-400
            ">

              

            </span>


            <input
              type="text"
              placeholder="Search stocks or companies..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                bg-white/5
                border border-white/10
                rounded-xl
                py-3
                pl-12
                pr-4
                text-white
                backdrop-blur-lg
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />


          </div>



          {/* Sort Dropdown */}

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="
              bg-white/5
              border border-white/10
              rounded-xl
              px-4
              py-3
              text-white
              focus:outline-none
            "
          >

            <option value="default">
              Sort By
            </option>


            <option value="gainers">
               Top Gainers
            </option>


            <option value="losers">
               Top Losers
            </option>


            <option value="volume">
               Highest Volume
            </option>


            <option value="price">
               Highest Price
            </option>


          </select>


        </div>




        {/* ===============================
            Sector Filters
        =============================== */}


        <div className="
          flex 
          flex-wrap 
          gap-3 
          mb-10
        ">


          {
            [
              "All",
              "Technology",
              "Finance",
              "Healthcare",
              "Automotive"
            ]
            .map((sector) => (

              <button

                key={sector}

                onClick={() =>
                  setSelectedSector(sector)
                }

                className={`
                  px-5 
                  py-2 
                  rounded-full
                  transition
                  ${
                    selectedSector === sector
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }
                `}
              >

                {sector}

              </button>


            ))

          }


        </div>

                {/* ===============================
            No Stocks Found
        =============================== */}

        {
          filteredStocks.length === 0 && (

            <div className="
              text-center 
              py-20
              bg-white/5
              rounded-3xl
              border border-white/10
            ">

              <div className="text-6xl mb-5">
                
              </div>

              <h2 className="text-2xl font-bold">
                No stocks found
              </h2>

              <p className="text-gray-400 mt-3">
                Try another company name,
                symbol, or change filters.
              </p>

            </div>

          )
        }



        {/* ===============================
            Stock Cards
        =============================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-7
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
                  border border-white/10
                  rounded-3xl
                  p-6
                  hover:border-blue-500
                  hover:-translate-y-3
                  hover:shadow-2xl
                  hover:shadow-blue-500/20
                  transition duration-300
                "
              >


                {/* Company Header */}

                <div className="flex justify-between">

                  <div className="flex gap-3">


                    <div className="
                      text-4xl
                      bg-white/10
                      w-14
                      h-14
                      rounded-full
                      flex
                      items-center
                      justify-center
                    ">

                      {
                        companyIcons[
                          stock.symbol
                        ] || "📈"
                      }

                    </div>


                    <div>

                      <h2 className="text-xl font-bold">

                        {
                          stock.companyName
                        }

                      </h2>


                      <p className="text-gray-400">

                        {
                          stock.symbol
                        }

                      </p>

                    </div>

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



                {/* Price */}

                <div className="mt-8">

                  <p className="text-gray-400">
                    Current Price
                  </p>


                  <h1 className="
                    text-4xl
                    font-black
                    mt-2
                  ">

                    $
                    {
                      stock.currentPrice
                      .toFixed(2)
                    }

                  </h1>


                </div>



                {/* Stock Details */}

                <div className="
                  mt-6
                  flex
                  justify-between
                  text-sm
                ">


                  <div>

                    <p className="text-gray-500">
                      Sector
                    </p>

                    <p>
                      {
                        stock.sector
                      }
                    </p>

                  </div>


                  <div>

                    <p className="text-gray-500">
                      Volume
                    </p>

                    <p>

                      {
                        stock.volume
                        .toLocaleString()
                      }

                    </p>

                  </div>


                </div>



                {/* Buttons */}

                <div className="
                  mt-8
                  flex
                  gap-3
                ">


                  <button
                    onClick={() =>
                      navigate(
                        `/stock/${stock.symbol}`
                      )
                    }
                    className="
                      flex-1
                      bg-blue-600
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-blue-700
                      transition
                    "
                  >

                     Analysis

                  </button>



                  <button
                    onClick={() =>
                      navigate(
                        `/stock/${stock.symbol}`
                      )
                    }
                    className="
                      flex-1
                      bg-green-600
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-green-700
                      transition
                    "
                  >

                     Trade

                  </button>


                </div>


              </div>

            ))

          }


        </div>


      </div>


    </div>

  );

}


export default Market;