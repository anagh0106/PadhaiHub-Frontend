// import React from "react";
// import { PieChart, Pie, Cell, Tooltip } from "recharts";
// import { motion } from "framer-motion";

// const data = [
//   { name: "Present", value: 80 },
//   { name: "Absent", value: 20 },
// ];

// const COLORS = ["#10B981", "#F87171"]; // Emerald green + soft red

// // Custom Tooltip that shows ONLY on "Absent"
// const CustomTooltip = ({ active, payload }) => {
//   if (
//     active &&
//     payload &&
//     payload.length &&
//     payload[0].name === "Absent"
//   ) {
//     const { name, value } = payload[0];
//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.3, type: "spring" }}
//         className="bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2 rounded-lg shadow-md"
//       >
//         <p className="font-semibold">{name}</p>
//         <p>{value}%</p>
//       </motion.div>
//     );
//   }

//   return null;
// };

// const AttendanceChart = () => {
//   return (
//     <motion.div
//       className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto"
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="text-xl font-bold text-white mb-4 text-center">
//         Attendance Overview
//       </h2>
//       <div className="flex justify-center items-center relative">
//         <PieChart width={220} height={220}>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             innerRadius={40}
//             outerRadius={70}
//             dataKey="value"
//             paddingAngle={2}
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index]} />
//             ))}
//           </Pie>
//           <Tooltip content={<CustomTooltip />} />
//         </PieChart>

//         {/* Center Label */}
//         <div className="absolute text-center">
//           <p className="text-white text-lg font-semibold">{data[0].value}%</p>
//           <p className="text-gray-400 text-xs">Present</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AttendanceChart;

import React, { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { motion } from "framer-motion";
import ThemeContext from "../context/ThemeContext";

const data = [
  { name: "Present", value: 80 },
  { name: "Absent", value: 20 },
];

const COLORS = ["#10B981", "#F87171"]; // Emerald green + soft red

const CustomTooltip = ({ active, payload }) => {
  if (
    active &&
    payload &&
    payload.length &&
    payload[0].name === "Absent"
  ) {
    const { name, value } = payload[0];
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, type: "spring" }}
        className="bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2 rounded-lg shadow-md"
      >
        <p className="font-semibold">{name}</p>
        <p>{value}%</p>
      </motion.div>
    );
  }

  return null;
};

const AttendanceChart = () => {
  const { theme } = useContext(ThemeContext);

  const colors = {
    containerBg: theme === "light"
      ? "bg-white text-black border border-gray-200"
      : "bg-black text-white border border-white/10",
    heading: theme === "light" ? "text-gray-800" : "text-white",
    centerText: theme === "light" ? "text-gray-800" : "text-white",
    centerSubText: theme === "light" ? "text-gray-500" : "text-gray-400",
  };

  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-lg w-full max-w-sm mx-auto transition-colors duration-500 ${colors.containerBg}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={`text-xl font-bold mb-4 text-center ${colors.heading}`}>
        Attendance Overview
      </h2>
      <div className="flex justify-center items-center relative">
        <PieChart width={220} height={220}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>

        {/* Center Label */}
        <div className="absolute text-center">
          <p className={`text-lg font-semibold ${colors.centerText}`}>
            {data[0].value}%
          </p>
          <p className={`text-xs ${colors.centerSubText}`}>Present</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AttendanceChart;
