import React, { useContext } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import ThemeContext from "../context/ThemeContext";

const sampleData = [
    { subject: "Physics", score: 78 },
    { subject: "Chemistry", score: 85 },
    { subject: "Maths", score: 92 },
    { subject: "Biology", score: 66 },
    { subject: "English", score: 88 },
];

const PerformanceAnalytics = () => {
    const { theme } = useContext(ThemeContext);

    const colors = {
        container: theme === "light" ? "bg-white text-gray-800" : "bg-zinc-900 text-white",
        card: theme === "light" ? "bg-gray-100 border border-gray-300" : "bg-zinc-800 border border-white/10",
        heading: theme === "light" ? "text-blue-600" : "text-blue-400",
        axis: theme === "light" ? "#333" : "#ccc",
        bar: theme === "light" ? "#3b82f6" : "#60a5fa",
    };

    return (
        <div className={`rounded-2xl p-6 max-w-4xl mx-auto shadow-xl mt-12 ${colors.container}`}>
            <h2 className={`text-3xl font-bold mb-6 ${colors.heading}`}>
                📊 Subject-wise Performance
            </h2>
            <div className={`rounded-xl p-4 ${colors.card}`}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={sampleData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === "light" ? "#ccc" : "#444"} />
                        <XAxis dataKey="subject" stroke={colors.axis} />
                        <YAxis stroke={colors.axis} domain={[0, 100]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: theme === "light" ? "#f9fafb" : "#1f2937", borderRadius: "8px", border: "none" }}
                            labelStyle={{ color: colors.axis }}
                            cursor={{ fill: theme === "light" ? "#f3f4f6" : "#374151" }}
                        />
                        <Bar dataKey="score" fill={colors.bar} radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceAnalytics;
