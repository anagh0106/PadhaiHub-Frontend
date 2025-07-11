import React from 'react';
import { motion } from 'framer-motion';
import { GiHeartOrgan, GiBrain, GiMicroscope, GiDna2 } from 'react-icons/gi';

export const Biology = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 text-white">
            <motion.h1
                className="text-4xl font-bold text-center text-green-400 mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Biology Course
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <motion.div
                    className="bg-gradient-to-r from-green-500 to-teal-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiHeartOrgan size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Human Physiology</h3>
                    <p className="text-center text-gray-200">
                        Study systems like circulatory, respiratory & excretory.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiBrain size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Neurobiology</h3>
                    <p className="text-center text-gray-200">
                        Understand brain, nerves, impulses & reflex actions.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-pink-500 to-red-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiMicroscope size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Cell Biology</h3>
                    <p className="text-center text-gray-200">
                        Learn about cells, organelles, and their functions.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiDna2 size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Genetics</h3>
                    <p className="text-center text-gray-200">
                        Explore heredity, DNA, chromosomes & genetic disorders.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
