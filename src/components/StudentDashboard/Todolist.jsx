//  Imp code do not remove it 

// import React, { useEffect, useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { motion, AnimatePresence } from 'framer-motion'
// import axios from 'axios'

//  const Todolist = () => {
// //     const [tasks, settasks] = useState([])
// //     const [editButtonClicked, seteditButtonClicked] = useState(false)
// //     const [editTaskmsg, seteditTaskmsg] = useState("")
// //     const [isTaskUpdated, setisTaskUpdated] = useState(false)
// //     const { register, handleSubmit, formState: { errors }, reset } = useForm()
// //     const host = window.location.hostname;
// //     const API = host === "localhost"
// //         ? "http://localhost:3000/todolist"
// //         : "http://192.168.31.252:3000/todolist";

// //     const token = localStorage.getItem("token")

// //     const fetchTasks = async () => {
// //         try {
// //             const token = localStorage.getItem("token");
// //             const res = await axios.get(`${API}/GetTask`, {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //             if (res.data) {
// //                 const taskList = res.data.tasks;
// //                 const transformedTasks = taskList.map((t, index) => ({
// //                     taskId: t.taskId,
// //                     text: t.text,
// //                     completed: false,
// //                     order: index
// //                 }));
// //                 settasks(transformedTasks);
// //             }
// //         } catch (error) { console.error("Error fetching tasks:", error); }
// //     };

// //     const taskId = parseInt(localStorage.getItem("taskId"))
// //     useEffect(() => { fetchTasks() }, []);

// //     const submithandler = async (data) => {
// //         try {
// //             const res = await axios.post(`${API}/AddTask`, { text: data.text }, {
// //                 headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
// //             });
// //             reset();
// //             await fetchTasks();
// //         } catch (error) { console.error("Error:", error); }
// //     };

// //     const deleteTask = async (taskId) => {
// //         try {
// //             await axios.delete(`${API}/DeleteTask/${taskId}`, { headers: { Authorization: `Bearer ${token}` } });
// //             const newTask = tasks.filter((task) => task.taskId !== taskId);
// //             settasks(newTask);
// //         } catch (error) { console.log("Error is =>", error); }
// //     };

// //     const editTaskHandler = async (data) => {
// //         try {
// //             const res = await axios.put(`${API}/EditTask`, { taskId: taskId, text: data.text }, {
// //                 headers: { Authorization: `Bearer ${token}` }
// //             });
// //             const updatedTask = tasks.map(item => item.taskId === taskId ? { ...item, text: data.text } : item);
// //             settasks(updatedTask);
// //             setisTaskUpdated(true)
// //             seteditTaskmsg("Task Updated Successfully!")
// //             reset({ text: "" });
// //             await fetchTasks();
// //             seteditButtonClicked(false);
// //         } catch (error) {
// //             seteditTaskmsg("Error while updating the task")
// //         }
// //     }

// //     const editTask = (taskId) => {
// //         seteditButtonClicked(true)
// //         reset();
// //         seteditTaskmsg("")
// //         localStorage.setItem("taskId", taskId)
// //     }

// //     const markAsCompleted = (index) => {
// //         const updated = tasks.map((task, idx) => idx === index ? { ...task, completed: !task.completed } : task)
// //         const sortedTask = [...updated].sort((a, b) => a.completed - b.completed || a.order - b.order)
// //         settasks(sortedTask)
// //     }

// //     return (
// //         <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ duration: 1 }}
// //             // className="min-h-screen bg-black text-white flex justify-center items-center p-4"
// //             className="min-h-dvh bg-black text-white flex justify-center items-center p-4 sm:p-6"
// //         >

// //             <motion.div
// //                 initial={{ scale: 0.9 }}
// //                 animate={{ scale: 1 }}
// //                 transition={{ type: "spring", stiffness: 80 }}
// //                 className="w-full max-w-2xl bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
// //             // className="max-w-2xl w-full bg-white/10 backdrop-blur-3xl border border-white/20 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
// //             >
// //                 <h2 className="text-center text-4xl font-extrabold text-[#F5F5F5] drop-shadow-lg mb-10">
// //                     📝 Todo List
// //                 </h2>


// //                 <form onSubmit={handleSubmit(submithandler)} className="flex gap-4 mb-8">
// //                     {/* <input
// //                         type="text"
// //                         {...register("text")}
// //                         placeholder="What's your next mission?"
// //                         autoComplete="off"
// //                         className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-pink-400 transition-all duration-300 backdrop-blur-md"
// //                         required
// //                     /> */}
// //                     <input
// //                         type="text"
// //                         placeholder="Enter Task To Perform"
// //                         {...register("text")}
// //                         className="w-full px-5 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-md transition-all duration-300"
// //                         required
// //                         autoComplete='off'
// //                     />
// //                     <button
// //                         type="submit"
// //                         className="px-6 py-3 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold shadow-md transition-all duration-300"
// //                     >
// //                         ➕ Add Task
// //                     </button>

// //                 </form>

