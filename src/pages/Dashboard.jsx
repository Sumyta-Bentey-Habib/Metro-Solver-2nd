import React, { useState, useRef, useEffect } from "react";
// React Icons Imports
import { 
    AiOutlineLineChart, 
    AiOutlineWarning, 
    AiOutlineDown 
} from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';

// --- Sub-Component 1: KPI Card ---
const KpiCard = ({ title, value, percentage, isPositive, chartColor }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
        <div className="flex flex-col">
            <h3 className="text-sm text-gray-500">{title}</h3>
            <div className="flex items-end mt-1">
                <span className="text-2xl font-bold text-gray-800">{value}</span>
                <span className={`text-xs font-semibold ml-2 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? `+${percentage}` : percentage}
                </span>
            </div>
            {/* Reduced text for better fit on small cards */}
            <p className="text-xs text-gray-400 mt-1 hidden sm:block">improved from last month</p>
            <p className="text-xs text-gray-400 mt-1 sm:hidden">from last month</p>
        </div>
        <div className="w-16 h-10 flex items-center justify-center">
            <AiOutlineLineChart className="w-full h-full" style={{ color: chartColor }} />
        </div>
    </div>
);

// --- Sub-Component 2: Financial Card ---
// Added col-span-1 for responsiveness inside the small 2-col grid
const FinancialCard = ({ title, value, isQuarterly = false, percentage = null }) => (
    <div className="bg-white p-4 rounded-xl border border-gray-100 h-full flex flex-col justify-between col-span-1">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span className="text-2xl font-bold text-gray-900 mt-1">{value}</span>
        
        {isQuarterly && (
            <div className="mt-4">
                <p className="text-sm text-gray-500">Improved from last month</p>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div 
                        className="h-full rounded-full bg-indigo-600 flex items-center justify-end pr-1 text-xs text-white" 
                        style={{ width: '50%' }}
                    >
                        50%
                    </div>
                </div>
                <p className="text-xs text-green-500 mt-1">{percentage}</p>
            </div>
        )}
    </div>
);

// --- Sub-Component 3: Alert Item ---
const AlertItem = ({ text, tag, tagColor, time, icon: Icon }) => (
    <div className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0">
        <div className="flex items-center">
            <Icon className="w-5 h-5 text-gray-400 mr-4 mt-1" />
            <div>
                <div className="flex items-center flex-wrap">
                    <p className="text-sm font-medium text-gray-800 mr-3">{text}</p>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full mt-1 sm:mt-0 ${tagColor}`}>
                        {tag}
                    </span>
                </div>
                {/* Simplified conditional text for brevity on small screens */}
                {(tag === 'Critical' || tag === 'Warning' || tag === 'Approved' || tag === 'Alert') && (
                    <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                        {tag === 'Critical' && 'Marketing department exceeded monthly budget by 15%'}
                        {tag === 'Warning' && text === 'Performance Reviews Due' && '5 employee performance reviews due this week'}
                        {tag === 'Approved' && 'Q3 Marketing campaign launching tomorrow'}
                        {tag === 'Alert' && 'Attendance rate dropped to 85% this week'}
                    </p>
                )}
            </div>
        </div>
        <span className="text-xs text-gray-500 ml-4 whitespace-nowrap">{time}</span>
    </div>
);

