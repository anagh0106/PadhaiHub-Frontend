import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TestQuestions = () => {
    const location = useLocation();
    const [options, setOptions] = useState(["A", "B", "C", "D"]); // fallback
    const { testId, questionCount = 1, testName } = location.state || {};

    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";



    const generateInitialQuestions = () =>
        Array.from({ length: questionCount }, () => ({
            question: "",
            options: ["", "", "", ""],
            correctAnswer: ""
        }));

    const { control, register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            questions: generateInitialQuestions()
        }
    });

    const { fields } = useFieldArray({
        control,
        name: "questions"
    });

    const [activeIndex, setActiveIndex] = useState(0);

    const goToNext = () => {
        if (activeIndex < fields.length - 1) setActiveIndex((prev) => prev + 1);
    };

    const goToPrev = () => {
        if (activeIndex > 0) setActiveIndex((prev) => prev - 1);
    };

    const getOptions = async () => {
        try {
            const res = await axios.get(`${API}/questionTest/admin/mockQuestion/getOptions`);
            setOptions(res.data.Options || ["A", "B", "C", "D"]);
        } catch (error) {
            console.log("Error is =>", error);
        }
    };

    const onSubmit = async (data) => {
        if (data.questions.length !== questionCount) {
            alert(`❌ Please complete all ${questionCount} questions before saving.`);
            return;
        }

        // Check all options are non-empty
        const invalid = data.questions.some(q =>
            q.options.some(opt => !opt.trim()) || !q.correctAnswer.trim()
        );
        if (invalid) {
            alert("❌ Fill all options and select correct answer!");
            return;
        }

        try {
            const res = await axios.post(`${API}/questionTest/admin/mockQuestion/createQuestions`, {
                testId,
                questions: data.questions,
            });

            alert("✅ Questions saved successfully!");
            reset();
            setActiveIndex(0);
        } catch (error) {
            console.log("❌ Error is =>", error);
            alert("Something went wrong while saving questions!");
        }
    };

    const slideVariants = {
        initial: { x: 300, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -300, opacity: 0 }
    };

    useEffect(() => {
        getOptions();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10 sm:p-10">
            <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-2xl border border-white/10">
                <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-400">
                    🧪 Add Questions
                </h2>

                <div className="mb-6 p-4 rounded-xl bg-white/10 text-white">
                    <p className="text-lg font-semibold">
                        <span className="text-blue-400">Test Name:</span> {testName || "N/A"}
                    </p>
                    <p className="text-lg font-semibold">
                        <span className="text-pink-400">Total Questions:</span> {questionCount}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={fields[activeIndex]?.id}
                            variants={slideVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                            className="space-y-4"
                        >
                            <h4 className="text-xl font-semibold text-blue-400">
                                Question {activeIndex + 1} of {questionCount}
                            </h4>

                            <input
                                {...register(`questions.${activeIndex}.question`, { required: true })}
                                placeholder="Enter question"
                                className="w-full p-3 rounded-xl border border-white/10 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {options.map((label, i) => (
                                    <div key={label} className="flex items-center gap-2">
                                        <span className="text-white font-semibold">{label}.</span>
                                        <input
                                            {...register(`questions.${activeIndex}.options.${i}`, { required: true })}
                                            className="flex-1 p-3 rounded-xl border border-white/10 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                                            placeholder={`Option ${label}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            <select
                                {...register(`questions.${activeIndex}.correctAnswer`, { required: true })}
                                className="w-full p-3 rounded-xl border border-white/10 bg-gray-800 text-white focus:outline-none"
                            >
                                <option value="">Select Correct Answer</option>
                                {options.map((label, i) => {
                                    const val = watch(`questions.${activeIndex}.options.${i}`);
                                    return (
                                        <option key={label} value={label}>
                                            {label} — {val || "Not filled"}
                                        </option>
                                    );
                                })}
                            </select>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            disabled={activeIndex === 0}
                            onClick={goToPrev}
                            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition"
                        >
                            ⬅ Prev
                        </button>

                        <button
                            type="button"
                            disabled={activeIndex === fields.length - 1}
                            onClick={goToNext}
                            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 transition"
                        >
                            Next ➡
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white"
                        >
                            ✅ Save All
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TestQuestions;
