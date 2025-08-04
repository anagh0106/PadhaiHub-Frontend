import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export default function CalendarCard() {
    return (
        <div className="bg-[#0F172A] text-white p-6 rounded-xl shadow-lg border border-[#1E293B] w-fit">
            <div className="flex items-center gap-2 mb-1">
                <CalendarIcon className="w-5 h-5 text-white" />
                <h2 className="text-lg font-semibold">Calendar</h2>
            </div>
            <p className="text-sm text-gray-400 mb-4">View your schedule</p>

            <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg p-4">
                <DayPicker
                    mode="single"
                    showOutsideDays
                    defaultMonth={new Date(2025, 7)} // August 2025
                    selected={new Date(2025, 7, 4)}
                    classNames={{
                        months: "flex flex-col",
                        month: "space-y-4",
                        caption: "relative flex justify-center items-center",
                        caption_label: "text-white font-medium",
                        nav: "space-x-2 absolute right-0 top-0",
                        nav_button:
                            "h-7 w-7 p-0 rounded-md text-white hover:bg-[#1E293B] flex items-center justify-center",
                        table: "w-full border-collapse",
                        head_row: "flex",
                        head_cell: "w-9 h-9 text-xs text-gray-400 text-center",
                        row: "flex",
                        cell: "w-9 h-9 text-sm text-white text-center relative",
                        day: "w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#1E293B] transition",
                        day_selected: "bg-white text-black font-medium",
                        day_today: "border border-white",
                        day_outside: "text-gray-600 opacity-30",
                        day_disabled: "text-gray-500 opacity-50",
                    }}
                    components={{
                        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                        IconRight: () => <ChevronRight className="h-4 w-4" />,
                    }}
                />
            </div>
        </div>
    );
}
