import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import ThemeContext from "./context/ThemeContext";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdAccessTime, MdDateRange } from "react-icons/md";
import { FaBookOpen, FaClock } from "react-icons/fa";

const TestManagement = () => {
    const { theme } = useContext(ThemeContext);
    const [standard, setStandard] = useState([]);
    const [group, setGroup] = useState([]);
    const [testData, settestData] = useState([])
    const [isGroupSelected, setisGroupSelected] = useState("")
    const [getTestId, setgetTestId] = useState([])
    const navigate = useNavigate();
    const [isTestCreated, setIsTestCreated] = useState(false);
    const [PCM, setPCM] = useState([]);
    const [PCB, setPCB] = useState([]);

    const API =
        window.location.hostname === "localhost"
            ? "http://localhost:3000"
            : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const colors = {
        background: theme === "light" ? "bg-white" : "bg-black",
        text: theme === "light" ? "text-black" : "text-white",
        card: theme === "light" ? "bg-white-100" : "bg-black",
        hover: theme === "light" ? "hover:bg-gray-200" : "hover:bg-white/10",
        border: theme === "light" ? "border-gray-200" : "border-white/10",
        formField: theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
    };
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: "",
            standard: "",
            subject: "",
            group: "",
            chapter: "",
            date: "",
            startTime: "",
            duration: ""
        }
    });
    const getSubject = async () => {
        try {
            const res = await axios.get(`${API}/mocktest/admin/getSubjects`);
            const pcm = res.data.filter(s => s !== "Biology")
            const pcb = res.data.filter(s => s !== "Mathematics")
            setPCB(pcb)
            setPCM(pcm)
        } catch (error) {
            console.log("Error fetching subjects:", error);
        }
    };
    const getStandard = async () => {
        try {
            const res = await axios.get(`${API}/mocktest/admin/getStandard`);
            setStandard(res.data);
        } catch (error) {
            console.log("Error fetching standards:", error);
        }
    };
    const getGroup = async () => {
        try {
            const res = await axios.get(`${API}/mocktest/admin/getGroup`);
            setGroup(res.data);
        } catch (error) {
            console.log("Error fetching groups:", error);
        }
    };
    const getMockTest = async () => {
        try {
            const res = await axios.get(`${API}/mocktest/admin/getMockTest`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const test = res.data.mocktest
            settestData(test)
        } catch (error) {
            console.log("Error fetching mock tests:", error);
        }
    };
    const getAllTestIds = async () => {
        try {
            const res = await axios.get(`${API}/questionTest/admin/mockQuestion/getAllTestIds`)
            const id = res.data.testIds
            setgetTestId(id)

        } catch (error) {
            console.log("Error is =>", error);

        }
    }
    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${API}/mocktest/admin/creatMockTest`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log("Mock Test Created!", res.data);
            reset();
            setIsTestCreated(false)
            getMockTest();
        } catch (err) {
            console.error("Error creating mock test:", err);
        }
    };
    const handleDeleteMockTest = async (id) => {
        try {
            console.log(id);
            await axios.delete(`${API}/mocktest/admin/deleteMockTest/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            getMockTest();
        } catch (error) {
            console.log("Error is => ", error);

        }
    }
    useEffect(() => {
        getSubject();
        getStandard();
        getGroup();
        getMockTest();
        getAllTestIds();
    }, []);

    return (
        <div className={`px-4 sm:px-10 py-6 ${colors.background} ${colors.text}`}>
            <button className="flex items-center gap-2 px-4 pb-2 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                onClick={() => navigate("/admin/dashboard")}
            >Back</button>
            <br />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-pink-500">
                    🧪 Test Dashboard
                </h1>
                <button
                    onClick={() => setIsTestCreated(true)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:scale-105 transition"
                >
                    ➕ Create Test
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8">
                {testData.map((test, i) => (
                    <motion.div
                        key={test._id || i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-3xl p-6 shadow-lg hover:shadow-xl border border-white/10 hover:scale-[1.015] transition-transform"
                    >
                        {/* Header */}
                        <div className="mb-4">
                            <h2 className="text-xl sm:text-2xl font-bold text-pink-400">
                                {test.title}
                            </h2>
                            <p className="text-sm text-white/70">{test.chapter}</p>
                        </div>

                        {/* Meta Info */}
                        <div className="grid grid-cols-2 gap-3 text-sm sm:text-base text-white/90 mb-4">
                            <div className="space-y-1">
                                <p><strong>Std:</strong> {test.standard}</p>
                                <p><strong>Subject:</strong> {test.subject}</p>
                                <p><strong>Group:</strong> {test.group}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="flex items-center gap-1">
                                    <MdDateRange className="text-pink-400" />
                                    {new Date(test.date).toLocaleDateString()}
                                </p>
                                <p className="flex items-center gap-1">
                                    <MdAccessTime className="text-pink-400" />
                                    {test.startTime}
                                </p>
                                <p>
                                    <strong>Duration:</strong> {test.duration} min
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-between items-center text-sm sm:text-base text-white/80 border-t border-white/10 pt-4 mb-4">
                            <p className="flex items-center gap-1">
                                <FaBookOpen className="text-blue-400" />
                                {test.totalQuestion} Qs
                            </p>
                            <p>
                                <span className="text-green-400">+{test.marksPerQuestion}</span>
                                {" / "}
                                <span className="text-red-400">-{test.negativeMarks}</span>
                            </p>
                            <p className="flex items-center gap-1">
                                <FaClock className="text-yellow-400" />
                                {test.totalMarks || test.totalQuestion * test.marksPerQuestion} Marks
                            </p>
                        </div>

                        {/* 🔘 Action Buttons */}
                        <div className="flex justify-between gap-3">
                            {getTestId.includes(test._id)
                                ? <button
                                    onClick={() =>
                                        navigate("/admin/viewmockTestQuestions", {
                                            state: { testId: test._id, questionCount: test.totalQuestion, testName: test.title }
                                        })
                                    }
                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-xl hover:scale-105 transition font-semibold"
                                >
                                    View Questions
                                </button>
                                : <button
                                    onClick={() =>
                                        navigate("/admin/questionTest", {
                                            state: { testId: test._id, questionCount: test.totalQuestion, testName: test.title }
                                        })
                                    }
                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-xl hover:scale-105 transition font-semibold"
                                >
                                    ➕ Add Questions
                                </button>}

                            <button
                                onClick={() => handleDeleteMockTest(test._id)
                                }
                                className="flex-1 bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-xl hover:scale-105 transition font-semibold"
                            >
                                🗑️ Delete Test
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Create Test Form */}
            <AnimatePresence>
                {
                    isTestCreated && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className={`relative min-h-dvh px-4 py-10 sm:p-10 ${colors.background} ${colors.text}`}
                        >
                            <button
                                onClick={() => {
                                    setIsTestCreated(false);
                                    reset();
                                }}
                                className="absolute top-4 right-4 text-white text-3xl p-1 rounded-full hover:bg-red-600 transition"
                                title="Close"
                            >
                                <IoClose />
                            </button>

                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
                                className={`max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl border ${colors.card} ${colors.border}`}
                            >
                                <h2 className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-400 mb-8">
                                    🧪 Create Mock Test
                                </h2>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <input
                                                {...register("title", { required: "Title is required" })}
                                                placeholder="Test Title"
                                                className={`p-3 rounded-xl border ${colors.formField} ${colors.border} placeholder-gray-400 focus:outline-none w-full`}
                                            />
                                            {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                {...register("chapter", { required: "Chapter is required" })}
                                                placeholder="Chapter"
                                                className={`p-3 rounded-xl border ${colors.formField} ${colors.border} placeholder-gray-400 focus:outline-none w-full`}
                                            />
                                            {errors.chapter && <p className="text-sm text-red-500 mt-1">{errors.chapter.message}</p>}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div>
                                            <select
                                                {...register("standard", { required: "Standard is required" })}
                                                className={`p-3 rounded-xl border ${colors.formField} ${colors.border} focus:outline-none w-full`}
                                            >
                                                <option value="">Select Standard</option>
                                                {standard.map((std, i) => (
                                                    <option value={std} key={i}>{std}</option>
                                                ))}
                                            </select>
                                            {errors.standard && <p className="text-sm text-red-500 mt-1">{errors.standard.message}</p>}
                                        </div>
                                        <div>
                                            <select
                                                {...register("group", { required: "Group is required" })}
                                                className={`p-3 rounded-xl border ${colors.formField} ${colors.border} focus:outline-none w-full`}
                                                onChange={(e) => setisGroupSelected(e.target.value)}
                                            >
                                                <option value="" >Select Group</option>
                                                {group.map((grp, i) => (
                                                    <option value={grp} key={i} >{grp}</option>

                                                ))}
                                            </select>
                                            {errors.group && <p className="text-sm text-red-500 mt-1">{errors.group.message}</p>}
                                        </div>
                                        <div>
                                            <select
                                                {...register("subject", { required: "Subject is required" })}
                                                className={`p-3 rounded-xl border ${colors.formField} ${colors.border} focus:outline-none w-full`}
                                            >
                                                <option value="">Select Subject</option>

                                                {(isGroupSelected === "A" ? PCM : PCB).map((sub, i) => (
                                                    <option value={sub} key={i}>
                                                        {sub}
                                                    </option>
                                                ))}

                                            </select>
                                            {errors.subject && <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>}
                                        </div>

                                    </div>

                                    <div>
                                        <input
                                            type="date"
                                            {...register("date", { required: "Date is required" })}
                                            className={`w-full p-3 rounded-xl border ${colors.formField} ${colors.border} focus:outline-none`}
                                        />
                                        {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>}
                                    </div>

                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div>
                                            <input
                                                type="number"
                                                {...register("totalQuestion", {
                                                    required: "Total questions are required",
                                                    min: { value: 1, message: "Must be at least 1" }
                                                })}
                                                placeholder="Total Questions"
                                                className={`p-3 rounded-xl border ${colors.formField} ${colors.border} placeholder-gray-400 focus:outline-none w-full`}
                                            />
                                            {errors.totalQuestion && <p className="text-sm text-red-500 mt-1">{errors.totalQuestion.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="number"
                                                {...register("marksPerQuestion", {
                                                    required: "Marks per question is required",
                                                    min: { value: 1, message: "Minimum 1 mark required" }
                                                })}
                                                placeholder="Marks Per Question"
                                                className={`p-3 rounded-xl border ${colors.formField} ${colors.border} placeholder-gray-400 focus:outline-none w-full`}
                                            />
                                            {errors.marksPerQuestion && <p className="text-sm text-red-500 mt-1">{errors.marksPerQuestion.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="number"
                                                step="0.1"
                                                {...register("negativeMarks", {
                                                    required: "Negative marks are required",
                                                    min: { value: 0, message: "Cannot be negative" }
                                                })}
                                                placeholder="Negative Marks"
                                                className={`p-3 rounded-xl border ${colors.formField} ${colors.border} placeholder-gray-400 focus:outline-none w-full`}
                                            />
                                            {errors.negativeMarks && <p className="text-sm text-red-500 mt-1">{errors.negativeMarks.message}</p>}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1">Test Start Time</label>
                                        <input
                                            type="time"
                                            {...register("startTime", { required: "Start time is required" })}
                                            className={`w-full p-3 rounded-xl border ${colors.formField} ${colors.border} focus:outline-none`}
                                        />
                                        {errors.startTime && <p className="text-sm text-red-500 mt-1">{errors.startTime.message}</p>}
                                    </div>

                                    <div>
                                        <input
                                            type="number"
                                            {...register("duration", {
                                                required: "Duration is required",
                                                min: { value: 1, message: "At least 1 minute" }
                                            })}
                                            placeholder="Duration (in minutes)"
                                            className={`p-3 rounded-xl border ${colors.formField} ${colors.border} placeholder-gray-400 focus:outline-none w-full`}
                                        />
                                        {errors.duration && <p className="text-sm text-red-500 mt-1">{errors.duration.message}</p>}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 text-lg rounded-xl font-semibold shadow-md"
                                    >
                                        🚀 Create Test
                                    </motion.button>
                                </form>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div >
    );
};

export default TestManagement;

