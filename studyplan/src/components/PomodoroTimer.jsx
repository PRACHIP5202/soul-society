import  { useState, useEffect } from "react";

export function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      if (isBreak) {
        setTime(25 * 60);
        setIsBreak(false);
      } else {
        setTime(5 * 60);
        setIsBreak(true);
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
    setIsBreak(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold text-center'>
        {isBreak ? "Break Time" : "Focus Time"}
      </h2>
      <div className='text-4xl font-bold text-center'>{formatTime(time)}</div>
      <div className='w-full bg-gray-200 rounded-full h-2.5'>
        <div
          className='bg-blue-600 h-2.5 rounded-full'
          style={{ width: `${(time / (isBreak ? 300 : 1500)) * 100}%` }}></div>
      </div>
      <div className='flex justify-center space-x-2'>
        <button
          onClick={toggleTimer}
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className='bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400'>
          Reset
        </button>
      </div>
    </div>
  );
}