// //                 <div className="space-y-4">
// //                     <AnimatePresence>
// //                         {tasks.map((item, index) => (
// //                             <motion.div
// //                                 key={index}
// //                                 initial={{ opacity: 0, y: 20 }}
// //                                 animate={{ opacity: 1, y: 0 }}
// //                                 exit={{ opacity: 0, x: -100 }}
// //                                 transition={{ duration: 0.4 }}
// //                                 className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex justify-between items-center hover:ring-2 hover:ring-pink-400/50 transition-all duration-300"
// //                             >
// //                                 <span className={`${item.completed ? "line-through text-gray-400" : "text-white"}`}>
// //                                     {item.text}
// //                                 </span>
// //                                 <div className="flex gap-2">
// //                                     <button onClick={() => markAsCompleted(index)} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full">✅</button>
// //                                     <button onClick={() => editTask(item.taskId)} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full">✏️</button>
// //                                     <button onClick={() => deleteTask(item.taskId)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full">🗑️</button>
// //                                 </div>
// //                             </motion.div>
// //                         ))}
// //                     </AnimatePresence>
// //                 </div>
// //             </motion.div>

// //             {editButtonClicked && (
// //                 <>
// //                     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"></div>
// //                     <motion.div
// //                         initial={{ opacity: 0, scale: 0.8 }}
// //                         animate={{ opacity: 1, scale: 1 }}
// //                         transition={{ type: "spring", stiffness: 100 }}
// //                         className="fixed inset-0 flex justify-center items-center z-50 p-4"
// //                     // className="fixed inset-0 flex justify-center items-center z-50"
// //                     >
// //                         <div className="w-full max-w-sm sm:max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 p-6 sm:p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative">
// //                             {/* <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl w-[400px] shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative"> */}
// //                             <button onClick={() => seteditButtonClicked(false)} className="absolute top-4 right-4 text-white text-2xl">&times;</button>
// //                             <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 mb-10">Edit Task</h2>
// //                             <form onSubmit={handleSubmit(editTaskHandler)} className="space-y-6">
// //                                 <input
// //                                     {...register("text", { required: "Task name is required" })}
// //                                     placeholder="Update your task..."
// //                                     autoComplete="off"
// //                                     className="w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-pink-400 backdrop-blur-md"
// //                                 />
// //                                 {errors.text && <p className="text-red-400 text-sm">{errors.text.message}</p>}
// //                                 {isTaskUpdated && <p className="text-green-400 text-sm">{editTaskmsg}</p>}
// //                                 <motion.button
// //                                     whileHover={{ scale: 1.05 }}
// //                                     whileTap={{ scale: 0.95 }}
// //                                     className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold text-lg shadow-lg"
// //                                 >
// //                                     Submit
// //                                 </motion.button>
// //                             </form>
// //                         </div>
// //                     </motion.div>
// //                 </>
// //             )}
// //         </motion.div>
// //     )
//  }

// export default Todolist


