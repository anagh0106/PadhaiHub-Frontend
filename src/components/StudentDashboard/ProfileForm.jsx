// // Final Working Code Ever Green
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import WelcomeCard from "./WelcomeCard";
// import axios from "axios";
// import { useNavigate, useNavigation } from "react-router-dom";

// const ProfileForm = () => {
//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//         reset,
//     } = useForm();

//     const [loading, setLoading] = useState(true);
//     const [isInfoUpdated, setisInfoUpdated] = useState(false)
//     const [closeForm, setcloseForm] = useState(false)

//     // Fetch from localStorage and set values on mount
//     useEffect(() => {
//         const storedStudentId = localStorage.getItem("studentId");
//         const storedEmail = localStorage.getItem("userEmail");

//         if (storedStudentId) setValue("studentId", storedStudentId);
//         if (storedEmail) setValue("email", storedEmail);

//         setLoading(false);
//     }, [setValue]);

//     const navigate = useNavigate()
//     useEffect(() => {
//         if (closeForm) {
//             setTimeout(() => {
//                 navigate("/studentdashboard")
//             }, 1000)
//         }
//     }, [closeForm])
//     // const API = "http://192.168.31.252:3000/user";
//     const API = "http://localhost:3000/user" || "http://192.168.31.252:3000/user";

//     const onSubmit = async (data) => {
//         try {
//             const res = await axios.put(`${API}/update-student-info`, data, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             localStorage.setItem("phone", data.phone)
//             localStorage.setItem("address", data.address)
//             toast.success("Profile Updated Successfully!", { theme: "dark" });
//             setisInfoUpdated(true);
//             console.log("Update response:", res.data);
//             reset({
//                 studentId: localStorage.getItem("studentId"),
//                 email: localStorage.getItem("userEmail"),
//             });
//             setcloseForm(true)
//         } catch (err) {
//             console.error("Error updating profile:", err);
//             toast.error("Failed to update profile. Please try again.", { theme: "dark" });
//         }
//     };


//     if (loading) return null;

//     return (
//         <motion.div
//             className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl w-full max-w-3xl mx-auto mt-10"
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//         >
//             {/* <h2 className="text-2xl font-bold mb-6 text-blue-400">Edit Profile</h2> */}

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//                 {/* Student ID (read-only) */}
//                 <div className="relative">
//                     <input
//                         {...register("studentId")}
//                         type="text"
//                         disabled
//                         className="peer w-full px-4 pt-6 pb-2 bg-gray-700 text-gray-300 rounded-md outline-none cursor-not-allowed"
//                         placeholder=" "
//                     />
//                     <label className="absolute left-4 top-2 text-gray-400 text-sm">
//                         Student ID
//                     </label>
//                 </div>

//                 {/* Email (read-only) */}
//                 <div className="relative">
//                     <input
//                         {...register("email")}
//                         type="email"
//                         disabled
//                         className="peer w-full px-4 pt-6 pb-2 bg-gray-700 text-gray-300 rounded-md outline-none cursor-not-allowed"
//                         placeholder=" "
//                     />
//                     <label className="absolute left-4 top-2 text-gray-400 text-sm">
//                         Email
//                     </label>
//                 </div>

//                 {/* Other editable fields */}
//                 {[
//                     { name: "fullName", label: "Full Name" },
//                     { name: "phone", label: "Phone Number", type: "tel" },
//                     { name: "address", label: "Address" }
//                 ].map((field) => (
//                     <div key={field.name} className="relative">
//                         <input
//                             {...register(field.name, { required: `${field.label} is required` })}
//                             type={field.type || "text"}
//                             className={`peer w-full px-4 pt-6 pb-2 bg-gray-800 text-white rounded-md outline-none focus:ring-2 ${errors[field.name] ? "ring-red-500" : "focus:ring-blue-500"
//                                 }`}
//                             placeholder=" "
//                         />
//                         <label
//                             className="absolute left-4 top-2 text-gray-400 text-sm transition-all 
//               peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
//               peer-placeholder-shown:text-gray-500 peer-focus:top-2 
//               peer-focus:text-sm peer-focus:text-blue-400"
//                         >
//                             {field.label}
//                         </label>
//                         {errors[field.name] && (
//                             <p className="text-red-400 text-sm mt-1">
//                                 {errors[field.name].message}
//                             </p>
//                         )}
//                     </div>
//                 ))}

