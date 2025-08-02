import { useState, useEffect, useContext } from 'react';
import StudentForm from './StudentFrom';
import axios from 'axios';
import WelcomeCard from './StudentDashboard/WelcomeCard';
import ClassSchedule from './StudentDashboard/ClassSchedule';
import Todolist from './StudentDashboard/Todolist';
import ThemeContext from './context/ThemeContext';
import PerformanceAnalytics from './StudentDashboard/PerformanceAnalytics';
import StudentTestManagement from './StudentDashboard/StudentTestManagement';
import MockTestScore from './StudentDashboard/MockTestScore';
import StudyTimer from './StudentDashboard/StudyTimer';
import StudentStats from './StudentDashboard/StudentStats';
import TodayClasses from './StudentDashboard/TodayClass';

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
            <StudentStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
                <div className="lg:col-span-2 flex flex-col">
                    <div className="bg-[#0f172a] rounded-lg p-4 flex-1">
                        <TodayClasses />
                    </div>
                </div>

                <div className="lg:col-span-1 flex flex-col">
                    <div className="bg-[#0f172a] rounded-lg p-4 flex-1">
                        <StudyTimer />
                    </div>
                </div>
            </div>

            <ClassSchedule />

            <PerformanceAnalytics />
            {/* <MockTest /> */}
            <StudentTestManagement />
            <MockTestScore />
            <br /><br />
            <Todolist />
        </div>
    );
};

export default StudentDashboard;
