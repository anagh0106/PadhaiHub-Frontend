import { useEffect, useRef, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import ProfileForm from "./ProfileForm";
import axios from "axios";
import ThemeContext from "../context/ThemeContext";
import { Bell, FileText } from "lucide-react";

const WelcomeCard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showForm, setShowForm] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const { theme } = useContext(ThemeContext);
    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000/user"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/user";

    const [userInfo, setUserInfo] = useState({
        fullName: "",
        studentId: "",
        email: "",
        phone: "",
        address: "",
        grade: "",
        group: "",
    });


    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString();
    const formattedDate = currentTime.toLocaleDateString();

    const handleProfileUpdate = async (updatedData) => {
        try {
            setUserInfo((prev) => ({ ...prev, ...updatedData }));
            localStorage.setItem("fullName", updatedData.fullName);
            localStorage.setItem("userEmail", updatedData.email);
            localStorage.setItem("phone", updatedData.phone);
            localStorage.setItem("address", updatedData.address);
            localStorage.setItem("grade", updatedData.grade);
            localStorage.setItem("group", updatedData.group);
        } catch (error) {
            console.log("Error updating profile:", error);
        }
    };


    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const email = localStorage.getItem("userEmail");

                const res = await axios.get(`${API}/getStudentInfo`, {
                    params: { email },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(res.data);
                setUserInfo(res.data);
            } catch (error) {
                console.log("Error is =>", error);
            }
        };

        fetchStudentInfo();
    }, []);

    const ViewProfileInfo = async () => {
        setShowProfile(true);
    };

    const colors = {
        cardBg: theme === "light" ? "bg-white text-black" : "bg-black text-white",
        border: theme === "light" ? "border-gray-300" : "border-[#222]",
        inputModalBg: theme === "light" ? "bg-white text-black" : "bg-[#111] text-white",
        modalBorder: theme === "light" ? "border border-gray-300" : "border border-[#333]",
        textSecondary: theme === "light" ? "text-gray-600" : "text-gray-400",
    };

    useEffect(() => {
        if (userInfo && typeof userInfo === "object") {
            localStorage.setItem("grade", userInfo.grade || "");
            localStorage.setItem("group", userInfo.group || "");
            localStorage.setItem("fullName", userInfo.fullName || "");
        }
    }, [userInfo]);

    return (
        <>
            <div className="w-full bg-[#1F2937] text-white px-6 py-4 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
                {/* Left Section - Avatar & Info */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-cyan-500 shadow-lg">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Welcome back, {userInfo.fullName}!</h2>
                        <p className="text-sm text-gray-400">
                            Class {userInfo.grade} - {userInfo.grade === "A" ? "PCM" : "PCB"} • ID: {userInfo.studentId}
                        </p>
                    </div>
                </div>

                {/* Middle - Buttons */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button
                        onClick={ViewProfileInfo}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium transition duration-200"
                    >
                        View Profile
                    </button>

                    <button
                        onClick={() => setShowForm(prev => !prev)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-600 hover:to-cyan-600 px-5 py-2 rounded-md text-white font-semibold shadow-md transition duration-300"
                    >
                        {showForm ? "Close Profile" : "Edit Profile"}
                    </button>
                </div>

                {/* Right - Actions */}
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#111827] hover:bg-[#0f172a] text-white rounded-md transition">
                        <Bell className="w-5 h-5" />
                        <span className="text-sm">Notifications</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-[#111827] hover:bg-gray-200 rounded-md transition">
                        <FileText className="w-5 h-5" />
                        <span className="text-sm">Download Report</span>
                    </button>
                </div>
            </div>


            <div className="w-full max-w-4xl mx-auto mt-10 space-y-6">

                {/* Edit Profile Modal */}
                <AnimatePresence>
                    {showForm && (
                        <motion.div
                            key="profile-form"
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                        >
                            <motion.div
                                className={`p-10 rounded-3xl shadow-[0_0_40px_#00bcd480] w-full max-w-lg relative ${colors.inputModalBg} ${colors.modalBorder}`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                            >
                                <motion.button
                                    whileHover={{ rotate: 90, scale: 1.2 }}
                                    className="absolute top-4 right-4 text-red-500 text-3xl"
                                    onClick={() => setShowForm(false)}
                                >
                                    <IoClose />
                                </motion.button>

                                <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Edit Profile</h2>
                                <ProfileForm
                                    userInfo={userInfo}
                                    onProfileUpdate={handleProfileUpdate}
                                    onClose={() => setShowForm(false)}
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* View Profile Modal */}
                <AnimatePresence>
                    {showProfile && (
                        <motion.div
                            key="view-profile"
                            initial={{ opacity: 0, y: -100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -100 }}
                            transition={{ duration: 0.5 }}
                            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
                        >
                            <motion.div
                                className={`p-10 rounded-3xl shadow-[0_0_40px_#00bcd480] w-full max-w-lg relative ${colors.inputModalBg} ${colors.modalBorder}`}
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.8 }}
                            >
                                <motion.button
                                    whileHover={{ rotate: 90, scale: 1.2 }}
                                    className="absolute top-4 right-4 text-red-500 text-3xl"
                                    onClick={() => setShowProfile(false)}
                                >
                                    <IoClose />
                                </motion.button>

                                <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">Profile Details</h2>
                                <div className={`space-y-4 ${colors.textSecondary}`}>
                                    <p><strong>Full Name:</strong> {userInfo.fullName}</p>
                                    <p><strong>Student ID:</strong> {userInfo.studentId}</p>
                                    <p><strong>Email:</strong> {userInfo.email}</p>
                                    <p><strong>Phone:</strong> {userInfo.phone}</p>
                                    <p><strong>Address:</strong> {userInfo.address}</p>
                                    <p><strong>Standard:</strong> {userInfo.grade} - Group {userInfo.group}</p>
                                </div>

                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default WelcomeCard;

