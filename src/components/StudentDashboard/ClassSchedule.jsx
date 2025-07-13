import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import axios from "axios";
import { FaChalkboardTeacher, FaDoorOpen } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import ThemeContext from "../context/ThemeContext";

const ClassSchedule = () => {
    const [Class, setClass] = useState([]);
    const { theme } = useContext(ThemeContext);

    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const getClassSchedule = async () => {
        try {
            const res = await axios.get(`${API}/class/getClass`);
            // const allClasses = res.data.classes;

            const grade = localStorage.getItem("grade");
            const group = localStorage.getItem("group");
            console.log(grade, group);

            const allClasses = res.data.upComingClasses
            console.log(allClasses.map(s => s.subject));


            // Filter based on group
            let filteredByGroup = [];
            if (group === "A") {
                filteredByGroup = allClasses.filter(s => s.subject !== "Biology");
            } else if (group === "B") {
                filteredByGroup = allClasses.filter(s => s.subject !== "Mathematics");
            } else {
                filteredByGroup = [...allClasses]; // default fallback
            }
            // Further filter by grade
            const finalSubjects = filteredByGroup.filter(
                // sub => sub.standard?.toString() === grade
                sub => sub.standard == grade
            );
            setClass(finalSubjects);
        } catch (error) {
            console.log("Error is =>", error);
        }
    };

    useEffect(() => {
        getClassSchedule();
    }, []);

    const colors = {
        sectionBg: theme === "light" ? "bg-white text-gray-800" : "bg-black text-white",
        cardBg: theme === "light" ? "bg-gray-100 border-gray-200 text-gray-700" : "bg-zinc-900/80 border-white/10 text-gray-300",
        heading: theme === "light" ? "text-blue-600" : "text-blue-400",
        subject: theme === "light" ? "text-pink-600" : "text-pink-400",
        faculty: theme === "light" ? "text-gray-600" : "text-gray-400",
        dateText: theme === "light" ? "text-green-600 bg-green-100" : "text-green-300 bg-green-900/30",
    };

    return (

        <motion.div
            className={`rounded-2xl px-6 py-10 max-w-6xl mx-auto w-full mt-16 shadow-2xl transition-colors duration-500 ${colors.sectionBg}`
            }
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <h2 className={`text-3xl font-bold mb-8 flex items-center gap-3 ${colors.heading}`}>
                <CalendarIcon className="w-6 h-6" />
                Ongoing/Upcoming Class Schedule
            </h2>
            {Class.length > 0 ?
                (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Class.map((cls, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
                            whileHover={{ scale: 1.02 }}
                            className={`p-5 rounded-2xl shadow-md hover:shadow-lg transition-all border ${colors.cardBg}`}
                        >
                            <h3 className={`text-xl font-extrabold flex items-center gap-2 mb-1 ${colors.subject}`}>
                                📚 {cls.subject}
                            </h3>

                            <p className="text-sm flex items-center gap-2 mb-1">
                                🎓 Class {cls.standard} • <MdAccessTime className="text-yellow-500" /> {cls.time}
                            </p>

                            <p className={`text-sm flex items-center gap-2 mb-1 ${colors.faculty}`}>
                                <FaChalkboardTeacher className="text-blue-500" /> {cls.faculty.name}
                            </p>

                            <p className={`text-sm flex items-center gap-2 mb-3 ${colors.faculty}`}>
                                <FaDoorOpen className="text-green-500" /> Room {cls.room}
                            </p>

                            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${colors.dateText}`}>
                                📅 {cls.date} ({new Date(cls.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                })})
                            </span>
                        </motion.div>
                    ))}
                </div>)
                : "You will get updates Soon!"}

        </motion.div >
    );
};

export default ClassSchedule;
