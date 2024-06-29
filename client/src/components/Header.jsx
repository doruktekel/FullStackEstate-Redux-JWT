import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  logoutFailure,
  logoutStart,
  logoutSuccess,
} from "../../features/user/userSlice";
import axios from "axios";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      dispatch(logoutStart());
      const res = await axios.get("/api/auth/logout");
      const data = res.data;
      if (data.success === false) {
        dispatch(logoutFailure(data.message));
      }
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-slate-50  ">
      <div className="flex justify-between  items-center max-w-7xl mx-auto p-3">
        <div className="font-bold ">
          <Link to={"/"}>
            Real <span className="text-slate-400"> Estate</span>
          </Link>
        </div>
        <div>
          <form
            className="flex items-center bg-slate-100 p-2 rounded-lg"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search"
              className="outline-none rounded-lg place w-24 sm:w-64 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <CiSearch />
            </button>
          </form>
        </div>
        <div>
          <ul className="flex items-center gap-5">
            {currentUser ? (
              <li>
                <Link
                  to={"/createlist"}
                  className="bg-transparent hover:bg-slate-500 text-slate-700 hover:text-white py-1 px-2 border border-slate-500 hover:border-transparent rounded flex items-center gap-1"
                >
                  New List
                </Link>
              </li>
            ) : null}
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li className="relative">
              <Link onClick={toggleDropdown}>
                {currentUser ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <Link
                    to={"/login"}
                    className="bg-transparent hover:bg-slate-500 text-slate-700 hover:text-white py-1 px-2 border border-slate-500 hover:border-transparent rounded flex items-center gap-1"
                  >
                    Login
                    <FiLogIn />
                  </Link>
                )}
              </Link>

              {isOpen && currentUser && (
                <div className="absolute mt-2 w-44 right-0  bg-white rounded-lg shadow-lg py-1 text-center flex flex-col items-center gap-1 z-10">
                  <p className=" text-gray-800">
                    Welcome <br /> {currentUser.username}
                  </p>

                  <hr className="w-full" />
                  <Link
                    to="/lists"
                    className="block w-full text-gray-800 text-center hover:bg-slate-700 hover:text-white"
                  >
                    Show my lists
                  </Link>
                  <Link
                    to="/profile"
                    className="block w-full text-gray-800 text-center hover:bg-slate-700 hover:text-white"
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-gray-800 text-center hover:bg-slate-700 hover:text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
