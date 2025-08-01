import React, { useState, useEffect } from "react";

const StudyTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);

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

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>{formatTime(timeLeft)}</h1>
            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setIsRunning(true)}>Start</button>
                {isRunning}
                <button onClick={() => setIsRunning(false)}>Stop</button>
                <button onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(25 * 60);
                }}>Reset</button>
            </div>
        </div>
    );
};

export default StudyTimer;
