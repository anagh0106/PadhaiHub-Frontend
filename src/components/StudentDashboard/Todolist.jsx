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


import { useEffect, useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import axios from 'axios'
import ThemeContext from '../context/ThemeContext'
import { IoCloseOutline } from "react-icons/io5";
import { FaCalendarAlt, FaTrash, FaClock } from 'react-icons/fa';

const Todolist = () => {
    const [tasks, settasks] = useState([])
    const [editButtonClicked, seteditButtonClicked] = useState(false)
    const [editTaskmsg, seteditTaskmsg] = useState("")
    const [isTaskUpdated, setisTaskUpdated] = useState(false)
    const [handlePendingTask, sethandlePendingTask] = useState([])
    const [handlerTaskLabels, sethandlerTaskLabels] = useState([])
    const [addButtonClicked, setaddButtonClicked] = useState(false)
    const [taskCategory, setTaskCategory] = useState([])
    const [TaskPriority, setTaskPriority] = useState([])
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
                const taskList = res.data?.data;
                settasks(taskList)
            }
        } catch (error) { console.error("Error fetching tasks:", error); }
    };
    const taskId = parseInt(localStorage.getItem("taskId"))
    useEffect(() => { fetchTasks() }, []);

    const submithandler = async (data) => {

        try {
            const payload = {
                text: data.text,
                description: data.description,
                category: data.category,
                priority: data.priority,
                duedate: data.duedate,
                time: parseInt(data.time),
            };
            console.log("Form data:", data); // 👈 dekh yaha `text` aata hai ya nahi
            console.log("Payload:", payload); // 👈 final payload backend me ja raha hai


            if (!payload.text || payload.text.trim() === "") {
                alert("Task title is required.");
                return;
            }

            console.log("Payload being sent:", payload);

            const res = await axios.post(`${API}/AddTask`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            reset();
            await fetchTasks();
            setaddButtonClicked(false);
        } catch (error) {
            console.error("Error adding task:", error.response?.data || error);
        }
    };
    const handleDelete = async (taskId) => {
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
    const markAsCompleted = async (taskId) => {

        try {
            const { data } = await axios.post(`${API}/markAsCompleted`, {
                taskId,
            });

            if (data.success) {
                const updated = tasks.map((task) =>
                    task.taskId === data.updatedTask.taskId
                        ? { ...task, completed: !task.completed }
                        : task
                );
                const sortedTask = updated.sort((a, b) => a.completed - b.completed);
                settasks(sortedTask);
            }
        } catch (error) {
            console.error("Error marking task completed:", error);
        }
    };
    const getCategory = async () => {
        try {
            const res = await axios.get(`${API}/getCategory`)
            console.log(res.data);
            setTaskCategory(res.data)
        } catch (error) {
            console.log("Error is => ", error)
        }
    }
    const getPriority = async () => {
        try {
            const res = await axios.get(`${API}/getPriority`)
            console.log(res.data);
            setTaskPriority(res.data)
        } catch (error) {
            console.log("Error is => ", error)
        }
    }
    const PendingTask = async () => {
        try {
            const res = await axios.get(`${API}/getPendingTask`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            sethandlePendingTask(res.data.PendingTask)
            sethandlerTaskLabels(res.data.labels)

        } catch (error) {
            console.log("Error is => ", error);

        }
    }
    useEffect(() => {
        getCategory()
        getPriority()
        PendingTask()
    }, [])
    const styles = {
        container: theme === 'light' ? 'bg-white text-black' : 'bg-black text-white',
        card: theme === 'light' ? 'bg-gray-100 border border-gray-300 text-black shadow-md' : 'bg-white/10 border border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]',
        input: theme === 'light' ? 'bg-gray-100 text-black placeholder-gray-600 border border-gray-300 focus:ring-blue-500' : 'bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:ring-blue-400',
        modal: theme === 'light' ? 'bg-white border border-gray-300 text-black shadow-md' : 'bg-white/10 border border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.4)]',
        modalInput: theme === 'light' ? 'w-full px-6 py-4 rounded-xl bg-gray-100 border border-gray-300 text-black placeholder-gray-600 focus:ring-2 focus:ring-pink-400 backdrop-blur-md' : 'w-full px-6 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-pink-400 backdrop-blur-md'
    }
    const AddTaskFunction = () => {
        setaddButtonClicked(true)
    }

    return (
        <>
            {addButtonClicked && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-0">
                    <div className="bg-[#0F172A] text-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 space-y-6 border border-gray-700">

                        {/* Header */}
                        <div className="space-y-1">
                            <h2 className="text-2xl font-semibold">Add New Task</h2>
                            <p className="text-sm text-gray-400">Create a new task with proper details</p>
                        </div>

                        <form onSubmit={handleSubmit(submithandler)} className="space-y-6">

                            {/* Task Title */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">Task Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter task title..."
                                    {...register("text", { required: true })}
                                    className="w-full px-4 py-2 bg-[#1E293B] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-300">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Add more details..."
                                    {...register("description", { required: true })}
                                    className="w-full px-4 py-2 bg-[#1E293B] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            {/* Category & Priority */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Category</label>
                                    <select
                                        {...register("category", { required: true })}
                                        className="w-full px-4 py-2 bg-[#1E293B] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Category</option>
                                        {taskCategory.map((category, index) => (
                                            <option value={category} key={index}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Priority</label>
                                    <select
                                        {...register("priority", { required: true })}
                                        className="w-full px-4 py-2 bg-[#1E293B] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Priority</option>
                                        {TaskPriority.map((category, index) => (
                                            <option value={category} key={index}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Due Date & Duration */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Due Date</label>
                                    <input
                                        type="date"
                                        {...register("duedate", { required: true })}
                                        className="w-full px-4 py-2 bg-[#1E293B] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Time (minutes)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 60"
                                        {...register("time", { required: true })}
                                        className="w-full px-4 py-2 bg-[#1E293B] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setaddButtonClicked(false)}
                                    className="px-5 py-2 border border-gray-600 rounded-md hover:bg-gray-700 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-semibold"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Todo List Form */}
            <div className="h-full bg-[#1E293B] rounded-lg p-6 shadow-lg flex flex-col">
                {/* <div className="max-w-3xl mx-auto bg-[#0F172A] text-white p-6 rounded-xl shadow-2xl space-y-4"> */}
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            ✅ Smart To-Do List
                        </h2>
                        <p className="text-sm text-gray-400">2 pending • 1 completed</p>
                    </div>
                    <button
                        onClick={() => AddTaskFunction()}
                        className="bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-200">
                        + Add Task
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mt-2">
                    <select className="bg-[#1E293B] border border-gray-600 text-white px-3 py-2 rounded-lg">
                        <option>All Tasks</option>
                        {
                            handlerTaskLabels.map((labels, index) => (
                                <option value={labels} key={index}>{labels}</option>
                            ))
                        }
                    </select>
                    <select className="bg-[#1E293B] border border-gray-600 text-white px-3 py-2 rounded-lg">
                        <option>Due Date</option>
                    </select>
                </div>

                {tasks.map((task, index) => (
                    <div
                        key={task.taskId || index}
                        className={`bg-[#1E293B] p-4 rounded-xl border border-gray-700 flex gap-3 mb-4 shadow-md ${task.completed ? "opacity-50" : ""
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => {
                                alert(`Clicked task: ${task.taskId}`);
                                markAsCompleted(task.taskId)
                            }}
                            className="accent-green-500 mt-1"
                        />
                        <div className="flex-grow">
                            <div className="flex justify-between">
                                <h3
                                    className={`font-semibold text-base ${task.completed ? "text-gray-400 line-through" : "text-white"
                                        }`}
                                >
                                    {task.text}
                                </h3>
                                <div className="flex gap-2">
                                    <span className="text-xs text-white px-2 py-1 rounded-full bg-blue-700 capitalize">
                                        {task.category}
                                    </span>
                                    <span
                                        className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${task.priority === "high"
                                            ? "bg-orange-200 text-orange-800"
                                            : task.priority === "medium"
                                                ? "bg-yellow-200 text-yellow-800"
                                                : "bg-indigo-200 text-indigo-800"
                                            }`}
                                    >
                                        {task.priority}
                                    </span>
                                </div>
                            </div>

                            <p
                                className={`text-sm mt-1 ${task.completed ? "text-gray-400 line-through" : "text-gray-300"
                                    }`}
                            >
                                {task.description}
                            </p>

                            <div className="flex items-center gap-6 mt-3 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> {new Date(task.duedate).toISOString().split("T")[0]}
                                </span>
                                <span className="flex items-center gap-1">
                                    <FaClock /> {task.time}m
                                </span>
                            </div>

                            {/* Optional: tag pills */}
                            {task.tags && task.tags.length > 0 && (
                                <div className="flex gap-2 mt-3 flex-wrap">
                                    {task.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-slate-700 text-white text-xs px-2 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {!task.completed && (
                            <button
                                className="text-red-400 hover:text-red-600"
                                onClick={() => handleDelete(task.taskId)}
                            >
                                <FaTrash />
                            </button>
                        )}
                    </div>
                ))}


            </div>
        </>
    )
}

export default Todolist
