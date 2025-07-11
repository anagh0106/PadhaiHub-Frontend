import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaUser, FaPen } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const ContactForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    // const API = "http://192.168.31.252:3000/contact";
    const host = window.location.hostname;
    const API = host === "localhost"
        ? "http://localhost:3000/contact"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/contact";

    const onSubmit = async (data) => {
        const formData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: data.subject,
            message: data.message,
        };

        try {
            const response = await axios.post(`${API}/inquiry`, formData);

            if (response.status !== 200) {
                toast.error("Failed to send message. Please try again later.");
                return;
            }

            console.log("Sent data:", data);
            toast.success("Message sent successfully!");
            reset();
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message. Please try again later.");
        }
    };


    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
            <ToastContainer theme="dark" />
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl p-8 rounded-2xl bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0d0d0d] shadow-2xl"
            >
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                >
                    {/* Contact Us */}
                    Reach Out
                </motion.h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Full Name */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">
                            <FaUser className="inline mr-2 text-blue-400" />
                            Full Name
                        </label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Enter your full name"
                            className="w-full p-3 rounded-md bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">
                            <FaEnvelope className="inline mr-2 text-purple-400" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            placeholder="Enter your email"
                            className="w-full p-3 rounded-md bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">
                            <FaPhone className="inline mr-2 text-green-400" />
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            maxLength={10}
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Enter a valid 10-digit phone number",
                                },
                            })}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\D/g, "");
                            }}
                            placeholder="Enter your phone number"
                            className="w-full p-3 rounded-md bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">
                            <FaPen className="inline mr-2 text-yellow-400" />
                            Subject
                        </label>
                        <input
                            type="text"
                            {...register("subject", { required: "Subject is required" })}
                            placeholder="Enter your subject"
                            className="w-full p-3 rounded-md bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                        {errors.subject && (
                            <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
                        )}
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block mb-2 font-medium text-sm">
                            📝 Your Message
                        </label>
                        <textarea
                            {...register("message", { required: "Message is required" })}
                            placeholder="Type your message here..."
                            className="w-full min-h-[120px] resize-y p-3 rounded-md bg-[#1c1c1c] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        ></textarea>
                        {errors.message && (
                            <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-md text-white font-semibold text-lg transition-all duration-300 shadow-md hover:shadow-xl"
                        >
                            Fire Away 🔥
                        </motion.button>
                    </div>
                </form>
            </motion.div>

        </div>
    );
};

export default ContactForm;
