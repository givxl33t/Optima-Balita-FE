import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../styles/index.css";
import {
  AiFillHome,
  AiFillFileText,
  AiFillCalculator,
  AiFillMessage,
} from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Konfirmasi Logout?",
      text: "Apakah anda yakin akan logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevIsMobileMenuOpen) => !prevIsMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 50;
      setIsScrolled(!isTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 py-2 ${
        isScrolled ? "transition-colors duration-500 bg-white shadow-md" : ""
      }`}
    >
      <div className="flex justify-between items-center xl:max-w-7xl xl:mx-auto max-w-full flex-wrap px-4">
        <NavLink to="/home" className="cursor-pointer">
          <img
            src={"https://i.postimg.cc/d3QWvCGR/logo-new1.png"}
            alt="Logo"
            className="sm:w-12 w-12"
          />
        </NavLink>
        <div>
          <div className="lg:px-4 py-2  hover:text-blue-500 font-semibold text-lg lg:pl-6">
            {currentUser && (
              <div
                className="flex items-center cursor-pointer hover:text-primary gap-2 bg-slate"
                onClick={toggleDropdown}
              >
                <img
                  src={currentUser.profile}
                  alt={`Profile user ${currentUser.id}`}
                  className="w-6 rounded-full"
                />
                <span
                  className={`hover:text-teal-400 text-gray-200 font-semibold text-md ${
                    isScrolled ? "text-gray-500" : ""
                  }`}
                >
                  {currentUser.username}
                </span>
              </div>
            )}
            {showDropdown && currentUser && (
              <ul className="absolute bg-white border border-gray-300 rounded-lg mt-2 py-2 shadow-lg transition-all duration-300">
                <li>
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Profil
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
            {!currentUser && (
              <div className="lg:px-4 py-2 hover:text-blue-500 font-semibold text-lg lg:pl-6">
                <NavLink
                  to="/login"
                  className="bg-primary text-white rounded-full py-1 px-4 font-medium text-md ml-2 flex justify-center items-center transition duration-300 ease-in-out"
                  style={{ backgroundColor: "#15acb1" }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#1f6d79";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#15acb1";
                  }}
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden block text-white focus:outline-none relative"
          >
            <div className="h-6 w-6">
              {isMobileMenuOpen ? (
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className={`w-full h-full absolute top-0 left-0 transition-transform ${
                    isMobileMenuOpen
                      ? "rotate-90 opacity-100"
                      : "rotate-0 opacity-50"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 absolute top-0 left-0 transition-transform transform rotate-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 5h16v1H4V5zm0 6h16v1H4v-1zm0 6h16v1H4v-1z"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>

        <div>
          <nav
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } lg:flex lg:items-center lg:w-auto w-full`}
          >
            <ul className="text-base text-gray-200 flex flex-col lg:flex-row items-center lg:justify-end lg:gap-8 space-x-3">
              <li
                className={`hover:text-teal-400 font-semibold text-md ${
                  isScrolled ? "text-gray-500" : ""
                }`}
              >
                <button className="flex gap-2 items-center">
                  <AiFillHome className="menu text-lg" />
                  <NavLink to="/">Home</NavLink>
                </button>
              </li>
              <li
                className={`hover:text-teal-400 font-semibold text-md ${
                  isScrolled ? "text-gray-500" : ""
                }`}
              >
                <button className="flex items-center gap-2">
                  <AiFillFileText className="menu text-lg" />
                  <NavLink to="/article">Artikel</NavLink>
                </button>
              </li>
              <li
                className={`hover:text-teal-400 font-semibold text-md ${
                  isScrolled ? "text-gray-500" : ""
                }`}
              >
                <button className="flex items-center gap-2">
                  <AiFillCalculator className="menu text-lg" />
                  <NavLink to="/bmi">BMI</NavLink>
                </button>
              </li>
              <li
                className={`hover:text-teal-400 font-semibold text-md ${
                  isScrolled ? "text-gray-500" : ""
                }`}
              >
                <button className="flex items-center gap-2">
                  <AiFillMessage className="text-lg" />
                  <NavLink to="/forum">Forum Diskusi</NavLink>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
