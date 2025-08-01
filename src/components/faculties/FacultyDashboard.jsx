import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const FacultyDashboard = () => {
    const { theme } = useContext(ThemeContext);
    const [facultyInfo, setFacultyInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [assignedClasses, setassignedClasses] = useState([]);
    const [startClass, setstartClass] = useState([]);

    const contact = localStorage.getItem("FacEmail");
    const host = window.location.hostname;
    const API =
        host === "localhost"
            ? "http://localhost:3000"
            : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const getFacultyInformation = async () => {
        try {
            const res = await axios.get(`${API}/faculty/getFacultyInfoByEmail`, {
                params: { contact },
            });
            setFacultyInfo(res.data.faculty);
        } catch (error) {
            console.error("Error fetching faculty info:", error);
        } finally {
            setLoading(false);
        }
    };

    const getGreeting = () => {
        const currentHour = new Date().getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return "Good Morning";
        } else if (currentHour >= 12 && currentHour < 17) {
            return "Good Afternoon";
        } else if (currentHour >= 17 && currentHour < 21) {
            return "Good Evening";
        } else {
            return "Good Night";
        }
    };

    const getClassForFaculty = async () => {
        try {
            const res = await axios.get(`${API}/class/getClassByFaculty`, {
                params: { contact },
            });
            console.log(res.data.classes);
            setassignedClasses(res.data.classes);
            setstartClass(res.data.btn);
            console.log(res.data.btn);
        } catch (error) {
            console.log("Error is => ", error);
        }
    };

    // useEffect(() => {
    //     getFacultyInformation();
    //     getClassForFaculty();
    // }, []);

    useEffect(() => {
        getFacultyInformation();
        getClassForFaculty();

        const intervalId = setInterval(() => {
            getClassForFaculty();
        }, 3000);

        return () => clearInterval(intervalId);
    }, [contact]);

    const colors = {
        background: theme === 'light' ? 'bg-gray-100 text-black' : 'bg-[#121212] text-white',
        card: theme === 'light' ? 'bg-white text-black' : 'bg-[#1f1f1f] text-white',
        border: theme === 'light' ? 'border-gray-200' : 'border-gray-700',
        heading: theme === 'light' ? 'text-blue-600' : 'text-blue-400',
        subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
    };

    return (
        <div className={`p-6 min-h-screen font-sans transition-all duration-300 ${colors.background}`}>
            {loading ? (
                <p className={`${colors.subtext} text-lg`}>Loading Faculty Dashboard...</p>
            ) : (
                <>
                    <h1 className="text-3xl font-bold mb-2">
                        {getGreeting()}, {facultyInfo.name || "Faculty"} 👋
                    </h1>
                    <p className={`${colors.subtext} mb-6`}>Welcome to your faculty dashboard</p>

                    {facultyInfo ? (
                        <div className={`p-6 rounded-xl shadow-md mb-6 ${colors.card} border ${colors.border}`}>
                            <h2 className={`text-2xl font-semibold mb-4 ${colors.heading}`}>👤 Faculty Info</h2>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                <div className="space-y-2 flex-1">
                                    <p><span className="font-semibold">Name:</span> {facultyInfo.name}</p>
                                    <p><span className="font-semibold">Email:</span> {facultyInfo.contact}</p>
                                    <p><span className="font-semibold">Subject:</span> {facultyInfo.subject}</p>
                                    <p><span className="font-semibold">Experience:</span> {facultyInfo.experience} years</p>
                                    <p><span className="font-semibold">Qualification:</span> {facultyInfo.qualification}</p>
                                </div>

                                <div className="w-52 h-52 overflow-hidden border-2 border-gray-300 shadow-lg">
                                    <img
                                        src={facultyInfo.image || "https://via.placeholder.com/200"}
                                        alt="Faculty"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-red-500">Faculty information not found.</p>
                    )}

                    <div className={`p-6 rounded-2xl shadow-md ${colors.card} border ${colors.border}`}>
                        <h2 className={`text-2xl font-bold mb-6 flex items-center gap-2 text-green-700`}>📚 Assigned Classes</h2>

                        {Array.isArray(assignedClasses) && assignedClasses.length === 0 ? (
                            <div className="text-center text-gray-500 italic">No classes assigned yet.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {assignedClasses
                                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                                    .map((cls, index) => (
                                        <div
                                            key={index}
                                            className={`border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between ${colors.card} border ${colors.border}`}
                                        >
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                                    📖 {cls.subject} | 📅 {cls.date}
                                                </h3>
                                                <p className={`${colors.subtext} text-sm`}>
                                                    🏫 <span className="font-medium">Room:</span> {cls.room}
                                                </p>
                                                <p className={`${colors.subtext} text-sm`}>
                                                    ⏰ <span className="font-medium">Time:</span> {cls.time}
                                                </p>
                                                <p className={`${colors.subtext} text-sm`}>
                                                    🎓 <span className="font-medium">Standard:</span> {cls.standard}
                                                </p>
                                            </div>
                                            <button className="mt-4 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition">
                                                Start Class
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default FacultyDashboard;