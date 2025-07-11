import React, { useEffect, useState } from 'react'
import HeroSection from './Courses/HeroSection'
import AboutSection from './Courses/AboutSection'
import CourseSection from './Courses/CourseSection'
import { AccessCourse } from './Courses/AccessCourse'
import PaymentComponent from './PaymentComponent'

export const Course = () => {

    const [iscounterExist, setiscounterExist] = useState(false)

    useEffect(() => {
        const count = localStorage.getItem("SubscribeCount")
        if (count) {
            setiscounterExist(true)
        }
    })

    return (
        <div className="bg-black text-white font-sans">
            {!iscounterExist
                ? (<HeroSection />)
                : (<AccessCourse />)}
            <AboutSection />
            <CourseSection />
            <PaymentComponent/>
        </div>
    )
}
