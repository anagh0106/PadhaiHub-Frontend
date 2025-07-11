import React from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaInfinity, FaSquareRootAlt, FaEquals } from 'react-icons/fa';

export const Mathematics = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 text-white">
            <motion.h1
                className="text-5xl font-bold text-center text-blue-400 mb-16"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Welcome To Mathematics Course
            </motion.h1>

            <motion.div
                className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.3 }}
            >
                <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaCalculator size={80} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-4">Algebra Mastery</h3>
                    <p className="text-center text-gray-200">
                        Learn equations, polynomials, functions & quadratic formulas with detailed explanation & visualizations.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-green-500 to-teal-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaInfinity size={80} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-4">Calculus Concepts</h3>
                    <p className="text-center text-gray-200">
                        Limits, differentiation, integration, and their real life applications made super easy to understand.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-pink-500 to-red-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaSquareRootAlt size={80} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-4">Trigonometry</h3>
                    <p className="text-center text-gray-200">
                        Master all trigonometric functions, identities, graphs & applications with visuals and practice sets.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaEquals size={80} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-4">Statistics & Probability</h3>
                    <p className="text-center text-gray-200">
                        Cover full probability, data handling, mean, variance, standard deviation and modern data analysis.
                    </p>
                </motion.div>
            </motion.div>

            {/* <iframe
                width="560"
                height="315"
                src="https://www.youtube-nocookie.com/embed/yF291D4XcMo?autoplay=1&controls=1&modestbranding=1&rel=0&disablekb=1"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
            </iframe> */}
        </div >
    )
}
