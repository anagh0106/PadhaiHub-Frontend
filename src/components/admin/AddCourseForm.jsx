import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBook, FaTags, FaList, FaRupeeSign, FaLayerGroup } from "react-icons/fa";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    subjects: "",
    features: "",
    price: "",
    category: "",
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      ...formData,
      subjects: formData.subjects.split(",").map((s) => s.trim()),
      features: formData.features.split(",").map((f) => f.trim()),
      price: Number(formData.price),
    };

    try {
      const res = await axios.post("/api/courses", courseData);
      setSuccess("Course added successfully!");
      setErrors([]);
      setFormData({
        title: "",
        subjects: "",
        features: "",
        price: "",
        category: "",
      });
    } catch (err) {
      setSuccess("");
      setErrors(err.response?.data?.errors || ["Something went wrong."]);
    }
  };

  const inputStyle =
    "flex items-center gap-3 border border-gray-300 bg-white px-4 py-3 rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition";

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-16 p-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
        🎓 Create New Course
      </h2>

      {errors.length > 0 && (
        <motion.div
          className="mb-6 bg-red-100 text-red-700 px-6 py-3 rounded-xl shadow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {errors.map((err, i) => (
            <p key={i}>• {err}</p>
          ))}
        </motion.div>
      )}

      {success && (
        <motion.div
          className="mb-6 bg-green-100 text-green-700 px-6 py-3 rounded-xl shadow font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ {success}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className={inputStyle}>
          <FaBook className="text-blue-500" />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className={inputStyle}>
          <FaTags className="text-blue-500" />
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            placeholder="Subjects (comma-separated)"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className={inputStyle}>
          <FaList className="text-blue-500" />
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Features (comma-separated)"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className={inputStyle}>
          <FaRupeeSign className="text-blue-500" />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price (INR)"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <div className={inputStyle}>
          <FaLayerGroup className="text-blue-500" />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (e.g. NEET, JEE)"
            className="w-full bg-transparent outline-none"
          />
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-md transition"
        >
          🚀 Add Course
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddCourseForm;
