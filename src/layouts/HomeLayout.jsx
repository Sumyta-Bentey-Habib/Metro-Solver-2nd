import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <SideBar />

            {/* Main content area */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {/* Navbar at the top */}
                <Navbar />

                {/* Scrollable Outlet content */}
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
