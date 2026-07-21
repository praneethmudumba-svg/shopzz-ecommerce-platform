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



function Dashboard() {


  const navigate = useNavigate();


  const {
    user,
    balance,
    portfolio,
    transactions,
    portfolioValue,
  } = useAppContext();



  // =================================
  // Dashboard Calculations
  // =================================


  const totalAssets =
    balance + portfolioValue;



  // Dynamic Greeting Based on Time

  const currentHour =
    new Date().getHours();


  let greeting = "Welcome";


  if (currentHour < 12) {

    greeting = "Good Morning ☀️";

  }

  else if (currentHour < 18) {

    greeting = "Good Afternoon 🌤️";

  }

  else {

    greeting = "Good Evening 🌙";

  }



  // =================================
  // Portfolio Growth Demo Data
  // (Later can connect with backend)
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
          68000,
          75000,
          83000,
          92000,
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
      portfolio.length > 0
        ? portfolio.map(
            (item) =>
              item.symbol
          )
        : ["No Holdings"],


    datasets: [

      {

        label:
          "Portfolio Allocation",


        data:
          portfolio.length > 0

            ? portfolio.map(
                (item) =>

                  item.quantity *
                  item.avgPrice
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
            Premium Welcome Banner
        ========================= */}


        <div className="
          bg-gradient-to-r
          from-blue-900
          via-indigo-900
          to-purple-900
          rounded-3xl
          p-8
          shadow-xl
          border
          border-white/10
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


                {greeting}

                {user?.name || "Trader"}

                👋
              </h1>


              <p className="
                text-blue-200
                mt-3
                text-lg
              ">


                Track your investments,
                analyze your performance,
                and grow your virtual wealth.


              </p>


            </div>



            {/* User Badge */}


            <div className="
              w-20
              h-20
              rounded-full
              bg-white/20
              flex
              items-center
              justify-center
              text-4xl
            ">


              👤


            </div>


          </div>


        </div>

                {/* =========================
            Portfolio Summary Cards
        ========================= */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          mt-8
        ">


          {/* Balance Card */}

          <div className="
            bg-gradient-to-br
            from-green-600
            to-green-800
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-105
            transition
          ">


            <p className="text-green-100">
              💰 Available Balance
            </p>


            <h2 className="
              text-3xl
              font-black
              mt-3
            ">

              $
              {balance.toFixed(2)}

            </h2>


          </div>



          {/* Portfolio Value */}

          <div className="
            bg-gradient-to-br
            from-blue-600
            to-blue-800
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-105
            transition
          ">


            <p className="text-blue-100">
              📈 Portfolio Value
            </p>


            <h2 className="
              text-3xl
              font-black
              mt-3
            ">

              $
              {portfolioValue.toFixed(2)}

            </h2>


          </div>



          {/* Total Assets */}

          <div className="
            bg-gradient-to-br
            from-purple-600
            to-purple-800
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-105
            transition
          ">


            <p className="text-purple-100">
              🏦 Total Assets
            </p>


            <h2 className="
              text-3xl
              font-black
              mt-3
            ">

              $
              {totalAssets.toFixed(2)}

            </h2>


          </div>



          {/* Holdings */}

          <div className="
            bg-gradient-to-br
            from-orange-500
            to-red-600
            rounded-3xl
            p-6
            shadow-xl
            hover:scale-105
            transition
          ">


            <p className="text-orange-100">
              📦 Holdings
            </p>


            <h2 className="
              text-3xl
              font-black
              mt-3
            ">

              {portfolio.length}

            </h2>


          </div>


        </div>



        {/* =========================
            Analytics Section
        ========================= */}

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-8
          mt-10
        ">


          {/* Portfolio Growth Chart */}

          <div className="
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

              📈 Portfolio Growth

            </h2>


            <Line data={growthData} />


          </div>



          {/* Asset Allocation */}

          <div className="
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

              🥧 Asset Allocation

            </h2>


            <div className="max-w-sm mx-auto">

              <Pie data={allocationData} />

            </div>


          </div>


        </div>




        {/* =========================
            Quick Actions
        ========================= */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mt-10
        ">


          <button
            onClick={() =>
              navigate("/market")
            }
            className="
              bg-blue-600
              hover:bg-blue-700
              rounded-2xl
              p-6
              text-left
              transition
              hover:-translate-y-2
            "
          >


            <h3 className="
              text-xl
              font-bold
            ">

              📈 Explore Market

            </h3>


            <p className="mt-2 text-blue-100">

              Discover stocks and
              start trading.

            </p>


          </button>



          <button
            onClick={() =>
              navigate("/portfolio")
            }
            className="
              bg-purple-600
              hover:bg-purple-700
              rounded-2xl
              p-6
              text-left
              transition
              hover:-translate-y-2
            "
          >


            <h3 className="
              text-xl
              font-bold
            ">

              💼 My Portfolio

            </h3>


            <p className="mt-2 text-purple-100">

              Track your investments
              and profits.

            </p>


          </button>



          <button
            onClick={() =>
              navigate("/transactions")
            }
            className="
              bg-green-600
              hover:bg-green-700
              rounded-2xl
              p-6
              text-left
              transition
              hover:-translate-y-2
            ">


            <h3 className="
              text-xl
              font-bold
            ">

              📜 Transactions

            </h3>


            <p className="mt-2 text-green-100">

              View your complete
              trading history.

            </p>


          </button>


        </div>

                {/* =========================
            Recent Transactions
        ========================= */}

        <div className="
          mt-10
          bg-slate-900
          border
          border-white/10
          rounded-3xl
          p-6
        ">


          {/* Header */}

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

              📜 Recent Activity

            </h2>


            <button
              onClick={() =>
                navigate("/transactions")
              }
              className="
                text-blue-400
                hover:text-blue-300
                font-semibold
              "
            >

              View All →

            </button>


          </div>



          {/* No Transactions */}

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
                  text-xl
                  font-bold
                  mt-4
                ">

                  No Transactions Yet

                </h3>


                <p className="
                  text-gray-400
                  mt-2
                ">

                  Start trading to see
                  your activity here.

                </p>


                <button
                  onClick={() =>
                    navigate("/market")
                  }
                  className="
                    mt-5
                    bg-blue-600
                    px-5
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


              <div className="space-y-4">


                {
                  transactions
                    .slice(0, 5)
                    .map((trx) => (

                      <div
                        key={trx.id}
                        className="
                          bg-white/5
                          border
                          border-white/10
                          rounded-2xl
                          p-5
                          flex
                          flex-col
                          md:flex-row
                          justify-between
                          md:items-center
                          gap-4
                          hover:bg-white/10
                          transition
                        "
                      >


                        {/* Transaction Details */}

                        <div>


                          <h3 className="
                            text-xl
                            font-bold
                          ">

                            {
                              trx.type === "BUY"
                              ? "🟢 Bought "
                              : "🔴 Sold "
                            }

                            {trx.symbol}

                          </h3>


                          <p className="
                            text-gray-400
                            mt-1
                          ">

                            Quantity:
                            {" "}
                            {trx.quantity}

                            {" • "}

                            Price:
                            {" $"}
                            {trx.price}

                          </p>


                        </div>



                        {/* Date & Status */}

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


export default Dashboard;