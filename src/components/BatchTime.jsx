import { FaRegCalendarAlt } from 'react-icons/fa';
import ThemeContext from './context/ThemeContext.jsx';
import { useContext } from 'react';
const batches = [
    {
        title: "Morning Batch",
        time: "6:00 AM - 9:00 AM",
        note: "Perfect for School students",
    },
    {
        title: "Day Batch",
        time: "10:00 AM - 1:00 PM",
        note: "Perfect for Droppers/Gap year",
    },
    {
        title: "Evening Batch",
        time: "4:00 PM - 7:00 PM",
        note: "Perfect for School students",
    },
    {
        title: "Night Batch",
        time: "7:30 PM - 10:30 PM",
        note: "Perfect for Working professionals",
    },
];

export const BatchTime = () => {
    const { theme } = useContext(ThemeContext);
    const colors = {
        background: theme === 'light' ? 'bg-[#EEF4FF]' : 'bg-[#0f172a]',
        card: theme === 'light' ? 'bg-gray-100' : 'bg-[rgba(15,15,15,0.5)]',
        border: theme === 'light' ? 'border-gray-300' : 'border-[rgba(255,255,255,0.1)]',
        text: theme === 'light' ? 'text-black' : 'text-white',
        subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
        shadow: 'shadow-lg',
        glass: theme === 'light' ? 'backdrop-blur-lg' : 'backdrop-blur-lg',
        overlay: theme === 'light' ? 'bg-white/50' : 'bg-black/60'
    };
    return (
        <section className={`${colors.background} ${colors.text} py-20 px-4`}>
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Flexible Batch Timings
                </h2>
                <p className={`${colors.subtext} mb-12 text-base sm:text-lg`}>
                    Choose the timing that works best for your schedule
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
                    {batches.map((batch, index) => (
                        <div
                            key={index}
                            className={`${colors.card} ${colors.border} ${colors.shadow} border rounded-2xl px-6 py-8 min-h-[280px] flex flex-col justify-between hover:shadow-2xl transition duration-300 ${colors.glass}`}
                        >
                            <div className="flex justify-center mb-5">
                                <div className="bg-[#1e40af]/10 p-5 rounded-full">
                                    <FaRegCalendarAlt className="text-blue-500 text-3xl" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{batch.title}</h3>
                                <p className="text-blue-500 font-semibold mb-3 text-md">{batch.time}</p>
                                <p className={`text-sm ${colors.subtext}`}>{batch.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
