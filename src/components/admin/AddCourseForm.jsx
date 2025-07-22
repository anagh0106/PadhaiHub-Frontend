// AddCourseForm.jsx
import React, { useState } from "react";
import axios from "axios";
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
      setSuccess("✅ Course added successfully!");
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

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Add New Course</h2>

      {errors.length > 0 && (
        <div className="mb-4 text-red-500 bg-red-50 px-4 py-2 rounded-md">
          {errors.map((err, i) => (
            <p key={i}>• {err}</p>
          ))}
        </div>
      )}

      {success && (
        <div className="mb-4 text-green-600 bg-green-50 px-4 py-2 rounded-md font-semibold">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Course Title */}
        <div className="relative">
          <FaBook className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Course Title"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Subjects */}
        <div className="relative">
          <FaTags className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            placeholder="Subjects (comma-separated)"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Features */}
        <div className="relative">
          <FaList className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Features (comma-separated)"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Price */}
        <div className="relative">
          <FaRupeeSign className="absolute top-3 left-3 text-gray-500" />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Course Price"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category */}
        <div className="relative">
          <FaLayerGroup className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category (e.g., NEET, JEE)"
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg transition"
        >
          🚀 Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
