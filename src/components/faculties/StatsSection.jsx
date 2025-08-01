import { useContext } from "react";
import { FaUserFriends, FaCalendarAlt, FaGraduationCap, FaMedal } from "react-icons/fa";
import ThemeContext from "../context/ThemeContext";

const StatsSection = () => {
    const { theme } = useContext(ThemeContext);

    const stats = [
        {
            icon: <FaUserFriends className="text-4xl text-blue-600" />,
            value: "20+",
            label: "Expert Faculty",
        },
        {
            icon: <FaCalendarAlt className="text-4xl text-blue-600" />,
            value: "200+ Years",
            label: "Combined Experience",
        },
        {
            icon: <FaGraduationCap className="text-4xl text-blue-600" />,
            value: "10,000+",
            label: "Students Taught",
        },
        {
            icon: <FaMedal className="text-4xl text-blue-600" />,
            value: "95%",
            label: "Success Rate",
        },
    ];

    const colors = {
        sectionBg: theme === "light" ? "bg-white" : "bg-black",
        cardBg: theme === "light" ? "bg-gray-100" : "bg-gray-900",
        iconBg: theme === "light" ? "bg-blue-100" : "bg-gray-800",
        mainText: theme === "light" ? "text-blue-600" : "text-blue-400",
        labelText: theme === "light" ? "text-gray-600" : "text-gray-300",
        shadow: theme === "light" ? "shadow-md" : "shadow-lg",
    };

    return (
        <div className={`${colors.sectionBg} py-12 px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`${colors.cardBg} ${colors.shadow} rounded-lg p-6 text-center transition-all duration-300`}
                    >
                        <div className={`flex justify-center items-center ${colors.iconBg} rounded-full w-16 h-16 mx-auto mb-4`}>
                            {stat.icon}
                        </div>
                        <h3 className={`text-2xl font-bold ${colors.mainText}`}>{stat.value}</h3>
                        <p className={`mt-1 ${colors.labelText}`}>{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsSection;
