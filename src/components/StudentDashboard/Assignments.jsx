import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineCloudUpload, AiFillFilePdf } from "react-icons/ai";
import { toast } from "react-toastify";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      fileName: file.name,
      status: "Pending",
      uploadedAt: new Date().toLocaleString(),
    };

    setAssignments([newAssignment, ...assignments]);
    setFile(null);
    toast.success("Assignment uploaded!");
  };

  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto mt-10 text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-400">📚 Assignments</h2>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="file:bg-blue-600 file:text-white file:rounded-lg file:px-4 file:py-2 bg-gray-800 rounded-lg p-2 w-full"
        />
        <button
          onClick={handleUpload}
          className="bg-green-500 hover:bg-green-600 transition-all px-5 py-2 rounded-lg font-medium"
        >
          <AiOutlineCloudUpload className="inline-block mr-2" />
          Upload
        </button>
      </div>

      {assignments.length === 0 ? (
        <p className="text-gray-400">No assignments uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <motion.div
              key={assignment.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <AiFillFilePdf className="text-red-400 text-3xl" />
                <div>
                  <p className="font-semibold">{assignment.fileName}</p>
                  <p className="text-sm text-gray-400">
                    Uploaded: {assignment.uploadedAt}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-sm rounded-full font-medium ${
                  assignment.status === "Pending"
                    ? "bg-yellow-600 text-yellow-200"
                    : "bg-green-600 text-green-200"
                }`}
              >
                {assignment.status}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Assignments;
