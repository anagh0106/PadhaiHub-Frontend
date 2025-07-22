import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Authform from './AuthForm.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ThemeContext from './context/ThemeContext.jsx';
import { motion, useMotionValue, animate } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import FAQSection from './FAQSection.jsx';
import CourseCards from './CourseCards.jsx';
import { CheckCircle, Heading1 } from "lucide-react";
import AtomAnimation from './3d/AtomAnimation.jsx';
import { Canvas } from "@react-three/fiber";
import AnimatedBackground from './AnimateBackground.jsx';

const Home = () => {
    const [review, setReview] = useState([]);
    const [showAuthForm, setShowAuthForm] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isFormSubmitted, setisFormSubmitted] = useState(false);
    const [MainText, setMainText] = useState("")
    const [Description, setDescription] = useState("")
    const [facultyCount, setfacultyCount] = useState()
    const [studentCount, setstudentCount] = useState()
    const [Heading, setHeading] = useState("")
    const [Heading2, setHeading2] = useState("")
    const [cards, setcards] = useState([]);
    const { theme } = useContext(ThemeContext);

    const colors = {
        background: theme === 'light' ? 'bg-white' : 'bg-black',
        card: theme === 'light' ? 'bg-gray-100' : 'bg-[rgba(15,15,15,0.5)]',
        border: theme === 'light' ? 'border-gray-300' : 'border-[rgba(255,255,255,0.1)]',
        text: theme === 'light' ? 'text-black' : 'text-white',
        subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
        shadow: 'shadow-lg',
        glass: theme === 'light' ? 'backdrop-blur-lg' : 'backdrop-blur-lg',
        overlay: theme === 'light' ? 'bg-white/50' : 'bg-black/60'
    };

    const isLocal = window.location.hostname === "localhost";
    const API = isLocal
        ? "http://localhost:3000/review"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/review";

    const token = localStorage.getItem("token");
    const homeAPI = window.location.hostname === "localhost"
        ? "http://localhost:3000/home"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/home";

    const fetchHomePageText = async () => {
        try {
            const res = await axios.get(`${homeAPI}/getText`);
            console.log(res.data);
            // yahan setState karna
            setHeading(res.data.headingLine1);
            setHeading2(res.data.headingLine2)
            setMainText(res.data.mainText);
            setDescription(res.data.description);
        } catch (error) {
            console.error("Failed to load homepage text", error);
        }
    };
    const getFacultyCount = async () => {
        try {
            const res = await axios.get(`${homeAPI}/getFacultyCount`)
            console.log(res.data);
            setfacultyCount(res.data)

        } catch (error) {
            console.log("Error is => ", error);

        }
    }
    const getStudentCount = async () => {
        try {
            const res = await axios.get(`${homeAPI}/getStudentCount`)
            console.log(res.data);
            setstudentCount(res.data)

        } catch (error) {
            console.log("Error is => ", error);

        }
    }
    const handleGetStarted = () => {
        setShowAuthForm(true);
    };
    const fetchReviews = async () => {
        try {
            const res = await axios.get(`${API}/getReviews`);
            setReview(res.data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    useEffect(() => {
        fetchReviews();
        fetchHomePageText();
        getFacultyCount();
        getStudentCount();
    }, []);

    const ReviewSubmitHandler = async (reviewData) => {
        if (!reviewData.name || !reviewData.grade || !reviewData.message) {
            alert("Please fill all the fields");
            return;
        }

        try {
            const response = await axios.post(`${API}/submitReview`, reviewData);
            if (response.status === 201) {
                alert("Review submitted successfully");
                setisFormSubmitted(true);
                reset();
                await fetchReviews();
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className={`${colors.background} ${colors.text} min-h-screen transition-colors duration-500`}>
            <AnimatedBackground />
            {showAuthForm && (
                <div className={`fixed inset-0 flex items-center justify-center ${colors.overlay} ${colors.glass} z-50 p-4`}>
                    <Authform onClose={() => setShowAuthForm(false)} />
                </div>
            )}

            {/* Final Header */}
            <section className="bg-[#0f172a] text-white px-6 py-20 md:px-20 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

                    {/* Left Side */}
                    <div className="flex-1 lg:-ml-16">
                        <span className="inline-block bg-[#1e293b] text-sm text-white font-semibold px-4 py-1 rounded-full mb-4">
                            {MainText}
                        </span>
                        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-5">
                            {Heading}
                            <span className="text-blue-500">{Heading2}</span>
                        </h1>
                        <p className="text-gray-300 text-xl mb-8 max-w-2xl">
                            {Description}
                        </p>
                        <div className="flex flex-wrap gap-5">
                            <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg shadow hover:bg-gray-200 transition">
                                Start Learning Today →
                            </button>
                            <button className="bg-black border border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition">
                                View Courses
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 flex gap-12 flex-wrap">
                            <div className="text-center">
                                <h3 className="text-4xl font-bold text-blue-500">{studentCount}+</h3>
                                <p className="text-base text-gray-400">Students Taught</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-4xl font-bold text-blue-500">95%</h3>
                                <p className="text-base text-gray-400">Success Rate</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-4xl font-bold text-blue-500">10+</h3>
                                <p className="text-base text-gray-400">Years Experience</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Card with Animation */}
                    <motion.div
                        className="flex-1 lg:ml-12"
                        initial={{ y: 10 }}
                        animate={{ y: -10 }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                    >
                        <div className="bg-[#1e293b] rounded-2xl p-12 w-[500px] shadow-2xl mx-auto">
                            <div className="flex items-center gap-5 mb-6">
                                <span className="text-5xl">🎓</span>
                                <div>
                                    <h3 className="text-2xl font-semibold">Quality Education</h3>
                                    <p className="text-base text-gray-400">Trusted by thousands</p>
                                </div>
                            </div>

                            <ul className="space-y-5 mt-8">
                                {[
                                    "Experienced Faculty",
                                    "Small Batch Sizes",
                                    "Regular Assessments",
                                    "Doubt Clearing Sessions"
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-lg">
                                        <CheckCircle className="text-green-400 w-6 h-6" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                </div>
            </section>
            {/* <Canvas camera={{ position: [0, 0, 5] }}>
                <AtomAnimation />
            </Canvas> */}
            {token && (
                <section className={`py-16 ${colors.card} ${colors.border} rounded-xl mx-4 my-4 text-center px-4 animate-fade-in`}>
                    <h2 className="text-3xl font-bold">Share Your Experience</h2>
                    <p className={`mt-4 text-lg ${colors.subtext} max-w-2xl mx-auto`}>
                        Your feedback is important to us! Please share your review.
                    </p>

                    <form onSubmit={handleSubmit(ReviewSubmitHandler)} className={`mt-10 max-w-md mx-auto ${colors.card} ${colors.glass} p-6 rounded-xl shadow-lg ${colors.border}`}>
                        <div className="mb-5 text-left">
                            <input type="text" placeholder="Your Name" {...register("name", { required: "Name is required" })}
                                className={`w-full p-3 rounded-md bg-[#1c1c1c] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500`} />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="mb-5 text-left">
                            <input type="text" placeholder="Your Grade" {...register("grade", { required: "Grade is required" })}
                                className={`w-full p-3 rounded-md bg-[#1c1c1c] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500`} />
                            {errors.grade && <p className="text-red-400 text-sm mt-1">{errors.grade.message}</p>}
                        </div>

                        <div className="mb-5 text-left">
                            <textarea placeholder="Write your review here..." {...register("message", { required: "Message is required" })}
                                className={`w-full p-3 rounded-md bg-[#1c1c1c] text-white h-32 resize-none border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500`} />
                            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-3 rounded-lg hover:scale-105 hover:brightness-110 transition-transform font-semibold">
                            Submit Review
                        </button>
                    </form>
                </section>
            )}

            <FAQSection />
            <CourseCards />

            <footer className={`${colors.card} ${colors.border} text-center py-6 animate-fade-in`}>
                <p className="text-lg">Ready to start your journey with us?</p>
                <Link to="/" className="mt-4 inline-block bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-8 rounded-lg hover:scale-105 hover:brightness-110 transition-transform">
                    Join Now
                </Link>
            </footer>
        </div>
    );
};

// Infinite Smooth AutoScroll Component
const AutoScroll = ({ reviews, theme, colors }) => {
    const x = useMotionValue(0);
    const totalWidth = reviews.length * 320; // 300 + gap approx

    useEffect(() => {
        const controls = animate(x, [-totalWidth, 0], {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear"
        });

        return () => controls.stop();
    }, [totalWidth]);

    return (
        <motion.div
            className="flex gap-8"
            style={{ x }}
            onMouseEnter={() => x.stop()}
            onMouseLeave={() => {
                const currentX = x.get();
                animate(x, [currentX, -totalWidth], {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: ((totalWidth + currentX) / totalWidth) * 30,
                    ease: "linear"
                });
            }}
        >
            {reviews.length === 0 ? (
                <p className={`${colors.subtext}`}>No reviews yet. Be the first to share!</p>
            ) : (
                [...reviews, ...reviews].map((item, index) => (
                    <div
                        key={index}
                        className={`backdrop-blur-md p-6 rounded-xl border ${colors.border} shadow-xl min-w-[300px] transition-all hover:scale-105 hover:brightness-110 
                            ${theme === 'light' ? 'bg-white/80 text-black' : 'bg-white/10 text-white'}`}
                    >
                        <p className={`italic ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>"{item.message}"</p>
                        <h3 className="mt-4 font-bold text-lg">{item.name}</h3>
                        <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>{item.grade}</p>
                    </div>
                ))
            )}
        </motion.div>
    )
}

export default Home;
