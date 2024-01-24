import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  IconButton,
} from "@material-tailwind/react";
import "../../styles/index.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import Logo from "../../assets/img/logo_puskesmas.png";
import NavList from "./HomeNavList";
import { NavLink } from "react-router-dom";

const NavbarDefault = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 50;
      setIsScrolled(!isTop);
    };
  
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsMobileMenuOpen(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  

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

  return (
    <header className={`sticky top-0 z-50 pt-2 px-2`}>
      <Navbar className={`flex justify-between py-4 py-2 items-center xl:max-w-7xl xl:mx-auto max-w-full flex-wrap px-4 ${isScrolled 
        ? "transition-colors duration-500 bg-white" 
        : "transition-colors duration-100 bg-transparent border border-transparent shadow-none backdrop-saturate-100 backdrop-blur-none"}`}
      >
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="sm:w-12 w-12 cursor-pointer ml-3" />
        </NavLink>
        <div className="absolute hidden lg:block left-1/2 transform -translate-x-1/2">
          <NavList isScrolled={isScrolled} />
        </div>
        <IconButton
          variant="text"
          onClick={toggleMobileMenu}
          ripple={false}
          className="ml-auto mb-5 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke={isScrolled ? "currentColor" : "#fff"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke={isScrolled ? "currentColor" : "#fff"}
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
        <div className="px-4 py-2 hover:text-blue-500 font-semibold text-lg lg:pl-6">
          {currentUser && (
            <div
              className="flex items-center cursor-pointer hover:text-primary gap-2"
              onClick={toggleDropdown}
            >
              <img
                src={currentUser.profile}
                alt={`Profile${currentUser.id}`}
                className="w-8 h-8 rounded-full object-cover"
                title={currentUser.username}
              />
              <span
                className={`hover:text-teal-400 ${isScrolled ? "text-gray-500" : "text-gray-100"} font-semibold text-md sm:block hidden`}
              >
                {currentUser.username}
              </span>
            </div>
          )}
          {showDropdown && currentUser && (
            <ul className="absolute bg-white backdrop-saturate-200 backdrop-blur-2xl bg-opacity-100 border border-white/80 rounded-lg mt-2 py-2 shadow-lg transition-all duration-300">
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
            <div className="hover:text-blue-500 font-semibold text-lg lg:pl-6">
              <NavLink
                to="/login"
                className="bg-primary text-white rounded-full py-1 px-4 font-medium text-md flex justify-center items-center transition duration-300 ease-in-out"
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
        <Collapse open={isMobileMenuOpen}>
          <div className="container">
            <hr className="border-gray-500 mt-3 w-screen" />
            {<NavList isScrolled={isScrolled}/>}
          </div>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default NavbarDefault;
