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
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    backgroundColor: "#ffffff", // Clean white background for the timetable box
    borderRadius: "10px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Poppins', sans-serif", // Modern font family
    backgroundImage: "linear-gradient(135deg, #f5f7fa, #c3cfe2)", // Soft gradient background
  };

  const headerStyle = {
    color: "#2d3e50", // Soft dark blue for header
    fontSize: "30px",
    fontWeight: "600",
    textAlign: "center", // Center the header
    marginBottom: "30px",
  };

  const paragraphStyle = {
    color: "#7b8a99", // Subtle gray text for instructions
    fontSize: "16px",
    marginBottom: "20px",
    textAlign: "center",
  };

  const inputStyle = {
    padding: "12px",
    marginRight: "15px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "250px",
    fontSize: "16px",
    marginBottom: "20px", // Adding margin for spacing
  };

  const buttonStyle = {
    padding: "12px 20px",
    backgroundColor: "#6c63ff", // Soft purple button color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
    marginTop: "10px",
  };

  const buttonHoverStyle = {
    backgroundColor: "#4e4bdb", // Darker purple on hover
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "30px",
  };

  const thStyle = {
    backgroundColor: "#f7f9fc", // Light gray for table header
    padding: "15px",
    borderBottom: "2px solid #e1e8ee",
    textAlign: "left",
    color: "#2d3e50", // Dark text for table header
  };

  const tdStyle = {
    padding: "15px",
    borderBottom: "1px solid #e1e8ee",
    textAlign: "left",
    color: "#7b8a99", // Light gray text for table data
  };

  const logoutButtonStyle = {
    padding: "12px 20px",
    backgroundColor: "#e74c3c", // Red button color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
    transition: "background-color 0.3s",
  };

  const logoutButtonHoverStyle = {
    backgroundColor: "#c0392b", // Darker red on hover
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Timetable Generator</h2>
      <p style={paragraphStyle}>
        Enter your subjects and the time allocated for each subject.
      </p>

      {/* Form for adding subjects and time */}
      <div style={{ textAlign: "center" }}>
        <input
          type='text'
          placeholder='Subject Name'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={inputStyle}
        />
        <input
          type='number'
          placeholder='Time (hours)'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={handleAddSubject}
          style={buttonStyle}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = buttonStyle.backgroundColor)
          }>
          Add Subject
        </button>
      </div>

      {/* Display the timetable in a table format */}
      {subjects.length > 0 && (
        <div>
          <h3
            style={{
              marginBottom: "20px",
              color: "#2d3e50",
              textAlign: "center",
            }}>
            Your Timetable
          </h3>
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
      {subjects.length === 0 && (
        <p style={{ textAlign: "center", color: "#7b8a99" }}>
          No subjects added yet.
        </p>
      )}

      {/* Logout button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleLogout}
          style={logoutButtonStyle}
          onMouseOver={(e) =>
            (e.target.style.backgroundColor =
              logoutButtonHoverStyle.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.target.style.backgroundColor = logoutButtonStyle.backgroundColor)
          }>
          Clear
        </button>
      </div>
    </div>
  );
}
