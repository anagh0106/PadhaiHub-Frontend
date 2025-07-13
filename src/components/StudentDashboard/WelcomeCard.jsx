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
    const fileInputRef = useRef(null);
    const { theme } = useContext(ThemeContext);
    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000/user"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/user";

    const [userInfo, setUserInfo] = useState([]);

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

    const handleImageClick = () => fileInputRef.current.click();

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

    // console.log(userInfo.map(u => u));



    const ViewProfileInfo = async () => {
        setShowProfile(true);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;
            setUserInfo((prev) => ({ ...prev, profileImage: base64Image }));
            localStorage.setItem("profileImage", base64Image);
            console.log("✅ Image saved to localStorage");
        };

        reader.onerror = (error) => {
            console.error("❌ Error reading file:", error);
            alert("Image upload failed. Please try again.");
        };

        reader.readAsDataURL(file);
    };

    const colors = {
        cardBg: theme === "light" ? "bg-white text-black" : "bg-black text-white",
        border: theme === "light" ? "border-gray-300" : "border-[#222]",
        inputModalBg: theme === "light" ? "bg-white text-black" : "bg-[#111] text-white",
        modalBorder: theme === "light" ? "border border-gray-300" : "border border-[#333]",
        textSecondary: theme === "light" ? "text-gray-600" : "text-gray-400",
    };

    useEffect(() => {
        userInfo.map((u) => {
            localStorage.setItem("grade", u.grade)
            localStorage.setItem("group", u.group)
            localStorage.setItem("fullName", u.fullName)
        })
    }, [userInfo])
    return (
        <div className="w-full max-w-4xl mx-auto mt-10 space-y-6">
            <motion.div
                className={`rounded-3xl p-8 shadow-[0_0_30px_#00bcd480] border ${colors.cardBg} ${colors.border}`}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative w-28 h-28 group">
                            {/* <img
                                src={userInfo.profileImage || "/default-profile.png"}
                                alt="Profile"
                                onClick={handleImageClick}
                                className="w-full h-full object-cover rounded-full border-4 border-cyan-500 shadow-lg cursor-pointer group-hover:scale-105 transition duration-300"
                            /> */}
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-cyan-400">
                                Welcome, {userInfo.fullName || "Student"}!
                            </h2>
                            <p className={`text-sm ${colors.textSecondary} mt-1`}>
                                ID: {userInfo.studentId}
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className={`text-sm ${colors.textSecondary}`}>Date: {formattedDate}</p>
                        <p className={`text-sm ${colors.textSecondary}`}>Time: {formattedTime}</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-end gap-4">
                    <button
                        onClick={() => ViewProfileInfo()}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
                    >
                        View Profile
                    </button>
                    <button
                        onClick={() => setShowForm((prev) => !prev)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 px-6 py-3 rounded-xl text-white font-semibold shadow-lg"
                    >
                        {showForm ? "Close Profile" : "Edit Profile"}
                    </button>
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
