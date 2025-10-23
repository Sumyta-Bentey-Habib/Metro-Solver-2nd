import React from "react";
import { FaSearch, FaRegUserCircle, FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-3 flex items-center justify-between flex-wrap">
      {/* Search Bar */}
      <div className="flex-1 min-w-[150px] max-w-md relative mb-2 sm:mb-0">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm sm:text-base"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Spacer */}
      <div className="flex-1 hidden sm:flex"></div>

      {/* Notification & Avatar */}
      <div className="flex items-center space-x-4">
        {/* Notification */}
        <div className="relative cursor-pointer">
          <FaBell className="w-6 h-6 text-gray-500 hover:text-gray-700 transition-colors" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring-1 ring-white"></span>
        </div>

        {/* Avatar */}
        <div className="flex items-center space-x-2">
          <FaRegUserCircle className="w-8 h-8 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" />
          {/* Hide text on small screens */}
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-800">Shorab Hossen</p>
            <p className="text-xs text-gray-500">UI UX Designer</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
