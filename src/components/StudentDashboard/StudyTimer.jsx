import React, { useEffect, useState } from 'react'

const StudyTimer = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 mins
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let timer = null
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((pTime) => pTime - 1)
            }, 1000)
        }
        return clearInterval(timer)
    }, [isRunning, timeLeft])

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };


    return (
        <>
            <h1>Timer</h1>
            <h2>{formatTime(timeLeft)}</h2>
            {isRunning === true
                ?
                <button onClick={() => setIsRunning(false)}>Pause</button >
                :
                <button onClick={() => setIsRunning(true)}>Start</button>
            }
            <button onClick={() => {
                setIsRunning(false);
                setTimeLeft(25 * 60);
            }}>Reset</button>
        </>
    )
}

export default StudyTimer