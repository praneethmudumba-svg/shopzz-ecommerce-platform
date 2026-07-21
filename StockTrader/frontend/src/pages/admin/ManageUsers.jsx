import {
  useState,
  useEffect,
} from "react";

import API from "../../services/api";


function ManageUsers() {


  // ===============================
  // States
  // ===============================

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");



  // ===============================
  // Fetch Real Users
  // ===============================

  const fetchUsers = async () => {

    try {

      setLoading(true);


      const response =
        await API.get("/admin/users");


      setUsers(
        response.data.users
      );


      setError("");


    } catch (error) {

      console.error(
        "Failed to fetch users:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Unable to load users"
      );


    } finally {

      setLoading(false);

    }

  };



  // Load users on page start

  useEffect(() => {

    fetchUsers();

  }, []);



  // ===============================
  // User Analytics
  // ===============================


  const totalUsers =
    users.length;


  const adminCount =
    users.filter(
      (user) =>
        user.role === "ADMIN"
    ).length;


  const traderCount =
    users.filter(
      (user) =>
        user.role === "USER"
    ).length;



  // ===============================
  // Search Filter
  // ===============================


  const filteredUsers =
    users.filter((user) =>

      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      user.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

      // ===============================
  // Delete User
  // ===============================

  const deleteUser = async (id, name) => {

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );


    if (!confirmDelete) {
      return;
    }


    try {

      await API.delete(
        `/admin/users/${id}`
      );


      // Refresh users
      fetchUsers();


    } catch (error) {

      console.error(
        "Delete failed:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to delete user"
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
            from-indigo-900
            via-purple-900
            to-blue-900
            rounded-3xl
            p-8
            border border-white/10
          "
        >

          <div className="
            flex
            justify-between
            items-center
            flex-col
            md:flex-row
            gap-6
          ">


            <div>

              <h1 className="
                text-4xl font-black
              ">

                👥 User Management Center

              </h1>


              <p className="
                text-gray-300 mt-3
              ">

                Manage real platform users,
                permissions and accounts.

              </p>

            </div>


            <div className="
              bg-blue-500/20
              border border-blue-500/30
              px-6 py-4
              rounded-2xl
            ">

              <p className="
                text-blue-300 font-bold
              ">

                🔐 ADMIN ACCESS

              </p>

              <p className="
                text-sm text-gray-300
              ">

                Database control enabled

              </p>

            </div>


          </div>

        </div>



        {/* =========================
              Analytics
        ========================= */}


        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-5
          mt-8
        ">


          <div className="
            bg-blue-600/20
            border border-blue-500/30
            rounded-3xl
            p-6
          ">

            <p className="text-blue-300">
              👥 Total Users
            </p>


            <h2 className="
              text-4xl font-black mt-2
            ">

              {totalUsers}

            </h2>

          </div>



          <div className="
            bg-purple-600/20
            border border-purple-500/30
            rounded-3xl p-6
          ">


            <p className="text-purple-300">
              👑 Admins
            </p>


            <h2 className="
              text-4xl font-black mt-2
            ">

              {adminCount}

            </h2>


          </div>



          <div className="
            bg-cyan-600/20
            border border-cyan-500/30
            rounded-3xl p-6
          ">


            <p className="text-cyan-300">
              👤 Traders
            </p>


            <h2 className="
              text-4xl font-black mt-2
            ">

              {traderCount}

            </h2>


          </div>


        </div>



        {/* =========================
               Search
        ========================= */}


        <div className="
          mt-8
          bg-slate-900
          rounded-3xl
          p-6
          border border-white/10
        ">


          <h2 className="
            text-2xl font-bold mb-4
          ">

            🔍 Search Users

          </h2>


          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name or email..."
            className="
              w-full
              p-4
              rounded-2xl
              bg-slate-800
              border border-white/10
              text-white
              focus:outline-none
              focus:border-blue-500
            "
          />

        </div>

                {/* =========================
              Loading State
        ========================= */}

        {
          loading ? (

            <div className="
              mt-8
              text-center
              text-xl
              text-gray-400
            ">

              Loading users...

            </div>

          ) : error ? (

            <div className="
              mt-8
              bg-red-500/20
              text-red-300
              p-5
              rounded-2xl
              border border-red-500/30
            ">

              ❌ {error}

            </div>

          ) : filteredUsers.length === 0 ? (

            <div className="
              mt-8
              text-center
              bg-slate-900
              p-12
              rounded-3xl
              border border-white/10
            ">


              <div className="text-6xl">
                📭
              </div>


              <h2 className="
                text-2xl
                font-bold
                mt-4
              ">

                No Users Found

              </h2>


              <p className="
                text-gray-400
                mt-2
              ">

                No registered users match your search.

              </p>


            </div>

          ) : (

            <div className="
              mt-8
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6
            ">


              {
                filteredUsers.map((user) => (

                  <div
                    key={user._id}
                    className="
                      bg-gradient-to-br
                      from-slate-900
                      to-slate-800
                      border border-white/10
                      rounded-3xl
                      p-6
                      hover:border-blue-500
                      hover:-translate-y-2
                      transition
                    "
                  >


                    {/* User Header */}

                    <div className="
                      flex
                      items-center
                      gap-4
                    ">


                      <div className="
                        w-14
                        h-14
                        rounded-full
                        bg-gradient-to-r
                        from-blue-500
                        to-purple-500
                        flex
                        items-center
                        justify-center
                        text-xl
                        font-bold
                      ">

                        {
                          user.name
                            .charAt(0)
                            .toUpperCase()
                        }

                      </div>



                      <div>

                        <h3 className="
                          text-xl
                          font-bold
                        ">

                          {user.name}

                        </h3>


                        <p className="
                          text-gray-400
                          text-sm
                        ">

                          {user.email}

                        </p>


                      </div>


                    </div>



                    {/* Role Badge */}

                    <div className="
                      mt-6
                    ">


                      <span
                        className={`
                          px-4 py-2
                          rounded-full
                          font-semibold
                          ${
                            user.role === "ADMIN"
                              ? "bg-purple-500/20 text-purple-300"
                              : "bg-blue-500/20 text-blue-300"
                          }
                        `}
                      >

                        {
                          user.role === "ADMIN"
                            ? "👑 ADMIN"
                            : "👤 USER"
                        }

                      </span>


                    </div>



                    {/* Actions */}

                    <div className="
                      mt-6
                    ">


                      <button
                        onClick={() =>
                          deleteUser(
                            user._id,
                            user.name
                          )
                        }
                        className="
                          w-full
                          bg-red-600
                          hover:bg-red-700
                          py-3
                          rounded-xl
                          font-semibold
                          transition
                        "
                      >

                        🗑 Remove User

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


export default ManageUsers;