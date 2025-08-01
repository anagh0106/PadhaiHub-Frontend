import { useEffect, useState, useContext } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import axios from 'axios';
import ThemeContext from './context/ThemeContext';
import CoreValues from './CoreValues';
import { useForm } from 'react-hook-form';
import { FaCheckCircle } from "react-icons/fa";

const About = () => {
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

    return (
        <div className={`w-full min-h-screen transition-all duration-500 ${colors.background}`}>
            {/* About Header */}
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

            {/* Our Story */}
            <section className={`${colors.background} py-20 px-4 md:px-10`}>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
                    {/* Our Story */}
                    <div className="lg:w-2/3">
                        <h2 className={`text-3xl md:text-4xl ${colors.text} font-bold mb-6`}>Our Story</h2>
                        <p className={`${colors.subtext} mb-4 leading-relaxed`}>
                            PadhaiHub was founded in 2014 by a group of passionate educators who believed
                            that every student deserves access to quality education. What started as a small
                            coaching center with just 20 students has now grown into one of the most trusted
                            educational institutions in the region.
                        </p>
                        <p className={`${colors.subtext} mb-4 leading-relaxed`}>
                            Our journey began with a simple mission: to bridge the gap between traditional
                            teaching methods and modern educational needs. We recognized that each student is
                            unique and requires personalized attention to reach their full potential.
                        </p>
                        <p className={`${colors.subtext} mb-4 leading-relaxed`}>
                            Over the years, we have continuously evolved our teaching methodologies,
                            incorporated technology into our classrooms, and built a team of exceptional
                            educators who share our vision of academic excellence.
                        </p>
                        <p className={`${colors.subtext} mb-4 leading-relaxed`}>
                            Today, PadhaiHub stands as a testament to the power of dedicated teaching and
                            student-centric education, with thousands of success stories and a legacy of
                            academic achievement.
                        </p>
                    </div>

                    {/* Our Mission */}
                    <div className="lg:w-1/3">
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
            <CoreValues />

        </div>

    );
};

export default About;
