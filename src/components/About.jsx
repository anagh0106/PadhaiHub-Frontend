import { useEffect, useState, useContext } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import ThemeContext from './context/ThemeContext';
import CoreValues from './CoreValues';
import { useForm } from 'react-hook-form';
import { FaCheckCircle } from "react-icons/fa";

const About = () => {
    const { theme } = useContext(ThemeContext);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [facultyData, setfacultyData] = useState([]);
    const [facultyCount, setfacultyCount] = useState()
    const [usercount, setusercount] = useState();

    const baseURL = window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const API = `${baseURL}/faculty`;
    const User_API = `${baseURL}/user`;


    const fetchFacultyData = async () => {
        try {
            const res = await axios.get(`${API}/getFaculties`);
            setfacultyData(res.data.faculties);
        } catch (error) {
            console.log("Error is =>", error.message);
        }
    };


    const handlerUserCount = async () => {
        try {
            const res = await axios.get(`${User_API}/getcount`,);
            setusercount(res.data.count);
        } catch (error) {
            console.log("Error is =>", error);
        }
    }

    const handelFacultyCount = async () => {
        try {
            const res = await axios.get(`${API}/getFacultyCount`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setfacultyCount(res.data.count)

        } catch (error) {
            console.log("Error is =>", error);

        }
    }
    useEffect(() => {
        fetchFacultyData();
        handlerUserCount();
        handelFacultyCount();
    }, []);

    const handleCardClick = (teacher) => {
        setSelectedFaculty(teacher);
    };

    const handleCloseModal = () => {
        setSelectedFaculty(null);
    };

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

    return (
        <div className={`w-full min-h-screen transition-all duration-500 ${colors.background}`}>
            {/* About Header */}
            {/* <section className={`w-full ${colors.background} text-center pt-28 pb-32`}>
                <div className="max-w-screen-xl mx-auto">
                    <div className="inline-block bg-white/60 px-4 py-1 mt-8 rounded-full text-sm font-medium text-gray-700 shadow">
                        About PadhaiHub
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 my-6">
                        Empowering Students Since <span className="text-blue-600">2014</span>
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                        Founded with a vision to transform education, PadhaiHub has been a beacon
                        of academic excellence, helping thousands of students achieve their dreams
                        through quality education and personalized guidance.
                    </p>
                </div>
            </section> */}
            <section className={`w-full ${colors.background} text-center pt-28 pb-32`}>
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="inline-block bg-white/60 px-4 py-1 mt-8 rounded-full text-sm font-medium text-gray-700 shadow">
                        About PadhaiHub
                    </div>

                    <h2 className={`text-4xl md:text-5xl font-extrabold ${colors.heading} my-6`}>
                        Empowering Students Since <span className="text-blue-600">2014</span>
                    </h2>

                    <p className={`text-lg leading-relaxed max-w-2xl mx-auto ${colors.subtext}`}>
                        Founded with a vision to transform education, PadhaiHub has been a beacon
                        of academic excellence, helping thousands of students achieve their dreams
                        through quality education and personalized guidance.
                    </p>
                </div>
            </section>

            {/* Faculty Title */}
            <motion.h3
                className={`text-5xl font-extrabold mt-16 mb-8 text-center tracking-wide ${colors.heading}`}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Meet Our Faculty
            </motion.h3>

            <motion.p
                className={`mb-16 max-w-4xl mx-auto text-center text-xl ${colors.subtext}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                Our mentors inspire, guide and elevate student potential — blending expertise with passion for academic excellence.
            </motion.p>
            {/* Our Story */}
            <section className="bg-gray-50 py-20 px-4 md:px-10">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
                    {/* Our Story */}
                    <div className="lg:w-2/3">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Story</h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            PadhaiHub was founded in 2014 by a group of passionate educators who believed
                            that every student deserves access to quality education. What started as a small
                            coaching center with just 20 students has now grown into one of the most trusted
                            educational institutions in the region.
                        </p>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Our journey began with a simple mission: to bridge the gap between traditional
                            teaching methods and modern educational needs. We recognized that each student is
                            unique and requires personalized attention to reach their full potential.
                        </p>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Over the years, we have continuously evolved our teaching methodologies,
                            incorporated technology into our classrooms, and built a team of exceptional
                            educators who share our vision of academic excellence.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Today, PadhaiHub stands as a testament to the power of dedicated teaching and
                            student-centric education, with thousands of success stories and a legacy of
                            academic achievement.
                        </p>
                    </div>

                    {/* Our Mission */}
                    <div className={`lg:w-1/3 ${colors.background}`}>
                        <div className={`${colors.background} shadow-lg rounded-xl p-6 md:p-8`}>
                            <h3 className={`text-2xl font-semibold mb-6 ${colors.text}`}>Our Mission</h3>
                            <ul className={`space-y-4 ${colors.subtext}`}>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-1" />
                                    <span>Provide personalized education that caters to each student's learning style</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-1" />
                                    <span>Foster critical thinking and problem-solving abilities</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-1" />
                                    <span>Create a supportive environment that encourages academic growth</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <FaCheckCircle className="text-green-500 mt-1" />
                                    <span>Prepare students not just for exams, but for life</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* Faculty Cards */}
            <div className="flex flex-wrap justify-center gap-14">
                {facultyData.map((teacher, index) => (
                    <motion.div
                        key={index}
                        className={`rounded-2xl shadow-xl w-80 py-10 px-6 cursor-pointer transition-transform duration-300 hover:scale-105 ${colors.card} ${colors.border}`}
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

            <CoreValues />
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
                            className={`p-10 rounded-2xl w-96 shadow-2xl relative ${colors.blurBg} ${colors.border}`}
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

        </div>

    );
};

export default About;
