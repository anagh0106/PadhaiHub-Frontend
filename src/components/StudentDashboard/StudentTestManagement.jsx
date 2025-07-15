import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  CalendarDays,
  Clock,
  BookOpenText,
  PlayCircle,
  GraduationCap,
} from "lucide-react";
import ThemeContext from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const StudentTestManagement = () => {
  const [tests, setTests] = useState([]);
  const [submittedTests, setSubmittedTests] = useState([]);

  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const API =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "http://192.168.31.252:3000";

  const fetchTests = async () => {
    try {
      const grade = localStorage.getItem("grade")
      const group = localStorage.getItem("group")
      if (!grade || !group) {
        console.warn("Missing grade or group in localStorage");
        return;
      }


      const res = await axios.get(`${API}/mocktest/student/getTest`
        , {
          params: { grade, group }, headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      const test = res.data.mocktest
      console.log(test);

      const testArray = Array.isArray(test)
        ? test : Object.values(test)

      // console.log(testArray);
      setTests(testArray);

    } catch (error) {
      console.error("❌ Error fetching tests:", error);
    }
  };

  const fetchSubmittedTests = async () => {
    try {
      const res = await axios.get(`${API}/test/mockTest/completedTest`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const studentTestId = res.data.submittedTests.map(a => a._id)
      // setstudentTestId(studentTestId)
      // console.log(studentTestId);

      setSubmittedTests(res.data.submittedTests);

    } catch (error) {
      console.error("❌ Error fetching submitted tests:", error);
    }
  };

  const handleTestNavigation = (id) => {
    const filterTitle = tests.filter((t) => t._id === id);
    const title = filterTitle.map((t) => t.title);
    navigate("/startTest", { state: { testId: id, testName: title } });
  };

  useEffect(() => {
    fetchTests();
    fetchSubmittedTests();
  }, []);
  useEffect(() => {
    const grade = localStorage.getItem("grade");
    const group = localStorage.getItem("group");

    if (!storedGrade || !storedGroup) {
      console.warn("Missing grade or group in localStorage");
      return;
    }

    setGrade(grade);
    setGroup(group);
  }, []);


  const colors = {
    background: theme === "light" ? "bg-white text-black" : "bg-black text-white",
    card: theme === "light" ? "bg-white/80 text-black" : "bg-[rgba(20,20,20,0.6)] text-white",
    border: theme === "light" ? "border border-gray-300" : "border border-[rgba(255,255,255,0.1)]",
    heading: theme === "light" ? "text-blue-600" : "text-blue-400",
    subtext: theme === "light" ? "text-gray-600" : "text-gray-300",
    button: "bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:opacity-90 text-white",
  };

  return (
    <>
      <div
        className={`min-h-screen px-6 py-12 mt-10 border rounded-2xl shadow-lg transition-all duration-500 ${colors.background} ${colors.border}`}
      >
        <h2 className="text-4xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 drop-shadow-lg">
          🧠 Your Upcoming Mock Tests
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {tests.length === 0 ? (
            <p className="col-span-full text-center text-lg text-gray-400">
              No mock tests available at the moment.
            </p>
          ) : (
            tests.map((test, index) => {

              const isSubmitted = submittedTests.some((s) => s.testId._id === test._id);

              return (
                <motion.div
                  key={test._id || index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-3xl shadow-md hover:shadow-xl space-y-4 transition-all ${colors.card} ${colors.border}`}
                >
                  <h3 className={`text-2xl font-bold ${colors.heading}`}>{test.title}</h3>

                  <div className={`space-y-2 text-sm ${colors.subtext}`}>
                    <p>
                      <GraduationCap className="inline w-4 h-4 text-yellow-400 mr-2" />
                      <span className="font-semibold">{test.standard} - {test.group}</span>
                    </p>
                    <p>
                      <BookOpenText className="inline w-4 h-4 text-pink-500 mr-2" />
                      Subject: <span className="font-semibold">{test.subject}</span>
                    </p>
                    <p>
                      <BookOpenText className="inline w-4 h-4 text-green-400 mr-2" />
                      Chapter: <span className="font-semibold">{test.chapter}</span>
                    </p>
                    <p>
                      <CalendarDays className="inline w-4 h-4 text-cyan-400 mr-2" />
                      Date: <span className="font-semibold">{new Date(test.date).toLocaleDateString()}</span>
                    </p>
                    <p>
                      <Clock className="inline w-4 h-4 text-emerald-400 mr-2" />
                      Duration: <span className="font-semibold">{test.duration || "30"} min</span>
                    </p>
                    <p>
                      <BookOpenText className="inline w-4 h-4 text-indigo-400 mr-2" />
                      Questions: <span className="font-semibold">{test.totalQuestion}</span>
                    </p>

                    {isSubmitted ? (
                      <div className="mt-6 px-4 py-4 bg-yellow-100 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded-xl text-center shadow-md">
                        <h4 className="text-lg font-semibold mb-2">🎉 Test Already Submitted</h4>
                        <p>Your test has been submitted successfully. <br /> The result will be announced soon!</p>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTestNavigation(test._id)}
                        className={`w-full py-2 mt-4 rounded-xl font-bold flex items-center justify-center gap-2 ${colors.button}`}
                      >
                        <PlayCircle className="w-5 h-5" />
                        Start Test
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </>
  );

};

export default StudentTestManagement;
