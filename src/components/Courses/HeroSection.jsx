import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import axios from "axios";

const HeroSection = () => {

    const [isbuttonclicked, setisbuttonclicked] = useState(false);
    const [isAuthnticatedUser, setisAuthnticatedUser] = useState(false);
    const [isActivated, setisActivated] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");

    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000/course"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/course";
    const selectCourseFunction = () => {
        setisbuttonclicked(true);
    }

    const submithandler = async (data) => {
        if (!token) {
            setErrorMessage("You are not a valid user !");
            return;
        }

        if (data.email.toLowerCase() !== email?.toLowerCase()) {
            setErrorMessage("Please enter valid email address !");
            setisAuthnticatedUser(false);
            return;
        }

        try {
            console.log("Data.email is ", data.email)
            const res = await axios.post(`${API}/postCount`,
                {
                    email: data.email
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log(res.data);
            setisAuthnticatedUser(true);
            setisActivated(true)
            setErrorMessage("");
            setisbuttonclicked(false);
            reset();

        } catch (err) {
            console.log("Error is => ", err.response?.data || err);
            setErrorMessage("Something went wrong !");
        }
    }

    // Auto clear error after 3 sec
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);
    useEffect(() => {
        isActivated === true ? localStorage.setItem("isActivated", true) : localStorage.setItem("isActivated", false)
    })
    return (
        <>
            {isActivated === false && isbuttonclicked ? (
                // Full screen modal with backdrop blur
                <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl shadow-2xl w-full max-w-md relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setisbuttonclicked(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
                        >
                            &times;
                        </button>

                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="bg-purple-600 p-4 rounded-full shadow-lg">
                                <FaEnvelopeOpenText className="text-white text-4xl" />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-white text-center mb-4">
                            Subscribe to our Course
                        </h2>
                        <p className="text-gray-400 text-center mb-6">
                            Get the latest updates delivered directly to your inbox.
                        </p>

                        {/* Animated Error Message */}
                        <AnimatePresence>
                            {errorMessage && (
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="mb-4 p-3 bg-red-500 text-white rounded-lg text-center shadow-md"
                                >
                                    {errorMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Form */}
                        <form onSubmit={handleSubmit(submithandler)} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-purple-500'}`}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            ) : (
                // Main Hero Section
                <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl font-bold mb-4 text-blue-400"
                    >
                        Master Science with Confidence
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg mb-8 text-gray-300"
                    >
                        NEET | JEE | Boards - Classes for 11th & 12th Science Students
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.2 }}
                        className="bg-blue-500 px-6 py-3 rounded-xl text-white font-semibold shadow-lg hover:bg-blue-600 transition"
                        onClick={selectCourseFunction}
                    >
                        Join Now
                    </motion.button>
                </div>
            )}

        </>
    );
};

export default HeroSection;
