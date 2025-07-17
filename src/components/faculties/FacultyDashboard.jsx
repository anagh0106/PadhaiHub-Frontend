// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const FacultyDashboard = () => {
//     const [getFacultyInfo, setgetFacultyInfo] = useState("")
//     // const faculty = {
//     //     name: "Prof. Anagh Patel",
//     //     email: "anagh.patel@college.edu",
//     //     department: "Computer Science",
//     //     facultyId: "FAC12345",
//     // };

//     const contact = localStorage.getItem("FacEmail")
//     const host = window.location.hostname
//     const API = host === "localhost"
//         ? "http://localhost:3000/faculty"
//         : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/faculty";
//     const assignedClasses = [
//         { className: "Class 101", subject: "Data Structures", room: "Room 101" },
//         { className: "Class 203", subject: "Operating Systems", room: "Room 203" },
//     ];

//     const getFacultyInformation = async () => {
//         try {
//             const res = await axios.get(`${API}/getFacultyInfoByEmail`, {
//                 params: { contact }
//             })
//             console.log(res.data.faculty);

//             setgetFacultyInfo(res.data)
//         } catch (error) {
//             console.log("Error is => ", error);
//         }
//     }
//     useEffect(() => {
//         getFacultyInformation()
//     }, [])

//     return (
//         <div className="p-6 bg-gray-100 min-h-screen">
//             {/* Greeting */}
//             <h1 className="text-3xl font-bold mb-2">Good Morning, {faculty.name.split(" ")[0]} 👋</h1>
//             <p className="text-gray-600 mb-6">Welcome to your faculty dashboard</p>

//             {/* Faculty Info */}
//             {getFacultyInfo &&
//                 <div className="bg-white p-5 rounded-xl shadow mb-6">
//                     <h2 className="text-xl font-semibold mb-2">Faculty Info</h2>
//                     <p><strong>Name:</strong> {getFacultyInfo.name}</p>
//                     <p><strong>Email:</strong> {getFacultyInfo.contact}</p>
//                     <p><strong>Subject:</strong> {getFacultyInfo.subject}</p>
//                     <p><strong>Experience:</strong> {getFacultyInfo.experience}</p>
//                     <p><strong>Qualification:</strong>{getFacultyInfo.qualification}</p>
//                     <p>{getFacultyInfo.image}</p>

//                 </div>
//             }

//             {/* Assigned Classes */}
//             <div className="bg-white p-5 rounded-xl shadow">
//                 <h2 className="text-xl font-semibold mb-4">Assigned Classes</h2>
//                 <ul className="space-y-3">
//                     {assignedClasses.map((cls, index) => (
//                         <li
//                             key={index}
//                             className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50"
//                         >
//                             <div>
//                                 <p className="font-semibold">{cls.className} - {cls.subject}</p>
//                                 <p className="text-sm text-gray-600">Room: {cls.room}</p>
//                             </div>
//                             <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
//                                 View
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default FacultyDashboard;


import axios from "axios";
import React, { useEffect, useState } from "react";

const FacultyDashboard = () => {
    const [facultyInfo, setFacultyInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const contact = localStorage.getItem("FacEmail");
    const host = window.location.hostname;
    const API =
        host === "localhost"
            ? "http://localhost:3000/faculty"
            : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/faculty";

    const assignedClasses = [
        { className: "Class 101", subject: "Data Structures", room: "Room 101" },
        { className: "Class 203", subject: "Operating Systems", room: "Room 203" },
    ];

    const getFacultyInformation = async () => {
        try {
            const res = await axios.get(`${API}/getFacultyInfoByEmail`, {
                params: { contact },
            });
            setFacultyInfo(res.data.faculty);
        } catch (error) {
            console.error("Error fetching faculty info:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFacultyInformation();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans">
            {loading ? (
                <p className="text-gray-600 text-lg">Loading Faculty Dashboard...</p>
            ) : (
                <>
                    {/* Greeting */}
                    <h1 className="text-3xl font-bold mb-2">
                        Good Morning, {facultyInfo?.name?.split(" ")[0] || "Faculty"} 👋
                    </h1>
                    <p className="text-gray-600 mb-6">Welcome to your faculty dashboard</p>

                    {/* Faculty Info */}
                    {facultyInfo ? (
                        <div className="bg-white p-6 rounded-xl shadow-md mb-6 space-y-2">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-600">👤 Faculty Info</h2>
                            <p><span className="font-semibold">Name:</span> {facultyInfo.name}</p>
                            <p><span className="font-semibold">Email:</span> {facultyInfo.contact}</p>
                            <p><span className="font-semibold">Subject:</span> {facultyInfo.subject}</p>
                            <p><span className="font-semibold">Experience:</span> {facultyInfo.experience} years</p>
                            <p><span className="font-semibold">Qualification:</span> {facultyInfo.qualification}</p>
                        </div>
                    ) : (
                        <p className="text-red-500">Faculty information not found.</p>
                    )}

                    {/* Assigned Classes */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-semibold mb-4 text-green-600">📚 Assigned Classes</h2>
                        {assignedClasses.length === 0 ? (
                            <p className="text-gray-500">No classes assigned yet.</p>
                        ) : (
                            <ul className="space-y-4">
                                {assignedClasses.map((cls, index) => (
                                    <li
                                        key={index}
                                        className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-all"
                                    >
                                        <div>
                                            <p className="font-semibold text-lg">{cls.className} - {cls.subject}</p>
                                            <p className="text-sm text-gray-600">Room: {cls.room}</p>
                                        </div>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                            View
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default FacultyDashboard;
