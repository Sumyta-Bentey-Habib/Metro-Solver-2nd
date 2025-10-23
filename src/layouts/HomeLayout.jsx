import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/sidebar";

const HomeLayout = () => {
    return (
        <div className="flex h-screen">
      
            <SideBar />

            
            <div className="flex-1 bg-gray-50 overflow-y-auto">
                
                <Outlet /> 
            </div>
        </div>
    );
};

export default HomeLayout;