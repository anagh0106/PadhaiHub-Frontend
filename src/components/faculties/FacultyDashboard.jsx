import axios from "axios";
import React, { useEffect, useState } from "react";

const FacultyDashboard = () => {
    const [facultyInfo, setFacultyInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [assignedClasses, setassignedClasses] = useState([])
    const [startClass, setstartClass] = useState([])

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
                params: { contact }
            })
            console.log(res.data.classes);
            setassignedClasses(res.data.classes)
            setstartClass(res.data.btn)
            console.log(res.data.btn);

        } catch (error) {
            console.log("Error is => ", error);

        }
    }

    useEffect(() => {
        getFacultyInformation();
        getClassForFaculty();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans">
            {loading ? (
                <p className="text-gray-600 text-lg">Loading Faculty Dashboard...</p>
            ) : (
                <>
                    {/* Greeting */}
                    <h1 className="text-3xl font-bold mb-2">
                        {getGreeting()}, {facultyInfo.name || "Faculty"} 👋
                    </h1>
                    <p className="text-gray-600 mb-6">Welcome to your faculty dashboard</p>

                    {/* Faculty Info */}
                    {facultyInfo ? (
                        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-600">👤 Faculty Info</h2>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                {/* Left: Text Info */}
                                <div className="space-y-2 flex-1">
                                    <p><span className="font-semibold">Name:</span> {facultyInfo.name}</p>
                                    <p><span className="font-semibold">Email:</span> {facultyInfo.contact}</p>
                                    <p><span className="font-semibold">Subject:</span> {facultyInfo.subject}</p>
                                    <p><span className="font-semibold">Experience:</span> {facultyInfo.experience} years</p>
                                    <p><span className="font-semibold">Qualification:</span> {facultyInfo.qualification}</p>
                                </div>

                                {/* Right: Square Profile Image */}
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

                    {/* Assigned Classes */}
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
                            📚 Assigned Classes
                        </h2>

                        {Array.isArray(assignedClasses) && assignedClasses.length === 0 ? (
                            <div className="text-center text-gray-500 italic">No classes assigned yet.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {assignedClasses
                                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                                    .map((cls, index) => (
                                        <div
                                            key={index}
                                            className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between"
                                        >
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                    📖 {cls.subject} | 📅 {cls.date}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    🏫 <span className="font-medium">Room:</span> {cls.room}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    ⏰ <span className="font-medium">Time:</span> {cls.time}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    🎓 <span className="font-medium">Standard:</span> {cls.standard}
                                                </p>
                                            </div>

                                            {startClass.filter(c => c.showStartButton) ? (
                                                <button className="mt-4 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition">
                                                    Start Class
                                                </button>
                                            ) : (
                                                <button
                                                    disabled
                                                    className="mt-4 bg-gray-400 text-white py-2 rounded-md font-medium cursor-not-allowed"
                                                >
                                                    Class Start Soon
                                                </button>
                                            )}
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
