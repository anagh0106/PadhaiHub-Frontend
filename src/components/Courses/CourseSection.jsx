import React, { useEffect, useState } from 'react';
import { Mathematics } from './Mathematics';
import { motion } from 'framer-motion';
import { Physics } from './Physics';
import { Chemistry } from './Chemistry';
import { Biology } from './Biology';
import axios from 'axios';

const CourseSection = () => {

    const host = window.localStorage.hostname
    const API = host === "localhost"
        ? "http://localhost:3000/course"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/course";


    const [subject, setsubject] = useState([])

    const fetchSubjects = async () => {
        try {
            const res = await axios.get(`${API}/getSubject`);
            const subjects = res.data.subjects;

            const subjectNames = subjects.map(subject => subject.subjectName);
            setsubject(subjectNames);

        } catch (error) {
            console.log("The Error is => ", error);
        }
    }

    useEffect(() => { fetchSubjects() }, [])

    const subjectComponent = [
        <Mathematics />,
        <Biology />,
        <Physics />,
        <Chemistry />
    ];

    const [selectedIndex, setSelectedIndex] = useState(null);

    const SubjectClick = (i) => {
        console.log("Clicked Index: ", i);
        setSelectedIndex(i);
    }

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 text-white">

                <motion.h1
                    className="text-5xl font-bold text-center text-blue-400 mb-16"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    Select Your Course
                </motion.h1>

                <div className="flex justify-center gap-6 mb-20">
                    {subjectComponent.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => SubjectClick(i)}
                            className="px-6 py-3 bg-blue-600 rounded-xl text-white text-xl hover:bg-blue-800 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {subject[i]}
                        </motion.button>
                    ))}
                </div>

                <div className="mt-10">
                    {selectedIndex === null ? <Mathematics /> : <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {subjectComponent[selectedIndex]}
                    </motion.div>}
                </div>
            </div>
        </>
    )
}

export default CourseSection

