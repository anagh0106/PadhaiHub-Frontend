// import { useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { motion, useMotionValue, useTransform } from "framer-motion";

// const data = [
//   { name: "Maths", value: 85 },
//   { name: "Physics", value: 70 },
//   { name: "Chemistry", value: 90 },
//   { name: "Biology", value: 65 }
// ];

// const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F472B6"];

// const SubjectPerformanceChart = () => {
//   const [activeSegment, setActiveSegment] = useState(null);

//   // For 3D tilt effect on chart
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const rotateX = useTransform(y, [-50, 50], [15, -15]);
//   const rotateY = useTransform(x, [-50, 50], [-15, 15]);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const posX = e.clientX - rect.left - rect.width / 2;
//     const posY = e.clientY - rect.top - rect.height / 2;
//     x.set(posX);
//     y.set(posY);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.div
//       className="bg-gray-900 p-6 rounded-2xl shadow-2xl w-full max-w-5xl mx-auto"
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-wide">
//         Subject Performance
//       </h2>

//       <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//         {/* Info Box */}
//         <motion.div
//           className="bg-gray-800 w-full md:w-1/3 p-6 rounded-xl shadow-lg text-white h-60 flex flex-col justify-center items-start"
//           initial={{ opacity: 0, x: -50, rotateY: -20 }}
//           animate={{ opacity: 1, x: 0, rotateY: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           {activeSegment ? (
//             <>
//               <p className="text-xl font-bold text-blue-400 mb-2">
//                 {activeSegment.name}
//               </p>
//               <p className="text-sm">Score: {activeSegment.value}%</p>
//               <p className="text-xs mt-2 italic text-gray-300">
//                 {activeSegment.value >= 85
//                   ? "🌟 Excellent! Keep it up."
//                   : activeSegment.value >= 70
//                     ? "👍 Good! Little push needed."
//                     : "⚠️ Needs more attention."}
//               </p>
//             </>
//           ) : ""}
//         </motion.div>

//         {/* Pie Chart with 3D motion */}
//         <motion.div
//           className="w-full md:w-2/3 flex justify-center cursor-pointer"
//           style={{ perspective: 1000 }}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={handleMouseLeave}
//         >
//           <motion.div style={{ rotateX, rotateY }}>
//             <ResponsiveContainer width={300} height={300}>
//               <PieChart>
//                 <Pie
//                   data={data}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   innerRadius={40}
//                   dataKey="value"
//                   onMouseEnter={(entry) => setActiveSegment(entry)}
//                   onMouseLeave={() => setActiveSegment(null)}
//                 >
//                   {data.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index]}
//                       stroke="#1F2937"
//                       strokeWidth={2}
//                     />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </motion.div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default SubjectPerformanceChart;


import { useState, useContext } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ThemeContext from "../context/ThemeContext";

const data = [
  { name: "Maths", value: 85 },
  { name: "Physics", value: 70 },
  { name: "Chemistry", value: 90 },
  { name: "Biology", value: 65 },
];

const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F472B6"];

const SubjectPerformanceChart = () => {
  const [activeSegment, setActiveSegment] = useState(null);
  const { theme } = useContext(ThemeContext);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [15, -15]);
  const rotateY = useTransform(x, [-50, 50], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;
    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const colors = {
    bg: theme === "light" ? "bg-white text-black border border-gray-200" : "bg-gray-900 text-white border border-white/10",
    box: theme === "light" ? "bg-gray-100 text-gray-800" : "bg-gray-800 text-white",
    heading: theme === "light" ? "text-gray-800" : "text-white",
    labelText: theme === "light" ? "text-gray-700" : "text-gray-300",
    boxLabel: theme === "light" ? "text-blue-600" : "text-blue-400",
    border: theme === "light" ? "border-gray-300" : "border-gray-700"
  };

  return (
    <motion.div
      className={`p-6 rounded-2xl shadow-2xl w-full max-w-5xl mx-auto transition-colors duration-500 ${colors.bg}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={`text-3xl font-bold mb-8 text-center tracking-wide ${colors.heading}`}>
        Subject Performance
      </h2>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Info Box */}
        <motion.div
          className={`w-full md:w-1/3 p-6 rounded-xl shadow-lg h-60 flex flex-col justify-center items-start transition-colors duration-300 ${colors.box}`}
          initial={{ opacity: 0, x: -50, rotateY: -20 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 0.6 }}
        >
          {activeSegment && (
            <>
              <p className={`text-xl font-bold mb-2 ${colors.boxLabel}`}>
                {activeSegment.name}
              </p>
              <p className="text-sm">Score: {activeSegment.value}%</p>
              <p className={`text-xs mt-2 italic ${colors.labelText}`}>
                {activeSegment.value >= 85
                  ? "🌟 Excellent! Keep it up."
                  : activeSegment.value >= 70
                    ? "👍 Good! Little push needed."
                    : "⚠️ Needs more attention."}
              </p>
            </>
          )}
        </motion.div>

        {/* Pie Chart with 3D Motion */}
        <motion.div
          className="w-full md:w-2/3 flex justify-center cursor-pointer"
          style={{ perspective: 1000 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div style={{ rotateX, rotateY }}>
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  dataKey="value"
                  onMouseEnter={(entry) => setActiveSegment(entry)}
                  onMouseLeave={() => setActiveSegment(null)}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                      stroke={theme === "light" ? "#ffffff" : "#1F2937"}
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SubjectPerformanceChart;
