import React, { useState } from 'react';

// React Icons Imports
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { 
    AiOutlineFilter, 
    AiOutlineExport,
    AiOutlineDown,
    AiOutlineClose, 
    AiOutlineMessage,
    AiFillAudio,
    AiOutlineCheck, 
    AiOutlineCloudUpload, // For the file upload icon
} from 'react-icons/ai';
import { FaRegCalendarAlt, FaRegUserCircle, FaFlag } from 'react-icons/fa'; // FaFlag for priority

// --- Sub-Component: Member Dropdown Item ---
const MemberItem = ({ name, username, isSelected, onClick }) => (
    <div 
        className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
        onClick={onClick}
    >
        <div className="flex items-center">
            <FaRegUserCircle className="w-6 h-6 text-gray-400 mr-3" /> 
            <div>
                <p className="text-sm font-medium text-gray-800">{name}</p>
                <p className="text-xs text-gray-500">{username}</p>
            </div>
        </div>
        {isSelected && <AiOutlineCheck className="w-4 h-4 text-indigo-600" />}
    </div>
);

// --- New Task Modal Component (Matching the image) ---
const CreateNewTaskModal = ({ isOpen, onClose }) => {
    const availableMembers = [
        { id: 1, name: 'Shorab Hossen', username: '@shorab' },
        { id: 2, name: 'Olivia Rhye', username: '@olivia' },
        { id: 3, name: 'Marvin McKinney', username: '@marvin' },
    ];
    
    // State for form fields
    const [selectedMember, setSelectedMember] = useState(availableMembers[0]);
    const [selectedLabel, setSelectedLabel] = useState('Meeting');
    const [taskGroup, setTaskGroup] = useState('To Do');
    const [priority, setPriority] = useState('Urgent');
    const colorOptions = ['#8B5CF6', '#EC4899', '#FBBF24', '#60A5FA', '#34D399', '#EF4444', '#10B981', '#059669'];

    // Placeholder data for dropdowns
    const labels = ['Meeting', 'Design', 'Development', 'Bug Fix', 'Research'];
    const groups = [
        { label: 'To Do', color: '#EC4899', icon: '🔴' }, // To Do
        { label: 'To Do', color: '#8B5CF6', icon: '🟣' }, // To Do (different color, assuming 'To Do' is listed twice)
        { label: 'Need Review', color: '#8B5CF6', icon: '🟣' }, 
        { label: 'In Progress', color: '#FBBF24', icon: '🟠' },
        { label: 'Done', color: '#34D399', icon: '🟢' },
    ];
    const priorities = [
        { label: 'Urgent', color: '#EF4444', icon: '🚩' },
        { label: 'Urgent', color: '#8B5CF6', icon: '🚩' }, // Urgent (listed twice)
        { label: 'Normal', color: '#8B5CF6', icon: '🏳️' },
        { label: 'High', color: '#FBBF24', icon: '✨' },
        { label: 'Low', color: '#EC4899', icon: '📉' },
    ];
    

    if (!isOpen) return null;

    // A utility function to get the ring color for radio buttons
    const getRadioRingColor = (group) => {
        switch (group) {
            case 'To Do':
                return 'ring-[#EC4899]';
            case 'In Progress':
                return 'ring-[#FBBF24]';
            case 'Need Review':
                return 'ring-[#8B5CF6]';
            case 'Done':
                return 'ring-[#34D399]';
            default:
                return 'ring-gray-400';
        }
    };
    
    // A utility function to get the icon color for priority radio buttons
    const getPriorityIconColor = (priority) => {
        switch (priority) {
            case 'Urgent':
                return 'text-red-500';
            case 'Normal':
                return 'text-indigo-500';
            case 'High':
                return 'text-yellow-500';
            case 'Low':
                return 'text-pink-500';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative" onClick={e => e.stopPropagation()}>
                
                {/* Header */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Task</h2>
                <div className="absolute top-4 right-4">
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <AiOutlineClose className="w-5 h-5" />
                    </button>
                </div>
                <hr className="mb-4" />

                <div className="space-y-4">
                    {/* Task Title */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Task Title</label>
                        <input 
                            type="text" 
                            defaultValue="Meeting Client for Dashboard UI"
                            className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Write Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Write Description</label>
                        <textarea 
                            defaultValue="Meeting with a client for a Dashboard UI project..."
                            rows="2"
                            className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* Add Member Dropdown */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Add Member</label>
                            <div className="relative">
                                <select 
                                    className="appearance-none w-full p-2 pl-8 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                                    value={selectedMember.id}
                                    onChange={(e) => setSelectedMember(availableMembers.find(m => m.id === parseInt(e.target.value)))}
                                >
                                    {availableMembers.map(member => (
                                        <option key={member.id} value={member.id}>{member.name}</option>
                                    ))}
                                </select>
                                <FaRegUserCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <AiOutlineDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>

                        {/* Add Labels Dropdown */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Add Labels</label>
                            <div className="relative">
                                <select 
                                    className="appearance-none w-full p-2 border border-gray-300 rounded-lg text-gray-800 bg-white focus:ring-indigo-500 focus:border-indigo-500"
                                    value={selectedLabel}
                                    onChange={(e) => setSelectedLabel(e.target.value)}
                                >
                                    {labels.map(label => (
                                        <option key={label} value={label}>{label}</option>
                                    ))}
                                </select>
                                <AiOutlineDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Due Date Input */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Due Date</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    defaultValue="Select date"
                                    readOnly
                                    className="w-full p-2 pl-8 border border-gray-300 rounded-lg text-gray-500 cursor-pointer"
                                />
                                <FaRegCalendarAlt className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                        </div>

                        {/* Add Time Input */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Add Time</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    defaultValue="Select time"
                                    readOnly
                                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-500 cursor-pointer"
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">🕒</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Add Group Radio Buttons */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Add Group</label>
                            <div className="space-y-2">
                                {groups.map((group, index) => (
                                    <div key={index} className="flex items-center">
                                        <input 
                                            type="radio"
                                            id={`group-${index}`}
                                            name="taskGroup"
                                            value={group.label}
                                            checked={taskGroup === group.label}
                                            onChange={() => setTaskGroup(group.label)}
                                            className="hidden"
                                        />
                                        <label 
                                            htmlFor={`group-${index}`}
                                            className={`flex items-center cursor-pointer text-sm text-gray-700 group-hover:text-gray-900`}
                                        >
                                            <span 
                                                className={`w-4 h-4 rounded-full border border-gray-400 mr-2 flex items-center justify-center 
                                                    ${taskGroup === group.label ? 'ring-2 ' + getRadioRingColor(group.label) : ''} transition-all`}
                                                style={{ backgroundColor: group.color, borderColor: group.color }}
                                            >
                                                {taskGroup === group.label && <span className="w-1.5 h-1.5 rounded-full bg-white block"></span>}
                                            </span>
                                            {group.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Set Priority Radio Buttons */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-2">Set Priority</label>
                            <div className="space-y-2">
                                {priorities.map((p, index) => (
                                    <div key={index} className="flex items-center">
                                        <input 
                                            type="radio"
                                            id={`priority-${index}`}
                                            name="priority"
                                            value={p.label}
                                            checked={priority === p.label}
                                            onChange={() => setPriority(p.label)}
                                            className="hidden"
                                        />
                                        <label 
                                            htmlFor={`priority-${index}`}
                                            className={`flex items-center cursor-pointer text-sm text-gray-700 group-hover:text-gray-900`}
                                        >
                                            <FaFlag className={`w-4 h-4 mr-2 ${getPriorityIconColor(p.label)}`} style={{ color: p.color }}/>
                                            {p.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* File Upload Area */}
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl mt-4">
                        <AiOutlineCloudUpload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-700 font-medium">
                            <span className="text-indigo-600 cursor-pointer hover:text-indigo-700">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            SVG, PNG, JPG or GIF (max. 800x400px)
                        </p>
                    </div>

                    {/* Color Selectors */}
                    <div className="flex space-x-2 justify-center pt-2">
                        {colorOptions.map((color, index) => (
                            <div 
                                key={index}
                                className={`w-8 h-8 rounded-full cursor-pointer hover:ring-2 ring-offset-1 transition-all`}
                                style={{ backgroundColor: color, borderColor: color, ringColor: color }}
                                onClick={() => console.log('Color selected:', color)} // Placeholder action
                            >
                                {/* Add a checkmark if needed to indicate selection */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-100">
                    <button onClick={onClose} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">Cancel</button>
                    <button className="px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all">Save</button>
                </div>
            </div>
        </div>
    );
};


// --- Project Meeting Schedule Modal (Existing Modal - Renamed/Adjusted) ---
const ProjectMeetingScheduleModal = ({ isOpen, onClose }) => {
    // ... (Keep your existing ProjectMeetingScheduleModal logic)
    const availableMembers = [
        { id: 1, name: 'Olivia Rhye', username: '@olivia' },
        { id: 2, name: 'Marvin McKinney', username: '@marvin' },
        { id: 3, name: 'Guy Hawkins', username: '@guy' },
        { id: 4, name: 'Arlene McCoy', username: '@arlene' },
        { id: 5, name: 'Robert Fox', username: '@robert' },
    ];
    
    const [selectedMembers, setSelectedMembers] = useState(
        availableMembers.map(m => m.id)
    );

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMember = (memberId) => {
        setSelectedMembers(prev => 
            prev.includes(memberId) 
                ? prev.filter(id => id !== memberId) 
                : [...prev, memberId]
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/20" onClick={onClose}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative" onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Project Meeting Schedule</h2>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                    <AiOutlineClose className="w-5 h-5" />
                </button>

                <div className="space-y-4">
                    {/* Task Title */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Task Title</label>
                        <input 
                            type="text" 
                            defaultValue="Meeting Client for Dashboard UI"
                            className="w-full p-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Name and Add Member */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* The image doesn't show a separate 'Name' field, but I'll keep the structure you had and just modify the labels to be closer to the original prompt: Add Member and Add Labels/something else for the second column */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Assigned User</label>
                            <div className="relative">
                                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <FaRegUserCircle className="w-4 h-4" />
                                </span>
                                <input 
                                    type="text" 
                                    defaultValue="Shorab Hossen"
                                    className="w-full p-2 pl-8 border border-gray-300 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
                                    readOnly
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Add Participants</label>
                            <div className="relative">
                                <div 
                                    className="flex items-center justify-between w-full p-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <span className="text-gray-500 flex items-center">
                                        <FaRegUserCircle className="w-4 h-4 mr-1" /> Search...
                                    </span>
                                    <AiOutlineDown className="w-4 h-4 text-gray-400" />
                                </div>

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-20">
                                        {availableMembers.map(member => (
                                            <MemberItem 
                                                key={member.id}
                                                {...member}
                                                isSelected={selectedMembers.includes(member.id)}
                                                onClick={() => toggleMember(member.id)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Meeting Date</label>
                        <div className="relative"> 
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <FaRegCalendarAlt className="w-4 h-4" />
                            </span>
                            <input 
                                type="text" 
                                defaultValue="24/05/25"
                                readOnly
                                className="w-full p-2 pl-8 border border-gray-300 rounded-lg text-gray-800 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Conversation Type */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">Conversation Type</label>
                        <div className="flex space-x-2">
                            <button className="flex items-center justify-center w-24 h-8 border border-gray-300 rounded-lg text-gray-700 bg-gray-100/50 hover:bg-gray-100">
                                <AiOutlineMessage className="w-4 h-4 mr-1" /> Message
                            </button>
                            <button className="flex items-center justify-center w-24 h-8 border border-gray-300 rounded-lg text-gray-700 bg-gray-100/50 hover:bg-gray-100">
                                <AiFillAudio className="w-4 h-4 mr-1" /> Audio
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                    <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                    <button className="px-4 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">Book Now</button>
                </div>
            </div>
        </div>
    );
};

// --- Calendar Event Card (No changes) ---
const CalendarEvent = ({ name, title, time, members = [], platform, color }) => {
    const bgColor = {
        '#8B5CF6': 'bg-indigo-100 border-l-indigo-500',
        '#34D399': 'bg-green-100 border-l-green-500',
        '#FBBF24': 'bg-yellow-100 border-l-yellow-500',
        '#EC4899': 'bg-pink-100 border-l-pink-500',
        '#60A5FA': 'bg-blue-100 border-l-blue-500',
    }[color] || 'bg-gray-100 border-l-gray-500';

    return (
        <div 
            className={`absolute w-[95%] left-[2.5%] p-1 rounded text-xs border-l-4 shadow-sm cursor-pointer hover:shadow-md ${bgColor}`}
            style={{ 
                height: `${(time.duration / 60) * 80 - 4}px`,
                top: `${(time.startHour - 6) * 80 + time.startMinute * (80 / 60) + 2}px`
            }}
        >
            <p className="font-semibold text-gray-800 leading-tight">{name}</p>
            <p className="text-gray-600 leading-tight">{title}</p>
            <p className="text-gray-500 mt-1">{time.label}</p>
            <div className="flex items-center mt-1">
                {members.slice(0, 3).map((member, index) => (
                    <div key={index} className="w-4 h-4 rounded-full bg-gray-400 border border-white -mr-1 flex items-center justify-center">
                        <FaRegUserCircle className="w-3 h-3 text-white" />
                    </div>
                ))}
                {members.length > 3 && (
                    <span className="text-[10px] bg-gray-200 text-gray-600 px-1 rounded-full ml-2">
                        +{members.length - 3}
                    </span>
                )}
                {platform && (
                    <span className="ml-2 px-1 text-[10px] bg-white rounded-md border border-gray-200 text-indigo-600">
                        {platform}
                    </span>
                )}
            </div>
        </div>
    );
};

// --- Main Calendar Component (Updated with new modal state) ---
const Calendar = () => {
    const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    
    const openMeetingModal = () => setIsMeetingModalOpen(true);
    const closeMeetingModal = () => setIsMeetingModalOpen(false);

    const openTaskModal = () => setIsTaskModalOpen(true);
    const closeTaskModal = () => setIsTaskModalOpen(false);

    const today = "Wed 06";
    const days = [
        { label: "Wed 06", date: "Wed 06" },
        { label: "Thu 07", date: "Thu 07" },
        { label: "Fri 08", date: "Fri 08" },
        { label: "Sat 09", date: "Sat 09" },
        { label: "Sun 10", date: "Sun 10" },
        { label: "Mon 11", date: "Mon 11" },
    ];
    const hours = ["06 AM", "07 AM", "08 AM", "09 AM", "10 AM"];

    const events = [
        { day: "Wed 06", name: "Tahsian Khan", title: "Project Review Meeting", time: { label: "5:30 AM - 07:00 AM", startHour: 5, startMinute: 30, duration: 90 }, members: ['a','b','c'], platform: 'on Zoom', color: '#8B5CF6' },
        { day: "Wed 06", name: "Herry Brooks", title: "Sales Performance", time: { label: "6:10 AM - 07:30 AM", startHour: 6, startMinute: 10, duration: 80 }, members: ['d','e','f','g'], platform: 'on Zoom', color: '#8B5CF6' },
        { day: "Thu 07", name: "Herry Kane", title: "Marketing Strategy", time: { label: "7:30 AM - 07:50 AM", startHour: 7, startMinute: 30, duration: 20 }, members: ['h','i'], platform: null, color: '#FBBF24' },
        { day: "Thu 07", name: "Matt Henry", title: "Bi-Weekly Marketing", time: { label: "8:30 AM - 09:30 AM", startHour: 8, startMinute: 30, duration: 60 }, members: ['j','k','l','m'], platform: null, color: '#60A5FA' },
        { day: "Fri 08", name: "Tahsian Khan", title: "Project Review", time: { label: "8:30 AM - 09:30 AM", startHour: 8, startMinute: 30, duration: 60 }, members: ['n','o','p'], platform: null, color: '#8B5CF6' },
        { day: "Sat 09", name: "Azam Khan", title: "Employee Recruitment", time: { label: "8:00 AM - 09:20 AM", startHour: 8, startMinute: 0, duration: 80 }, members: ['q','r','s'], platform: 'On Slack', color: '#8B5CF6' },
        { day: "Sun 10", name: "Herry Kane", title: "Marketing Strategy", time: { label: "10:00 AM - 10:30 AM", startHour: 10, startMinute: 0, duration: 30 }, members: ['t','u'], platform: null, color: '#FBBF24' },
        { day: "Mon 11", name: "James Henry", title: "Customer Feedback", time: { label: "8:30 AM - 09:30 AM", startHour: 8, startMinute: 30, duration: 60 }, members: ['v','w','x'], platform: 'on Meet', color: '#EC4899' },
        { day: "Mon 11", name: "Tim David", title: "Quarterly Financial", time: { label: "6:00 AM - 06:30 AM", startHour: 6, startMinute: 0, duration: 30 }, members: ['v','w','x'], platform: null, color: '#EC4899' },
    ];

    return (
        <div className="flex flex-col h-full bg-white p-4">
            {/* Header */}
            <header className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-xl font-semibold text-gray-800">November 06, 2024</h1>
                    <div className="flex space-x-2">
                        <button className="flex items-center px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50" onClick={openMeetingModal}>
                            <FaRegCalendarAlt className="mr-1" /> Schedule
                        </button>
                        <button className="flex items-center px-3 py-1 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700" onClick={openTaskModal}>
                            + Create Task
                        </button>
                    </div>
                </div>
                <p className="text-sm text-gray-500">You have 2 meetings and 1 event today</p>
            </header>

            {/* Controls */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-lg">Today</button>
                    <div className="flex items-center space-x-1">
                        <button className="p-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-100"><IoIosArrowBack /></button>
                        <button className="p-1 border border-gray-300 rounded text-gray-500 hover:bg-gray-100"><IoIosArrowForward /></button>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="flex items-center px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100">Weekly <AiOutlineDown className="ml-1 w-3 h-3" /></button>
                    <button className="flex items-center px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"><AiOutlineFilter className="mr-1" /> Filter</button>
                    <button className="flex items-center px-2 py-1 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"><AiOutlineExport className="mr-1" /> Export</button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="flex-grow overflow-auto border border-gray-200 rounded-lg relative">
                <div className="grid grid-cols-7 sticky top-0 bg-white border-b border-gray-200 z-10">
                    <div className="w-16"></div>
                    {days.map((day, index) => (
                        <div key={index} className={`p-2 text-center text-sm font-semibold border-r last:border-r-0 ${day.date===today ? 'bg-indigo-50 text-indigo-600':'text-gray-700'}`}>
                            {day.label}
                        </div>
                    ))}
                </div>

                <div className="relative grid grid-cols-7">
                    {/* Time Column */}
                    <div className="sticky left-0 w-16 bg-white border-r border-gray-200 z-10">
                        {hours.map((hour, idx) => (
                            <div key={idx} className="h-20 border-b border-gray-200 relative">
                                <span className="absolute top-[-10px] right-1 text-xs text-gray-500">{hour}</span>
                            </div>
                        ))}
                    </div>

                    {/* Day Columns */}
                    {days.map((day, dIdx) => (
                        <div key={dIdx} className="relative h-full border-r border-gray-200 last:border-r-0" style={{minHeight: `${hours.length*80}px`}}>
                            {hours.map((_, hIdx) => (
                                <div key={hIdx} className={`absolute left-0 w-full h-20 ${day.date.includes('Sat')||day.date.includes('Sun')?'border-b border-dashed border-gray-300 bg-gray-50/50':'border-b border-gray-100'}`} style={{top: hIdx*80}}></div>
                            ))}
                            {events.filter(e=>e.day===day.date).map((e,i)=> <CalendarEvent key={i} {...e} />)}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals */}
            <ProjectMeetingScheduleModal isOpen={isMeetingModalOpen} onClose={closeMeetingModal} />
            <CreateNewTaskModal isOpen={isTaskModalOpen} onClose={closeTaskModal} />
        </div>
    );
};

export default Calendar;