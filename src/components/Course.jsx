import React, { useContext, useEffect, useState } from 'react'
import HeroSection from './Courses/HeroSection'
import AboutSection from './Courses/AboutSection'
import CourseSection from './Courses/CourseSection'
import { AccessCourse } from './Courses/AccessCourse'
import PaymentComponent from './PaymentComponent'
import axios from 'axios'
import CourseCards from './CourseCards'
import { BatchTime } from './BatchTime'
import ThemeContext from './context/ThemeContext'

export const Course = () => {

    const [iscounterExist, setiscounterExist] = useState(false)
    const { theme } = useContext(ThemeContext);


    useEffect(() => {
        const count = localStorage.getItem("isActivated")
        if (count) {
            setiscounterExist(true)
        }
    })
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
        <div className="bg-black text-white font-sans">
            <section className={`${colors.background} ${colors.text} py-16 px-4 text-center`}>
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block mb-4">
                        <span className={`${colors.tagBg} text-sm px-4 py-1 rounded-full ${colors.tagText} shadow-sm`}>
                            Our Courses
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        Comprehensive Learning <span className="text-blue-500">Programs</span>
                    </h1>

                    <p className={`text-lg ${colors.subtext}`}>
                        Choose from our wide range of courses designed to help you excel in academic
                        subjects and competitive exams with expert guidance.
                    </p>
                </div>
            </section>
            <CourseCards />
            <BatchTime />
            <div className="bg-blue-600 text-white text-center py-20 px-4">
                <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
                <p className="text-lg mb-8">
                    Join our expert-led courses and accelerate your academic journey
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button
                        className={`${colors.btnBg} ${colors.btnText} px-6 py-3 rounded-md font-semibold transition`}
                    >
                        Get Free Consultation →
                    </button>
                    <button
                        className={`bg-black hover:bg-gray-800 ${colors.btnText} px-6 py-3 rounded-md font-semibold transition border ${colors.btnBorder}`}
                    >
                        Meet Our Teachers
                    </button>
                </div>
            </div>
            {/* {!iscounterExist
                ? (<HeroSection />)
                : (<AccessCourse />)} */}
        </div>
    )
}
