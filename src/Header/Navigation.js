import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MegaDropdown from "./MegaDropdown";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false); // mobile
  const [megaOpen, setMegaOpen] = useState(false); // desktop mega
  const wrapperRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    function handleOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setMegaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMegaOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const isActive = (path) => location.pathname === path;
  const isMenuActive = () => megaOpen || location.pathname.startsWith("/menu");

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <nav className="flex items-center justify-between py-1">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="GreeNox Logo"
              className="h-20 w-20 object-contain"
            />
          </Link>

          <div className="hidden w-full items-center justify-end md:flex">
            <div className="flex items-center gap-8 pr-8">
              <Link
                to="/"
                className={`font-medium ${
                  isActive("/")
                    ? "border-b-2 border-green-500 text-green-500"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className={`${
                  isActive("/menu") || isMenuActive()
                    ? "border-b-2 border-green-500 pb-1 text-green-500"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                Menu
              </Link>

              <Link
                to="/subscription"
                className={`${
                  isActive("/subscription")
                    ? "border-b-2 border-green-500 pb-1 text-green-500"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                Subscription Plan
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive("/about")
                    ? "border-b-2 border-green-500 pb-1 text-green-500"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/careers"
                className={`${
                  isActive("/careers")
                    ? "border-b-2 border-green-500 pb-1 text-green-500"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                Careers
              </Link>
              <Link
                to="/blog"
                className={`${
                  isActive("/blog")
                    ? "border-b-2 border-green-500 pb-1 text-green-500"
                    : "text-gray-700 hover:text-green-500"
                }`}
              >
                Blog
              </Link>

              {/* 
            <div className="flex items-center gap-4">
              <button
                className="text-gray-700 hover:text-green-500"
                aria-label="Search"
              >
                <svg
                  className="inline h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <span className="mx-2 text-gray-300">|</span>
              <Link to="/login" className="text-gray-700 hover:text-green-500">
                Login
              </Link>
              <Link
                to="/register"
                className="ml-2 rounded border border-green-500 bg-white px-4 py-1 font-medium text-green-500 hover:border-green-600 hover:bg-green-50"
              >
                Register
              </Link>
            </div> */}
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="text-gray-700 hover:text-green-500 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed right-0 top-16 z-50 h-full w-3/4 max-w-xs translate-x-0 transform border-l border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-out md:hidden">
            <div className="flex flex-col gap-4 px-4 py-4">
              <Link
                to="/"
                className={`font-medium ${isActive("/") ? "text-green-500" : "text-gray-700 hover:text-green-500"}`}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className={`${isMenuActive() ? "text-green-500" : "text-gray-700 hover:text-green-500"}`}
                onClick={() => setMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/subscription"
                className={`${isActive("/subscription") ? "text-green-500" : "text-gray-700 hover:text-green-500"}`}
                onClick={() => setMenuOpen(false)}
              >
                Subscription Plan
              </Link>
              <Link
                to="/about"
                className={`${isActive("/about") ? "text-green-500" : "text-gray-700 hover:text-green-500"}`}
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/careers"
                className={`${
                  isActive("/careers")
                    ? "border-b-2 border-green-500 pb-1 text-green-500"
                    : "text-gray-700 hover:text-green-500"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Careers
              </Link>
              <Link
                to="/blog"
                className={`${isActive("/blog") ? "text-green-500" : "text-gray-700 hover:text-green-500"}`}
                onClick={() => setMenuOpen(false)}
              >
                Blog
              </Link>

              {/* <hr className="my-2 border-gray-200" />
              <button
                className="mb-2 text-gray-700 hover:text-green-500"
                aria-label="Search"
              >
                <svg
                  className="inline h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <Link
                to="/login"
                className="text-gray-700 hover:text-green-500"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded border border-green-500 bg-white px-4 py-1 font-medium text-green-500 hover:border-green-600 hover:bg-green-50"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
