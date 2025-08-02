import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";

const classes = [
    {
        subject: "Mathematics",
        teacher: "Dr. Rajesh Kumar",
        room: "Room 201",
        time: "10:00 AM - 11:30 AM",
        type: "Regular Class",
    },
    {
        subject: "Physics",
        teacher: "Prof. Sunita Sharma",
        room: "Lab 1",
        time: "12:00 PM - 1:30 PM",
        type: "Practical",
    },
    {
        subject: "Chemistry",
        teacher: "Dr. Amit Verma",
        room: "Room 301",
        time: "2:00 PM - 3:30 PM",
        type: "Regular Class",
    },
];

const TodayClasses = () => {

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


    const colors = {
        sectionBg: theme === "light" ? "bg-white text-gray-800" : "bg-black text-white",
        cardBg: theme === "light" ? "bg-gray-100 border-gray-200 text-gray-700" : "bg-zinc-900/80 border-white/10 text-gray-300",
        heading: theme === "light" ? "text-blue-600" : "text-blue-400",
        subject: theme === "light" ? "text-pink-600" : "text-pink-400",
        faculty: theme === "light" ? "text-gray-600" : "text-gray-400",
        dateText: theme === "light" ? "text-green-600 bg-green-100" : "text-green-300 bg-green-900/30",
    };

    return (
        <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-1 flex items-center gap-2">
                <i className="fas fa-calendar-alt"></i> Today's Classes
            </h2>
            <p className="text-sm text-gray-400 mb-4">Your schedule for today</p>

            {Class.map((cls, idx) => (
                <div
                    key={idx}
                    className="bg-[#1f2937] p-4 rounded-lg mb-4 flex justify-between items-center"
                >
                    <div>
                        <h3 className="text-white font-bold">{cls.subject}</h3>
                        <p className="text-gray-300 text-sm">{cls.faculty.name}</p>
                        <p className="text-gray-400 text-xs">{cls.room}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-blue-400 font-semibold">{cls.time}</p>
                        <p className="text-xs text-gray-400">{cls.type}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodayClasses;
