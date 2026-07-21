import { useNavigate } from "react-router-dom";

function Footer() {

  const navigate = useNavigate();

  return (
    <footer
      className="
        mt-16
        bg-gradient-to-r
        from-slate-950
        via-slate-900
        to-slate-950
        border-t border-white/10
        text-white
      "
    >

      <div className="max-w-7xl mx-auto px-8 py-12">


        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">


          {/* Brand */}
          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10 h-10 rounded-full
                  bg-gradient-to-r
                  from-blue-500 via-cyan-400 to-purple-500
                  flex items-center justify-center
                  text-xl
                  shadow-lg shadow-blue-500/40
                "
              >
                
              </div>


              <h2
                className="
                  text-2xl font-bold
                  bg-gradient-to-r
                  from-blue-400
                  via-cyan-300
                  to-purple-400
                  text-transparent bg-clip-text
                "
              >
                StockTrader
              </h2>

            </div>


            <p className="mt-4 text-gray-400 leading-relaxed">

              Trade Smart. Invest Better.
              A next-generation virtual stock trading platform
              built using the MERN stack.

            </p>

          </div>



          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>


            <ul className="space-y-3 text-gray-400">


              <li
                onClick={() => navigate("/")}
                className="
                  cursor-pointer
                  hover:text-blue-400
                  hover:translate-x-2
                  transition
                "
              >
                 Home
              </li>


              <li
                onClick={() => navigate("/market")}
                className="
                  cursor-pointer
                  hover:text-blue-400
                  hover:translate-x-2
                  transition
                "
              >
                 Market
              </li>


              <li
                onClick={() => navigate("/portfolio")}
                className="
                  cursor-pointer
                  hover:text-blue-400
                  hover:translate-x-2
                  transition
                "
              >
                 Portfolio
              </li>


              <li
                onClick={() => navigate("/transactions")}
                className="
                  cursor-pointer
                  hover:text-blue-400
                  hover:translate-x-2
                  transition
                "
              >
                 Transactions
              </li>


            </ul>

          </div>



          {/* Platform */}
          <div>

            <h3 className="text-lg font-semibold mb-4">
              Platform
            </h3>


            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-cyan-400 transition">
                 Virtual Trading
              </li>

              <li className="hover:text-cyan-400 transition">
                 Secure Authentication
              </li>


              <li className="hover:text-cyan-400 transition">
                 Market Analytics
              </li>


              <li className="hover:text-cyan-400 transition">
                 Real-time Experience
              </li>

            </ul>

          </div>



          {/* Developer / Connect */}
          <div>

            <h3 className="text-lg font-semibold mb-4">
              Developer
            </h3>


            <div className="space-y-3 text-gray-400">

              <p>
                 Akshitha Reddy
              </p>


              <p>
                MERN Stack Developer
              </p>


              <p className="hover:text-blue-400 transition cursor-pointer">
                 GitHub
              </p>


              <p className="hover:text-blue-400 transition cursor-pointer">
                 LinkedIn
              </p>


              <p>
                 Contact
              </p>


            </div>

          </div>


        </div>



        {/* Bottom Section */}
        <div
          className="
            mt-10
            pt-6
            border-t border-white/10
            text-center text-gray-500
          "
        >

          <p>
            © 2026 StockTrader | Designed & Developed by
            <span className="text-blue-400 font-medium">
              {" "}
              Akshitha Reddy
            </span>
          </p>


          <p className="mt-2 text-sm">

            Powered by React.js • Node.js • Express.js • MongoDB

          </p>


        </div>


      </div>


    </footer>
  );
}

export default Footer;