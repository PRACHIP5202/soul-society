import { useState, useEffect } from "react";

export function TimetableGenerator() {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [startTime, setStartTime] = useState("09:00"); // Default start time (9 AM)

  // Helper function to format time in HH:mm format
  const formatTime = (hours, minutes) => {
    const h = String(hours).padStart(2, "0");
    const m = String(minutes).padStart(2, "0");
    return `${h}:${m}`;
  };

  // Load the saved timetable from localStorage when the component mounts
  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem("timetable"));
    if (savedSubjects) {
      setSubjects(savedSubjects);
      const lastSubject = savedSubjects[savedSubjects.length - 1];
      setStartTime(lastSubject ? lastSubject.endTime : "09:00");
    }
  }, []);

  // Save the timetable to localStorage whenever it changes
  useEffect(() => {
    if (subjects.length > 0) {
      localStorage.setItem("timetable", JSON.stringify(subjects));
    }
  }, [subjects]);

  // Add a subject with allocated time and calculate the end time
  const handleAddSubject = () => {
    if (subject && time) {
      // Convert time input to integer (hours)
      const subjectTime = parseInt(time);

      // Get current hours and minutes from startTime
      let [hours, minutes] = startTime.split(":").map((item) => parseInt(item));

      // Calculate the end time
      const endMinutes = minutes + subjectTime * 60;
      const endHours = hours + Math.floor(endMinutes / 60);
      const endMinutesRemaining = endMinutes % 60;

      const endTime = formatTime(endHours, endMinutesRemaining);

      // Add subject with start and end times
      const newSubject = {
        subject,
        time,
        startTime,
        endTime,
      };

      // Update the subjects list
      setSubjects([...subjects, newSubject]);

      // Calculate the next start time (after the break)
      let breakEndTime = endMinutes + 15; // Adding a 15-minute break
      const breakEndHours = hours + Math.floor(breakEndTime / 60);
      const breakEndMinutes = breakEndTime % 60;

      setStartTime(formatTime(breakEndHours, breakEndMinutes)); // Update the start time for the next subject

      // Clear input fields
      setSubject("");
      setTime("");
    }
  };

  // Handle user logout (clear the timetable data from localStorage)
  const handleLogout = () => {
    localStorage.removeItem("timetable");
    setSubjects([]); // Clear the subjects in the state
  };

  // Styling for the container, table, and individual elements
  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle = {
    backgroundColor: "#f8f9fa",
    padding: "10px",
    borderBottom: "2px solid #dee2e6",
    textAlign: "left",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #dee2e6",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px" }}>Timetable Generator</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Enter your subjects and the time allocated for each subject
      </p>

      {/* Form for adding subjects and time */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "200px",
          }}
        />
        <input
          type="number"
          placeholder="Time (hours)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "100px",
          }}
        />
        <button
          onClick={handleAddSubject}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Subject
        </button>
      </div>

      {/* Display the timetable in a table format */}
      {subjects.length > 0 && (
        <div>
          <h3 style={{ marginBottom: "20px" }}>Your Timetable</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Subject</th>
                <th style={thStyle}>Time (hours)</th>
                <th style={thStyle}>Start Time</th>
                <th style={thStyle}>End Time</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((item, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{item.subject}</td>
                  <td style={tdStyle}>{item.time}</td>
                  <td style={tdStyle}>{item.startTime}</td>
                  <td style={tdStyle}>{item.endTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* If no subjects are added, show a message */}
      {subjects.length === 0 && <p>No subjects added yet.</p>}

      {/* Logout button */}
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Clear
      </button>
    </div>
  );
}
