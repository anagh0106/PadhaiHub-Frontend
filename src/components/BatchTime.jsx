import { FaRegCalendarAlt } from 'react-icons/fa';

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
  return (
    <section className="bg-[#0f172a] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          Flexible Batch Timings
        </h2>
        <p className="text-gray-300 mb-10">
          Choose the timing that works best for your schedule
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {batches.map((batch, index) => (
            <div
              key={index}
              className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[#1e40af]/10 p-4 rounded-full">
                  <FaRegCalendarAlt className="text-blue-500 text-3xl" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-1">{batch.title}</h3>
              <p className="text-blue-500 font-medium mb-2">{batch.time}</p>
              <p className="text-sm text-gray-400">{batch.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
