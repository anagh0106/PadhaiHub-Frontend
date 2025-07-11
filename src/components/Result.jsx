import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added
import "../assets/css/Result.css";
// import VantaBackground from "./Background";

const Result = () => {
    const navigate = useNavigate(); // ✅ Hook to handle navigation

    const students = [
        {
            name: "Riya Sharma",
            rollNo: "23BCS102",
            class: "10th Grade",
            marks: [
                { name: "Math", score: 85 },
                { name: "Science", score: 78 },
                { name: "English", score: 92 },
                { name: "History", score: 74 },
                { name: "Computer", score: 88 },
            ],
        },
        {
            name: "Aman Verma",
            rollNo: "23BCS103",
            class: "10th Grade",
            marks: [
                { name: "Math", score: 55 },
                { name: "Science", score: 65 },
                { name: "English", score: 70 },
                { name: "History", score: 60 },
                { name: "Computer", score: 50 },
            ],
        },
        {
            name: "Pooja Mehta",
            rollNo: "23BCS104",
            class: "10th Grade",
            marks: [
                { name: "Math", score: 95 },
                { name: "Science", score: 99 },
                { name: "English", score: 93 },
                { name: "History", score: 90 },
                { name: "Computer", score: 98 },
            ],
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const student = students[currentIndex];

    const totalMarks = student.marks.reduce((sum, subject) => sum + subject.score, 0);
    const maxMarks = student.marks.length * 100;
    const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);
    const isPassed = student.marks.every((m) => m.score >= 33);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % students.length);
    };

    return (
        <>
            <VantaBackground />
            <div className="result-container">
                <div className="result-card">
                    <div className="result-header">
                        <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
                        <h1 className="result-title">Student Result</h1>
                    </div>

                    <div className="student-info">
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Roll No:</strong> {student.rollNo}</p>
                        <p><strong>Class:</strong> {student.class}</p>
                    </div>

                    <table className="marks-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Marks (out of 100)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.marks.map((subject, index) => (
                                <tr key={index}>
                                    <td>{subject.name}</td>
                                    <td>{subject.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="summary">
                        <p><strong>Total:</strong> {totalMarks} / {maxMarks}</p>
                        <p><strong>Percentage:</strong> {percentage}%</p>
                    </div>

                    <div className={`status ${isPassed ? "pass" : "fail"}`}>
                        {isPassed ? "PASS" : "FAIL"}
                    </div>

                    <button className="next-button" onClick={handleNext}>Next Student</button>
                </div>
            </div>
        </>
    );
};

export default Result;