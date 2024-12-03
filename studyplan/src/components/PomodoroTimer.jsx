import { useState, useEffect } from "react";

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

  const containerStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const timerStyle = {
    fontSize: "48px",
    fontWeight: "bold",
    margin: "20px 0",
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "0 5px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const progressBarStyle = {
    width: "100%",
    height: "20px",
    backgroundColor: "#e0e0e0",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "20px",
  };

  const progressStyle = {
    width: `${(time / (isBreak ? 300 : 1500)) * 100}%`,
    height: "100%",
    backgroundColor: "#28a745",
    transition: "width 0.5s ease-in-out",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
        {isBreak ? "Break Time" : "Focus Time"}
      </h2>
      <div style={timerStyle}>{formatTime(time)}</div>
      <div style={progressBarStyle}>
        <div style={progressStyle}></div>
      </div>
      <div>
        <button onClick={toggleTimer} style={buttonStyle}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          style={{ ...buttonStyle, backgroundColor: "#6c757d" }}>
          Reset
        </button>
      </div>
    </div>
  );
}
