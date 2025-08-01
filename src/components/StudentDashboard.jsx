import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import Joinclassbutton from './Joinclassbutton';
import StudentForm from './StudentFrom';
import axios from 'axios';
import WelcomeCard from './StudentDashboard/WelcomeCard';
import ClassSchedule from './StudentDashboard/ClassSchedule';
import Todolist from './StudentDashboard/Todolist';
import ThemeContext from './context/ThemeContext';
import PerformanceAnalytics from './StudentDashboard/PerformanceAnalytics';
import StudentTestManagement from './StudentDashboard/StudentTestManagement';
import MockTestScore from './StudentDashboard/MockTestScore';
import { Bell, FileText } from 'lucide-react';
import StudyTimer from './StudentDashboard/StudyTimer';

const StudentDashboard = () => {
    const { theme } = useContext(ThemeContext);
    const [isFormsubmitted, setisFormsubmitted] = useState(false);
    const host = window.location.hostname;
    const API = host === "localhost"
        ? "http://localhost:3000/user"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/user";
    useEffect(() => {
        const checkInfo = async () => {
            try {
                const stuid = localStorage.getItem("studentId");
                const response = await axios.get(`${API}/student-id-exists`, {
                    params: { studentId: stuid },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
                if (response.data.exists) {
                    setisFormsubmitted(true);
                }
            } catch (err) {
                console.error("Check student info failed", err);
            }
        };
        checkInfo();
    }, []);

    const dashboardItems = [
        { title: 'My Courses', description: 'View all your enrolled subjects and progress.' },
        { title: 'Assignments', description: 'Submit and check upcoming assignment deadlines.' },
        { title: 'Live Classes', description: 'Join ongoing or scheduled classes easily.' },
        { title: 'Notes & Resources', description: 'Download PDFs, videos, and other resources.' },
        { title: 'Test Results', description: 'Track your performance and test scores.' },
        { title: 'Fee Status', description: 'Check payment history and pending fees.' },
    ];

    const upcomingEvents = [
        { date: 'May 25', event: 'Live Class - Physics' },
        { date: 'May 28', event: 'Assignment Due - Math' },
        { date: 'June 2', event: 'Unit Test - Chemistry' },
    ];

    const quickActions = ['Join Class', 'Upload Assignment', 'Download Notes'];

    const colors = {
        background: theme === 'light' ? 'bg-white text-black' : 'bg-black text-white',
        card: theme === 'light' ? 'bg-white/80 text-black' : 'bg-[#111111] text-white',
        border: theme === 'light' ? 'border border-gray-300' : 'border border-[#222] shadow-[0_0_15px_rgba(255,255,255,0.05)]',
        heading: theme === 'light' ? 'text-indigo-600' : 'text-indigo-400',
        subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
        button: theme === 'light' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700',
        event: theme === 'light' ? 'border border-slate-200 bg-gray-100' : 'border border-slate-700 bg-[#121212] hover:scale-[1.02] transition-all',
        actionBtn: theme === 'light' ? 'bg-white text-yellow-500 border border-slate-300 hover:bg-gray-100' : 'bg-[#1f1f1f] text-yellow-400 hover:bg-[#333] border border-slate-700'
    };

    return (
        <div className={`min-h-screen p-4 md:p-6 transition-colors duration-500 ${colors.background}`}>
            <StudentForm />
            <WelcomeCard />
            <StudyTimer />

            <ClassSchedule />

            <PerformanceAnalytics />
            {/* <MockTest /> */}
            <StudentTestManagement />
            <MockTestScore />
            <br /><br />
            <Todolist />

            <div className="flex justify-between items-center mb-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg`}
                >
                    👨‍🎓 Student Dashboard
                </motion.h1>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
                <Joinclassbutton />
                {quickActions
                    .filter(action => action !== "Join Class")
                    .map((action, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            key={i}
                        >
                            <Button
                                onClick={() => console.log(`Clicked: ${action}`)}
                                className={`rounded-xl px-4 py-2 font-medium ${colors.button}`}
                            >
                                {action}
                            </Button>
                        </motion.div>
                    ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {dashboardItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className={`rounded-2xl hover:shadow-xl transition duration-300 hover:scale-[1.02] ${colors.card} ${colors.border}`}>
                            <CardContent className="p-6">
                                <h2 className={`text-lg font-bold mb-2 ${colors.heading}`}>{item.title}</h2>
                                <p className={`text-sm ${colors.subtext}`}>{item.description}</p>

                                {item.title === 'My Courses' && (
                                    <div className="mt-4">
                                        <div className="text-xs mb-1 text-slate-400">Overall Progress</div>
                                        <div className="w-full h-2 bg-slate-700 rounded-full">
                                            <motion.div
                                                className="h-2 bg-indigo-500 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: '70%' }}
                                                transition={{ duration: 1 }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="mt-10">
                <h2 className={`text-xl md:text-2xl font-bold mb-4 ${colors.heading}`}>📅 Upcoming Events</h2>
                <ul className="space-y-3">
                    {upcomingEvents.map((e, i) => (
                        <motion.li
                            key={i}
                            className={`p-4 rounded-xl border text-sm shadow-md ${colors.event}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                        >
                            <span className={`font-semibold ${colors.heading}`}>{e.date}</span> – {e.event}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudentDashboard;
