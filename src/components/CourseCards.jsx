import axios from "axios";
import React, { useEffect, useState } from "react";

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

  return (
    <section className="w-full bg-gradient-to-br from-[#0f0f0f] to-[#1f1f1f] text-white px-6 py-20 sm:px-10 md:px-20 font-poppins">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-3">Explore Our Science Programs</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Structured and specially crafted for 11th & 12th Science – both PCM & PCB groups. Learn, Practice & Excel.
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={regularCourse}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
      ${isRegularButoonClicked
              ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"}`}
        >
          Regular Course
        </button>

        <button
          onClick={advanceCourses}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300
      ${isAdvanceButtonClicked
              ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"}`}
        >
          Advance Course
        </button>
      </div>

      {
        isRegularButoonClicked && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courseCard.map((course, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-[#2a2f45] rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-purple-500"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">{course.title}</h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {course.subjects.map((subject, i) => (
                    <span
                      key={i}
                      className="bg-[#2f354d] text-white text-sm px-3 py-1 rounded-full"
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
                          : "text-gray-200"
                          }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-auto">
                <p className="text-2xl font-bold mb-4">
                  ₹{course.price}/<span className="text-base font-medium">month</span>
                </p>
                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white py-2 rounded-xl font-semibold transition-all duration-200">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      }
      {
        isAdvanceButtonClicked && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {advanceCourse.map((course, index) => (
            <div
              key={index}
              className="bg-[#111827] border border-[#2a2f45] rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-purple-500"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">{course.title}</h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {course.subjects.map((subject, i) => (
                    <span
                      key={i}
                      className="bg-[#2f354d] text-white text-sm px-3 py-1 rounded-full"
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
                          : "text-gray-200"
                          }`}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-700 pt-4 mt-auto">
                <p className="text-2xl font-bold mb-4">
                  ₹{course.price}/<span className="text-base font-medium">month</span>
                </p>
                <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white py-2 rounded-xl font-semibold transition-all duration-200">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      }
    </section>
  );
}
