import { useEffect, useRef, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import ProfileForm from "./ProfileForm";
import axios from "axios";
import ThemeContext from "../context/ThemeContext";

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
        <div className="w-full max-w-4xl mx-auto mt-10 space-y-6">
            <motion.div
                className={`rounded-xl px-6 py-8 shadow-[0_0_25px_rgba(0,188,212,0.5)] border-2 border-cyan-500 max-w-md mx-auto ${colors.cardBg}`}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center text-center">
                    <div className="relative w-28 h-28 mb-4 group">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
                            alt="Profile"
                            // onClick={handleImageClick}
                            className="w-full h-full object-cover rounded-full border-4 border-cyan-500 shadow-md cursor-pointer group-hover:scale-105 transition duration-300"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-cyan-400">{userInfo.fullName || "Student"}</h2>
                    <p className={`text-sm font-semibold mt-1 px-3 py-1 rounded-md bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300`}>
                        ID: {userInfo.studentId}
                    </p>
                    <p className={`text-sm mt-2 ${colors.textSecondary}`}>{userInfo.grade && `Grade: ${userInfo.grade}`} {userInfo.group && `| Group: ${userInfo.group}`}</p>
                    <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <p>Date: {formattedDate}</p>
                        <p>Time: {formattedTime}</p>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                        <button
                            onClick={() => ViewProfileInfo()}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 px-5 py-2 rounded-md text-white font-semibold shadow-md"
                        >
                            View Profile
                        </button>
                        <button
                            onClick={() => setShowForm(prev => !prev)}
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 px-5 py-2 rounded-md text-white font-semibold shadow-md"
                        >
                            {showForm ? "Close Profile" : "Edit Profile"}
                        </button>
                    </div>
                </div>
            </motion.div>

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
    );
};

export default WelcomeCard;
