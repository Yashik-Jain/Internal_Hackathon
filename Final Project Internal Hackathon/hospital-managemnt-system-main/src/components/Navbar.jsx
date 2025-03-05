import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              Hospital Management
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="nav-menu desktop-menu">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            {user ? (
              <>
                <Link to="/appointment" className="nav-link">
                  Appointment
                </Link>
                <div className="user-section">
                  <FaUserCircle className="text-gray-600 text-xl mr-2 user-icon" />
                  <span className="text-gray-700 user-name">{user.name || user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 logout-button"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="auth-buttons">
                <Link
                  to="/login"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300 login-button"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition duration-300 register-button"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="mobile-menu-button">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu">
            <Link
              to="/"
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="mobile-nav-link"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {user ? (
              <>
                <Link
                  to="/appointment"
                  className="mobile-nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Appointment
                </Link>
                <div className="mobile-user-section">
                  <div className="mobile-user-info">
                    <FaUserCircle className="text-gray-600 text-xl mr-2 user-icon" />
                    <span className="text-gray-700 user-name">{user.name || user.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 mobile-logout-button"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="mobile-auth-buttons">
                <Link
                  to="/login"
                  className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-center transition duration-300 mobile-login-button"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-center transition duration-300 mobile-register-button"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
