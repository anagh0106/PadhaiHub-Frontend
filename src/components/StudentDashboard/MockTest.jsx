import React, { useState } from "react";
import FetchMockTest from "./FetchMockTest";

const MockTest = () => {
    const { questions, loading } = FetchMockTest();
    const [answers, setAnswers] = useState({});

    const handleSelect = (qIndex, option) => {
        setAnswers({ ...answers, [qIndex]: option });
    };

    if (loading) return <p>Loading questions...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6 bg-black text-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold">📝 Mock Test</h2>
            {questions.map((q, i) => (
                <div key={i} className="bg-zinc-900 p-4 rounded-lg">
                    <p className="font-semibold mb-2">{i + 1}. {decodeURIComponent(q.question)}</p>
                    {[...q.incorrect_answers, q.correct_answer]
                        .sort(() => 0.5 - Math.random())
                        .map((opt, idx) => (
                            <div key={idx} className="mb-1">
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name={`q-${i}`}
                                        value={opt}
                                        checked={answers[i] === opt}
                                        onChange={() => handleSelect(i, opt)}
                                        className="mr-2"
                                    />
                                    {decodeURIComponent(opt)}
                                </label>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
};

export default MockTest;
