import axios from "axios";
import React from "react";

const FacultyDashboard = () => {
    const faculty = {
        name: "Prof. Anagh Patel",
        email: "anagh.patel@college.edu",
        department: "Computer Science",
        facultyId: "FAC12345",
    };
    const contact = localStorage.getItem("FacEmail")
    const host = window.location.hostname
    const API = host === "localhost"
        ? "http://localhost:3000/fac"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/fac";
    const assignedClasses = [
        { className: "Class 101", subject: "Data Structures", room: "Room 101" },
        { className: "Class 203", subject: "Operating Systems", room: "Room 203" },
    ];

    const getFacultyInformation = async () => {
        try {
            const res = await axios.get(`${API}/`)
        } catch (error) {
            console.log("Error is => ", error);
        }
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Greeting */}
            <h1 className="text-3xl font-bold mb-2">Good Morning, {faculty.name.split(" ")[0]} 👋</h1>
            <p className="text-gray-600 mb-6">Welcome to your faculty dashboard</p>

            {/* Faculty Info */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">
                <h2 className="text-xl font-semibold mb-2">Faculty Info</h2>
                <p><strong>Name:</strong> {faculty.name}</p>
                <p><strong>Email:</strong> {faculty.email}</p>
                <p><strong>Department:</strong> {faculty.department}</p>
                <p><strong>Faculty ID:</strong> {faculty.facultyId}</p>
            </div>

            {/* Assigned Classes */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h2 className="text-xl font-semibold mb-4">Assigned Classes</h2>
                <ul className="space-y-3">
                    {assignedClasses.map((cls, index) => (
                        <li
                            key={index}
                            className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
                        >
                            <div>
                                <p className="font-semibold">{cls.className} - {cls.subject}</p>
                                <p className="text-sm text-gray-600">Room: {cls.room}</p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                                View
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FacultyDashboard;
