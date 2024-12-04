// async function sendMessage() {
//   const userInput = document.getElementById("user-input").value;
//   if (!userInput) return;

//   // Display user input in chatbox
//   displayMessage(userInput, 'user');

//   // Clear the input field
//   document.getElementById("user-input").value = "";

//   // Call Gemini API
//   const response = await getGeminiResponse(userInput);

//   // Display bot's reply
//   displayMessage(response, 'bot');
// }

// function displayMessage(message, sender) {
//   const chatBox = document.getElementById("chat-box");
//   const messageElement = document.createElement("div");
//   messageElement.classList.add(sender);
//   messageElement.innerText = message;
//   chatBox.appendChild(messageElement);
//   chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to latest message
// }

// async function getGeminiResponse(query) {
//   const apiKey = 'AIzaSyDM0SaPGMex_ln5wQZf-O419j9JZZREvqg';  // Replace with your Gemini API key
//   const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDM0SaPGMex_ln5wQZf-O419j9JZZREvqg';  // Replace with actual Gemini API endpoint

//   const response = await fetch(endpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({ query })
//   });

//   const data = await response.json();
//   return data.reply;  // Assuming the API returns a reply field
// }
import { useState, useEffect } from "react";

export function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60); // Default focus time: 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      if (isBreak) {
        setTime(25 * 60); // Reset focus time
        setIsBreak(false); // End break
      } else {
        setTime(5 * 60); // Start break
        setIsBreak(true); // Begin break
      }
      setIsActive(false); // Stop timer once time is up
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
    width: `${(time / (isBreak ? 5 * 60 : 25 * 60)) * 100}%`, // Dynamically calculate progress width
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
