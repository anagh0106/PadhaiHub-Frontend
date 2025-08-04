import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const CalendarCard = () => {
  const today = new Date();

  return (
    <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white px-6 py-8 rounded-3xl shadow-2xl w-full max-w-lg mx-auto border border-slate-700">
      <h2 className="text-3xl font-semibold text-center mb-6 text-cyan-400 tracking-wide">
        📅 Science Study Calendar
      </h2>
      
      <div className="rounded-xl shadow-lg border border-slate-600 bg-[#1E293B] p-4 sm:p-6">
        <DayPicker
          mode="single"
          selected={today}
          modifiersClassNames={{
            selected: 'bg-cyan-500 text-white font-semibold rounded-md',
            today: 'text-yellow-400 font-bold underline',
          }}
          styles={{
            caption: { color: '#38bdf8', marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' },
            head_cell: { color: '#f1f5f9', padding: '0.5rem' },
            cell: { padding: '0.75rem', background: '#0f172a', color: '#f1f5f9' },
          }}
        />
      </div>
    </div>
  );
};

export default CalendarCard;
