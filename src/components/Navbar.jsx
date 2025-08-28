import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check for a token in localStorage (simple auth check)
    setLoggedIn(!!localStorage.getItem('token'));
    // Listen for login/logout events (optional, for multi-tab)
    window.addEventListener('storage', () => {
      setLoggedIn(!!localStorage.getItem('token'));
    });
    return () => {
      window.removeEventListener('storage', () => {});
    };
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Career Tips", href: "/career-tips" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="text-xl font-bold tracking-tight text-green-700">
            Job<span className="text-gray-900">Portal</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium text-sm tracking-wide hover:text-green-600 transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Auth/Profile Buttons */}
          <div className="hidden md:flex space-x-4">
            {!loggedIn ? (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                title="Profile"
              >
                <span role="img" aria-label="profile" className="text-xl mr-2">👤</span> Profile
              </a>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-gray-700 font-medium text-sm tracking-wide hover:text-green-600 transition"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-2">
            {!loggedIn ? (
              <>
                <a
                  href="/login"
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition text-center"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-center"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition text-center"
                title="Profile"
              >
                <span role="img" aria-label="profile" className="text-xl mr-2">👤</span> Profile
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