// --- Main Dashboard Component ---
const Dashboard = () => {
    const chartMenuItems = [
        "Job Openings", 
        "New Hires", 
        "Applications Received", 
        "Interview Stage", 
        "Attendance Rate", 
        "Absenteeism Rate", 
        "Cash Flow Status", 
        "Current Balance"
    ];
    const [activeChartItem, setActiveChartItem] = useState(chartMenuItems[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const kpiData = [
        { title: "Current Employees", value: "6941", percentage: "2.5%", isPositive: true, chartColor: '#4CAF50' },
        { title: "New Employees", value: "640", percentage: "2.5%", isPositive: true, chartColor: '#9C27B0' },
        { title: "Present Today", value: "580", percentage: "5.0%", isPositive: true, chartColor: '#FF9800' },
        { title: "Absent Today", value: "-78", percentage: "0.8%", isPositive: false, chartColor: '#F44336' },
        { title: "New CVs", value: "6941", percentage: "2.5%", isPositive: true, chartColor: '#4CAF50' },
        { title: "Intern Requests", value: "106", percentage: "2.5%", isPositive: true, chartColor: '#9C27B0' },
        { title: "Running Interns", value: "580", percentage: "5.0%", isPositive: true, chartColor: '#FF9800' },
        { title: "Intern to Employee", value: "640", percentage: "2.5%", isPositive: true, chartColor: '#9C27B0' },
    ];

    const alertData = [
        { text: "Budget Overrun Alert", tag: "Critical", tagColor: "bg-red-100 text-red-700", time: "2 hours ago", icon: MdOutlineRadioButtonUnchecked },
        { text: "Performance Reviews Due", tag: "Warning", tagColor: "bg-yellow-100 text-yellow-700", time: "10 hours ago", icon: MdOutlineRadioButtonUnchecked },
        { text: "Campaign Launch", tag: "Approved", tagColor: "bg-green-100 text-green-700", time: "1 day ago", icon: MdOutlineRadioButtonUnchecked },
        { text: "High Absenteeism", tag: "Alert", tagColor: "bg-yellow-100 text-yellow-700", time: "2 day ago", icon: MdOutlineRadioButtonUnchecked },
    ];

    const chartXAxis = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartYAxis = ["10%", "30%", "50%", "70%", "90%", "100%"];
    const chartPath = "M 0 160 C 50 160, 100 80, 150 120 C 200 160, 250 80, 300 80 C 350 80, 400 120, 450 100 C 500 80, 550 40, 600 20";

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            {/* --- Section 1: Employee Management (KPIs) --- */}
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Employee Management</h2>
                <div className="flex items-center space-x-2">
                    <button className="flex items-center text-sm px-3 py-1 border border-gray-300 rounded-lg bg-white">
                        Monthly <AiOutlineDown className="ml-1 w-3 h-3" />
                    </button>
                    <button className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-indigo-700">
                        View Details
                    </button>
                </div>
            </div>
            {/* Responsiveness: 2 columns on small screens, 4 columns on medium/large */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {kpiData.map((data, index) => <KpiCard key={index} {...data} />)}
            </div>

            {/* --- Section 2 & 3: Recruitment Chart & Financial Stats --- */}
            {/* Responsiveness: 1 column on small, 12 columns on medium/large with specific col-spans */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
                {/* Recruitment Chart */}
                {/* Takes full width on small screens, 8 columns on medium/large */}
                <div className="col-span-12 md:col-span-8 bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-6 flex-wrap">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Recruitment & Employee Engagement</h2>
                        <button className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-indigo-700">
                            View Details
                        </button>
                    </div>

                    {/* Responsiveness: Stack dropdown and chart vertically on small screens */}
                    <div className="flex flex-col md:flex-row items-start">
                        {/* Dropdown Menu */}
                        <div className="w-full md:w-40 mb-4 md:mb-0 md:mr-6 relative z-10" ref={dropdownRef}>
                            <button 
                                className="flex items-center justify-between w-full text-sm font-semibold p-2 rounded-lg bg-indigo-600 text-white"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {activeChartItem} <AiOutlineDown className="w-4 h-4" />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-xl mt-1 py-1">
                                    {chartMenuItems.map((item, index) => (
                                        <p 
                                            key={index}
                                            className={`text-sm px-3 py-2 cursor-pointer flex justify-between items-center ${
                                                item === activeChartItem 
                                                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                            onClick={() => { setActiveChartItem(item); setDropdownOpen(false); }}
                                        >
                                            {item}
                                            {item === activeChartItem && <IoMdCheckmarkCircleOutline className="w-4 h-4 text-indigo-600" />}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Chart Area */}
                        {/* Takes remaining width on large screens, full width on small screens */}
                        <div className="w-full md:flex-1">
                            <div className="flex justify-end mb-4">
                                <button className="flex items-center text-sm px-3 py-1 border border-gray-300 rounded-lg bg-white">
                                    Monthly <AiOutlineDown className="ml-1 w-3 h-3" />
                                </button>
                            </div>

                            {/* Chart SVG container: Adjusted h-48 for better mobile fit */}
                            <div className="relative h-48 sm:h-64 border rounded-lg p-2">
                                {/* Y-Axis Labels */}
                                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between h-full py-1 text-xs text-gray-500 pr-2">
                                    {chartYAxis.map((label, index) => <div key={index} className="h-6 flex items-center">{label}</div>)}
                                </div>

                                <div className="absolute inset-0 pl-10 pt-2 pb-5">
                                    <div className="absolute inset-0 border-l border-b border-gray-200">
                                        {chartYAxis.slice(0, -1).map((_, index) => (
                                            <div 
                                                key={index} 
                                                className="absolute left-0 w-full border-t border-gray-200 border-dashed"
                                                style={{ top: `${(index + 1) * (100 / (chartYAxis.length - 1))}%`, transform: 'translateY(-50%)' }}
                                            ></div>
                                        ))}
                                    </div>

                                    {/* Animated Glow Chart */}
                                    <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="absolute top-0 left-0 w-full h-full">
                                        <defs>
                                            <linearGradient id="chart-gradient" x1="0" y1="0" x2="1" y2="0">
                                                <stop offset="0%" stopColor="#8B5CF6" />
                                                <stop offset="50%" stopColor="#6D28D9" />
                                                <stop offset="100%" stopColor="#4C1D95" />
                                            </linearGradient>
                                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                                <feGaussianBlur stdDeviation="4" result="blur" />
                                                <feMerge>
                                                    <feMergeNode in="blur" />
                                                    <feMergeNode in="blur" />
                                                    <feMergeNode in="SourceGraphic" />
                                                </feMerge>
                                            </filter>
                                        </defs>

                                        {/* Glow path */}
                                        <path 
                                            d={chartPath} 
                                            fill="none" 
                                            stroke="url(#chart-gradient)" 
                                            strokeWidth="4" 
                                            filter="url(#glow)" 
                                            strokeLinecap="round"
                                        >
                                            <animate 
                                                attributeName="stroke-dashoffset" 
                                                from="600" 
                                                to="0" 
                                                dur="2s" 
                                                repeatCount="indefinite" 
                                            />
                                        </path>

                                        {/* Main line */}
                                        <path d={chartPath} fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />

                                        {/* Bottom line */}
                                        <path d="M 0 160 L 600 160" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.3" />
                                    </svg>
                                </div>

                                {/* X-Axis Labels */}
                                <div className="absolute bottom-0 left-0 right-0 h-4 pl-10 flex justify-between text-xs text-gray-500">
                                    {chartXAxis.map((label, index) => <span key={index} className="flex-1 text-center">{label}</span>)}
                                </div>

                                {/* Tooltip / Callout */}
                                <div className="absolute top-[60%] left-[55%] transform -translate-x-1/2 -translate-y-full bg-white border border-gray-300 px-3 py-1 rounded-lg shadow-md text-sm font-semibold whitespace-nowrap hidden sm:block">
                                    Job Open 320
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Financial Stats */}
                {/* Takes full width on small screens, 4 columns on medium/large */}
                <div className="col-span-12 md:col-span-4 flex flex-col space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Financial & Sales Statistic</h2>
                    {/* Responsiveness: 2 columns grid for the first two cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <FinancialCard title="Total Earning" value="£8593.65" />
                        <FinancialCard title="Total Expenses" value="£3570.50" />
                    </div>
                    <FinancialCard title="Total Sales" value="£456,780" isQuarterly={true} percentage="+15.3% this quarter" />
                </div>
            </div>

            {/* --- Section 4: Alerts & Notifications --- */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center flex-wrap mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Alerts & Notifications</h2>
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center text-sm px-3 py-1 border border-gray-300 rounded-lg bg-white">
                            Monthly <AiOutlineDown className="ml-1 w-3 h-3" />
                        </button>
                        <button className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-indigo-700">
                            View Details
                        </button>
                    </div>
                </div>
                <div className="divide-y divide-gray-100">
                    {alertData.map((data, index) => <AlertItem key={index} {...data} />)}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;