import { CheckBadgeIcon, ClipboardDocumentCheckIcon, ExclamationTriangleIcon, ClockIcon } from '@heroicons/react/24/solid';

const stats = [
  {
    title: "Overall Grade",
    value: "A+",
    icon: <CheckBadgeIcon className="w-6 h-6 text-green-400" />,
    bg: "bg-[#0f172a]",
  },
  {
    title: "Attendance",
    value: "94%",
    icon: <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-400" />,
    bg: "bg-[#0f172a]",
  },
  {
    title: "Assignments Due",
    value: "3",
    icon: <ExclamationTriangleIcon className="w-6 h-6 text-orange-400" />,
    bg: "bg-[#0f172a]",
  },
  {
    title: "Next Exam",
    value: "5 days",
    icon: <ClockIcon className="w-6 h-6 text-purple-400" />,
    bg: "bg-[#0f172a]",
  },
];

const StudentStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center bg-[#0c121c] text-white p-5 rounded-lg shadow-md"
        >
          <div>
            <p className="text-sm text-gray-400">{stat.title}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
          <div className={`${stat.bg} p-2 rounded-md`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentStats;
