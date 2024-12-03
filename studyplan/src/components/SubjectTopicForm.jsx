import { useState } from "react";
import axios from "axios";

export function SubjectTopicForm() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [tasks, setTasks] = useState([]);

  const streamSubjects = {
    commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    science: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
    engineering: ["Mechanics", "Thermodynamics", "Computer Science", "Electronics", "Civil Engineering"],
    mbbs: ["Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      subject,
      topic,
      classLevel,
      dueDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
      youtubeResults: [], // Store YouTube results specific to this task
    };

    setTasks((prevTasks) => [...prevTasks, newTask]); // Add task to local state
    setSubject("");
    setTopic("");
    setClassLevel("");
  };

  const addTaskToGoogleCalendar = async (task) => {
    const API_KEY = "AIzaSyBHIxzOf-7hfuUDM19jM6x4AtDEiwrwPCM"; // Replace with your Google Calendar API key
    const calendarId = "primary"; // Use 'primary' for the primary calendar

    // Construct the event object
    const event = {
      summary: `${task.subject} - ${task.topic}`,
      description: `Class Level: ${task.classLevel}`,
      start: {
        dateTime: new Date().toISOString(), // Set the current time as start
      },
      end: {
        dateTime: task.dueDate, // Use the task's due date
      },
    };

    try {
      await axios.post(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${API_KEY}`,
        event,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Event added to Google Calendar:", event);
    } catch (error) {
      console.error("Error adding event to Google Calendar:", error);
    }
  };

  const searchYouTube = async (searchQuery, taskIndex) => {
    const API_KEY = "AIzaSyDQzgCKv49XLKqjohAXxk6xavXyvaPzEp8"; // Replace with your YouTube Data API key
    const baseURL = "https://www.googleapis.com/youtube/v3/search";
    const query = `part=snippet&q=${searchQuery}&type=video&key=${API_KEY}`;

    try {
      const { data } = await axios.get(`${baseURL}?${query}`);
      const validVideos = data.items.filter((video) => video.id.videoId);

      if (validVideos.length > 0) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].youtubeResults = validVideos;
        setTasks(updatedTasks);
      } else {
        console.log("No videos found for the query. Fetching related videos...");
        const { data: fallbackData } = await axios.get(
          `${baseURL}?part=snippet&q=educational&type=video&key=${API_KEY}`
        );
        const relatedVideos = fallbackData.items.filter((video) => video.id.videoId);

        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].youtubeResults = relatedVideos;
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
    }
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };
  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    color: "#333",
    backgroundColor: "#f9f9f9",
  };
  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };
  const taskButtonStyle = {
    padding: "8px 12px",
    marginLeft: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#007bff" }}>
            Add Subject/Topic
          </h2>
          <div>
            <label htmlFor="classLevel">Class Level</label>
            <select
              id="classLevel"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Select Class Level</option>
              <option value="commerce">11 - Commerce</option>
              <option value="science">11 - Science</option>
              <option value="commerce-12">12 - Commerce</option>
              <option value="science-12">12 - Science</option>
              <option value="engineering">Engineering</option>
              <option value="mbbs">MBBS</option>
            </select>
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">Select Subject</option>
              {["commerce", "commerce-12"].includes(classLevel) &&
                streamSubjects.commerce.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              {["science", "science-12"].includes(classLevel) &&
                streamSubjects.science.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              {classLevel === "engineering" &&
                streamSubjects.engineering.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              {classLevel === "mbbs" &&
                streamSubjects.mbbs.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label htmlFor="topic">Topic</label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              style={inputStyle}
              placeholder="Enter topic"
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Add Subject/Topic
          </button>
        </form>

        <div style={{ marginTop: "20px" }}>
          <h3>Your Tasks:</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <strong>{task.subject}</strong> - {task.topic} (Class Level: {task.classLevel}) - Due
                by: {new Date(task.dueDate).toLocaleString()}
                <button
                  onClick={() => searchYouTube(task.topic, index)}
                  style={taskButtonStyle}
                >
                  YouTube Search
                </button>
                {task.youtubeResults.length > 0 && (
                  <div>
                    <h4>YouTube Videos:</h4>
                    <ul>
                      {task.youtubeResults.map((video, idx) => (
                        <li key={idx}>
                          <a
                            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {video.snippet.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ width: "300px", height: "300px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
        <h3 style={{ textAlign: "center", marginBottom: "15px" }}>Google Calendar</h3>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=primary&ctz=UTC"
          style={{ width: "100%", height: "100%", border: "0" }}
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
}
