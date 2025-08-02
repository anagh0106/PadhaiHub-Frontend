import React, { useState, useEffect } from "react";
import { ClockIcon, PauseIcon, PlayIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { useForm } from "react-hook-form";

const StudyTimer = () => {
  const [times, setTimes] = useState()
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [check, setCheck] = useState(0);
  const { register, handleSubmit } = useForm()

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
  const submitHandler = (data) => {
    console.log("New Time Is => ", data);

  }
  return (
    <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg text-white flex flex-col h-full justify-between">
      {/* Header */}
      <form method="get" onSubmit={handleSubmit(submitHandler)}>
        <input type="text" placeholder="Enter Your Time" />
        <br /><br />
        <input type="submit" value={"Change Time"} />
      </form>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <ClockIcon className="h-6 w-6 text-blue-400" />
        Pomodoro Timer
      </h2>

      {/* Time Display */}
      <div>
        <p className="text-6xl font-bold text-blue-400 mb-1">{formatTime(timeLeft)}</p>
        <p className="text-sm text-gray-400 mb-6">25 min study session</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 h-2 rounded-full mb-6">
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
            className="bg-white text-[#0f172a] px-4 py-2 rounded-md font-medium hover:bg-gray-200 flex items-center gap-2"
          >
            <PlayIcon className="h-5 w-5" />
            Start
          </button>
        )}
        {check === 1 && (
          <button
            onClick={stopTimer}
            className="bg-white text-[#0f172a] px-4 py-2 rounded-md font-medium hover:bg-gray-200 flex items-center gap-2"
          >
            <PauseIcon className="h-5 w-5" />
            Pause
          </button>
        )}
        {check === 2 && (
          <button
            onClick={resumeTimer}
            className="bg-white text-[#0f172a] px-4 py-2 rounded-md font-medium hover:bg-gray-200 flex items-center gap-2"
          >
            <PlayIcon className="h-5 w-5" />
            Resume
          </button>
        )}
        <button
          onClick={resetTimer}
          className="bg-gray-800 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-700 flex items-center gap-2"
        >
          <ArrowPathIcon className="h-5 w-5" />
          Reset
        </button>
      </div>

      <p className="mt-6 text-sm text-gray-400 text-center">Stay focused and productive!</p>
    </div>
  );
};

export default StudyTimer;
