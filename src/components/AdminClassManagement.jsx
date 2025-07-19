import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import ThemeContext from './context/ThemeContext';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const AdminClassManagement = () => {
    const { theme } = useContext(ThemeContext);
    const [showModal, setShowModal] = useState(false);
    const [subjectHandler, setsubjectHandler] = useState([]);
    const [facultyName, setfacultyName] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState("");
    const rooms = ["101", "102", "103", "104", "201", "202", "203", "204"];
    const [availableRooms, setAvailableRooms] = useState(rooms);
    const [isClasscreated, setisClasscreated] = useState(false)
    const [previousClasses, setpreviousClasses] = useState([])
    const [upcomingClasses, setupcomingClasses] = useState([])
    const [selectedClasses, setselectedClasses] = useState("")
    const [classLabels, setclassLabels] = useState([])
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors }
    } = useForm();
    const watchTime = watch("time");
    const watchDate = watch("date");

    const classStandards = [11, 12];

    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const getSubjectsNameAPI = async () => {
        try {
            const res = await axios.get(`${API}/class/getSubject`);
            const subjectNames = res.data.Subjects;
            // console.log(subjectNames);
            setsubjectHandler(subjectNames);
        } catch (error) {
            console.log("Error is =>", error);
        }
    };
    console.log(facultyName.map(f => f));

    const getFacultyNames = async () => {
        try {
            const res = await axios.get(`${API}/faculty/getFaculties`);
            setfacultyName(res.data.faculties);
        } catch (error) {
            console.log("Error is =>", error);
        }
    };
    const FilteredFacultyPerSubject = facultyName
        .filter(fac => fac.subject === selectedSubject)
    console.log(FilteredFacultyPerSubject.map(f => f));
    const getClasses = async () => {
        try {
            const res = await axios.get(`${API}/class/getClass`)
            console.log(res.data)
            setpreviousClasses(res.data.previousClasses)
            setupcomingClasses(res.data.upComingClasses)
            setclassLabels(res.data.label)
        } catch (error) {
            console.log("Error is =>", error);
        }
    }

    const fetchAvailableRooms = async (date, time) => {
        try {
            const res = await axios.get(`${API}/class/usedRooms`, {
                params: { date, time }
            });
            const used = res.data.rooms || [];
            const available = rooms.filter(r => !used.includes(r));
            setAvailableRooms(available);
        } catch (err) {
            console.error("Error fetching rooms:", err);
            setAvailableRooms(rooms); // fallback
        }
    };

    useEffect(() => {
        getSubjectsNameAPI();
        getFacultyNames();
        getClasses();
    }, []);
    useEffect(() => {
        if (watchDate && watchTime) {
            fetchAvailableRooms(watchDate, watchTime);
        }
    }, [watchDate, watchTime]);

    const colors = {
        background: theme === 'light' ? 'bg-white' : 'bg-black',
        text: theme === 'light' ? 'text-black' : 'text-white',
        card: theme === 'light' ? 'bg-gray-100' : 'bg-white/10',
        border: theme === 'light' ? 'border-gray-200' : 'border-white/10',
        subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-400'
    };
    console.log("Selected Subject ", selectedSubject);

    const onSubmit = async (data) => {
        try {
            //  Frontend Past Date Check
            const classDateTime = new Date(`${data.date}T${data.time}`);
            if (classDateTime < new Date()) {
                alert("❌ You cannot select a past time.");
                return;
            }

            // 1. Check faculty clash before class creation
            const clashRes = await axios.get(`${API}/class/usedFaculty`, {
                params: {
                    date: data.date,
                    time: data.time,
                    faculty: data.faculty
                }
            });

            if (clashRes.data.assigned) {
                alert("⚠️ Selected faculty is already assigned in this time slot.");
                return;
            }

            // 2. Proceed to create class if no clash
            const res = await axios.post(`${API}/class/createClass`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(res.data);
            setShowModal(false);
            setisClasscreated(true);
            setTimeout(() => {
                alert("Mr. Admin You have created class successfully!")
            }, 1000)
            getClasses()
            reset();

        } catch (error) {
            console.log("Error is =>", error);
        }
    };

    const handleDeleteClass = async (id) => {
        try {
            const res = await axios.delete(`${API}/class/deleteClass`, {
                params: {
                    id: id
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(res.data);
            getClasses();

        } catch (error) {
            console.log("Error is =>", error);

        }

        console.log(`${id} clicked`);

    }
    const columns = [
        { title: classLabels.upComingClasses },
        { title: classLabels.previousClasses },
    ]
    useEffect(() => {
        if (columns.length >= 0 && !selectedClasses) {
            setselectedClasses(columns[0]?.title)
        }
    }, [columns])
    const classesToRender =
        selectedClasses === classLabels.upComingClasses
            ? upcomingClasses
            : previousClasses;
    return (
        <div className={`p-10 min-h-screen transition-all duration-300 ${colors.background} ${colors.text}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <button onClick={() => navigate("/admin/dashboard")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                >Back</button>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 dark:from-yellow-300 dark:to-orange-400"
                >
                    🎓 Class Master Dashboard
                </motion.h1>

                <button
                    onClick={() => setShowModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-xl font-medium shadow-md hover:scale-105 transition-transform flex items-center gap-2"
                >
                    <FaPlus />
                    Create New Class
                </button>
            </div>
            <div className="relative inline-block w-full max-w-xs mb-8">
                <motion.select
                    value={selectedClasses || columns[0]?.title}
                    onChange={(e) => setselectedClasses(e.target.value)}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className={`w-full px-5 py-3 text-sm rounded-xl appearance-none shadow-md transition-all duration-300
      ${theme === "light"
                            ? "bg-white text-gray-800 border border-gray-300 focus:ring-2 focus:ring-pink-500"
                            : "bg-[#222] text-white border border-white/20 focus:ring-2 focus:ring-yellow-400"}
    `}
                >
                    {columns.map((label, index) => (
                        <option key={index} value={label.title}>
                            {label.title === "upComingClasses" ? "📘 Upcoming Classes" : "📕 Previous Classes"}
                        </option>
                    ))}
                </motion.select>
                <span className="absolute right-4 top-3 pointer-events-none text-gray-400">
                    ⬇️
                </span>
            </div>
            <br /><br />
            {isClasscreated && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow"
                >
                    ✅ Class created successfully!
                </motion.div>
            )}

            {/* Class Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {classesToRender.map((cls, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`rounded-2xl h-[320px] flex flex-col justify-between 
        overflow-hidden shadow-lg border border-gray-800 hover:shadow-2xl 
        transition-all duration-300 bg-gradient-to-br from-[#1f1f1f] to-[#2b2b2b] ${colors.border}`}
                    >
                        {/* {cls.date < todayDate ? columns[1]?.title : columns[0]?.title} */}
                        <div className="p-5 flex flex-col gap-4">
                            {/* Header */}

                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-pink-400">{cls.subject}</h3>
                                    <p className="text-sm text-gray-400">Class {cls.standard}</p>
                                </div>
                                <span className="text-xs bg-green-600/20 text-green-400 px-3 py-1 rounded-full font-semibold">
                                    📅 {cls.date}{" "}
                                    {new Date(cls.date).toLocaleDateString("en-US", {
                                        weekday: "long",
                                    })}
                                </span>
                            </div>

                            {/* Faculty */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={cls.faculty?.image || "https://via.placeholder.com/40x40?text=👨‍🏫"}
                                    alt="faculty"
                                    className="w-11 h-11 rounded-full object-cover border-2 border-pink-500"
                                />
                                <div>
                                    <p className="text-sm font-medium text-white">{cls.faculty?.name || "Unknown Faculty"}</p>
                                    <p className={`text-xs ${colors.subtext}`}>{cls.faculty?.qualification || "N/A"}</p>
                                </div>
                            </div>

                            {/* Time & Room */}
                            <div className="grid grid-cols-2 text-xs mt-2 gap-4">
                                <div className="flex items-center gap-2 text-blue-400">
                                    ⏰ <span className="text-white">{cls.time}</span>
                                </div>
                                <div className="flex items-center gap-2 text-yellow-400">
                                    📍 <span className="text-white">Room {cls.room}</span>
                                </div>
                            </div>
                        </div>

                        {/* Delete Button */}
                        <div className="px-5 pb-4">
                            <button
                                onClick={() => handleDeleteClass(cls._id)}
                                className="w-full py-2 text-sm text-red-400 hover:text-white hover:bg-red-600/20 border border-red-500 rounded-lg transition-all duration-300"
                            >
                                ❌ Delete Class
                            </button>
                        </div>
                    </motion.div>

                ))}
            </div>

            {/* Add Class Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, type: 'spring' }}
                        className={`w-full max-w-xl p-8 rounded-2xl shadow-2xl border ${theme === 'light'
                            ? 'bg-white border-gray-200'
                            : 'bg-gradient-to-br from-[#111] to-[#1a1a1a] border-white/10'
                            }`}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">➕ Create New Class</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* subject */}
                            <div className="flex flex-col gap-1">
                                <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Subject</label>
                                <select
                                    {...register("subject", { required: "Subject is required" })}
                                    onChange={(e) => setSelectedSubject(e.target.value)}
                                    className={`rounded-md px-4 py-2 border text-sm
                                    ${theme === 'light' ? 'bg-white border-gray-300 text-black' : 'bg-[#222] border-gray-600 text-white'}
                                    focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Subject</option>
                                    {subjectHandler.map((sub, i) => (
                                        <option key={i} value={sub}>{sub}</option>
                                    ))}
                                </select>
                                {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message}</p>}
                            </div>

                            {/* Standard */}
                            <div className="flex flex-col gap-1">
                                <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Standard</label>
                                <select
                                    {...register("standard", { required: "Standard is required" })}
                                    className={`rounded-md px-4 py-2 border text-sm
                                    ${theme === 'light' ? 'bg-white border-gray-300 text-black' : 'bg-[#222] border-gray-600 text-white'}
                                    focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Standard</option>
                                    {classStandards.map((std, i) => (
                                        <option key={i} value={std}>{std}</option>
                                    ))}
                                </select>
                                {errors.standard && <p className="text-red-500 text-xs">{errors.standard.message}</p>}
                            </div>

                            {/* Date */}
                            <div className="flex flex-col gap-1">
                                <label className={`text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                    Date
                                </label>
                                {/* 👉 Date Picker Input */}
                                <input
                                    type="date"
                                    {...register("date", { required: "Date is required" })}
                                    onChange={(e) => {
                                        setValue("date", e.target.value); // react-hook-form ka date update
                                        setSelectedDate(e.target.value); // local state for day
                                    }}
                                    className={`rounded-md px-4 py-2 border text-sm ${theme === "light"
                                        ? "bg-white border-gray-300 text-black"
                                        : "bg-[#222] border-gray-600 text-white"
                                        }focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                />

                                {errors.date && (
                                    <p className="text-red-500 text-xs">{errors.date.message}</p>
                                )}

                                {/* 👉 Day Preview */}
                                {selectedDate && (
                                    <p className={`text-sm mt-1 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                        Day:{" "}
                                        <span className="font-semibold text-white">
                                            {new Date(selectedDate).toLocaleDateString("en-US", {
                                                weekday: "long",
                                            })}
                                        </span>
                                    </p>
                                )}
                            </div>

                            {/* Time */}
                            <div className="flex flex-col gap-1">
                                <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Time</label>
                                <input
                                    type="time"
                                    {...register("time", { required: "Time is required" })}
                                    className={`rounded-md px-4 py-2 border text-sm
                                    ${theme === 'light' ? 'bg-white border-gray-300 text-black' : 'bg-[#222] border-gray-600 text-white'}
                                    focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                />
                                {errors.time && <p className="text-red-500 text-xs">{errors.time.message}</p>}
                            </div>

                            {/* room */}
                            <select
                                {...register("room", { required: "Room is required" })}
                                className={`rounded-md px-4 py-2 border text-sm ${theme === 'light'
                                    ? 'bg-white border-gray-300 text-black' :
                                    'bg-[#222] border-gray-600 text-white'}
                                    focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                defaultValue=""
                            >
                                <option value="" disabled>Select Room</option>
                                {availableRooms.map((room, i) => (
                                    <option key={i} value={room}>{room}</option>
                                ))}
                            </select>

                            {availableRooms.length === 0 && (
                                <p className="text-xs text-red-500 mt-1">⚠️ All rooms are booked for this time.</p>
                            )}
                            {/* Faculty */}

                            <div className="flex flex-col gap-1">
                                <label className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>Faculty</label>
                                <select
                                    {...register("faculty", { required: "Faculty is required" })}
                                    className={`rounded-md px-4 py-2 border text-sm
                                    ${theme === 'light' ? 'bg-white border-gray-300 text-black' : 'bg-[#222] border-gray-600 text-white'}
                                    focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select Faculty</option>
                                    {FilteredFacultyPerSubject.map((fac) => (
                                        <option key={fac._id} value={fac._id}>
                                            {fac.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.faculty && <p className="text-red-500 text-xs">{errors.faculty.message}</p>}
                            </div>

                        </div>
                        {/* cancel */}

                        <div className="flex justify-end gap-4 mt-10">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 rounded-md bg-gray-500 hover:bg-gray-600 text-white transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition"
                            >
                                Save Class
                            </button>
                        </div>
                    </motion.form>
                </div>
            )}
        </div>
    );
};

export default AdminClassManagement;
