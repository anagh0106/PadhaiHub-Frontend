import React, { useEffect, useState } from 'react'
import HeroSection from './Courses/HeroSection'
import AboutSection from './Courses/AboutSection'
import CourseSection from './Courses/CourseSection'
import { AccessCourse } from './Courses/AccessCourse'
import PaymentComponent from './PaymentComponent'
import axios from 'axios'

export const Course = () => {

    const [iscounterExist, setiscounterExist] = useState(false)
    // const getSubcriptedStudent = async () => {
    //     const res = await axios.get(`${API}/getSubcriptedUser`)
    //     console.log(res.data)
    // }

    useEffect(() => {
        const count = localStorage.getItem("SubscribeCount")
        if (count) {
            setiscounterExist(true)
        }
    })
    useEffect(() => {
        getSubcriptedStudent()
    })
    return (
        <div className="bg-black text-white font-sans">
            {!iscounterExist
                ? (<HeroSection />)
                : (<AccessCourse />)}
            <AboutSection />
            <CourseSection />
            <PaymentComponent />
        </div>
    )
}
