import React, { useEffect, useState } from 'react'
import HeroSection from './Courses/HeroSection'
import AboutSection from './Courses/AboutSection'
import CourseSection from './Courses/CourseSection'
import { AccessCourse } from './Courses/AccessCourse'
import PaymentComponent from './PaymentComponent'
import axios from 'axios'
import CourseCards from './CourseCards'
import { BatchTime } from './BatchTime'

export const Course = () => {

    const [iscounterExist, setiscounterExist] = useState(false)


    useEffect(() => {
        const count = localStorage.getItem("isActivated")
        if (count) {
            setiscounterExist(true)
        }
    })

    return (
        <div className="bg-black text-white font-sans">
            <section className="bg-[#0f172a] text-white py-16 px-4 text-center relative">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block mb-4">
                        <span className="bg-[#1e293b] text-sm px-4 py-1 rounded-full text-gray-300 shadow-sm">
                            Our Courses
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        Comprehensive Learning <span className="text-blue-500">Programs</span>
                    </h1>

                    <p className="text-lg text-gray-300">
                        Choose from our wide range of courses designed to help you excel in academic
                        subjects and competitive exams with expert guidance.
                    </p>
                </div>
            </section>
            <CourseCards />
            <BatchTime />
            {/* {!iscounterExist
                ? (<HeroSection />)
                : (<AccessCourse />)} */}
        </div>
    )
}
