import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import ThemeContext from "./context/ThemeContext";
import { useForm } from "react-hook-form";
import { IoClose, IoPerson, IoBook, IoImage, IoChatbox, IoSchool, IoBriefcase, IoCall } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Faculties = () => {
    const [facultyData, setFacultyData] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [FacultyLabel, setFacultyLabel] = useState([])
    const [showAddForm, setShowAddForm] = useState(false);
    const [FormSubjects, setFormSubjects] = useState([])
    const [FacultyDegree, setFacultyDegree] = useState([])
    const [FacultyExperience, setFacultyExperience] = useState([])
    const [searchData, setSearchData] = useState("")
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { theme } = useContext(ThemeContext);

    const API = window.location.hostname === "localhost"
        ? "http://localhost:3000"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com";

    const colors = {
        background: theme === 'light' ? 'bg-white' : 'bg-black',
        text: theme === 'light' ? 'text-black' : 'text-white',
        card: theme === 'light' ? 'bg-white backdrop-blur-md' : 'bg-black backdrop-blur-md',
        border: theme === 'light' ? 'border-gray-300' : 'border-white/20',
        secondaryText: theme === 'light' ? 'text-gray-700' : 'text-gray-400',
        highlight: theme === 'light' ? 'text-black' : 'text-white',
        overlay: theme === 'light' ? 'bg-black/40' : 'bg-black/60',
        input: theme === 'light'
            ? 'bg-white text-black border border-gray-300'
            : 'bg-black text-white border border-white/30',
    };

    const getAllFaculties = async () => {
        try {
            const res = await axios.get(`${API}/faculty/getFaculties`);
            setFacultyData(res.data.faculties);
            setFacultyLabel(res.data.labels)

        } catch (error) {
            console.log("Error is =>", error);
        }
    };

    const handlerclose = () => {
        setShowAddForm(false)
        reset()
    }
    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${API}/faculty/addFaculty`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log("Response:", res.data);
        } catch (error) {
            console.log("Error is => ", error);
        }
        console.log("Faculty Submitted: ", data);
        setShowAddForm(false);
        getAllFaculties()
        reset();
    };
    const getFacultiesFormData = async () => {
        try {
            const res = await axios.get(`${API}/faculty/getFacultySubjects`)
            setFormSubjects(res.data)
            const res1 = await axios.get(`${API}/faculty/getFacultyDegree`)
            setFacultyDegree(res1.data)
            const res2 = await axios.get(`${API}/faculty/getFacultyExperience`)
            setFacultyExperience(res2.data)
        } catch (error) {
            console.log("Error is =>", error);

        }
    }
    const FacultyFilteredBySubject = facultyData.filter((faculty) => `${faculty.subject}`.toLowerCase().includes(searchData))

    useEffect(() => {
        getAllFaculties();
        getFacultiesFormData();
    }, []);


    return (
        <div className={`min-h-screen px-4 py-10 transition-all duration-300 ${colors.background} ${colors.text}`}>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <button
                    className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300"
                    onClick={() => navigate("/admin/dashboard")}
                >
                    ⬅ Back to Dashboard
                </button>

                {/* <h1 className="text-3xl font-bold">All Faculties</h1> */}
                <button
                    onClick={() => setShowAddForm(true)}
                    className="px-4 py-2 rounded bg-black text-white border border-white/20 hover:bg-white hover:text-black transition"
                >
                    ➕ Add Faculty
                </button>
            </div>

            {/* Animated Title */}
            <motion.h1
                className={`text-4xl md:text-5xl font-extrabold text-center mb-14 ${colors.highlight}`}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
                >
                    🎓 Meet Our Expert Faculty Members
                </motion.span>
            </motion.h1>

            <div className="flex justify-center mb-10">
                <input
                    type="text"
                    placeholder="🔍 Search by subject..."
                    className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm lowercase"
                    onChange={(e) => setSearchData(e.target.value.toLowerCase())}
                />
            </div>


            {/* Faculty Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FacultyFilteredBySubject.map((faculty, index) => (
                    <motion.div
                        key={index}
                        className={`rounded-xl p-6 shadow-xl border ${colors.card} ${colors.border} cursor-pointer hover:scale-105 transition-transform`}
                        onClick={() => setSelectedFaculty(faculty)}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={faculty.image}
                                alt={faculty.name}
                                className="w-16 h-16 rounded-full object-cover border border-white/20"
                            />
                            <div>
                                <h2 className="text-xl font-semibold">{faculty.name}</h2>
                                <p className={colors.secondaryText}>{faculty.subject}</p>
                            </div>
                        </div>
                        <p className={`text-sm ${colors.secondaryText}`}>Click to view full details</p>
                    </motion.div>
                ))}
            </div>

            {/* View Faculty Modal */}
            <AnimatePresence>
                {selectedFaculty && (
                    <>
                        <motion.div
                            className={`fixed inset-0 z-40 ${colors.overlay} backdrop-blur-sm`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedFaculty(null)}
                        />

                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center px-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={`w-full max-w-2xl p-6 rounded-xl shadow-2xl border ${colors.card} ${colors.border} relative`}>
                                <button
                                    onClick={() => setSelectedFaculty(null)}
                                    className="absolute top-3 right-3 text-2xl hover:text-red-500"
                                >
                                    <IoClose />
                                </button>
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <img
                                        src={selectedFaculty.image}
                                        alt={selectedFaculty.name}
                                        className="w-40 h-40 object-cover border border-white/30 rounded-md"
                                    />

                                    <div className="text-left space-y-2">
                                        <h2 className="text-2xl font-bold">{selectedFaculty.name}</h2>
                                        <p className={colors.secondaryText}>{selectedFaculty.subject}</p>
                                        <p className="font-semibold">Bio: {selectedFaculty.bio}</p>
                                        <div className="mt-4 space-y-1 text-sm">
                                            <p><span className="font-semibold">🎓 Qualification:</span> {selectedFaculty.qualification}</p>
                                            <p><span className="font-semibold">🏢 Experience:</span> {selectedFaculty.experience}</p>
                                            <p><span className="font-semibold">📞 Contact:</span> {selectedFaculty.contact}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Add Faculty Form Modal */}

            <AnimatePresence>
                {showAddForm && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddForm(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center px-4"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                className={`w-full max-w-2xl p-6 rounded-2xl shadow-xl border max-h-[90vh] overflow-y-auto ${theme === "light"
                                    ? "bg-white text-black border-gray-200"
                                    : "bg-white/10 text-white border-white/20 backdrop-blur-lg"
                                    } relative`}
                            >

                                {/* Close Button */}
                                <button
                                    onClick={() => handlerclose()}
                                    className="absolute top-4 right-4 text-2xl hover:text-red-500"
                                >
                                    <IoClose />
                                </button>

                                {/* Heading */}
                                <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-2">
                                    ➕ Add New Faculty
                                </h2>

                                {/* Form */}
                                {/* Old Add Faculty Form */}
                                {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    {[
                                        { label: FacultyLabel.name, name: "name", icon: <IoPerson /> },
                                        { label: FacultyLabel.subject, name: "subject", icon: <IoBook /> },
                                        { label: FacultyLabel.image, name: "image", icon: <IoImage /> },
                                        { label: FacultyLabel.bio, name: "bio", icon: <IoChatbox /> },
                                        { label: FacultyLabel.qualification, name: "qualification", icon: <IoSchool /> },
                                        { label: FacultyLabel.experience, name: "experience", icon: <IoBriefcase /> },
                                        { label: FacultyLabel.contact, name: "contact", icon: <IoCall /> },
                                    ].map((field, index) => (
                                        <div key={index}>
                                            <label className="block mb-1 font-medium flex items-center gap-2">
                                                {field.icon} {field.label}
                                            </label>
                                            <input
                                                {...register(field.name, { required: true })}
                                                autoComplete="off"
                                                className={`w-full px-4 py-2 rounded-md outline-none ${theme === "light"
                                                    ? "bg-white text-black border border-gray-300"
                                                    : "bg-black/60 text-white border border-white/20"
                                                    }`}
                                            />
                                            {errors[field.name] && (
                                                <p className="text-red-400 text-sm mt-1">This field is required</p>
                                            )}
                                        </div>
                                    ))}

                                    <button
                                        type="submit"
                                        className={`w-full py-3 mt-6 rounded-md font-semibold transition-all ${theme === "light"
                                            ? "bg-black text-white hover:bg-gray-800"
                                            : "bg-white text-black hover:bg-gray-300"
                                            }`}
                                    >
                                        🚀 Add Faculty
                                    </button>
                                </form> */}
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                                    {/* Name */}
                                    <div>
                                        <label className="block mb-1 font-medium flex items-center gap-2">
                                            <IoPerson /> {FacultyLabel.name}
                                        </label>
                                        <input
                                            {...register("name", { required: true })}
                                            autoComplete="off"
                                            className={`w-full px-4 py-2 rounded-md outline-none ${theme === "light"
                                                ? "bg-white text-black border border-gray-300"
                                                : "bg-black/60 text-white border border-white/20"
                                                }`}
                                        />
                                        {errors.name && <p className="text-red-400 text-sm mt-1">This field is required</p>}
                                    </div>

                                    {/* Subject (Dropdown) */}
                                    <div>
                                        <label className="block mb-1 font-medium flex items-center gap-2">
                                            <IoBook /> {FacultyLabel.subject}
                                        </label>
                                        <select
                                            {...register("subject", { required: true })}
                                            className={`w-full px-4 py-2 rounded-md outline-none ${theme === "light"
                                                ? "bg-white text-black border border-gray-300"
                                                : "bg-black/60 text-white border border-white/20"
                                                }`}
                                        >
                                            <option value="">Select Subject</option>
                                            {FormSubjects.map((sub, index) => (
                                                <option value={sub} key={index}>{sub}</option>
                                            ))}
                                        </select>
                                        {errors.subject && <p className="text-red-400 text-sm mt-1">This field is required</p>}
                                    </div>

                                    {/* Image URL */}
                                    <div>
                                        <label className="block mb-1 font-medium flex items-center gap-2">
                                            <IoImage /> {FacultyLabel.image}
                                        </label>
                                        <input
                                            {...register("image", { required: true })}
                                            autoComplete="off"
                                            className={`w-full px-4 py-2 rounded-md outline-none ${theme === "light"
                                                ? "bg-white text-black border border-gray-300"
                                                : "bg-black/60 text-white border border-white/20"
                                                }`}
                                        />
                                        {errors.image && <p className="text-red-400 text-sm mt-1">This field is required</p>}
                                    </div>

                                    {/* Bio */}
                                    <div>
                                        <label className="block mb-1 font-medium flex items-center gap-2">
                                            <IoChatbox /> {FacultyLabel.bio}
                                        </label>
                                        <textarea
                                            {...register("bio", { required: true })}
                                            rows={3}
                                            className={`w-full px-4 py-2 rounded-md outline-none resize-none ${theme === "light"
                                                ? "bg-white text-black border border-gray-300"
                                                : "bg-black/60 text-white border border-white/20"
                                                }`}
                                        />
                                        {errors.bio && <p className="text-red-400 text-sm mt-1">This field is required</p>}
                                    </div>

                                    {/* Qualification (Degree Dropdown) */}
                                    <div>
                                        <label className="block mb-1 font-medium flex items-center gap-2">
                                            <IoSchool /> {FacultyLabel.qualification}
                                        </label>
                                        <select
                                            {...register("qualification", { required: true })}
                                            className={`w-full px-4 py-2 rounded-md outline-none ${theme === "light"
                                                ? "bg-white text-black border border-gray-300"
                                                : "bg-black/60 text-white border border-white/20"
                                                }`}
                                        >
                                            <option value="">Select Qualification</option>
                                            {FacultyDegree.map((degree, index) => (
                                                <option value={degree} key={index}>{degree}</option>
                                            ))}
                                        </select>
                                        {errors.qualification && <p className="text-red-400 text-sm mt-1">This field is required</p>}
                                    </div>

                                    {/* Experience (Dropdown) */}
                                    <div>
                                        <label className="block mb-1 font-medium flex items-center gap-2">
                                            <IoBriefcase /> {FacultyLabel.experience}
                                        </label>
                                        <select
                                            {...register("experience", { required: true })}
                                            className={`w-full px-4 py-2 rounded-md outline-none ${theme === "light"
                                                ? "bg-white text-black border border-gray-300"
                                                : "bg-black/60 text-white border border-white/20"
                                                }`}
                                        >
                                            <option value="">Select Experience</option>
                                            {FacultyExperience.map((exp, index) => (
                                                <option value={exp} key={index}>{exp}</option>
                                            ))}
                                        </select>
                                        {errors.experience && <p className="text-red-400 text-sm mt-1">This field is required</p>}
                                    </div>

                                    {/* Contact */}
                                    <div>
                                        <label className="block mb-1 font-medium flex items-center gap-2">
                                            <IoCall /> {FacultyLabel.contact}
                                        </label>
                                        <input
                                            {...register("contact", { required: true })}
                                            autoComplete="off"
                                            className={`w-full px-4 py-2 rounded-md outline-none ${theme === "light"
                                                ? "bg-white text-black border border-gray-300"
                                                : "bg-black/60 text-white border border-white/20"
                                                }`}
                                        />
                                        {errors.contact && <p className="text-red-400 text-sm mt-1">This field is required</p>}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className={`w-full py-3 mt-6 rounded-md font-semibold transition-all ${theme === "light"
                                            ? "bg-black text-white hover:bg-gray-800"
                                            : "bg-white text-black hover:bg-gray-300"
                                            }`}
                                    >
                                        🚀 Add Faculty
                                    </button>
                                </form>

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Faculties;
