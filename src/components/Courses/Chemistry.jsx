import React from 'react';
import { motion } from 'framer-motion';
import { GiChemicalDrop, GiTestTubes, GiMolecule, GiAtomicSlashes } from 'react-icons/gi';

export const Chemistry = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 text-white">
            <motion.h1
                className="text-4xl font-bold text-center text-pink-400 mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Chemistry Course
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                <motion.div
                    className="bg-gradient-to-r from-pink-500 to-red-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiMolecule size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Organic Chemistry</h3>
                    <p className="text-center text-gray-200">
                        Study carbon compounds, reactions & mechanisms.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiChemicalDrop size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Inorganic Chemistry</h3>
                    <p className="text-center text-gray-200">
                        Learn periodic table, bonding & coordination compounds.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-green-500 to-teal-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiTestTubes size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Physical Chemistry</h3>
                    <p className="text-center text-gray-200">
                        Understand kinetics, equilibrium, thermodynamics & solutions.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-3xl shadow-2xl flex flex-col items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    <GiAtomicSlashes size={60} className="mb-6 text-white" />
                    <h3 className="text-2xl font-semibold mb-3">Atomic Structure</h3>
                    <p className="text-center text-gray-200">
                        Study atoms, electrons & quantum numbers.
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
