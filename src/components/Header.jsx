

import { useState, useContext, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Logo from "../assets/icons/Logo.svg";
import Hmail from "../assets/icons/Hmail.svg";
import { FaTwitter, FaSquareFacebook, FaSquareInstagram } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const navLinks = [
  { to: "/", label: "Home", exact: true },
  { to: "/about", label: "About" },
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "https://partners.intraroutes.in/my-login", label: "Partners", external: true },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll lock when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20">
      {/* Top Bar */}
      <div className=" bg-[#005cb4] text-white text-sm flex justify-end  sm:justify-between items-center pr-4 md:pr-4 lg:pr-10 py-2 pl-[160px] md:pl-[180px]  lg:pl-[200px] ">
        <div className="flex gap-2 items-center ">
          <img src={Hmail} alt="" className="w-4 h-3" />
          <a href="mailto:info@intraroutes.com" className="hover:underline">
            info@intraroutes.com
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-10">
          <div className=" hidden lg:flex items-center gap-3 ">
            <a href="#" className="hover:underline">Help</a> /
            <a href="#" className="hover:underline">Support</a> /
            <a href="#" className="hover:underline">Terms and Conditions</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaSquareFacebook /></a>
            <a href="#"><FaSquareInstagram /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b-2 border-red-500 shadow-md">
        <nav className="flex items-center justify-between h-[40px] md:h-[44px] lg:h-[54px]">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <NavLink to="/" className=" logo-effect-bg">
              <img src={Logo} alt="Logo" className="h-8 md:h-10 absolute top-1/2 left-[16px] md:left-[28px] -translate-y-1/2" />
            </NavLink>
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-6 text-[var(--secondry-text)] font-medium pl-[170px] lg:pl-[200px]">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    end={link.exact}
                    className={({ isActive }) =>
                      isActive ? 'text-red-600' : ''
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </div>
          </div>

          {/* Right Side (Call + Auth) */}
          <div className="hidden md:flex items-center gap-6 h-full">
            <div className="hidden lg:flex gap-3 items-center">
              <a href="tel:+91 9876543210" className="bg-[var(--global-red)] text-white p-2 rounded-full">
                <IoCall size={14} />
              </a>
              <div className="flex flex-col gap-0">
                <p className="text-gray-500 text-xs/4 line">Call Anytime</p>
                <a href="tel:+91 9876543210" className="text-base/4 font-semibold text-black">
                  +91 9876543210
                </a>
              </div>
            </div>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-white px-4 py-2 h-full hover:bg-red-700 transition login-signup-bg-shap cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="text-white px-4 py-2 h-full hover:bg-red-700 transition login-signup-bg-shap flex justify-center items-center  cursor-pointer"
              >
                Login
              </NavLink>

            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-700"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
        <div className="fixed inset-0 z-50 bg-black/50" aria-hidden="true" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-lg p-6 overflow-y-auto">
          <div className="flex items-center justify-between">
            <img src={Logo} alt="Logo" className="h-10" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 m-0 text-base sm:text-lg font-medium text-gray-700 hover:text-red-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive }) =>
                    `block py-2 text-base sm:text-lg m-0 font-medium hover:text-red-600 ${isActive ? 'text-red-600' : 'text-gray-700'
                    }`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              )
            )}

            {/* Call & Auth in Mobile */}
            <div className="mt-6 border-t pt-4">
              <div className="flex gap-3 items-center mb-4">
                <a href="tel:+91 9876543210" className="bg-[var(--global-red)] text-white p-2 rounded-full">
                  <IoCall size={14} />
                </a>
                <div className="flex flex-col">
                  <p className="text-gray-500 text-xs">Call Anytime</p>
                  <a href="tel:+91 9876543210" className="text-base font-semibold text-black">
                    +91 9876543210
                  </a>
                </div>
              </div>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-white py-2 bg-red-600 hover:bg-red-700 transition rounded-md"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="block w-full text-center text-white py-2 bg-red-600 hover:bg-red-700 transition rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;
