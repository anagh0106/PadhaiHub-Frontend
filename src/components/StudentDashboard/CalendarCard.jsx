import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const CalendarCard = () => {
  const today = new Date();

  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto border border-slate-700">
      <h2 className="text-2xl font-bold text-center mb-4 text-cyan-400">📅 Science Study Calendar</h2>
      <div className="rounded-xl overflow-hidden shadow-inner border border-slate-600 bg-[#1E293B]">
        <DayPicker
          mode="single"
          selected={today}
          modifiersClassNames={{
            selected: 'bg-cyan-500 text-white',
            today: 'text-yellow-400 font-bold',
          }}
          styles={{
            caption: { color: '#38bdf8' },
            head_cell: { color: '#f1f5f9' },
            cell: { background: '#0f172a', color: '#f1f5f9' },
          }}
        />
      </div>
    </div>
  );
};

export default CalendarCard;
