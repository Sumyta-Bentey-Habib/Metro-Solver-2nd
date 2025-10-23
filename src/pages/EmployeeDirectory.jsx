import React, { useState } from 'react';
import {
    AiOutlineSearch,
    AiOutlinePlus,
    AiOutlineExport,
    AiOutlineUser,
} from 'react-icons/ai';

import {
    BsThreeDotsVertical,
    BsBuildings,
    BsCalendarCheck,
    BsClock,
    BsCashStack,
    BsFileEarmarkText,
    BsHeartPulse,
    BsPersonVcard,
    BsBriefcase,
} from 'react-icons/bs';

import { MdOutlineEdit } from 'react-icons/md';

const EmployeeCard = ({ name, title, location, isCEO = false }) => (
    <div className={`flex flex-col items-center p-4 rounded-lg shadow-lg border w-40 bg-white ${isCEO ? 'border-gray-300' : 'border-gray-200'} relative`}>
        <div className="mb-2">
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border border-gray-400">
                <AiOutlineUser className="w-8 h-8 text-gray-600" />
            </div>
        </div>

        <div className="text-center mt-1">
            <p className="font-semibold text-sm text-gray-800 leading-tight">{name}</p>
            <p className="text-xs text-gray-500 leading-tight">{title}</p>
            <p className="text-xs text-gray-400 leading-tight">{location}</p>
        </div>

        <div className="absolute top-1 right-1">
            <BsThreeDotsVertical className="text-gray-400 text-sm hover:text-gray-700 cursor-pointer" />
        </div>
    </div>
);

const OrgChartStructure = () => (
    <div className="p-8">
        <div className="flex flex-col items-center relative">
            <div className="mb-10 relative z-10">
                <EmployeeCard
                    name="Tashvan Khan"
                    title="Founder - CEO"
                    location="Boston HQ"
                    isCEO={true}
                />
            </div>

            <div className="absolute top-[80px] w-0.5 h-10 bg-gray-300 z-0"></div> 
            <div className="absolute top-[120px] w-96 h-0.5 bg-gray-300 z-0"></div> 

            <div className="flex justify-center space-x-20 w-full relative z-10">
                <div className="relative">
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gray-300"></div>
                    <EmployeeCard name="Herry Kane" title="Engineering" location="London Office" />
                </div>
                <div className="relative">
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gray-300"></div>
                    <EmployeeCard name="Herry Brooks" title="Commercial" location="London Office" />
                </div>
                <div className="relative">
                    <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gray-300"></div>
                    <EmployeeCard name="David Warner" title="Finance" location="Boston HQ" />
                </div>
            </div>

            <div className="flex justify-center space-x-16 mt-20 w-full relative z-10">
                <EmployeeCard name="Azam Khan" title="Marketing" location="Boston HQ" />
                <EmployeeCard name="Tim David" title="HR Management" location="Boston HQ" />
                <EmployeeCard name="Joe Root" title="Account Executive" location="Boston HQ" />
            </div>

            <div className="flex justify-center space-x-40 mt-20 w-full relative z-10">
                <EmployeeCard name="Hames James" title="Account Executive" location="Boston HQ" />
                <EmployeeCard name="Jaman Khan" title="Engineering" location="Boston HQ" />
            </div>
        </div>
    </div>
);

const EmployeeDirectory = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const tabs = [
        { name: 'ORG Chart', icon: BsBuildings, active: true },
        { name: 'Profile', icon: BsPersonVcard },
        { name: 'Attendance', icon: BsCalendarCheck },
        { name: 'Time Tracking', icon: BsClock },
        { name: 'Leave Management', icon: BsBriefcase },
        { name: 'Requests', icon: MdOutlineEdit },
        { name: 'Payment', icon: BsCashStack },
        { name: 'Document', icon: BsFileEarmarkText },
        { name: 'Skills', icon: 'AiOutlineSetting' }, 
        { name: 'Wellness', icon: 'BsHeartPulse' }, 
    ];

    // Employee names for search
    const employees = [
        "Tashvan Khan",
        "Herry Kane",
        "Herry Brooks",
        "David Warner",
        "Azam Khan",
        "Tim David",
        "Joe Root",
        "Hames James",
        "Jaman Khan"
    ];

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if(value.length > 0){
            const filtered = employees.filter(emp => emp.toLowerCase().includes(value.toLowerCase()));
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }

    return (
        <div className="flex flex-col h-full bg-white">

            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-6 pt-6">
                <h1 className="text-xl font-semibold text-gray-800">People Directory</h1>
                <div className="flex space-x-3">
                    <button className="flex items-center px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <AiOutlineExport className="mr-2" /> Export
                    </button>
                    <button 
                        className="flex items-center px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                        onClick={() => setModalOpen(true)}
                    >
                        <AiOutlinePlus className="mr-2" /> Creating New Account
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-gray-200 mb-6 px-6 overflow-x-auto whitespace-nowrap">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex items-center pb-3 text-sm font-medium transition duration-150
                            ${tab.active
                                ? 'text-indigo-600 border-b-2 border-indigo-600'
                                : 'text-gray-500 hover:text-gray-700'}` }
                    >
                        {index < 6 ? <tab.icon className="mr-1.5 w-4 h-4" /> : <BsThreeDotsVertical className="mr-1.5 w-4 h-4" />}
                        {tab.name}
                    </button>
                ))}
            </div>

            {/* Search */}
            <div className="flex justify-between items-center mb-6 px-6 relative">
                <div className="relative w-96">
                    <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for employee..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto z-50">
                            {suggestions.map((emp, idx) => (
                                <li 
                                    key={idx} 
                                    className="px-4 py-2 hover:bg-indigo-50 cursor-pointer"
                                    onClick={() => { setSearchQuery(emp); setSuggestions([]); }}
                                >
                                    {emp}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button className="flex items-center px-4 py-2 text-sm text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50">
                    <MdOutlineEdit className="mr-1.5" /> Edit ORG Chart
                </button>
            </div>

            {/* Org Chart */}
            <div className="flex-grow relative overflow-hidden">
                <div className="absolute inset-0 overflow-auto bg-gray-50 border border-gray-200 rounded-lg mx-6 mb-6">
                    <OrgChartStructure />
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-6 w-96 relative">
                        <h2 className="text-lg font-semibold mb-4">Create New Employee</h2>
                        <form className="flex flex-col space-y-3">
                            <input type="text" placeholder="First Name" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="text" placeholder="Last Name" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="email" placeholder="Email" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="text" placeholder="Phone Number" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="password" placeholder="Password" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            <input type="password" placeholder="Confirm Password" className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />

                            <div className="flex justify-end space-x-2 mt-2">
                                <button type="button" className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setModalOpen(false)}>Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default EmployeeDirectory;
