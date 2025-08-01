import { FaUserFriends, FaCalendarAlt, FaGraduationCap, FaMedal } from "react-icons/fa";

const StatsSection = () => {
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

    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6 text-center"
                    >
                        <div className="flex justify-center items-center bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4">
                            {stat.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-blue-600">{stat.value}</h3>
                        <p className="text-gray-600 mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsSection;
