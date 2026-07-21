import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAppContext } from "../../context/useAppContext";


function Register() {


  const {
    register,
    user,
  } = useAppContext();


  const navigate = useNavigate();


  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",
      confirmPassword: "",

    });



  // ================================
  // Redirect After Registration
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
  // Handle Input Change
  // ================================

  const handleChange = (e) => {


    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });


  };




  // ================================
  // Handle Registration
  // ================================

  const handleSubmit = async (e) => {


    e.preventDefault();


    if (
      formData.password !==
      formData.confirmPassword
    ) {


      alert(
        "Passwords do not match"
      );


      return;


    }


    const result =
      await register(

        formData.name,
        formData.email,
        formData.password

      );


    if (result.success) {


      setFormData({

        name: "",
        email: "",
        password: "",
        confirmPassword: "",

      });


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
        bg-cyan-500/20
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




      {/* Register Card */}


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
        shadow-cyan-500/30
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

            

          </div>



          <h1 className="
            text-4xl
            font-black
            bg-gradient-to-r
            from-cyan-300
            via-blue-400
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

            Join the Future of Trading

          </p>



          <p className="
            text-gray-300
            mt-2
          ">

            Create your virtual portfolio
            and start your investment journey

          </p>


        </div>

                {/* Register Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >


          {/* Full Name */}

          <div>

            <label className="
              text-gray-200
              font-medium
            ">

              👤 Full Name

            </label>


            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
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
                focus:border-cyan-500
                transition
              "
              required
            />

          </div>



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
              name="email"
              value={formData.email}
              onChange={handleChange}
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
                focus:border-cyan-500
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
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
                focus:border-cyan-500
                transition
              "
              required
            />

          </div>



          {/* Confirm Password */}

          <div>

            <label className="
              text-gray-200
              font-medium
            ">

               Confirm Password

            </label>


            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
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
                focus:border-cyan-500
                transition
              "
              required
            />

          </div>



          {/* Register Button */}

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
              from-cyan-500
              via-blue-600
              to-purple-600
              hover:scale-105
              transition
              shadow-lg
              shadow-cyan-500/40
            "
          >

             Create Trading Account

          </button>


        </form>



        {/* Login Redirect */}

        <div className="
          mt-7
          text-center
        ">

          <p className="text-gray-300">

            Already a trader?

          </p>


          <button
            onClick={() =>
              navigate("/login")
            }
            className="
              mt-2
              text-cyan-400
              font-semibold
              hover:text-cyan-300
              transition
            "
          >

            Access your account →

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

            Secure Account

          </div>


          <div>

             <br />

            Fast Registration

          </div>


          <div>

             <br />

            Start Trading

          </div>


        </div>


      </div>


    </div>

  );

}


export default Register;