import { useEffect, useState } from "react";
import axios from "axios";
import {
    Crown,
    Medal,
    User2,
    Mail,
    Trophy,
    Users,
    FileText
} from "lucide-react";

const Leaderboard = () => {
    const [selectedTitle, setselectedTitle] = useState("");
    const [testDatas, settestDatas] = useState([]);
    const [selectedSubject, setselectedSubject] = useState("");
    const [studentTestData, setstudentTestData] = useState([]);
    const [studentInformation, setstudentInformation] = useState([]);
    const [selectStandard, setselectStandard] = useState([])

    const API =
        window.location.hostname === "localhost"
            ? "http://localhost:3000/test"
            : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/test";

    const TestDataFromBackend = async () => {
        try {
            const res = await axios.get(`${API}/mockTest/getPastorTodayTestsScore`);
            settestDatas(res.data.date || []);
        } catch (error) {
            console.log("Error is => ", error);
        }
    };

    const TestWiseStudentScore = async () => {
        const res = await axios.get(`${API}/mockTest/getPastorTodayTestsScore`);
        setstudentTestData(res.data.testCompletedStudents || []);
        setstudentInformation(res.data.students || []);
    };

    useEffect(() => {
        TestDataFromBackend();
        TestWiseStudentScore();
    }, []);

    console.log(testDatas.map(t => t.title));

    return (
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <div className="bg-gradient-to-r from-white to-blue-50 p-6 rounded-2xl shadow-xl border border-gray-100 mb-10">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8 tracking-wide flex items-center justify-center gap-2">
                    <Crown className="w-7 h-7 text-yellow-500" />
                    Leaderboard
                </h2>

                <div className="flex flex-col md:flex-row md:items-center md:gap-6 mb-6">
                    {/* Subject Dropdown */}
                    <div className="w-full md:w-1/2">
                        <label className="block mb-1 text-sm font-medium text-gray-700">🎯 Subject</label>
                        <select
                            value={selectedSubject}
                            onChange={(e) => setselectedSubject(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Select Subject --</option>
                            {[...new Set(testDatas.map((t) => t.subject))].map((sub, i) => (
                                <option key={i} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>

                    {/* Title Dropdown */}
                    <div className="w-full md:w-1/2 mt-4 md:mt-0">
                        <label className="block mb-1 text-sm font-medium text-gray-700">📘 Test Title</label>
                        <select
                            value={selectedTitle}
                            onChange={(e) => setselectedTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">-- Select Test Title --</option>
                            {/* {testDatas
                                .filter((t) => t.subject === selectedSubject)
                                .map((t, i) => (
                                    <option key={i} value={t._id}>
                                        {t.title} ({new Date(t.date).toISOString().split("T")[0]})
                                    </option>
                                ))} */}
                            {testDatas
                                .filter((t) => t.subject === selectedSubject)
                                .map((t, i) => {
                                    console.log("One t:", t);
                                    return (
                                        <option key={i} value={t._id}>
                                            {t.title} ({new Date(t.date).toISOString().split("T")[0]})
                                        </option>
                                    );
                                })
                            }

                        </select>
                    </div>
                    {/* <div className="w-full md:w-1/2 mt-4 md:mt-0">
                        <label className="block mb-1 text-sm font-medium text-gray-700">📘 Test Title</label>
                        <select
                            value={selectStandard}
                            onChange={(e) => setselectStandard(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">-- Select Standard --</option>
                            {testDatas
                                .filter((t) => t.standard === setselectStandard)
                                .map((t, i) => (
                                    <option key={i} value={t._id}>
                                        {t.standard}
                                    </option>
                                ))}
                        </select>
                    </div> */}
                </div>

            </div>

            {/* Leaderboard Card */}
            {
                testDatas.filter((t) => t._id === selectedTitle).map((t, i) => {
                    const hasMatch = studentTestData
                        .filter((st) => st.testId === t._id)
                        .sort((a, b) => b.score - a.score);

                    return (
                        <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-blue-100 mb-10">
                            <div className="mb-6 flex justify-between items-center">
                                <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
                                    <FileText size={18} /> {t.title}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Total Marks: <span className="font-bold">{t.totalMarks}</span>
                                </p>
                            </div>

                            {hasMatch.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">No submissions yet.</p>
                            ) : (
                                hasMatch.map((stu, j) => {
                                    const student = studentInformation.find(
                                        (s) => s.email === stu.email
                                    );
                                    const rank = j + 1;

                                    let rankIcon = null;
                                    if (rank === 1)
                                        rankIcon = <Trophy className="text-yellow-500" />;
                                    else if (rank === 2)
                                        rankIcon = <Medal className="text-gray-400" />;
                                    else if (rank === 3)
                                        rankIcon = <Medal className="text-orange-400" />;

                                    return (
                                        <div
                                            key={j}
                                            className="bg-gradient-to-r from-white to-sky-50 p-5 rounded-lg mb-4 border-l-4 border-blue-400 hover:shadow-lg transition"
                                        >
                                            <div className="flex justify-between items-center">

                                                <div className="flex items-start gap-4">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-xl font-bold text-blue-700">
                                                            #{rank}
                                                        </span>
                                                        {rankIcon}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800 flex items-center gap-2">
                                                            <User2 size={16} />
                                                            {student?.studentId || "Unknown"}
                                                        </p>
                                                        <p className="text-sm text-gray-600 flex items-center gap-2">
                                                            <Mail size={14} />
                                                            {stu.email}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            👤 Name: {student?.fullName || "N/A"}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            👤 Standard: {student?.grade}-{student?.group || "N/A"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-green-600 font-bold text-xl">
                                                        {stu.score}/{t.totalMarks}
                                                    </p>
                                                    <p className="text-xs text-gray-500">Score</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Leaderboard;
