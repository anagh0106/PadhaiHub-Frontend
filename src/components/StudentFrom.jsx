import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserGraduate, FaEnvelope, FaPhone, FaHome, FaIdCard, FaLayerGroup, FaUsers } from 'react-icons/fa';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 },
    }),
};

const StudentForm = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [submitted, setSubmitted] = useState(false);

    const host = window.location.hostname;
    const API = host === "localhost"
        ? "http://localhost:3000/user"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/user";

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        const studentId = localStorage.getItem("studentId");
        setValue("email", email || "");
        setValue("studentId", studentId || "");
    }, [setValue]);

    useEffect(() => {
        const checkFormStatus = async () => {
            try {
                const res = await axios.get(`${API}/check-student-info`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.alreadySubmitted) {
                    setSubmitted(true); // 👈 form hidden ho jayega
                }
            } catch (err) {
                console.error("Error checking form status", err);
            }
        };

        checkFormStatus();

        // Set email and ID as usual
        const email = localStorage.getItem("userEmail");
        const studentId = localStorage.getItem("studentId");
        setValue("email", email || "");
        setValue("studentId", studentId || "");
    }, [setValue]);


    const token = localStorage.getItem("token");

    const submitHandler = async (data) => {
        try {
            const res = await axios.post(`${API}/submit-student-info`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (res.data.alreadySubmitted) {
                setSubmitted(true);
                return;
            }
            setSubmitted(true);
            reset();
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    if (submitted) return null
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <div className="w-full max-w-xl">
                <motion.div
                    className="bg-[#0e1013] backdrop-blur-lg rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.15)] p-8 border border-cyan-700/30"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6 tracking-wide">
                        🎓 Student Information
                    </h2>

                    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={1}>
                            <label className="text-sm block mb-1 flex items-center gap-2 text-cyan-400">
                                <FaIdCard className="text-lg" /> Student ID
                            </label>
                            <input
                                {...register('studentId', { required: true })}
                                value={localStorage.getItem("studentId") || ""}
                                readOnly
                                className="w-full px-4 py-2 bg-[#191e24] text-gray-400 rounded-lg outline-none cursor-not-allowed"
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={2}>
                            <label className="text-sm block mb-1 flex items-center gap-2 text-yellow-300">
                                <FaEnvelope className="text-lg" /> Email
                            </label>
                            <input
                                {...register('email', { required: true })}
                                value={localStorage.getItem("userEmail") || ""}
                                readOnly
                                className="w-full px-4 py-2 bg-[#191e24] text-gray-400 rounded-lg outline-none cursor-not-allowed"
                            />
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={3}>
                            <label className="text-sm block mb-1 flex items-center gap-2 text-green-300">
                                <FaUserGraduate className="text-lg" /> Full Name
                            </label>
                            <input
                                {...register('fullName', { required: 'Full name is required' })}
                                placeholder="Enter full name"
                                className="w-full px-4 py-2 bg-[#191e24] text-white rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={4}>
                            <label className="text-sm block mb-1 flex items-center gap-2 text-orange-300">
                                <FaPhone className="text-lg" /> Phone
                            </label>
                            <input
                                maxLength={10}
                                placeholder="Enter 10-digit phone number"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: 'Enter a valid 10-digit number',
                                    },
                                })}
                                onInput={(e) => e.target.value = e.target.value.replace(/\D/g, '')}
                                className="w-full px-4 py-2 bg-[#191e24] text-white rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={5}>
                            <label className="text-sm block mb-1 flex items-center gap-2 text-purple-300">
                                <FaHome className="text-lg" /> Address
                            </label>
                            <textarea
                                {...register('address', { required: 'Address is required' })}
                                placeholder="Enter address"
                                className="w-full px-4 py-2 bg-[#191e24] text-white rounded-lg outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={6}>
                            <label className="text-sm block mb-1 flex items-center gap-2 text-blue-300">
                                <FaLayerGroup className="text-lg" /> Grade
                            </label>
                            <select
                                {...register('grade', { required: 'Grade is required' })}
                                className="w-full px-4 py-2 bg-[#191e24] text-white rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="">Select Grade</option>
                                <option value="11">11th</option>
                                <option value="12">12th</option>
                            </select>
                            {errors.grade && <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>}
                        </motion.div>

                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={7}>
                            <label className="text-sm block mb-1 flex items-center gap-2 text-pink-300">
                                <FaUsers className="text-lg" /> Group
                            </label>
                            <select
                                {...register('group', { required: 'Group is required' })}
                                className="w-full px-4 py-2 bg-[#191e24] text-white rounded-lg outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="">Select Group</option>
                                <option value="A">A Group</option>
                                <option value="B">B Group</option>
                            </select>
                            {errors.group && <p className="text-red-500 text-sm mt-1">{errors.group.message}</p>}
                        </motion.div>
                        <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={8}>
                            <label className="text-sm block mb-1 flex items-center gap-2 text-red-400">
                                <FaCamera className="text-lg" /> Upload Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register('image', { required: 'Image is required' })}
                                className="w-full px-4 py-2 bg-[#191e24] text-white rounded-lg outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600"
                            />
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                        </motion.div>
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white py-2 rounded-lg transition font-semibold shadow-lg hover:shadow-cyan-500/50"
                        >
                            🚀 Submit
                        </motion.button>
                    </form>
                </motion.div>

                <AnimatePresence>
                    {submitted && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="mt-6 bg-green-600 text-white text-center py-3 rounded-lg shadow-md font-semibold"
                        >
                            ✅ Student Info Submitted Successfully!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default StudentForm;