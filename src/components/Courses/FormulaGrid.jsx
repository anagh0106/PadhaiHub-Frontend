import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import ThemeContext from "../../components/context/ThemeContext";

const FormulaGrid = () => {
    const [groupSubject, setgroupSubject] = useState({});
    const { theme } = useContext(ThemeContext);

    const colors = {
        background: theme === "light" ? "bg-white text-black" : "bg-black text-white",
        card: theme === "light" ? "bg-white" : "bg-[#111827]/60",
        border: theme === "light" ? "border-gray-200" : "border-white/10",
        heading: theme === "light" ? "text-black" : "text-white",
        subtext: theme === "light" ? "text-gray-600" : "text-white/80",
        divider: theme === "light" ? "divide-gray-300" : "divide-white/10",
    };

    const API =
        window.location.hostname === "localhost"
            ? "http://localhost:3000/formula"
            : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/formula";


    const getAllFormulas = async () => {
        try {
            const res = await axios.get(`${API}/GetAllFormula`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const formulas = res.data.data;

            // Group by subject
            const grouped = {};
            formulas.forEach((f) => {
                if (!grouped[f.subject]) grouped[f.subject] = [];
                grouped[f.subject].push({ title: f.title, formula: f.formula });
            });

            setgroupSubject(grouped);
        } catch (error) {
            console.log("Error is => ", error);
        }
    };

    useEffect(() => {
        getAllFormulas();

        const interval = setInterval(() => {
            getAllFormulas();
        }, 2 * 60 * 1000); // every 2 min

        return () => clearInterval(interval);
    }, []);

    const orderedSubjects = ["Maths", "Physics", "Chemistry"];

    return (
        <>
            <div className={`px-4 py-10 min-h-screen transition-colors duration-500 ${colors.background}`}>
                <motion.h1
                    className={`text-4xl font-bold text-center mb-10 tracking-widest uppercase ${colors.heading}`}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Formulas
                </motion.h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {orderedSubjects.map((subject, idx) => {
                        const formulas = groupSubject[subject] || [];

                        if (formulas.length < 1) return null;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.2 }}
                                className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border ${colors.border} ${colors.card}`}
                            >
                                <motion.h2
                                    className={`text-2xl font-bold text-center mb-6 tracking-wide uppercase ${colors.heading}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                >
                                    {subject}
                                </motion.h2>

                                <ul className={`divide-y ${colors.divider}`}>
                                    {formulas.slice(0, 5).map((f, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="py-3"
                                        >
                                            <div className="text-lg font-semibold">
                                                {f.title}
                                            </div>
                                            <div className={`text-sm mt-1 ${colors.subtext}`}>
                                                {f.formula}
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div >

        </>

    );
};

export default FormulaGrid;
