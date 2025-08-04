// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

// export default function CalendarCard() {
//     return (
//         <div className="bg-[#0F172A] text-white p-6 rounded-xl shadow-lg border border-[#1E293B] w-fit">
//             <div className="flex items-center gap-2 mb-1">
//                 <CalendarIcon className="w-5 h-5 text-white" />
//                 <h2 className="text-lg font-semibold">Calendar</h2>
//             </div>
//             <p className="text-sm text-gray-400 mb-4">View your schedule</p>

//             <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg p-4">
//                 <DayPicker
//                     mode="single"
//                     showOutsideDays
//                     defaultMonth={new Date(2025, 7)} // August 2025
//                     selected={new Date(2025, 7, 4)}
//                     classNames={{
//                         months: "flex flex-col",
//                         month: "space-y-4",
//                         caption: "relative flex justify-center items-center",
//                         caption_label: "text-white font-medium",
//                         nav: "space-x-2 absolute right-0 top-0",
//                         nav_button:
//                             "h-7 w-7 p-0 rounded-md text-white hover:bg-[#1E293B] flex items-center justify-center",
//                         table: "w-full border-collapse",
//                         head_row: "flex",
//                         head_cell: "w-9 h-9 text-xs text-gray-400 text-center",
//                         row: "flex",
//                         cell: "w-9 h-9 text-sm text-white text-center relative",
//                         day: "w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#1E293B] transition",
//                         day_selected: "bg-white text-black font-medium",
//                         day_today: "border border-white",
//                         day_outside: "text-gray-600 opacity-30",
//                         day_disabled: "text-gray-500 opacity-50",
//                     }}
//                     components={{
//                         IconLeft: () => <ChevronLeft className="h-4 w-4" />,
//                         IconRight: () => <ChevronRight className="h-4 w-4" />,
//                     }}
//                 />
//             </div>
//         </div>
//     );
// }


import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

const CalendarCard = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderHeader = () => (
        <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="text-white px-2">&lt;</button>
            <h2 className="text-lg font-semibold text-white">
                {format(currentMonth, "MMMM yyyy")}
            </h2>
            <button onClick={nextMonth} className="text-white px-2">&gt;</button>
        </div>
    );

    const renderDays = () => {
        const days = [];
        const date = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        for (let i = 0; i < 7; i++) {
            days.push(
                <div key={i} className="text-sm text-gray-400 font-medium text-center">
                    {date[i]}
                </div>
            );
        }
        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const isToday = isSameDay(day, new Date());
                const isSelected = isSameDay(day, selectedDate);
                const isDisabled = !isSameMonth(day, monthStart);

                days.push(
                    <div
                        key={day}
                        className={`text-sm text-center rounded-full py-1 cursor-pointer ${isDisabled ? "text-gray-600" : "text-white"
                            } ${isSelected ? "bg-white text-black font-bold" : ""}`}
                        onClick={() => setSelectedDate(day)}
                    >
                        {format(day, "d")}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div key={day} className="grid grid-cols-7 gap-1 mb-1">{days}</div>);
            days = [];
        }

        return <div>{rows}</div>;
    };

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    return (
        <div className="bg-[#0F172A] text-white p-6 rounded-xl shadow-lg border border-gray-700 w-full md:w-1/3 mt-6 md:mt-0">
            <h2 className="text-2xl font-semibold mb-1">📅 Calendar</h2>
            <p className="text-sm text-gray-400 mb-4">View your schedule</p>
            <div className="bg-[#1E293B] rounded-lg p-4 border border-gray-600">
                {renderHeader()}
                {renderDays()}
                {renderCells()}
            </div>
        </div>
    );
};

export default CalendarCard;
