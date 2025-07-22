import axios from "axios";
import React, { useEffect, useState } from "react";

const courses = [
  {
    title: "Class 10 Foundation",
    subjects: ["Mathematics", "Science", "English", "Social Studies"],
    includes: [
      "Daily Practice Sessions",
      "Doubt Clearing Classes",
      "Mock Tests",
      "Study Materials",
    ],
    price: "\u20b98,000/month",
  },
  {
    title: "Class 11 Science",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    includes: [
      "JEE/NEET Preparation",
      "Lab Sessions",
      "Concept Building",
      "Previous Year Papers",
    ],
    price: "\u20b912,000/month",
  },
  {
    title: "Class 12 Commerce",
    subjects: ["Accounts", "Economics", "Business Studies", "Mathematics"],
    includes: [
      "Board Exam Focus",
      "Case Studies",
      "Practical Training",
      "Career Guidance",
    ],
    price: "\u20b910,000/month",
  },
];

export default function CourseCards() {

  const API = window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";
  const [courseCard, setcourseCard] = useState([])
  const getCourseCardData = async () => {
    try {
      const res = await axios.get(`${API}/courseCard/getCourse`)
      setcourseCard(res.data)
    } catch (error) {
      console.log("Error is => ", error);

    }
  }
  useEffect(() => {
    getCourseCardData()
  }, [])
  return (
    <section className="bg-[#0f172a] text-white px-6 py-16 sm:px-10 md:px-20 rounded-xl max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-12">
        <span className="bg-green-600 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4">
          🎓 Our Courses
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-center">
          Choose Your Perfect Course
        </h2>
        <p className="text-gray-300 text-center max-w-2xl">
          Comprehensive curriculum designed for academic excellence and competitive exam preparation
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {courseCard.map((course, index) => (
          <div
            key={index}
            className="bg-[#1e293b] border border-gray-700 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-4">{course.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {course.subjects.map((subject, i) => (
                  <span
                    key={i}
                    className="bg-gray-800 text-sm px-3 py-1 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
              <h4 className="text-white font-semibold mb-2">What's Included:</h4>
              <ul className="text-gray-300 mb-6 space-y-1">
                {course.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 text-lg">✔️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-2xl font-bold mb-4">{course.price}</p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-semibold transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