import React, { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import ThemeContext from '../context/ThemeContext'
import { IoCloseOutline } from "react-icons/io5";


const Todolist = () => {
    const [tasks, settasks] = useState([])
    const [editButtonClicked, seteditButtonClicked] = useState(false)
    const [editTaskmsg, seteditTaskmsg] = useState("")
    const [isTaskUpdated, setisTaskUpdated] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { theme } = useContext(ThemeContext);

    const host = window.location.hostname;
    const API = host === "localhost"
        ? "http://localhost:3000/todolist"
        : process.env.REACT_APP_API || "https://padhaihub-backend.onrender.com/todolist";

    const token = localStorage.getItem("token")

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${API}/GetTask`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data) {
                const taskList = res.data.tasks;
                const transformedTasks = taskList.map((t, index) => ({
                    taskId: t.taskId,
                    text: t.text,
                    completed: false,
                    order: index
                }));
                settasks(transformedTasks);
            }
        } catch (error) { console.error("Error fetching tasks:", error); }
    };

    const taskId = parseInt(localStorage.getItem("taskId"))
    useEffect(() => { fetchTasks() }, []);

    const submithandler = async (data) => {
        try {
            const res = await axios.post(`${API}/AddTask`, { text: data.text }, {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
            });
            reset();
            await fetchTasks();
        } catch (error) { console.error("Error:", error); }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${API}/DeleteTask/${taskId}`, { headers: { Authorization: `Bearer ${token}` } });
            const newTask = tasks.filter((task) => task.taskId !== taskId);
            settasks(newTask);
        } catch (error) { console.log("Error is =>", error); }
    };

    const editTaskHandler = async (data) => {
        try {
            const res = await axios.put(`${API}/EditTask`, { taskId: taskId, text: data.text }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const updatedTask = tasks.map(item => item.taskId === taskId ? { ...item, text: data.text } : item);
            settasks(updatedTask);
            setisTaskUpdated(true)
            seteditTaskmsg("Task Updated Successfully!")
            reset({ text: "" });
            await fetchTasks();
            seteditButtonClicked(false);
        } catch (error) {
            seteditTaskmsg("Error while updating the task")
        }
    }
    const editTask = (taskId) => {
        seteditButtonClicked(true)
        reset();
        seteditTaskmsg("")
        localStorage.setItem("taskId", taskId)
    }
    const markAsCompleted = (index) => {
        const updated = tasks.map((task, idx) => idx === index ? { ...task, completed: !task.completed } : task)
        const sortedTask = [...updated].sort((a, b) => a.completed - b.completed || a.order - b.order)
        settasks(sortedTask)
    }

    const styles = {
        container: theme === 'light' ? 'bg-white text-black' : 'bg-black text-white',
        card: theme === 'light' ? 'bg-gray-100 border border-gray-300 text-black shadow-md' : 'bg-white/10 border border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]',
        input: theme === 'light' ? 'bg-gray-100 text-black placeholder-gray-600 border border-gray-300 focus:ring-blue-500' : 'bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-blue-400',
        modal: theme === 'light' ? 'bg-white border border-gray-300 text-black shadow-md' : 'bg-white/10 border border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]',
        modalInput: theme === 'light' ? 'w-full px-6 py-4 rounded-xl bg-gray-100 border border-gray-300 text-black placeholder-gray-600 focus:ring-2 focus:ring-pink-400 backdrop-blur-md' : 'w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-pink-400 backdrop-blur-md'
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className={`min-h-dvh flex justify-center items-center p-4 sm:p-6 ${styles.container}`}
            >

                <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 80 }}
                    className={`w-full max-w-2xl rounded-3xl p-6 sm:p-10 backdrop-blur-3xl ${styles.card}`}
                >
                    <h2 className="text-center text-4xl font-extrabold drop-shadow-lg mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400">
                        📝 Todo List
                    </h2>

                    <form onSubmit={handleSubmit(submithandler)} className="flex gap-4 mb-8">
                        <input
                            type="text"
                            placeholder="Enter Task To Perform"
                            {...register("text")}
                            className={`w-full px-5 py-3 rounded-xl backdrop-blur-md transition-all duration-300 focus:outline-none focus:ring-2 ${styles.input}`}
                            required
                            autoComplete='off'
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold shadow-md transition-all duration-300"
                        >
                            ➕ Add Task
                        </button>
                    </form>

                    <div className="space-y-4">
                        <AnimatePresence>
                            {tasks.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.4 }}
                                    className={`backdrop-blur-md p-5 rounded-xl flex justify-between items-center hover:ring-2 hover:ring-pink-400/50 transition-all duration-300 ${styles.card}`}
                                >
                                    <span className={item.completed ? "line-through text-gray-400" : "text-inherit"}>{item.text}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => markAsCompleted(index)} className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full">✅</button>
                                        <button onClick={() => editTask(item.taskId)} className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full">✏️</button>
                                        <button onClick={() => deleteTask(item.taskId)} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full">🗑️</button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {editButtonClicked && (
                    <>
                        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 100 }}
                            className="fixed inset-0 flex justify-center items-center z-50 p-4"
                        >
                            <div className={`w-full max-w-sm sm:max-w-md p-6 sm:p-10 rounded-3xl relative transition-all duration-300 ${styles.modal}`}>
                                {/* <button onClick={() => seteditButtonClicked(false)} className="absolute top-4 right-4 text-white text-2xl">&times;</button> */}
                                <button
                                    onClick={() => seteditButtonClicked(false)}
                                    className={`absolute top-4 right-4 text-3xl ${theme === "light" ? "text-black" : "text-white"
                                        } hover:scale-110 transition-transform duration-200`}
                                >
                                    <IoCloseOutline />
                                </button>

                                <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400 mb-10">Edit Task</h2>
                                <form onSubmit={handleSubmit(editTaskHandler)} className="space-y-6">
                                    <input
                                        {...register("text", { required: "Task name is required" })}
                                        placeholder="Update your task..."
                                        autoComplete="off"
                                        className={`${styles.modalInput}`}
                                    />
                                    {errors.text && <p className="text-red-400 text-sm">{errors.text.message}</p>}
                                    {isTaskUpdated && <p className="text-green-400 text-sm">{editTaskmsg}</p>}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-black font-bold text-lg shadow-lg"
                                    >
                                        Submit
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}


            </motion.div>
            <br /><br />
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-[#0F172A] text-white rounded-lg shadow-lg w-full max-w-md p-6">
                    <h2 className="text-xl font-semibold mb-1">Add New Task</h2>
                    <p className="text-sm text-gray-400 mb-4">
                        Create a new task with details and organization
                    </p>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Task Title</label>
                            <input
                                type="text"
                                placeholder="Enter task title..."
                                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#1E293B] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                placeholder="Add more details..."
                                rows={3}
                                className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#1E293B] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#1E293B] text-white">
                                    <option>General</option>
                                    <option>Study</option>
                                    <option>Work</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Priority</label>
                                <select className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#1E293B] text-white">
                                    <option>High</option>
                                    <option selected>Medium</option>
                                    <option>Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Due Date</label>
                                <input
                                    type="date"
                                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#1E293B] text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Time (minutes)
                                </label>
                                <input
                                    type="number"
                                    defaultValue="60"
                                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-[#1E293B] text-white"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <button
                                type="button"
                                className="px-4 py-2 rounded-md border border-gray-500 text-gray-300 hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Add Task
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default Todolist

