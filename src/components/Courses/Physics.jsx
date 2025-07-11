import React from 'react';
import { motion } from 'framer-motion';
import { GiAtom, GiMagnet, GiThermometerCold, GiLightBulb } from 'react-icons/gi';

export const Physics = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 text-white">
            <motion.h1
                className="text-4xl font-bold text-center text-green-400 mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Physics Course
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <motion.div
                    className="bg-gradient-to-r from-green-500 to-blue-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiAtom size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Mechanics</h3>
                    <p className="text-center text-gray-200">
                        Study motion, force & energy.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-pink-500 to-purple-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiMagnet size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Electromagnetism</h3>
                    <p className="text-center text-gray-200">
                        Learn electric fields, circuits & magnetism.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiThermometerCold size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Thermodynamics</h3>
                    <p className="text-center text-gray-200">
                        Heat, temperature & laws of thermodynamics.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-red-400 to-pink-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiLightBulb size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Optics</h3>
                    <p className="text-center text-gray-200">
                        Understand light, reflection & refraction.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
