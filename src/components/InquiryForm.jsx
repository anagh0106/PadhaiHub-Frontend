import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap } from "react-icons/fa";

const InquiryForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Inquiry submitted:", data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#1a1a1a] p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-[#00FFC6]"
            >
                <h2 className="text-2xl font-bold text-center text-[#00FFC6] mb-6">
                    Inquiry Form
                </h2>

                {/* Input Fields with Icons and Floating Labels */}
                {[
                    {
                        name: "fullName",
                        label: "Full Name",
                        type: "text",
                        icon: <FaUser className="text-[#00FFC6] mr-2" />,
                        rules: { required: "Full name is required" },
                    },
                    {
                        name: "email",
                        label: "Email Address",
                        type: "email",
                        icon: <FaEnvelope className="text-[#00FFC6] mr-2" />,
                        rules: {
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Invalid email format",
                            },
                        },
                    },
                    {
                        name: "phone",
                        label: "Phone Number",
                        type: "tel",
                        icon: <FaPhone className="text-[#00FFC6] mr-2" />,
                        rules: {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Enter 10-digit number",
                            },
                        },
                    },
                ].map(({ name, label, type, rules, icon }) => (
                    <div key={name} className="relative mb-6">
                        <div className="flex items-center absolute left-2 top-3.5 peer-placeholder-shown:top-3.5 peer-focus:top-3 transition-all">
                            {icon}
                        </div>
                        <input
                            type={type}
                            {...register(name, rules)}
                            id={name}
                            className="peer w-full pl-10 bg-transparent border-b-2 border-gray-500 text-white py-3 px-2 placeholder-transparent focus:outline-none focus:border-[#00FFC6] transition-all"
                            placeholder={label}
                            autoComplete="off"
                        />
                        <label
                            htmlFor={name}
                            className="absolute left-10 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-[#00FFC6]"
                        >
                            {label}
                        </label>
                        {errors[name] && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors[name]?.message}
                            </p>
                        )}
                    </div>
                ))}

                {/* Class Selection Dropdown */}
                <div className="relative mb-6">
                    <div className="flex items-center absolute left-2 top-3.5">
                        <FaGraduationCap className="text-[#00FFC6] mr-2" />
                    </div>
                    <select
                        {...register("class", { required: "Please select a class" })}
                        className="w-full pl-10 bg-[#1a1a1a] border-b-2 border-gray-500 text-white py-3 px-2 focus:outline-none focus:border-[#00FFC6]"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select Class
                        </option>
                        <option value="11th Science">11th Science</option>
                        <option value="12th Science">12th Science</option>
                    </select>
                    {errors.class && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.class.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-[#00FFC6] text-black font-bold rounded-md hover:bg-[#0ff] transition-all shadow-lg"
                >
                    Submit Inquiry
                </button>
            </form>


        </div>
    );
};

export default InquiryForm;
