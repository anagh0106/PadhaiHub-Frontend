import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";

const TodayClasses = () => {
    const [Class, setClass] = useState([]);
    const [todaysClass, setTodaysClass] = useState([])
    const { theme } = useContext(ThemeContext);

    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const getClassSchedule = async () => {
        try {
            const res = await axios.get(`${API}/class/getClass`);
            const grade = localStorage.getItem("grade");
            const group = localStorage.getItem("group");

            const allClasses = res.data.upComingClasses;
            const ClassesOfToday = res.data.todaysClasses;

            let filteredByGroup = [];
            if (group === "A") {
                filteredByGroup = ClassesOfToday.filter(s => s.subject !== "Biology");
            } else if (group === "B") {
                filteredByGroup = ClassesOfToday.filter(s => s.subject !== "Mathematics");
            } else {
                filteredByGroup = [...ClassesOfToday];
            }

            const finalSubjects = filteredByGroup.filter(sub => sub.standard == grade);
            setClass(finalSubjects);
        } catch (error) {
            console.log("Error is =>", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const grade = localStorage.getItem("grade");
            const group = localStorage.getItem("group");

            if (grade && group) {
                getClassSchedule();
                clearInterval(interval);
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg h-full">
            {/* Header */}
            <h2 className="text-white text-2xl font-bold mb-2 flex items-center gap-2 tracking-wide">
                <i className="fas fa-calendar-day text-blue-400 text-xl"></i>
                Today’s Classes
            </h2>
            <p className="text-sm text-gray-400 mb-6 tracking-wide">
                Your schedule for today
            </p>

            {/* Classes List */}
            {Class.map((cls, idx) => (
                <div
                    key={idx}
                    className="bg-[#1f2937] p-5 rounded-lg mb-5 flex justify-between items-start hover:bg-[#273447] transition"
                >
                    {/* Left */}
                    <div>
                        <h3 className="text-white text-lg font-semibold tracking-wide mb-1">
                            {cls.subject}
                        </h3>
                        <p className="text-gray-300 text-sm tracking-wide mb-0.5">
                            {cls.faculty.name}
                        </p>
                        <p className="text-gray-400 text-xs tracking-wider">
                            Room: {cls.room}
                        </p>
                    </div>

                    {/* Right */}
                    <div className="text-right">
                        <p className="text-blue-400 font-bold text-lg tracking-wide">
                            {cls.time}
                        </p>
                        <p className="text-xs text-gray-400 tracking-wide mt-1">
                            {cls.type}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodayClasses;
