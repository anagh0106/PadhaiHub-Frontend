import React, { useState, useEffect } from "react";

const StudyTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [check, setCheck] = useState(0)

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
        setIsRunning(true)
        setCheck(1)
    }
    const stopTimer = () => {
        setIsRunning(false)
        setCheck(0)
    }
    const resumeTimer = () => {
        setIsRunning(true)
        setCheck(2)
    }
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{formatTime(timeLeft)}</h1>
            <div style={{ marginTop: "20px" }}>
                {check == 0 &&
                    <button onClick={() => startTimer()}>Start</button>}
                {check == 1 && <button onClick={() => stopTimer()}>Pause</button>}
                {check == 2 && <button onClick={() => resumeTimer()}>Resume</button>}

                <button onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(25 * 60);
                    setCheck(0)
                }}>Reset</button>
            </div>
        </div>
    );
};

export default StudyTimer;
