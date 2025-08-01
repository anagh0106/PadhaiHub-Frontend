import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from '../context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

const FacultyInformation = () => {
    const [facultyData, setfacultyData] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const { theme } = useContext(ThemeContext);

    const colors = {
        background: theme === 'light' ? 'bg-[#EEF4FF]' : 'bg-[#0f172a]',
        card: theme === 'light' ? 'bg-gray-100' : 'bg-[rgba(15,15,15,0.5)]',
        border: theme === 'light' ? 'border-gray-300' : 'border-[rgba(255,255,255,0.1)]',
        text: theme === 'light' ? 'text-black' : 'text-white',
        subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
        shadow: 'shadow-lg',
        glass: theme === 'light' ? 'backdrop-blur-lg' : 'backdrop-blur-lg',
        overlay: theme === 'light' ? 'bg-white/50' : 'bg-black/60'
    };
    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000/faculty"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/faculty";

    const fetchFacultyData = async () => {
        try {
            const res = await axios.get(`${API}/getFaculties`);
            setfacultyData(res.data.faculties);
        } catch (error) {
            console.log("Error is =>", error.message);
        }
    };
    useEffect(() => {
        fetchFacultyData()
    })
    const handleCardClick = (teacher) => {
        setSelectedFaculty(teacher);
    };

    const handleCloseModal = () => {
        setSelectedFaculty(null);
    };
    return (
        // <>
        //     <div className="flex flex-wrap justify-center gap-14">
        //         {facultyData.map((teacher, index) => (
        //             <motion.div
        //                 key={index}
        //                 className={`rounded-2xl shadow-xl w-80 py-10 px-6 cursor-pointer transition-transform duration-300 hover:scale-105 ${colors.card} ${colors.border}`}
        //                 whileHover={{ scale: 1.05 }}
        //                 onClick={() => handleCardClick(teacher)}
        //                 initial={{ opacity: 0, y: 50 }}
        //                 whileInView={{ opacity: 1, y: 0 }}
        //                 viewport={{ once: true }}
        //                 transition={{ duration: 0.5, delay: index * 0.1 }}
        //             >
        //                 <img
        //                     src={teacher.image}
        //                     alt={teacher.name}
        //                     className="w-36 h-36 mx-auto mb-6 rounded-full object-cover border-[6px] border-blue-500 shadow-lg"
        //                 />
        //                 <h4 className={`text-2xl font-bold mb-1 text-center ${colors.heading}`}>{teacher.name}</h4>
        //                 <p className={`text-lg text-center ${colors.subtext}`}>{teacher.subject}</p>
        //             </motion.div>
        //         ))}
        //     </div>
        //     {/* Faculty Card Modal */}
        //     <AnimatePresence>
        //         {selectedFaculty && (
        //             <motion.div
        //                 className="fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm flex justify-center items-center z-50"
        //                 initial={{ opacity: 0 }}
        //                 animate={{ opacity: 1 }}
        //                 exit={{ opacity: 0 }}
        //                 transition={{ duration: 0.3 }}
        //             >
        //                 <motion.div
        //                     className={`p-10 rounded-2xl w-96 shadow-2xl relative ${colors.blurBg} ${colors.border}`}
        //                     initial={{ scale: 0 }}
        //                     animate={{ scale: 1 }}
        //                     exit={{ scale: 0 }}
        //                     transition={{ duration: 0.4 }}
        //                 >
        //                     <button
        //                         onClick={handleCloseModal}
        //                         className="absolute top-3 right-4 text-red-500 text-3xl font-bold"
        //                     >
        //                         ×
        //                     </button>
        //                     <div className="text-center mb-6">
        //                         <img
        //                             src={selectedFaculty.image}
        //                             alt={selectedFaculty.name}
        //                             className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-400 shadow-lg"
        //                         />
        //                         <h4 className={`text-2xl font-semibold mt-3 ${colors.heading}`}>{selectedFaculty.name}</h4>
        //                         <p className={`${colors.subtext}`}>{selectedFaculty.subject}</p>
        //                     </div>
        //                     <div className={`text-left space-y-4 ${colors.subtext}`}>
        //                         <div><span className={`${colors.heading} font-semibold`}>Bio: </span>{selectedFaculty.bio}</div>
        //                         <div><span className={`${colors.heading} font-semibold`}>Qualification: </span>{selectedFaculty.qualification}</div>
        //                         <div><span className={`${colors.heading} font-semibold`}>Experience: </span>{selectedFaculty.experience}</div>
        //                         <div><span className={`${colors.heading} font-semibold`}>Contact: </span>{selectedFaculty.contact}</div>
        //                     </div>
        //                 </motion.div>
        //             </motion.div>
        //         )}
        //     </AnimatePresence>
        // </>
        <>
            {/* Faculty Grid Section with Spacing and Responsive 4x1 Grid */}
            <section className={`py-20 px-6 ${colors.background}`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {facultyData.map((teacher, index) => (
                        <motion.div
                            key={index}
                            className={`rounded-2xl shadow-xl py-10 px-6 cursor-pointer transition-transform duration-300 hover:scale-105 ${colors.card} ${colors.border}`}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => handleCardClick(teacher)}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <img
                                src={teacher.image}
                                alt={teacher.name}
                                className="w-36 h-36 mx-auto mb-6 rounded-full object-cover border-[6px] border-blue-500 shadow-lg"
                            />
                            <h4 className={`text-2xl font-bold mb-1 text-center ${colors.heading}`}>{teacher.name}</h4>
                            <p className={`text-lg text-center ${colors.subtext}`}>{teacher.subject}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Faculty Modal */}
            <AnimatePresence>
                {selectedFaculty && (
                    <motion.div
                        className="fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm flex justify-center items-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className={`p-10 rounded-2xl w-96 shadow-2xl relative ${colors.card} ${colors.border}`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-3 right-4 text-red-500 text-3xl font-bold"
                            >
                                ×
                            </button>
                            <div className="text-center mb-6">
                                <img
                                    src={selectedFaculty.image}
                                    alt={selectedFaculty.name}
                                    className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-400 shadow-lg"
                                />
                                <h4 className={`text-2xl font-semibold mt-3 ${colors.heading}`}>{selectedFaculty.name}</h4>
                                <p className={`${colors.subtext}`}>{selectedFaculty.subject}</p>
                            </div>
                            <div className={`text-left space-y-4 ${colors.subtext}`}>
                                <div><span className={`${colors.heading} font-semibold`}>Bio: </span>{selectedFaculty.bio}</div>
                                <div><span className={`${colors.heading} font-semibold`}>Qualification: </span>{selectedFaculty.qualification}</div>
                                <div><span className={`${colors.heading} font-semibold`}>Experience: </span>{selectedFaculty.experience}</div>
                                <div><span className={`${colors.heading} font-semibold`}>Contact: </span>{selectedFaculty.contact}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>

    )
}

export default FacultyInformation