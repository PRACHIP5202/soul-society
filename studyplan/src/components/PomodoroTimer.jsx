import { useState, useEffect } from "react";

export function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60); // Initial time in seconds
  const [isActive, setIsActive] = useState(false); // Timer active state
  const [isBreak, setIsBreak] = useState(false); // Break state
  const [isFullscreen, setIsFullscreen] = useState(false); // Fullscreen state

  useEffect(() => {
    let interval = null;

    // Handle timer logic
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      // Switch between focus time and break time
      if (isBreak) {
        setTime(25 * 60); // Reset to focus time
        setIsBreak(false);
      } else {
        setTime(5 * 60); // Set to break time
        setIsBreak(true);
      }
      setIsActive(false);
      exitFullScreen(); // Exit fullscreen when timer ends
    }

    return () => {
      if (interval) clearInterval(interval); // Clean up interval on component unmount
    };
  }, [isActive, time, isBreak]);

  useEffect(() => {
    // Prevent tab switch or page reload
    const handleBeforeUnload = (event) => {
      if (isActive) {
        const message = "You have an active timer. Are you sure you want to leave?";
        event.returnValue = message; // Standard for most browsers
        return message; // For some browsers (e.g., Chrome)
      }
    };

    // Event listener for tab visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden && isActive) {
        alert("You switched tabs! The timer has been paused.");
        setIsActive(false); // Pause the timer
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Clean up listeners
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive]);

  // Function to request fullscreen
  const requestFullScreen = () => {
    const element = document.documentElement; // Use the entire page
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen(); // Firefox
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen(); // Chrome, Safari
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen(); // IE/Edge
    }
    setIsFullscreen(true); // Update fullscreen state
  };

  // Function to exit fullscreen
  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen(); // Firefox
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen(); // Chrome, Safari
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen(); // IE/Edge
    }
    setIsFullscreen(false); // Update fullscreen state
  };

  const toggleTimer = () => {
    setIsActive(true); // Automatically start the timer on click
    requestFullScreen(); // Request fullscreen when timer starts
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsActive(false);
    setIsBreak(false);
    if (isFullscreen) {
      exitFullScreen(); // Exit fullscreen on reset
    }
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
          Start
        </button>
        <button
          onClick={resetTimer}
          style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
