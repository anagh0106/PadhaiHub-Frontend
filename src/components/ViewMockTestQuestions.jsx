import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

// 🔧 Helper: Convert "A" -> 0, "B" -> 1 ...
const optionLetterToIndex = (letter) => {
    return letter?.toUpperCase().charCodeAt(0) - 65;
};

const ViewMockTestQuestions = () => {
    const location = useLocation();
    const { testId } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const API = window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const fetchQuestions = async () => {
        try {
            const res = await axios.get(`${API}/questionTest/admin/mockQuestion/getTestQuestions/${testId}`);
            setQuestions(res.data.questions);
        } catch (err) {
            console.error("❌ Error fetching questions:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (testId) fetchQuestions();
    }, [testId]);

    return (
        <div className="min-h-screen bg-black text-white px-4 py-10 sm:p-12">
            <button className="flex items-center gap-2 px-4 pb-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                onClick={() => navigate("/admin/tests")}
            >Back</button>
            <div className="max-w-5xl mx-auto space-y-8">
                <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
                    📋 All Questions for Test ID: {testId}
                </h2>

                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : questions.length === 0 ? (
                    <p className="text-center text-red-400">No questions found for this test.</p>
                ) : (
                    questions.map((q, i) => (
                        <motion.div
                            key={q._id || i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-gray-900 border border-white/10 p-5 rounded-xl shadow-md space-y-3"
                        >
                            <h3 className="text-lg font-semibold text-blue-400">
                                {i + 1}. {q.questions || q.question}
                            </h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-white">
                                {q.options?.map((opt, idx) => {
                                    const isCorrect = idx === optionLetterToIndex(q.correctAnswer);
                                    return (
                                        <li
                                            key={idx}
                                            className={`p-2 rounded-lg border ${isCorrect
                                                ? 'border-green-500 bg-green-800/20'
                                                : 'border-white/10 bg-white/5'
                                                }`}
                                        >
                                            <span className="font-semibold text-pink-400">
                                                {String.fromCharCode(65 + idx)}.
                                            </span>{" "}
                                            {opt}
                                        </li>
                                    );
                                })}
                            </ul>
                            <p className="text-sm text-green-400">
                                ✅ Correct Answer: <strong>{q.correctAnswer}</strong>
                            </p>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewMockTestQuestions;
