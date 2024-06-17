import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Logout işlemlerini burada gerçekleştir
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
          <form className="flex items-center bg-slate-100 p-2 rounded-lg">
            <input
              type="text"
              placeholder="Search"
              className="outline-none rounded-lg place w-24 sm:w-64 bg-transparent"
            />
            <CiSearch />
          </form>
        </div>
        <div>
          <ul className="flex items-center gap-5">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li className="relative">
              <Link to="/profile" onClick={toggleDropdown}>
                {currentUser ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="avatar"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <button className="bg-transparent hover:bg-slate-500 text-slate-700 hover:text-white py-1 px-2 border border-slate-500 hover:border-transparent rounded flex items-center gap-1">
                    Login
                    <FiLogIn />
                  </button>
                )}
              </Link>
              {isOpen && currentUser && (
                <div className="absolute mt-2 w-44 right-0  bg-white rounded-lg shadow-lg py-1 text-center flex flex-col items-center gap-1">
                  <p className=" text-gray-800">
                    Welcome <br /> {currentUser.username}
                  </p>

                  <hr className="w-full" />
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
