import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaBook, FaTags, FaList, FaRupeeSign, FaLayerGroup } from "react-icons/fa";

const AddCourseForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();
    const [courseCard, setcourseCard] = useState([])
    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const onSubmit = async (data) => {
        const courseData = {
            ...data,
            subjects: data.subjects.split(",").map(s => s.trim()),
            features: data.features.split(",").map(f => f.trim()),
            price: Number(data.price),
        };

        try {
            const res = await axios.post(`${API}/courseCard/addCourse`, courseData);
            console.log(res.data);
            // reset();
        } catch (err) {
            console.error("Error submitting course:", err);
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

            {isSubmitSuccessful && (
                <motion.div
                    className="mb-6 bg-green-100 text-green-700 px-6 py-3 rounded-xl shadow font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    ✅ Course added successfully!
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Title */}
                <div className={inputStyle}>
                    <FaBook className="text-blue-500" />
                    <input
                        {...register("title", { required: "Course title is required" })}
                        placeholder="Course Title"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                {errors.title && <p className="text-red-600 ml-2 -mt-3 text-sm">• {errors.title.message}</p>}

                {/* Subjects */}
                <div className={inputStyle}>
                    <FaTags className="text-blue-500" />
                    <input
                        {...register("subjects", { required: "Subjects are required" })}
                        placeholder="Subjects (comma-separated)"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                {errors.subjects && <p className="text-red-600 ml-2 -mt-3 text-sm">• {errors.subjects.message}</p>}

                {/* Features */}
                <div className={inputStyle}>
                    <FaList className="text-blue-500" />
                    <input
                        {...register("features", { required: "Features are required" })}
                        placeholder="Features (comma-separated)"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                {errors.features && <p className="text-red-600 ml-2 -mt-3 text-sm">• {errors.features.message}</p>}

                {/* Price */}
                <div className={inputStyle}>
                    <FaRupeeSign className="text-blue-500" />
                    <input
                        type="number"
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                            min: { value: 1, message: "Price must be at least 1" },
                        })}
                        placeholder="Price (INR)"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                {errors.price && <p className="text-red-600 ml-2 -mt-3 text-sm">• {errors.price.message}</p>}

                {/* Category */}
                <div className={inputStyle}>
                    <FaLayerGroup className="text-blue-500" />
                    <input
                        {...register("category", { required: "Category is required" })}
                        placeholder="Category (e.g. NEET, JEE)"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
                {errors.category && <p className="text-red-600 ml-2 -mt-3 text-sm">• {errors.category.message}</p>}

                {/* Submit Button */}
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
