import React from 'react';
import { Link } from 'react-router-dom';
import { Film, User, Sun, Moon, Clock, HeadphonesIcon } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-indigo-600'} text-white shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8" />
            <span className="font-bold text-xl">ONLINE CINEMA BOOKING SYSTEM</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/support" className="hover:text-gray-200 flex items-center space-x-1">
              <HeadphonesIcon className="h-5 w-5" />
              <span>Support</span>
            </Link>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-indigo-700'
              }`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/history" className="hover:text-gray-200 flex items-center space-x-1">
                  <Clock className="h-5 w-5" />
                  <span>History</span>
                </Link>
                <Link to="/bookings" className="hover:text-gray-200">My Bookings</Link>
                <button
                  onClick={logout}
                  className={`${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-indigo-700 hover:bg-indigo-800'
                  } px-4 py-2 rounded-md`}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 hover:text-gray-200"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className={`${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-indigo-600'
                  } px-4 py-2 rounded-md hover:opacity-90`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}