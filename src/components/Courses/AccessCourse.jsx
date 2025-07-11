import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export const AccessCourse = () => {

    const [username, setusername] = useState('')

    useEffect(() => {
        const storedUsername = localStorage.getItem("userName")
        if (storedUsername) {
            setusername(storedUsername)
        }
    }, [])  // ✅ dependency array lagana bhoolna mat, warna infinite render hoga

    const navigate = useNavigate()
    const PremiumDashboard = () => {
        console.log("Premium button clicked")
        navigate('/course/PremiumDashboard')
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-black via-gray-900 to-gray-800">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-10 rounded-3xl shadow-2xl border border-gray-600 backdrop-blur-md bg-opacity-30"
            >
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="flex justify-center mb-6"
                >
                    <div className="bg-green-500 p-4 rounded-full shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-4xl font-bold text-white mb-4"
                >
                    Welcome {username}! You're Authenticated!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-lg text-gray-300 mb-8"
                >
                    Now you can access our premium courses and start learning.
                </motion.p>

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="bg-gradient-to-r from-green-400 to-blue-500 px-8 py-3 rounded-xl text-white font-semibold shadow-lg hover:from-green-500 hover:to-blue-600 transition"
                    onClick={() => { PremiumDashboard() }}
                >
                    Go to Dashboard
                </motion.button>
            </motion.div>
        </div>
    )
}
