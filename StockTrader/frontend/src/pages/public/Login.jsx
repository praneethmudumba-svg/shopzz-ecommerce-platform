import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../context/useAppContext";


function Login() {


  const {
    login,
    user,
  } = useAppContext();


  const navigate = useNavigate();


  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");



  // ================================
  // Redirect After Login
  // ================================

  useEffect(() => {


    if (user) {


      if (
        user.role?.toLowerCase() === "admin"
      ) {

        navigate("/admin-dashboard");

      }

      else {

        navigate("/dashboard");

      }


    }


  }, [user, navigate]);




  // ================================
  // Handle Login
  // ================================

  const handleSubmit = async (e) => {


    e.preventDefault();


    const result =
      await login(
        email,
        password
      );


    if (result.success) {


      setEmail("");
      setPassword("");


    }

    else {


      alert(result.message);


    }


  };



  return (


    <div className="
      min-h-screen
      bg-gradient-to-br
      from-slate-950
      via-blue-950
      to-indigo-950
      flex
      items-center
      justify-center
      p-6
      relative
      overflow-hidden
    ">



      {/* Background Glow Effects */}

      <div className="
        absolute
        top-10
        left-10
        w-72
        h-72
        bg-blue-500/20
        rounded-full
        blur-3xl
      ">
      </div>


      <div className="
        absolute
        bottom-10
        right-10
        w-80
        h-80
        bg-purple-500/20
        rounded-full
        blur-3xl
      ">
      </div>




      {/* Login Card */}

      <div className="
        relative
        z-10
        w-full
        max-w-md
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        rounded-3xl
        shadow-2xl
        shadow-blue-500/30
        p-8
      ">


        {/* Branding */}

        <div className="
          text-center
          mb-8
        ">


          <div className="
            text-6xl
            mb-4
          ">

            📈

          </div>


          <h1 className="
            text-4xl
            font-black
            bg-gradient-to-r
            from-blue-400
            via-cyan-300
            to-purple-400
            text-transparent
            bg-clip-text
          ">

            StockTrader

          </h1>


          <p className="
            text-white
            text-xl
            font-semibold
            mt-5
          ">

            Welcome Back Trader

          </p>


          <p className="
            text-gray-300
            mt-2
          ">

            Access your portfolio and continue
            your trading journey

          </p>


        </div>

                {/* Login Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >


          {/* Email */}

          <div>


            <label className="
              text-gray-200
              font-medium
            ">

               Email Address

            </label>


            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="
                w-full
                mt-2
                p-3
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-blue-500
                transition
              "
              required
            />


          </div>



          {/* Password */}

          <div>


            <label className="
              text-gray-200
              font-medium
            ">

               Password

            </label>


            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="
                w-full
                mt-2
                p-3
                rounded-xl
                bg-white/10
                border
                border-white/20
                text-white
                placeholder-gray-400
                outline-none
                focus:border-blue-500
                transition
              "
              required
            />


          </div>



          {/* Login Button */}

          <button
            type="submit"
            className="
              w-full
              mt-4
              py-3
              rounded-xl
              font-bold
              text-white
              bg-gradient-to-r
              from-blue-600
              via-cyan-500
              to-purple-600
              hover:scale-105
              transition
              shadow-lg
              shadow-blue-500/40
            "
          >

             Login Securely

          </button>


        </form>



        {/* Register Redirect */}

        <div className="
          mt-7
          text-center
        ">


          <p className="text-gray-300">

            New to StockTrader?

          </p>


          <button
            onClick={() =>
              navigate("/register")
            }
            className="
              mt-2
              text-cyan-400
              font-semibold
              hover:text-cyan-300
              transition
            "
          >

            Create your trading account →

          </button>


        </div>



        {/* Trust Indicators */}

        <div className="
          mt-8
          border-t
          border-white/10
          pt-6
          grid
          grid-cols-3
          gap-3
          text-center
          text-xs
          text-gray-300
        ">


          <div>

             <br />

            Secure Login

          </div>


          <div>

             <br />

            Live Market

          </div>


          <div>

             <br />

            Virtual Trading

          </div>


        </div>


      </div>


    </div>

  );

}


export default Login;