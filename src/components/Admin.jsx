import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes, FaUsers, FaChalkboardTeacher, FaClipboardList, FaCog, FaChartBar, FaCalendarAlt } from 'react-icons/fa'
import ThemeContext from './context/ThemeContext'
import axios from 'axios'
import Leaderboard from './Leaderboard'
import AddCourseForm from './admin/AddCourseForm'

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [count, setcount] = useState()
    const [upcomingCount, setupcomingCount] = useState()
    const [faculty, setfaculty] = useState()
    const [classCount, setclassCount] = useState()
    const { theme } = useContext(ThemeContext)

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

    const colors = {
        background: theme === 'light' ? 'bg-white' : 'bg-black',
        text: theme === 'light' ? 'text-black' : 'text-white',
        card: theme === 'light' ? 'bg-gray-100' : 'bg-white/10',
        hover: theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-white/10',
        border: theme === 'light' ? 'border-gray-200' : 'border-white/10'
    }
    const menuItems = [
        { to: '/results', icon: <FaChartBar />, label: 'Results' },
        { to: '/admin/faculties', icon: <FaChalkboardTeacher />, label: 'Faculties' },
        { to: '/admin/students', icon: <FaUsers />, label: 'Students' },
        { to: '/admin/classes', icon: <FaCalendarAlt />, label: 'Class Management' },
        { to: '/admin/tests', icon: <FaClipboardList />, label: 'Test Management' },
        { to: '/settings', icon: <FaCog />, label: 'Settings' },
    ]
    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";
    const getStudentCount = async () => {
        try {
            const res = await axios.get(`${API}/user/getcount`)
            setcount(res.data.count)
        } catch (error) {
            console.log("Error is =>", error);
        }
    }

    const getActiveClassCount = async () => {
        try {
            const res = await axios.get(`${API}/class/getActiveClassCount`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setclassCount(res.data.activeCount);
            setupcomingCount(res.data.upcomingCount)

        } catch (error) {
            console.log("Error is => ", error);

        }
    }
    const getFacultyCount = async () => {
        try {
            const res = await axios.get(`${API}/faculty/getFacultyCount`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setfaculty(res.data.count)

        } catch (error) {
            console.log("Error is =>", error);

        }
    }
    useEffect(() => {
        getStudentCount()
        getFacultyCount()
        getActiveClassCount()
    }, [])
    return (
        <>
            <div className={`h-screen grid transition-all duration-300 ${sidebarOpen ? 'grid-cols-[240px_1fr]' : 'grid-cols-[70px_1fr]'} ${colors.background} ${colors.text}`}>

                {/* Sidebar */}
                <div className={`p-4 transition-all duration-300 border-r ${colors.border}`}>

                    <div className="flex justify-between items-center mb-10 relative">
                        <h2 className={`text-xl font-bold whitespace-nowrap transition-all duration-300 ${!sidebarOpen ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
                            MySchool
                        </h2>

                        <div className="relative">
                            <button
                                onClick={toggleSidebar}
                                className="group w-10 h-10 flex items-center justify-center text-xl hover:bg-white/10 rounded focus:outline-none relative"
                            >
                                {sidebarOpen ? <FaTimes /> : <FaBars />}
                                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-white text-black text-sm font-medium px-3 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
                                    {sidebarOpen ? "Collapse" : "Expand"}
                                </span>
                            </button>
                        </div>
                    </div>

                    <ul className="space-y-1">
                        {menuItems.map((item, idx) => (
                            <li key={idx} className="relative">
                                <Link
                                    to={item.to}
                                    className={`flex items-center rounded-lg px-3 py-3 gap-4 ${colors.text} ${colors.hover} transition-all duration-200 ${!sidebarOpen ? 'justify-center' : ''}`}
                                >
                                    <span className="text-2xl relative group">
                                        {item.icon}
                                        {!sidebarOpen && (
                                            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-white text-black text-sm font-medium px-3 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
                                                {item.label}
                                            </span>
                                        )}
                                    </span>
                                    {sidebarOpen && (
                                        <span className="text-base font-medium truncate">{item.label}</span>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                </div>

                {/* Content */}
                <div className="p-10 transition-all duration-300">
                    <h1 className="text-3xl font-bold mb-8">Welcome, Mr. {localStorage.getItem("userName")}</h1>
                    <div className="flex flex-wrap gap-6 mb-10">
                        {[
                            { label: 'Total Faculty', value: faculty },
                            { label: 'Active Classes', value: classCount },
                            { label: 'Total Students', value: count },
                            { label: 'Upcoming Live Sessions', value: upcomingCount },
                        ].map((card, i) => (
                            <div key={i} className={`${colors.card} rounded-xl p-6 min-w-[220px] flex-1 shadow-md hover:-translate-y-1 transition-transform duration-200`}>
                                <h3 className="text-lg mb-2 font-semibold">{card.label}</h3>
                                <p className="text-2xl font-bold">{card.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Leaderboard />
                    </div>
                </div>
            </div>
            <AddCourseForm />
        </>
    )
}

export default Admin