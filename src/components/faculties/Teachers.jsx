import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { FaUserTie, FaUserFriends, FaCheckCircle, FaCalendarCheck } from "react-icons/fa";
import FacultyInformation from "./FacultyInformation";
import StatsSection from "./StatsSection";

const Teachers = () => {
    const { theme } = useContext(ThemeContext);

    const colors = {
        background: theme === 'light' ? 'bg-[#EEF4FF]' : 'bg-[#0f172a]',
        card: theme === 'light' ? 'bg-gray-100' : 'bg-[rgba(15,15,15,0.5)]',
        border: theme === 'light' ? 'border-gray-300' : 'border-[rgba(255,255,255,0.1)]',
        text: theme === 'light' ? 'text-black' : 'text-white',
        subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
        shadow: 'shadow-lg',
        glass: 'backdrop-blur-lg',
        overlay: theme === 'light' ? 'bg-white/50' : 'bg-black/60',
        tagBg: theme === 'light' ? 'bg-blue-100' : 'bg-blue-900',
        tagText: theme === 'light' ? 'text-blue-800' : 'text-blue-200',
        heading: theme === 'light' ? 'text-gray-900' : 'text-white',
        paragraph: theme === 'light' ? 'text-gray-700' : 'text-gray-300',
        cardBg: theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/30',
        cardTitle: theme === 'light' ? 'text-gray-900' : 'text-white',
        cardSub: theme === 'light' ? 'text-gray-800' : 'text-gray-100',
        cardText: theme === 'light' ? 'text-gray-600' : 'text-gray-300'
    };

    return (
        <>
            {/* Top Section */}
            <section className={`${colors.background} ${colors.text} py-16 px-4 text-center`}>
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block mb-4">
                        <span className={`${colors.tagBg} text-sm px-4 py-1 rounded-full ${colors.tagText} shadow-sm`}>
                            Our Teachers
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
                        Meet Our Expert <span className="text-blue-500">Teachers</span>
                    </h1>

                    <p className={`text-lg ${colors.subtext}`}>
                        Learn from the best educators who are passionate about teaching and committed to your academic success.
                        Our faculty brings years of experience and proven results.
                    </p>
                </div>
            </section>
            <StatsSection />
            <FacultyInformation />

            {/* Teaching Philosophy Section */}
            <div className={`${colors.background} py-16 px-6 md:px-20 lg:px-36`}>
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Left Content */}
                    <div className="flex-1">
                        <h2 className={`text-3xl font-bold mb-4 ${colors.heading}`}>
                            Our Teaching Philosophy
                        </h2>
                        <p className={`mb-4 ${colors.paragraph}`}>
                            At PadhaiHub, we believe that every student has the potential to excel. Our teachers are not just educators but mentors who guide students through their academic journey with patience, expertise, and dedication.
                        </p>
                        <p className={`mb-4 ${colors.paragraph}`}>
                            We follow a student-centric approach where each teacher adapts their methodology to suit different learning styles. Our small batch sizes ensure personalized attention for every student.
                        </p>
                        <p className={colors.paragraph}>
                            Our faculty undergoes continuous training to stay updated with the latest examination patterns, teaching techniques, and educational technology.
                        </p>
                    </div>

                    {/* Right Box */}
                    <div className={`flex-1 ${colors.cardBg} rounded-xl p-6 ${colors.shadow}`}>
                        <h3 className={`text-xl font-semibold mb-6 ${colors.cardTitle}`}>
                            What Makes Our Teachers Special
                        </h3>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4">
                                <FaUserTie className="text-blue-600 text-xl mt-1" />
                                <div>
                                    <h4 className={`font-semibold ${colors.cardSub}`}>Subject Matter Experts</h4>
                                    <p className={`text-sm ${colors.cardText}`}>Deep knowledge and passion for their subjects</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <FaUserFriends className="text-blue-600 text-xl mt-1" />
                                <div>
                                    <h4 className={`font-semibold ${colors.cardSub}`}>Student-Friendly Approach</h4>
                                    <p className={`text-sm ${colors.cardText}`}>Approachable and understanding of student needs</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <FaCheckCircle className="text-blue-600 text-xl mt-1" />
                                <div>
                                    <h4 className={`font-semibold ${colors.cardSub}`}>Proven Track Record</h4>
                                    <p className={`text-sm ${colors.cardText}`}>Consistent results and student success stories</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <FaCalendarCheck className="text-blue-600 text-xl mt-1" />
                                <div>
                                    <h4 className={`font-semibold ${colors.cardSub}`}>Always Available</h4>
                                    <p className={`text-sm ${colors.cardText}`}>Regular doubt sessions and guidance</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Teachers;
