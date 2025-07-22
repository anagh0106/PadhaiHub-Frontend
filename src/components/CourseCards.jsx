import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CourseCards() {
  const API =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

  const [courseCard, setCourseCard] = useState([]);

  const getCourseCardData = async () => {
    try {
      const res = await axios.get(`${API}/courseCard/getCourse`);
      setCourseCard(res.data);
    } catch (error) {
      console.log("Error is =>", error);
    }
  };

  useEffect(() => {
    getCourseCardData();
  }, []);

  return (
    <section className="bg-black text-white px-6 py-16 sm:px-10 md:px-20 rounded-xl max-w-7xl mx-auto font-poppins">
      <div className="grid md:grid-cols-3 gap-8">
        {courseCard.map((course, index) => (
          <div
            key={index}
            className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-xl flex flex-col justify-between transition hover:scale-105 duration-300"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">{course.title}</h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {course.subjects.map((subject, i) => (
                  <span
                    key={i}
                    className="bg-[#2c2f3f] text-white text-sm px-3 py-1 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>

              <h4 className="text-lg font-semibold mb-3">What's Included:</h4>
              <ul className="space-y-2 mb-6">
                {course.features.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="text-green-400 text-lg">✅</span>
                    <span className={`${item.includes("Preparation") ? "text-gray-400 line-through" : ""}`}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <p className="text-2xl font-bold mb-4">
                ₹{course.price}/<span className="text-base font-medium">month</span>
              </p>
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white py-2 rounded-xl font-semibold transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
