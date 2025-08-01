import React, { useState, useEffect } from "react";

const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [check, setCheck] = useState(0);

  useEffect(() => {
    let timer = null;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    setCheck(1);
  };
  const stopTimer = () => {
    setIsRunning(false);
    setCheck(2);
  };
  const resumeTimer = () => {
    setIsRunning(true);
    setCheck(1);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    setCheck(0);
  };

  return (
    <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg text-white flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <i className="fas fa-clock"></i> Pomodoro Timer
      </h2>

      <p className="text-5xl font-bold text-blue-400 mb-1">
        {formatTime(timeLeft)}
      </p>
      <p className="text-sm text-gray-400 mb-4">25 min study session</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(timeLeft / (25 * 60)) * 100}%` }}
        ></div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        {check === 0 && (
          <button
            onClick={startTimer}
            className="bg-white text-[#0f172a] px-4 py-2 rounded-md font-medium hover:bg-gray-200"
          >
            Start
          </button>
        )}
        {check === 1 && (
          <button
            onClick={stopTimer}
            className="bg-white text-[#0f172a] px-4 py-2 rounded-md font-medium hover:bg-gray-200"
          >
            Pause
          </button>
        )}
        {check === 2 && (
          <button
            onClick={resumeTimer}
            className="bg-white text-[#0f172a] px-4 py-2 rounded-md font-medium hover:bg-gray-200"
          >
            Resume
          </button>
        )}
        <button
          onClick={resetTimer}
          className="bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700"
        >
          Reset
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-400">Stay focused and productive!</p>
    </div>
  );
};

export default StudyTimer;
