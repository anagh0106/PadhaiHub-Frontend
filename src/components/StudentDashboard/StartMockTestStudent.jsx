import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import ThemeContext from "../context/ThemeContext";

const StartMockTestStudent = () => {
    const [Tests, setTests] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questionId, setquestionId] = useState([]);
    const navigate = useNavigate()
    const location = useLocation();
    const { theme } = useContext(ThemeContext);
    const { testId, testName } = location.state || {};
    const [TotalCount, setTotalCount] = useState();
    const { register, handleSubmit, watch, setValue } = useForm();
    const numbers = Array.from({ length: TotalCount }, (_, i) => i + 1);
    const API =
        window.location.hostname === "localhost"
            ? "http://localhost:3000"
            : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";


    const getTestData = async () => {
        try {
            const res = await axios.get(
                `${API}/questionTest/mockQuestion/getStudentTestQuestion/${testId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            console.log(res.data.questions);

            setTests(res.data.questions);
            setquestionId(res.data.questions.map((s) => s._id));
        } catch (error) {
            console.log("Error is =>", error);
        }
    };

    const getTotalQuestions = async () => {
        try {
            const res = await axios.get(
                `${API}/questionTest/mockQuestion/getTotalQuestionCountById/${testId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
            );
            setTotalCount(res.data.count);
        } catch (err) {
            console.log("Error is =>", err);
        }
    };

    useEffect(() => {
        getTestData();
        getTotalQuestions();
    }, []);
    const optionLetters = ["A", "B", "C", "D"];

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < Tests.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const onSubmit = async (data) => {
        const payload = {
            testId,
            answers: data.answers
        };
        try {
            const res = await axios.post(`${API}/test/mockTest/saveTest`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("Test Submitted !", res.data);
            const submission_ID = res.data.submissionId

            navigate("/studentdashboard", { state: { submissionId: submission_ID } })

        } catch (error) {
            console.log("Error is =>", error);

            if (error.response && error.response.status === 409) {
                alert("❌ You have already submitted this test.");
            } else {
                alert("🚨 Something went wrong. Please try again.");
            }
        }
    };

    const currentQuestion = Tests[currentQuestionIndex];

    const colors = {
        bg: theme === "light" ? "bg-white text-black" : "bg-black text-white",
        card: theme === "light" ? "bg-white/90" : "bg-black/30",
        border: theme === "light" ? "border-gray-300" : "border-white/10",
        heading: theme === "light" ? "text-blue-600" : "text-blue-400",
        subtext: theme === "light" ? "text-gray-600" : "text-gray-300",
        gridBg: theme === "light" ? "bg-white" : "bg-[#1a1a1a]",
    };

    return (
        <div
            className={`min-h-screen px-4 py-10 transition-all duration-500 ${colors.bg}`}
        >
            <div className="max-w-4xl mx-auto space-y-10">
                <h1 className={`text-2xl font-bold text-center ${colors.heading}`}>
                    {testName}
                </h1>
                <button
                    onClick={() => window.location.href = "/studentdashboard"} // or navigate("/")
                    className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow transition duration-300"
                >
                    ❌ Quit Test
                </button>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {currentQuestion ? (
                        <div
                            className={`rounded-2xl p-6 shadow-lg border ${colors.card} ${colors.border}`}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    disabled={currentQuestionIndex === 0}
                                    className="text-blue-500 hover:text-blue-600 disabled:opacity-40 flex items-center"
                                >
                                    <ChevronLeft className="w-5 h-5" /> Prev
                                </button>

                                <span className={`text-sm ${colors.subtext}`}>
                                    Question {currentQuestionIndex + 1} of {Tests.length}
                                </span>

                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={currentQuestionIndex === Tests.length - 1}
                                    className="text-blue-500 hover:text-blue-600 disabled:opacity-40 flex items-center"
                                >
                                    Next <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-lg font-semibold mb-4">
                                Q{currentQuestionIndex + 1}. {currentQuestion.questions}
                            </h3>

                            <div className="space-y-3">
                                {/* {currentQuestion.options.map((opt, i) => (
                                    <label
                                        key={i}
                                        className="flex items-center space-x-3 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            value={opt}
                                            {...register(`answers.${currentQuestion._id}`)}
                                            checked={
                                                watch(`answers.${currentQuestion._id}`) === opt
                                            }
                                            onChange={() => setValue(`answers.${currentQuestion._id}`, opt)}
                                            className="accent-pink-600 w-4 h-4"
                                        />
                                        <span>{opt}</span>

                                    </label>
                                ))} */}
                                {currentQuestion.options.map((opt, i) => {
                                    const key = optionLetters[i];
                                    return (
                                        <label key={i} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                value={key}
                                                {...register(`answers.${currentQuestion._id}`)}
                                                checked={watch(`answers.${currentQuestion._id}`) === key}
                                                onChange={() => setValue(`answers.${currentQuestion._id}`, key)}
                                                className="accent-pink-600 w-4 h-4"
                                            />
                                            <span>
                                                <strong>{key}.</strong> {opt}
                                            </span>
                                        </label>
                                    );
                                })}

                                <button
                                    type="button"
                                    onClick={() => setValue(`answers.${currentQuestion._id}`, "")}
                                    className="mt-2 text-red-500 underline text-sm"
                                >
                                    Clear Answer
                                </button>
                            </div>
                            {/* <button onClick={()=>alert("clear")}>Clear Response</button> */}
                            {currentQuestionIndex === Tests.length - 1 && (
                                <button
                                    type="submit"
                                    className="mt-8 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-xl"
                                >
                                    ✅ Submit Test
                                </button>
                            )}
                        </div>
                    ) : (
                        <p className={`text-center text-lg ${colors.subtext}`}>
                            Loading...
                        </p>
                    )}
                </form>

                {/* Question Navigator Grid */}
                <div
                    className={`p-4 rounded-xl shadow-inner ${colors.gridBg} border ${colors.border}`}
                >
                    <h2
                        className={`text-center text-sm mb-2 font-medium ${colors.subtext}`}
                    >
                        Question Navigator
                    </h2>

                    <div
                        className="grid gap-2 justify-center"
                        style={{
                            gridTemplateColumns: "repeat(auto-fit, minmax(36px, 1fr))",
                            maxWidth: "400px",
                            margin: "0 auto",
                        }}
                    >
                        {numbers.map((num, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentQuestionIndex(i)}
                                className={`aspect-square flex items-center justify-center rounded-md text-sm font-semibold transition-transform duration-150 shadow ${i === currentQuestionIndex
                                    ? "bg-yellow-400 text-black scale-105"
                                    : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-105"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StartMockTestStudent;
