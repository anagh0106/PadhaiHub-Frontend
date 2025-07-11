import React, { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import axios from "axios";

const MockTestScore = () => {
    const [studentTestID, setstudentTestID] = useState([]);
    const [submissionData, setSubmissionData] = useState([]);
    const [loading, setLoading] = useState(true);

    const host = window.location.hostname;
    const API = host === "localhost"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const getMockTestScores = async () => {
        try {
            const allScores = [];

            for (const id of studentTestID) {
                const res = await axios.post(
                    `${API}/test/mockTest/calculateScore`,
                    { submissionId: id },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                allScores.push(res.data);
            }

            setSubmissionData(allScores);
            setLoading(false);
        } catch (error) {
            console.error("❌ Score Fetch Error:", error.response?.data || error.message);
            setLoading(false);
        }
    };

    const fetchSubmittedTests = async () => {
        try {
            const res = await axios.get(`${API}/test/mockTest/completedTest`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const ids = res.data.submittedTests.map((a) => a._id);
            setstudentTestID(ids);
        } catch (error) {
            console.error("❌ Submitted Test Fetch Error:", error);
        }
    };

    useEffect(() => {
        fetchSubmittedTests();
    }, []);

    useEffect(() => {
        if (studentTestID.length > 0) {
            getMockTestScores();
        }
    }, [studentTestID]);

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="max-w-4xl mx-auto py-6">
                <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
                    🧠 Your Mock Test Scores
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center mt-10">
                        <Loader2 className="animate-spin w-6 h-6 text-white" />
                        <span className="ml-2">Calculating your scores...</span>
                    </div>
                ) : (
                    submissionData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-zinc-900 rounded-xl p-5 mb-6 shadow-lg border border-zinc-700"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue-400">{item.testDetails.title}</h2>
                                    <p className="text-sm text-zinc-400">
                                        Subject: {item.testDetails.subject} | Chapter: {item.testDetails.chapter || 'N/A'}
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                        Total Marks: {item.testDetails.totalMarks}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-green-400 text-lg font-bold">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>{item.score} / {item.testDetails.totalMarks}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MockTestScore;
