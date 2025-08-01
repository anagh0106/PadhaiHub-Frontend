import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ThemeContext from "../../components/context/ThemeContext";
import FormulaGrid from "./FormulaGrid";
import CourseCards from "../CourseCards";

export const CourseDashboard = () => {
    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000/advanceCourse"
        : "http://192.168.31.252:3000/advanceCourse";

    const { theme } = useContext(ThemeContext);

    const colors = {
        background: theme === "light" ? "bg-white text-black" : "bg-black text-white",
        card: theme === "light" ? "bg-white" : "bg-[#111827]/60",
        border: theme === "light" ? "border-gray-200" : "border-white/10",
        subtext: theme === "light" ? "text-gray-600" : "text-gray-400",
    };

    const [username, setUsername] = useState("");
    const [courses, setcourses] = useState([]);

    const AdvanceCourseHandler = async () => {
        const res = await axios.get(`${API}/getAllAdvanceCourse`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        setcourses(res.data.data);
    };

    useEffect(() => {
        AdvanceCourseHandler();
        const storedUsername = localStorage.getItem("userName");
        if (storedUsername) setUsername(storedUsername);
    }, []);

    return (
        <div className={`min-h-screen ${colors.background} p-6 transition-colors duration-500`}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">
                    Welcome, <span className="text-teal-400">{username}</span> 👋
                </h1>
                <p className={`text-lg sm:text-xl ${colors.subtext}`}>
                    Unlock your potential with our premium courses
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* {courses.map((course, index) => (
                    <motion.div
                        key={course._id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
                        whileHover={{ scale: 1.03 }}
                        className={`${colors.card} ${colors.border} border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all`}
                    >
                        <h2 className="text-2xl font-bold mb-3 text-cyan-400 tracking-wide">{course.coursename}</h2>
                        <p className={`mb-6 ${colors.subtext} leading-relaxed`}>
                            {course.description}
                        </p>

                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 rounded-xl shadow-md hover:from-purple-600 hover:to-indigo-700 transition-all"
                        >
                            🚀 Continue Course
                        </motion.button>
                    </motion.div>
                ))} */}
                <CourseCards/>
            </div>
            <br />
            <FormulaGrid />
        </div>
    );
};
