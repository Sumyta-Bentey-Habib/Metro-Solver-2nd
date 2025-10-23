import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineClockCircle,
  AiOutlineTeam,
  AiOutlineMessage,
  AiOutlineCalendar,
  AiOutlineSetting,
} from "react-icons/ai";
import {
  MdOutlineMeetingRoom,
  MdOutlineWork,
  MdOutlineDescription,
  MdOutlineTask,
  MdOutlineGroups,
  MdOutlineFeed,
  MdOutlineBook,
  MdOutlinePolicy,
  MdOutlineSupportAgent,
  MdOutlineLogout,
} from "react-icons/md";
import { FiChevronLeft, FiChevronRight, FiMenu } from "react-icons/fi";

const Logo = ({ collapsed }) => (
  <div
    className={`flex items-center transition-all duration-300 ${
      collapsed ? "justify-center py-5" : "p-4"
    }`}
  >
    <div className="h-8 w-8 bg-indigo-500 rounded-full mr-2"></div>
    {!collapsed && <span className="text-lg font-semibold text-gray-800">METRO SOLVE</span>}
  </div>
);

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: AiOutlineDashboard, path: "/" },
    { name: "Time Tracking", icon: AiOutlineClockCircle },
    { name: "Meeting", icon: MdOutlineMeetingRoom },
    { name: "Employees", icon: MdOutlineGroups, path: "/employees" },
    { name: "Company Statistic", icon: MdOutlineWork },
    { name: "Recruitment", icon: MdOutlineDescription },
    { name: "Messages", icon: AiOutlineMessage },
    { name: "Task", icon: MdOutlineTask },
    { name: "Calendar", icon: AiOutlineCalendar, path: "/calendar" },
    { name: "Project Collaboration", icon: MdOutlineGroups },
    { name: "HMRC", icon: MdOutlineDescription },
    { name: "NewsFeed", icon: MdOutlineFeed },
    { name: "Course", icon: MdOutlineBook },
    { name: "Policies", icon: MdOutlinePolicy },
    { name: "Metro Assistant", icon: MdOutlineSupportAgent },
    { name: "Setting", icon: AiOutlineSetting },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-500 text-white rounded-md shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed sm:static top-0 left-0 h-screen border-r border-gray-200 flex flex-col transition-all duration-300 bg-white z-40
        ${collapsed ? "w-20" : "w-64"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="relative">
          <Logo collapsed={collapsed} />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 bg-indigo-500 text-white p-1 rounded-full shadow-md hover:bg-indigo-600 transition hidden sm:block"
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <ul className="flex-1 overflow-y-auto px-2 py-3 text-gray-700 space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={index} className="relative group">
                <Link
                  to={item.path || "#"}
                  className={`flex items-center rounded-md px-3 py-3 text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-100 text-indigo-600 font-medium"
                      : "hover:bg-indigo-100 hover:text-indigo-600"
                  }`}
                  onClick={() => setMobileOpen(false)} // close on mobile
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {!collapsed && <span className="ml-3 whitespace-nowrap">{item.name}</span>}
                </Link>

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 ease-out z-50">
                    <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                      {item.name}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="border-t px-2 py-3">
          <Link
            to="/logout"
            className="flex items-center text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 rounded-md px-3 py-3 transition"
          >
            <MdOutlineLogout className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="ml-3">Log Out</span>}
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 sm:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
