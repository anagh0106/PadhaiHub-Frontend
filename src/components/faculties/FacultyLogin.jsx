// import axios from "axios";
// import React from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// const FacultyLogin = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();
//     const host = window.location.hostname
//     const API = host === "localhost"
//         ? "http://localhost:3000/fac"
//         : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/fac";
//     const navigate = useNavigate()
//     const onSubmit = async (data) => {
//         try {
//             const res = await axios.post(`${API}/loginFaculty`, data);
//             console.log(res.data);
//             localStorage.setItem("FacToken", res.data.token)
//             localStorage.setItem("FacEmail", res.data.email)
//             localStorage.setItem("Facrole", res.data.role)
//             navigate("/faculty/dashboard")

//         } catch (error) {
//             console.log("Error is => ", error)
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
//                 <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                     <div>
//                         <label className="block mb-1 font-medium">Email</label>
//                         <input
//                             type="email"
//                             {...register("email", { required: "Email is required" })}
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.email && (
//                             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                         )}
//                     </div>

//                     <div>
//                         <label className="block mb-1 font-medium">Password</label>
//                         <input
//                             type="password"
//                             {...register("password", { required: "Password is required" })}
//                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         {errors.password && (
//                             <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//                         )}
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default FacultyLogin;

import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ThemeContext from "./context/ThemeContext";

const FacultyLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const host = window.location.hostname;
    const API = host === "localhost"
        ? "http://localhost:3000/fac"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/fac";

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${API}/loginFaculty`, data);
            localStorage.setItem("FacToken", res.data.token);
            localStorage.setItem("FacEmail", res.data.email);
            localStorage.setItem("Facrole", res.data.role);
            navigate("/faculty/dashboard");
        } catch (error) {
            console.log("Error is => ", error);
        }
    };

    const colors = {
        background: theme === 'light' ? 'bg-white text-black' : 'bg-black text-white',
        card: theme === 'light' ? 'bg-white/80 text-black' : 'bg-[rgba(20,20,20,0.6)] text-white',
        border: theme === 'light' ? 'border border-gray-300' : 'border border-[rgba(255,255,255,0.1)]',
        heading: theme === 'light' ? 'text-blue-600' : 'text-blue-400',
        subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
        input: theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-600 text-white',
        focusRing: theme === 'light' ? 'focus:ring-blue-500' : 'focus:ring-blue-400'
    };

    return (
        <div className={`min-h-screen flex items-center justify-center px-4 transition-all duration-500 ${colors.background}`}>
            <motion.div
                className={`p-8 rounded-2xl shadow-md w-full max-w-sm ${colors.card} ${colors.border}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h2
                    className={`text-2xl font-bold mb-6 text-center ${colors.heading}`}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Faculty Login
                </motion.h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${colors.input} ${colors.focusRing}`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${colors.input} ${colors.focusRing}`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
                    >
                        Login
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default FacultyLogin;