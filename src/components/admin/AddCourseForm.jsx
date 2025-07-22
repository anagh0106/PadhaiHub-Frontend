import React, { useState } from "react";
import axios from "axios";

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
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Process comma-separated strings into arrays
        const courseData = {
            ...formData,
            subjects: formData.subjects.split(",").map(s => s.trim()),
            features: formData.features.split(",").map(f => f.trim()),
            price: Number(formData.price)
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

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Add New Course</h2>

            {errors.length > 0 && (
                <div className="mb-4 text-red-600">
                    {errors.map((err, i) => (
                        <p key={i}>• {err}</p>
                    ))}
                </div>
            )}

            {success && (
                <div className="mb-4 text-green-600 font-medium">{success}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Course Title"
                    className="w-full border px-4 py-2 rounded"
                />

                <input
                    type="text"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleChange}
                    placeholder="Subjects (comma-separated)"
                    className="w-full border px-4 py-2 rounded"
                />

                <input
                    type="text"
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    placeholder="Features (comma-separated)"
                    className="w-full border px-4 py-2 rounded"
                />

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Course Price"
                    className="w-full border px-4 py-2 rounded"
                />

                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category (e.g., JEE, NEET)"
                    className="w-full border px-4 py-2 rounded"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Course
                </button>
            </form>
        </div>
    );
};

export default AddCourseForm;
