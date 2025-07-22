import { useContext, useEffect, useState } from "react";
import { Menu, User, X, Sun, Moon, Settings, GraduationCap } from "lucide-react";
import { motion, AnimatePresence, color } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import AuthForm from "./AuthForm.jsx";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "./context/ThemeContext.jsx";
import axios from "axios";

function Navbar({ onLogout }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
    const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
    const [studentId, setstudentId] = useState(localStorage.getItem("studentId") ?? "");
    const [shouldLogout, setShouldLogout] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const navigate = useNavigate();
    const { theme, setTheme } = useContext(ThemeContext);
    const mymail = "anagh0106@gmail.com";

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".settings-dropdown")) {
                setSettingsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
            setUserEmail(localStorage.getItem("userEmail") || "");
            setUserName(localStorage.getItem("userName") || "");
            setstudentId(localStorage.getItem("studentId") || "");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        if (shouldLogout) {
            toast.success("Logged out successfully!", { position: "top-right" });
            localStorage.clear();
            setIsLoggedIn(false);
            onLogout();

            setTimeout(() => {
                {
                    localStorage.getItem("Facrole") ?
                        navigate("/") : navigate("/faculty/login")
                }
            }, 1500);
        }
    }, [shouldLogout]);
    const host = window.location.hostname;
    const API = host === "localhost"
        ? "http://localhost:3000/user"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/user";

    const handleAccountDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API}/deleteAccount`,
                {
                    password: password
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            toast.success("Account deleted successfully.");
            localStorage.clear();
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            toast.error("Failed to delete account.");
        }
    };

    const colors = {
        background: theme === 'light' ? 'bg-white' : 'bg-black',
        text: theme === 'light' ? 'text-black' : 'text-white',
        hover: theme === 'light' ? 'hover:text-gray-600' : 'hover:text-gray-300',
        menuBg: theme === 'light' ? 'bg-gray-100' : 'bg-gray-800',
        border: theme === 'light' ? 'border-gray-300' : 'border-gray-700',
        dropdownBg: theme === 'light' ? 'bg-white' : 'bg-gray-800',
        dropdownText: theme === 'light' ? 'text-black' : 'text-white',
        dropdownHover: theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-700'
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <header className={`sticky top-0 w-full ${colors.background} ${colors.text} backdrop-blur-md ${colors.border} border-b shadow-md z-50`}>
                <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                    {/* <div className="text-xl font-bold flex items-center gap-2">
                        PadhaiHub
                        {studentId?.trim().toLowerCase() === 'admin' && (
                            <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                                {studentId.toUpperCase()}
                            </span>
                        )}
                    </div> */}
                    <Link to="/" className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            PadhaiHub
                        </span>
                    </Link>
                    <div className="hidden lg:flex space-x-6 text-lg">
                        {localStorage.getItem("Facrole") === "Faculty"
                            ? "" :
                            <Link to="/" className={`${colors.hover} transition`}>Home</Link>}

                        {localStorage.getItem("Facrole") === "Faculty" ? "" : <Link to="/about" className={`${colors.hover} transition`}>About</Link>}
                        {!isLoggedIn && !studentId && localStorage.getItem("Facrole") !== "Faculty" && (
                            <Link to="/inquiry" className={`${colors.hover} transition`}>Inquire Now</Link>
                        )}
                        {isLoggedIn && (
                            <Link
                                to={userEmail === mymail ? "/admin/dashboard" : "/studentdashboard"}
                                className={`${colors.hover} transition`}
                            >
                                {userEmail === mymail ? "Admin Dashboard" : "Student Dashboard"}
                            </Link>
                        )}
                        {isLoggedIn && studentId && (<Link to="/courses" className={`${colors.hover} transition`}>Courses</Link>)}
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        {isLoggedIn ? (
                            <>
                                <User className={`w-5 h-5 ${colors.text}`} />
                                <span className={`font-semibold ${colors.text}`}>{userName}</span>
                                <div className="relative settings-dropdown">
                                    <Settings
                                        size={22}
                                        className="cursor-pointer text-gray-400 hover:scale-110 transition-transform"
                                        onClick={() => setSettingsOpen((prev) => !prev)}
                                    />
                                    {settingsOpen && (
                                        <div className={`absolute right-0 mt-2 w-48 ${colors.dropdownBg} border ${colors.border} rounded-md shadow-lg transition-opacity duration-300 z-50`}>
                                            <button
                                                onClick={() => toast.info("Account Settings clicked")}
                                                className={`block w-full text-left px-4 py-2 text-sm ${colors.dropdownText} ${colors.dropdownHover}`}
                                            >
                                                Account Settings
                                            </button>
                                            <button
                                                onClick={() => toast.info("Change Password clicked")}
                                                className={`block w-full text-left px-4 py-2 text-sm ${colors.dropdownText} ${colors.dropdownHover}`}
                                            >
                                                Change Password
                                            </button>
                                            <button
                                                onClick={() => toast.info("Help & Support clicked")}
                                                className={`block w-full text-left px-4 py-2 text-sm ${colors.dropdownText} ${colors.dropdownHover}`}
                                            >
                                                Help & Support
                                            </button>
                                            <button
                                                onClick={() => setShowDeleteConfirm(true)}
                                                className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${colors.dropdownHover}`}
                                            >
                                                Delete Account
                                            </button>
                                            <button
                                                onClick={() => setShouldLogout(true)}
                                                className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${colors.dropdownHover}`}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>

                            </>
                        ) : (
                            localStorage.getItem("Facrole") !== "Faculty" && !localStorage.getItem("FacToken") ? <button
                                className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                                onClick={() => setShowAuthForm(true)}
                            >
                                Get Started
                            </button> :
                                // <button
                                //     onClick={() => setShouldLogout(true)}
                                //     className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${colors.dropdownHover}`}
                                // >
                                //     Logout
                                // </button>
                                <button
                                    onClick={() => setShouldLogout(true)}
                                    className={`block w-full text-left px-4 py-2 rounded-md font-medium transition-all duration-200 ${theme === 'light'
                                        ? 'text-red-600 hover:bg-red-100'
                                        : 'text-red-400 hover:bg-red-900/30'
                                        }`}
                                >
                                    Logout
                                </button>

                        )}

                        <div className="pl-4">
                            <AnimatePresence mode="wait">
                                {theme === 'light' ? (
                                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.4 }}>
                                        <Sun size={24} onClick={toggleTheme} className="cursor-pointer text-yellow-500 hover:scale-110 transition-transform" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.4 }}>
                                        <Moon size={24} onClick={toggleTheme} className="cursor-pointer text-white hover:scale-110 transition-transform" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <button className="lg:hidden focus:outline-none" aria-label="Toggle Menu" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </nav>
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`absolute top-full left-0 w-full  ${colors.background} border-b ${colors.border} shadow-xl ${colors.dropdownText}`}

                        >
                            <div className={`flex flex-col space-y-4 px-6 py-6 text-lg  ${colors.text}`}>
                                {localStorage.getItem("Facrole") === "Faculty" ?
                                    "" : <Link to="/" onClick={() => setIsOpen(false)} className={`${colors.hover} transition`}>
                                        Home
                                    </Link>
                                }
                                {localStorage.getItem("Facrole") ?
                                    "" : <Link to="/about" onClick={() => setIsOpen(false)} className={`${colors.hover} transition`}>
                                        About
                                    </Link>
                                }

                                {!isLoggedIn && !studentId && (
                                    <Link to="/inquiry" onClick={() => setIsOpen(false)} className={`${colors.hover} transition`}>
                                        Inquire Now
                                    </Link>
                                )}
                                {isLoggedIn && (
                                    <Link
                                        to={userEmail === mymail ? "/admin/dashboard" : "/studentdashboard"}
                                        onClick={() => setIsOpen(false)}
                                        className={`${colors.hover} transition`}
                                    >
                                        {userEmail === mymail ? "Admin Dashboard" : "Student Dashboard"}
                                    </Link>
                                )}
                                {isLoggedIn && studentId && (
                                    <Link to="/courses" onClick={() => setIsOpen(false)} className={`${colors.hover} transition`}>
                                        Courses
                                    </Link>
                                )}

                                {!isLoggedIn && (
                                    <>
                                        <button
                                            className="w-full bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                                            onClick={() => {
                                                setIsOpen(false);
                                                setShowAuthForm(true);
                                            }}
                                        >
                                            Get Started
                                        </button>

                                        {/* 🔁 Theme Toggle Button */}
                                        <button
                                            onClick={toggleTheme}
                                            className="w-full text-sm mt-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        >
                                            Toggle Theme
                                        </button>
                                    </>
                                )}

                                {isLoggedIn && (
                                    <div className="mt-4 border-t border-gray-400/40 dark:border-gray-700 pt-4 space-y-2">
                                        {/* 🔁 Theme Toggle Button */}
                                        <button
                                            onClick={toggleTheme}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                                        >
                                            Toggle Theme
                                        </button>

                                        <button
                                            onClick={() => toast.info("Account Settings clicked")}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                                        >
                                            Account Settings
                                        </button>
                                        <button
                                            onClick={() => toast.info("Change Password clicked")}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                                        >
                                            Change Password
                                        </button>
                                        <button
                                            onClick={() => toast.info("Help & Support clicked")}
                                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                                        >
                                            Help & Support
                                        </button>
                                        <button
                                            onClick={() => setShowDeleteConfirm(true)}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-600/10 rounded-md transition"
                                        >
                                            Delete Account
                                        </button>
                                        <button
                                            onClick={() => setShouldLogout(true)}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-600/10 rounded-md transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence >

            </header >

            {showAuthForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 p-4">
                    <AuthForm onClose={() => setShowAuthForm(false)} />
                </div>
            )
            }

            {
                showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                        <motion.form
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAccountDelete();
                            }}
                            className={`w-full max-w-md rounded-xl shadow-2xl p-6 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'
                                }`}
                        >
                            <h2 className="text-2xl font-bold text-red-500 mb-4">Confirm Account Deletion</h2>

                            <div className="mb-6">
                                <label htmlFor="deletePassword" className="block text-sm mb-2 font-medium">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    id="deletePassword"
                                    placeholder="Enter your password"
                                    className={`w-full p-3 rounded-md border focus:outline-none ${theme === 'light'
                                        ? 'bg-gray-100 border-gray-300 text-black focus:ring-2 focus:ring-red-400'
                                        : 'bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-red-500'
                                        }`}
                                    onChange={(e) => setDeletePassword(e.target.value)}
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${theme === 'light'
                                        ? 'bg-gray-300 hover:bg-gray-400 text-black'
                                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </motion.form>
                    </div>
                )
            }


        </>
    );
}

export default Navbar;