//                 <button
//                     type="submit"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
//                 >
//                     Update Profile
//                 </button>
//             </form>
//         </motion.div>
//     );
// };

// export default ProfileForm;


import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ProfileForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm();

    const [loading, setLoading] = useState(true);
    const [isInfoUpdated, setIsInfoUpdated] = useState(false);
    const [closeForm, setCloseForm] = useState(false);

    useEffect(() => {
        const storedStudentId = localStorage.getItem("studentId");
        const storedEmail = localStorage.getItem("userEmail");

        if (storedStudentId) setValue("studentId", storedStudentId);
        if (storedEmail) setValue("email", storedEmail);

        setLoading(false);
    }, [setValue]);

    // ✅ Close form automatically after update
    useEffect(() => {
        if (closeForm) {
            setTimeout(() => {
                setIsInfoUpdated(false);
            }, 2000);
        }
    }, [closeForm]);

    // const API = "http://localhost:3000/user";
    const host = window.location.hostname
    const API = host === "localhost"
        ? "http://localhost:3000/user"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/user";

    const onSubmit = async (data) => {
        try {
            const res = await axios.put(`${API}/update-student-info`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Update localStorage
            localStorage.setItem("phone", data.phone);
            localStorage.setItem("address", data.address);

            toast.success("Profile Updated Successfully!", { theme: "dark" });
            setIsInfoUpdated(true);
            setCloseForm(true);
            reset({
                studentId: localStorage.getItem("studentId"),
                email: localStorage.getItem("userEmail"),
            });

            console.log("Update response:", res.data);
        } catch (err) {
            console.error("Error updating profile:", err);
            toast.error("Failed to update profile. Please try again.", { theme: "dark" });
        }
    };

    if (loading) return null;

    // ✅ If form is closed, show WelcomeCard or success component
    if (closeForm) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 text-center mt-10 text-xl"
            >
                ✅ Profile Updated Successfully!
            </motion.div>
        );
        // or return <WelcomeCard />;
    }

    return (
        <motion.div
            className="bg-gray-900 text-white rounded-2xl p-6 shadow-xl w-full max-w-3xl mx-auto mt-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Read-Only Fields */}
                <ReadOnlyInput label="Student ID" name="studentId" register={register} />
                <ReadOnlyInput label="Email" name="email" register={register} type="email" />

                {/* Editable Fields */}
                {[
                    { name: "fullName", label: "Full Name" },
                    { name: "phone", label: "Phone Number", type: "tel" },
                    { name: "address", label: "Address" }
                ].map((field) => (
                    <FloatingInput key={field.name} {...field} register={register} errors={errors} />
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
                >
                    Update Profile
                </button>
            </form>
        </motion.div>
    );
};

// 🔸 Reusable ReadOnly Field
const ReadOnlyInput = ({ name, label, type = "text", register }) => (
    <div className="relative">
        <input
            {...register(name)}
            type={type}
            disabled
            className="peer w-full px-4 pt-6 pb-2 bg-gray-700 text-gray-300 rounded-md outline-none cursor-not-allowed"
            placeholder=" "
        />
        <label className="absolute left-4 top-2 text-gray-400 text-sm">
            {label}
        </label>
    </div>
);

// 🔸 Reusable Floating Input Field
const FloatingInput = ({ name, label, type = "text", register, errors }) => (
    <div className="relative">
        <input
            {...register(name, { required: `${label} is required` })}
            type={type}
            className={`peer w-full px-4 pt-6 pb-2 bg-gray-800 text-white rounded-md outline-none focus:ring-2 ${errors[name] ? "ring-red-500" : "focus:ring-blue-500"
                }`}
            placeholder=" "
        />
        <label
            className="absolute left-4 top-2 text-gray-400 text-sm transition-all 
                peer-placeholder-shown:top-5 peer-placeholder-shown:text-base 
                peer-placeholder-shown:text-gray-500 peer-focus:top-2 
                peer-focus:text-sm peer-focus:text-blue-400"
        >
            {label}
        </label>
        {errors[name] && (
            <p className="text-red-400 text-sm mt-1">
                {errors[name].message}
            </p>
        )}
    </div>
);

export default ProfileForm;
