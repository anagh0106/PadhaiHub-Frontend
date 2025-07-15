import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaUserGraduate,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaUserAlt,
    FaIdCard,
    FaArrowLeft,
    FaUsers,
    FaGraduationCap,
    FaEnvelope,
} from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import ThemeContext from "./context/ThemeContext";

const Students = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [searchData, setsearchData] = useState("")
    const [studentLabel, setstudentLabel] = useState([])
    const { theme } = useContext(ThemeContext);

    const API =
        window.location.hostname === "localhost"
            ? "http://localhost:3000/user"
            : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/user";

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(`${API}/getAllStudents`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.status === 200) {
                    setStudents(response.data.students);
                    setstudentLabel(response.data.labels);
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    const colors = {
        background: theme === "light" ? "bg-white" : "bg-[#121212]",
        text: theme === "light" ? "text-black" : "text-white",
        card: theme === "light" ? "bg-gray-100" : "bg-white/10",
        border: theme === "light" ? "border-gray-300" : "border-white/20",
        header: theme === "light" ? "bg-blue-100" : "bg-blue-900",
    };

    const columns = [
        { title: studentLabel.studentId, icon: <FaIdCard className="inline mr-2" /> },
        { title: studentLabel.name, icon: <FaUserAlt className="inline mr-2" /> },
        { title: studentLabel.grade, icon: <FaGraduationCap className="inline mr-2" /> },
        { title: studentLabel.group, icon: <FaUsers className="inline mr-2" /> },
        { title: studentLabel.phone, icon: <FaPhoneAlt className="inline mr-2" /> },
        { title: studentLabel.email, icon: <FaEnvelope className="inline mr-2" /> },
        { title: studentLabel.address, icon: <FaMapMarkerAlt className="inline mr-2" /> },
    ];
    const filteredStudents = students.filter((student) =>
        `${student.fullName} ${student.studentId} ${student.phone}`
            .toLowerCase().includes(searchData)
    );

    return (
        <div className={`min-h-screen p-8 ${colors.background} ${colors.text} transition-all duration-300`}>
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                >
                    <FaArrowLeft /> Back
                </button>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <FaUserGraduate className="text-blue-500" /> All Students Information
                </h1>
            </div>
            <div className="mb-6 flex justify-end">
                <input
                    type="text"
                    placeholder="Search by name, ID, phone..."
                    className="px-4 py-2 border rounded-md w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => setsearchData(e.target.value)}
                />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`overflow-x-auto rounded-xl shadow-lg ring-1 ring-black/10 ${colors.card}`}
            >
                <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
                    <thead className={`sticky top-0 z-10 ${colors.header} text-white`}>
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-6 py-3 text-left text-sm font-semibold tracking-wide uppercase whitespace-nowrap"
                                >
                                    <div className="flex items-center gap-2">
                                        {col.icon}
                                        {col.title}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                        {filteredStudents.map((student, index) => (
                            <tr key={index} className="cursor-pointer">
                                <td className="px-6 py-4 text-sm">{student.studentId}</td>     {/* Unique ID */}
                                <td className="px-6 py-4 text-sm">{student.fullName}</td>      {/* Full Name */}
                                <td className="px-6 py-4 text-sm">{student.email}</td>         {/* Email */}
                                <td className="px-6 py-4 text-sm">{student.grade}</td>         {/* Grade */}
                                <td className="px-6 py-4 text-sm">{student.group}</td>         {/* Group */}
                                <td className="px-6 py-4 text-sm">{student.phone}</td>         {/* Contact */}
                                <td className="px-6 py-4 text-sm">{student.address}</td>       {/* Address */}
                            </tr>

                        ))}
                    </tbody>
                </table>
            </motion.div>

        </div>
    );
};

export default Students;
