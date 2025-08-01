// components/TodayClasses.jsx
import React from "react";

const classes = [
    {
        subject: "Mathematics",
        teacher: "Dr. Rajesh Kumar",
        room: "Room 201",
        time: "10:00 AM - 11:30 AM",
        type: "Regular Class",
    },
    {
        subject: "Physics",
        teacher: "Prof. Sunita Sharma",
        room: "Lab 1",
        time: "12:00 PM - 1:30 PM",
        type: "Practical",
    },
    {
        subject: "Chemistry",
        teacher: "Dr. Amit Verma",
        room: "Room 301",
        time: "2:00 PM - 3:30 PM",
        type: "Regular Class",
    },
];

const TodayClasses = () => {
    return (
        <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg">
            <h2 className="text-white text-xl font-semibold mb-1 flex items-center gap-2">
                <i className="fas fa-calendar-alt"></i> Today's Classes
            </h2>
            <p className="text-sm text-gray-400 mb-4">Your schedule for today</p>

            {classes.map((cls, idx) => (
                <div
                    key={idx}
                    className="bg-[#1f2937] p-4 rounded-lg mb-4 flex justify-between items-center"
                >
                    <div>
                        <h3 className="text-white font-bold">{cls.subject}</h3>
                        <p className="text-gray-300 text-sm">{cls.teacher}</p>
                        <p className="text-gray-400 text-xs">{cls.room}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-blue-400 font-semibold">{cls.time}</p>
                        <p className="text-xs text-gray-400">{cls.type}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodayClasses;
