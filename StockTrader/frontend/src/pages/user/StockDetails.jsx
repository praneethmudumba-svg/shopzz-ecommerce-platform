import { useState } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Line,
} from "react-chartjs-2";


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";


import {
  useAppContext,
} from "../../context/useAppContext";



// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);



function StockDetails() {


  const {
    stocks,
    buyStock,
    sellStock,
  } = useAppContext();


  const navigate = useNavigate();

  const { symbol } = useParams();



  // ===============================
  // States
  // ===============================

  const [quantity, setQuantity] =
    useState(1);


  const [message, setMessage] =
    useState("");


  const [period, setPeriod] =
    useState("1M");



  // ===============================
  // Company Icons
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
    KO: "🥤",

  };



  // ===============================
  // Find selected stock
  // ===============================

  const stock =
    stocks.find(
      (item) =>
        item.symbol === symbol
    );



  // ===============================
  // Demo Historical Data
  // (Later replace with API)
  // ===============================

  const priceHistory = {

    "1D": [
      210,
      212,
      215,
      214,
      216,
      214.5,
    ],


    "1W": [
      198,
      202,
      205,
      208,
      212,
      214.5,
    ],


    "1M": [
      175,
      180,
      188,
      196,
      205,
      214.5,
    ],


    "1Y": [
      120,
      140,
      160,
      175,
      195,
      214.5,
    ],

  };



  // ===============================
  // Chart Data
  // ===============================

  const chartData = {

    labels: [
      "Start",
      "",
      "",
      "",
      "",
      "Now",
    ],


    datasets: [

      {

        label:
          `${stock?.symbol} Price`,

        data:
          priceHistory[period],


        borderColor:
          "#3B82F6",


        backgroundColor:
          "rgba(59,130,246,0.2)",


        fill: true,


        tension: 0.4,


        pointRadius: 4,

      },

    ],

  };




  // ===============================
  // Stock Not Found
  // ===============================

  if (!stock) {


    return (

      <div className="
        min-h-screen
        bg-slate-950
        text-white
        flex
        items-center
        justify-center
      ">


        <div className="text-center">


          <h1 className="
            text-4xl
            font-bold
          ">

            Stock Not Found

          </h1>


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
            "
          >

            Back To Market

          </button>


        </div>


      </div>

    );

  }

    // ===============================
  // Buy Stock
  // ===============================

  const handleBuy = async () => {

    const result = await buyStock(
      stock._id,
      Number(quantity)
    );

    setMessage(result.message);

  };


  // ===============================
  // Sell Stock
  // ===============================

  const handleSell = async () => {

    const result = await sellStock(
      stock._id,
      Number(quantity)
    );

    setMessage(result.message);

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


        {/* ===============================
            Stock Header
        =============================== */}

        <div className="
          bg-gradient-to-r
          from-slate-900
          to-slate-800
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-xl
        ">


          <div className="
            flex
            flex-col
            md:flex-row
            justify-between
            gap-6
          ">


            {/* Company Details */}

            <div className="
              flex
              items-center
              gap-5
            ">


              <div className="
                w-20
                h-20
                rounded-full
                bg-blue-500/20
                flex
                items-center
                justify-center
                text-5xl
              ">

                {
                  companyIcons[
                    stock.symbol
                  ] || "📈"
                }

              </div>


              <div>


                <h1 className="
                  text-4xl
                  font-black
                ">

                  {stock.companyName}

                </h1>


                <p className="
                  text-gray-400
                  text-xl
                  mt-1
                ">

                  {stock.symbol}

                </p>


              </div>


            </div>


            {/* Price Section */}

            <div className="text-left md:text-right">


              <p className="text-gray-400">
                Current Price
              </p>


              <h1 className="
                text-5xl
                font-black
                mt-2
              ">

                $
                {
                  stock.currentPrice
                    .toFixed(2)
                }

              </h1>


              <p
                className={
                  stock.changePercentage >= 0
                    ? "text-green-400 font-bold mt-2"
                    : "text-red-400 font-bold mt-2"
                }
              >

                {
                  stock.changePercentage >= 0
                    ? "▲ +"
                    : "▼ "
                }

                {
                  Math.abs(
                    stock.changePercentage
                  ).toFixed(2)
                }%

              </p>


            </div>


          </div>


        </div>



        {/* ===============================
            Stock Chart
        =============================== */}

        <div className="
          mt-8
          bg-slate-900
          border
          border-white/10
          rounded-3xl
          p-8
        ">


          <div className="
            flex
            justify-between
            items-center
            mb-6
          ">


            <h2 className="
              text-2xl
              font-bold
            ">

              📈 Stock Performance

            </h2>


            <div className="flex gap-2">


              {
                [
                  "1D",
                  "1W",
                  "1M",
                  "1Y",
                ].map((time) => (


                  <button
                    key={time}
                    onClick={() =>
                      setPeriod(time)
                    }

                    className={`
                      px-4
                      py-2
                      rounded-xl
                      transition

                      ${
                        period === time
                        ? "bg-blue-600"
                        : "bg-white/10 hover:bg-white/20"
                      }
                    `}
                  >

                    {time}

                  </button>


                ))

              }


            </div>


          </div>


          <Line data={chartData} />


        </div>



        {/* ===============================
            Market Information
        =============================== */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-4
          gap-5
          mt-8
        ">


          <div className="
            bg-slate-900
            rounded-2xl
            p-5
            border
            border-white/10
          ">

            <p className="text-gray-400">
              Sector
            </p>


            <h3 className="text-xl font-bold mt-2">

              {stock.sector}

            </h3>


          </div>



          <div className="
            bg-slate-900
            rounded-2xl
            p-5
            border
            border-white/10
          ">


            <p className="text-gray-400">
              Volume
            </p>


            <h3 className="text-xl font-bold mt-2">

              {
                stock.volume
                  .toLocaleString()
              }

            </h3>


          </div>



          <div className="
            bg-slate-900
            rounded-2xl
            p-5
            border
            border-white/10
          ">


            <p className="text-gray-400">
              Daily Change
            </p>


            <h3
              className={
                stock.changePercentage >= 0
                ? "text-green-400 text-xl font-bold mt-2"
                : "text-red-400 text-xl font-bold mt-2"
              }
            >

              {
                stock.changePercentage >= 0
                ? "+"
                : ""
              }

              {
                stock.changePercentage
                  .toFixed(2)
              }%

            </h3>


          </div>



          <div className="
            bg-slate-900
            rounded-2xl
            p-5
            border
            border-white/10
          ">


            <p className="text-gray-400">
              Market Status
            </p>


            <h3 className="
              text-green-400
              text-xl
              font-bold
              mt-2
            ">

              🟢 LIVE

            </h3>


          </div>


        </div>

                {/* ===============================
            Trading Panel
        =============================== */}

        <div className="
          mt-8
          bg-slate-900
          border border-white/10
          rounded-3xl
          p-8
        ">


          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">

            💰 Trade Stock

          </h2>


          {/* Quantity Controls */}

          <div className="
            flex
            items-center
            gap-4
            mb-6
          ">


            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
              className="
                w-12
                h-12
                bg-red-600
                rounded-xl
                text-2xl
                hover:bg-red-700
                transition
              "
            >

              −

            </button>


            <div className="
              bg-white/10
              px-8
              py-3
              rounded-xl
              text-2xl
              font-bold
            ">

              {quantity}

            </div>


            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              className="
                w-12
                h-12
                bg-green-600
                rounded-xl
                text-2xl
                hover:bg-green-700
                transition
              "
            >

              +

            </button>


          </div>



          {/* Total Investment */}

          <div className="
            bg-blue-500/10
            border border-blue-500/30
            rounded-2xl
            p-5
            mb-6
          ">


            <p className="text-gray-400">

              Total Investment

            </p>


            <h1 className="
              text-4xl
              font-black
              mt-2
            ">

              $
              {
                (
                  quantity *
                  stock.currentPrice
                ).toFixed(2)
              }

            </h1>


          </div>



          {/* Buy & Sell Buttons */}

          <div className="
            grid
            md:grid-cols-2
            gap-4
          ">


            <button
              onClick={handleBuy}
              className="
                bg-green-600
                py-4
                rounded-xl
                font-bold
                hover:bg-green-700
                transition
              "
            >

              💰 Buy Stock

            </button>



            <button
              onClick={handleSell}
              className="
                bg-red-600
                py-4
                rounded-xl
                font-bold
                hover:bg-red-700
                transition
              "
            >

              💸 Sell Stock

            </button>


          </div>



          {/* Message */}

          {
            message && (

              <div className="
                mt-5
                bg-blue-500/20
                border border-blue-500/30
                text-blue-300
                p-4
                rounded-xl
              ">

                {message}

              </div>

            )
          }


        </div>



        {/* ===============================
            Company Overview
        =============================== */}

        <div className="
          mt-8
          bg-slate-900
          border border-white/10
          rounded-3xl
          p-8
        ">


          <h2 className="
            text-2xl
            font-bold
            mb-4
          ">

            🏢 About {stock.companyName}

          </h2>


          <p className="
            text-gray-400
            leading-relaxed
          ">

            {stock.companyName} operates in the 
            {stock.sector} industry and is one of the
            companies available in the StockTrader
            virtual market simulation. Investors can
            analyze price movements, monitor volume,
            and practice trading strategies without
            using real money.

          </p>


        </div>



        {/* Back Button */}

        <button
          onClick={() =>
            navigate("/market")
          }
          className="
            mt-8
            text-blue-400
            hover:text-blue-300
            transition
            font-semibold
          "
        >

          ← Back To Market

        </button>


      </div>


    </div>


  );

}


export default StockDetails;