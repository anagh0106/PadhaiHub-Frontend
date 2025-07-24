import { FaBullseye, FaHeart, FaChartLine, FaUsers } from "react-icons/fa";

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

export default function CoreValues() {
    return (
        <section className="bg-[#0f172a] text-white py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                <p className="text-gray-400 max-w-2xl mx-auto mb-16">
                    These fundamental principles guide everything we do at PadhaiHub
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {values.map((val, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                            <div className="bg-blue-100 text-blue-700 rounded-xl p-3">
                                {val.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">{val.title}</h3>
                                <p className="text-gray-300 text-sm">{val.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
