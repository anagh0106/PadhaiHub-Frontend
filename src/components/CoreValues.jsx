import { useContext } from "react";
import { FaBullseye, FaHeart, FaChartLine, FaUsers } from "react-icons/fa";
import ThemeContext from "./context/ThemeContext"; // update path as needed

export default function CoreValues() {
    const { theme } = useContext(ThemeContext);

    const colors = {
        background: theme === "light" ? "bg-[#EEF4FF]" : "bg-[#0f172a]",
        card: theme === "light" ? "bg-gray-100" : "bg-[rgba(15,15,15,0.5)]",
        border: theme === "light" ? "border-gray-300" : "border-[rgba(255,255,255,0.1)]",
        text: theme === "light" ? "text-black" : "text-white",
        subtext: theme === "light" ? "text-gray-600" : "text-gray-300",
        shadow: "shadow-lg",
        glass: "backdrop-blur-lg",
        overlay: theme === "light" ? "bg-white/50" : "bg-black/60",
    };

    const values = [
        {
            icon: <FaBullseye className="text-2xl text-blue-600" />,
            title: "Excellence in Education",
            desc: "We strive to provide the highest quality education with innovative teaching methods and personalized attention to each student.",
        },
        {
            icon: <FaHeart className="text-2xl text-blue-600" />,
            title: "Student-Centric Approach",
            desc: "Every decision we make is focused on student success, ensuring their academic and personal growth in a supportive environment.",
        },
        {
            icon: <FaChartLine className="text-2xl text-blue-600" />,
            title: "Continuous Improvement",
            desc: "We constantly evolve our teaching methods and curriculum to stay ahead of educational trends and exam patterns.",
        },
        {
            icon: <FaUsers className="text-2xl text-blue-600" />,
            title: "Community Building",
            desc: "We foster a learning community where students, teachers, and parents work together towards common academic goals.",
        },
    ];

    return (
        <section className={`w-full ${colors.background} py-20 px-6`}>
            <div className="max-w-screen-2xl mx-auto text-center">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${colors.text}`}>
                    Our Core Values
                </h2>
                <p className={`max-w-3xl mx-auto mb-16 ${colors.subtext}`}>
                    These fundamental principles guide everything we do at PadhaiHub
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {values.map((val, idx) => (
                        <div
                            key={idx}
                            className={`flex items-start gap-5 rounded-xl p-5 ${colors.card} ${colors.border} border ${colors.shadow}`}
                        >
                            <div className="bg-blue-100 text-blue-700 rounded-xl p-3 shrink-0">
                                {val.icon}
                            </div>
                            <div>
                                <h3 className={`text-lg font-semibold mb-1 ${colors.text}`}>
                                    {val.title}
                                </h3>
                                <p className={`text-sm ${colors.subtext}`}>{val.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
