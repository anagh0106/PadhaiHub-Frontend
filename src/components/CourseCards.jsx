import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "./context/ThemeContext";

export default function CourseCards() {
  const API =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

  const [courseCard, setCourseCard] = useState([]);
  const [advanceCourse, setadvanceCourse] = useState([])
  const [isRegularButoonClicked, setisRegularButoonClicked] = useState(true)
  const [isAdvanceButtonClicked, setisAdvanceButtonClicked] = useState(false)

  const getCourseCardData = async () => {
    try {
      const res = await axios.get(`${API}/courseCard/getCourse`);
      setCourseCard(res.data.regular);
      setadvanceCourse(res.data.advance)
      console.log(res.data);
    } catch (error) {
      console.log("Error is =>", error);
    }
  };
  const regularCourse = () => {
    setisRegularButoonClicked(true);
    setisAdvanceButtonClicked(false);
  };

  const advanceCourses = () => {
    setisAdvanceButtonClicked(true);
    setisRegularButoonClicked(false);
  };

  useEffect(() => {
    getCourseCardData();
  }, []);

  const { theme } = useContext(ThemeContext);
  const colors = {
    background: theme === 'light' ? 'bg-white' : 'bg-black',
    card: theme === 'light' ? 'bg-gray-100' : 'bg-zinc-900',
    border: theme === 'light' ? 'border-gray-200' : 'border-gray-700',
    text: theme === 'light' ? 'text-black' : 'text-white',
    subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
    shadow: 'shadow-md',
    glass: 'backdrop-blur-lg',
    overlay: theme === 'light' ? 'bg-white/50' : 'bg-black/60',
    tag: theme === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/40 text-blue-300',
    lineThrough: 'text-gray-500 line-through',
  };

  return (
    <section className={`${colors.background} ${colors.text} px-6 py-20 sm:px-10 md:px-20 font-poppins transition-all duration-300`}>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-3">Explore Our Science Programs</h2>
        <p className={`${colors.subtext} max-w-3xl mx-auto`}>
          Structured and specially crafted for 11th & 12th Science – both PCM & PCB groups. Learn, Practice & Excel.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={regularCourse}
          className={`relative px-6 py-2 rounded-full font-semibold transition-all duration-300 overflow-hidden
        ${isRegularButoonClicked
              ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg scale-105"
              : `${colors.card} ${colors.subtext} hover:bg-gray-700 hover:text-white hover:scale-105`}`}
        >
          <span className="relative z-10">🌱 Regular Course</span>
          {isRegularButoonClicked && (
            <span className="absolute inset-0 animate-pulse bg-green-600 opacity-20 rounded-full z-0"></span>
          )}
        </button>

        <button
          onClick={advanceCourses}
          className={`relative px-6 py-2 rounded-full font-semibold transition-all duration-300 overflow-hidden
        ${isAdvanceButtonClicked
              ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg scale-105"
              : `${colors.card} ${colors.subtext} hover:bg-gray-700 hover:text-white hover:scale-105`}`}
        >
          <span className="relative z-10">🚀 Advance Course</span>
          {isAdvanceButtonClicked && (
            <span className="absolute inset-0 animate-pulse bg-indigo-600 opacity-20 rounded-full z-0"></span>
          )}
        </button>
      </div>

      {/* Course Card Rendering */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {(isRegularButoonClicked ? courseCard : advanceCourse).map((course, index) => (
          <div
            key={index}
            className={`${colors.card} ${colors.border} ${colors.shadow} border rounded-2xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-purple-500`}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">{course.title}</h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {course.subjects.map((subject, i) => (
                  <span
                    key={i}
                    className={`text-sm px-3 py-1 rounded-full ${colors.tag}`}
                  >
                    {subject}
                  </span>

                ))}
              </div>

              <h4 className="text-lg font-semibold mb-3">What's Included:</h4>
              <ul className="space-y-2 mb-6">
                {course.features.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-green-400 text-base">✔</span>
                    <span
                      className={`${item.includes("Preparation")
                        ? "text-gray-500 line-through"
                        : `${colors.subtext}`}`}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`border-t pt-4 mt-auto ${colors.border}`}>
              <p className="text-2xl font-bold mb-4">
                ₹{course.price}/<span className="text-base font-medium">month</span>
              </p>
              <button
                className={`w-full py-2 rounded-xl font-semibold transition-all duration-200 
    ${theme === 'light'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white'
                    : 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-black'}
  `}
              >
                Enroll Now
              </button>

            </div>
          </div>
        ))}
      </div>
    </section>

  );
}
