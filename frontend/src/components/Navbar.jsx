import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, ChevronDown, MoveRight } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../assets/images/sila.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY <= 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleMobileNavClick = () => setIsOpen(false);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Main Navbar with rounded-full */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 w-[300px] lg:w-[1200px]">
        <div className="bg-white dark:bg-[#2F2E34] border border-gray-200 dark:border-zinc-800 rounded-full">
          <div className="flex items-center gap-4 lg:gap-10 justify-between h-16 px-4 lg:px-10">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-24 h-24 rounded-md flex items-center justify-center">
                  <img
                    src={Logo}
                    alt="sila logo"
                    className="w-full h-full object-contain filter dark:invert"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-10 justify-end">
              <NavLink
                href="/"
                label="Home"
                isActive={location.pathname === "/"}
              />
              <NavLink
                href="/about"
                label="About"
                isActive={location.pathname === "/about"}
              />
              <NavLink
                href="/features"
                label="Features"
                isActive={location.pathname === "/features"}
              />
              <NavLink
                href="/documentation"
                label="Documentation"
                isActive={location.pathname === "/documentation"}
              />
              <NavLink
                href="/open-source"
                label="Open Source"
                isActive={location.pathname === "/open-source"}
              />
              {/* <NavLink
                href="/contact-us"
                label="Contact us"
                isActive={location.pathname === "/contact-us"}
              /> */}

              <Link to="/demo">
                <button className="flex items-center gap-2 bg-gradient-to-r from-gray-900 via-gray-800 to-black hover:from-black hover:to-gray-800 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                  Demo
                </button>
              </Link>

              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-[#2F2E34] border-t border-gray-200 dark:border-zinc-800">
            <div className="px-4 py-3 space-y-1">
              <MobileNavLink
                href="/"
                label="Home"
                onClick={handleMobileNavClick}
                isActive={location.pathname === "/"}
              />
              <MobileNavLink
                href="/about"
                label="About"
                onClick={handleMobileNavClick}
                isActive={location.pathname === "/about"}
              />
              <MobileNavLink
                href="/features"
                label="Features"
                onClick={handleMobileNavClick}
                isActive={location.pathname === "/features"}
              />
              <MobileNavLink
                href="/documentation"
                label="Documentation"
                onClick={handleMobileNavClick}
                isActive={location.pathname === "/documentation"}
              />
              <MobileNavLink
                href="/open-source"
                label="Open Source"
                onClick={handleMobileNavClick}
                isActive={location.pathname === "/open-source"}
              />
              {/* <MobileNavLink
                href="/contact-us"
                label="Contact Us"
                onClick={handleMobileNavClick}
                isActive={location.pathname === "/contact-us"}
              /> */}
              <div className="pt-4">
                <button
                  className="block w-full text-center py-2 bg-gradient-to-r from-gray-900 via-gray-800 to-black hover:from-black hover:to-gray-800 text-white rounded-lg"
                  onClick={() => {
                    navigate("/demo");
                    handleMobileNavClick();
                  }}
                >
                  Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NavLink = ({ href, label, isActive }) => (
  <Link
    to={href}
    className={`text-sm transition-colors duration-200 ${
      isActive
        ? "bg-gray-800 text-gray-200 dark:bg-gray-500 rounded-full px-3 py-2"
        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
    }`}
  >
    {label}
  </Link>
);

const MobileNavLink = ({ href, label, onClick, isActive }) => (
  <Link
    to={href}
    onClick={onClick}
    className={`block text-base font-medium px-4 py-2 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-slate-400 text-gray-700 dark:bg-gray-700 dark:text-white"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
    }`}
  >
    {label}
  </Link>
);

export default Navbar;
