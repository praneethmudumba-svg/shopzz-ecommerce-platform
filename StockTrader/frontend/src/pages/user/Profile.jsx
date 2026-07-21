import { useState } from "react";

import { useAppContext } from "../../context/useAppContext";


function Profile() {

  const {
    user,
    updateProfile,
    transactions,
    portfolio,
    portfolioValue,
  } = useAppContext();


  // =================================
  // Form State
  // =================================

  const [formData, setFormData] =
    useState({
      name: user?.name || "",
      email: user?.email || "",
    });

  const [message, setMessage] =
    useState("");


  // =================================
  // User Statistics
  // =================================

  const totalTrades =
    transactions.length;

  const totalHoldings =
    portfolio.length;


  // =================================
  // Investor Level Logic
  // =================================

  let investorLevel =
    "Beginner Trader";

  if (totalTrades >= 20) {

    investorLevel =
      "Professional Trader";

  }

  else if (totalTrades >= 10) {

    investorLevel =
      "Advanced Investor";

  }

  else if (totalTrades >= 5) {

    investorLevel =
      "Active Investor";

  }


  // =================================
  // Form Handlers
  // =================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    updateProfile(formData);

    setMessage(
      "Profile updated successfully!"
    );

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
            Profile Banner
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
            items-center
            justify-between
            gap-6
          ">

            {/* User Information */}

            <div className="
              flex
              items-center
              gap-5
            ">

              <div className="
                w-24
                h-24
                rounded-full
                bg-white/20
                flex
                items-center
                justify-center
                text-5xl
              ">

                👤

              </div>

              <div>

                <h1 className="
                  text-4xl
                  font-black
                ">

                  {user?.name}

                </h1>

                <p className="
                  text-blue-200
                  text-lg
                  mt-2
                ">

                  {user?.role}

                </p>

                <p className="
                  text-blue-300
                  mt-1
                ">

                  Member of StockTrader Platform

                </p>

              </div>

            </div>

            {/* Investor Level Badge */}

            <div className="
              bg-white/10
              backdrop-blur-md
              rounded-2xl
              px-6
              py-4
              text-center
            ">

              <p className="
                text-blue-200
              ">

                🏆 Investor Level

              </p>

              <h2 className="
                text-2xl
                font-bold
                mt-2
              ">

                {investorLevel}

              </h2>

            </div>

          </div>

        </div>


        {/* =========================
            Statistics Cards
        ========================= */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
          mt-8
        ">

          {/* Total Trades */}

          <div className="
            bg-gradient-to-br
            from-blue-600
            to-blue-800
            rounded-3xl
            p-6
            hover:scale-105
            transition
          ">

            <p className="
              text-blue-100
            ">

              📜 Total Trades

            </p>

            <h2 className="
              text-3xl
              font-black
              mt-3
            ">

              {totalTrades}

            </h2>

          </div>

          {/* Holdings */}

          <div className="
            bg-gradient-to-br
            from-green-600
            to-green-800
            rounded-3xl
            p-6
            hover:scale-105
            transition
          ">

            <p className="
              text-green-100
            ">

              💼 Holdings

            </p>

            <h2 className="
              text-3xl
              font-black
              mt-3
            ">

              {totalHoldings}

            </h2>

          </div>

          {/* Portfolio Value */}

          <div className="
            bg-gradient-to-br
            from-purple-600
            to-purple-800
            rounded-3xl
            p-6
            hover:scale-105
            transition
          ">

            <p className="
              text-purple-100
            ">

              💰 Portfolio Value

            </p>

            <h2 className="
              text-3xl
              font-black
              mt-3
            ">

              ${portfolioValue.toFixed(2)}

            </h2>

          </div>

        </div>


        {/* =========================
            Account Information
        ========================= */}

        <div className="
          mt-8
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
        ">

          {/* Edit Profile Form */}

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

              📝 Account Information

            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}

              <div>

                <label className="text-gray-300">
                  👤 Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    bg-slate-800
                    border
                    border-white/10
                    text-white
                    outline-none
                    focus:border-blue-500
                  "
                  required
                />

              </div>

              {/* Email */}

              <div>

                <label className="text-gray-300">
                  📧 Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    bg-slate-800
                    border
                    border-white/10
                    text-white
                    outline-none
                    focus:border-blue-500
                  "
                  required
                />

              </div>

              {/* Role */}

              <div>

                <label className="text-gray-300">
                  🔐 Account Role
                </label>

                <input
                  type="text"
                  value={user?.role}
                  disabled
                  className="
                    w-full
                    mt-2
                    p-3
                    rounded-xl
                    bg-slate-700
                    text-gray-300
                    cursor-not-allowed
                  "
                />

              </div>

              <button
                type="submit"
                className="
                  w-full
                  bg-blue-600
                  py-3
                  rounded-xl
                  font-bold
                  hover:bg-blue-700
                  transition
                "
              >

                💾 Save Changes

              </button>

            </form>

            {/* Success Message */}

            {
              message && (

                <div className="
                  mt-5
                  bg-green-600/20
                  border
                  border-green-500
                  text-green-300
                  p-3
                  rounded-xl
                ">

                  ✅ {message}

                </div>

              )
            }

          </div>

          {/* Security & Achievements */}

          <div className="space-y-6">

            {/* Security Status */}

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
                mb-4
              ">

                🔒 Security Status

              </h2>

              <div className="
                space-y-3
                text-gray-300
              ">

                <p>
                  ✅ Password Encrypted
                </p>

                <p>
                  ✅ JWT Authentication Active
                </p>

                <p>
                  ✅ Role-Based Access Enabled
                </p>

              </div>

            </div>

            {/* Achievements */}

            <div className="
              bg-gradient-to-r
              from-yellow-600
              to-orange-600
              rounded-3xl
              p-6
            ">

              <h2 className="
                text-2xl
                font-bold
                mb-4
              ">

                🏆 Trading Achievements

              </h2>

              <div className="space-y-3">

                <p>
                  {
                    totalTrades >= 1
                    ? "✅ First Trade Completed"
                    : "🔒 Complete your first trade"
                  }
                </p>

                <p>
                  {
                    totalTrades >= 10
                    ? "✅ Active Investor"
                    : "🔒 Reach 10 trades"
                  }
                </p>

                <p>
                  {
                    totalHoldings >= 5
                    ? "✅ Portfolio Builder"
                    : "🔒 Hold 5 different stocks"
                  }
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


export default Profile;