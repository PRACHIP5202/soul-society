import { useState } from "react";
import axios from "axios";
import "./subjectForm.css";

export function SubjectTopicForm() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [tasks, setTasks] = useState([]);

  const streamSubjects = {
    commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    science: [
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Computer Science",
    ],
    engineering: [
      "Mechanics",
      "Thermodynamics",
      "Computer Science",
      "Electronics",
      "Civil Engineering",
    ],
    mbbs: [
      "Anatomy",
      "Physiology",
      "Biochemistry",
      "Pathology",
      "Pharmacology",
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      subject,
      topic,
      classLevel,
      dueDate: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
      youtubeResults: [],
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Call the function to add the task to Google Calendar
    addTaskToGoogleCalendar(newTask);

    setSubject("");
    setTopic("");
    setClassLevel("");
  };

  const addTaskToGoogleCalendar = async (task) => {
    const API_KEY = "AIzaSyBHIxzOf-7hfuUDM19jM6x4AtDEiwrwPCM";
    const calendarId = "primary";

    const event = {
      summary: `${task.subject} - ${task.topic}`,
      description: `Class Level: ${task.classLevel}`,
      start: {
        dateTime: new Date().toISOString(),
      },
      end: {
        dateTime: task.dueDate,
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
    const API_KEY = "AIzaSyCkAZnr2hxq62eZ3GFWiUS7NWq0FXGsENg";
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
        console.log(
          "No videos found for the query. Fetching related videos..."
        );
        const { data: fallbackData } = await axios.get(
          `${baseURL}?part=snippet&q=educational&type=video&key=${API_KEY}`
        );
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].youtubeResults = fallbackData.items.filter(
          (video) => video.id.videoId
        );
        setTasks(updatedTasks);
      }
    } catch (error) {
      console.error("Error fetching YouTube data:", error);
    }
  };

  return (
    <div className='subject-topic-container'>
      <div className='form-container'>
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "10px",
            textAlign: "center",
          }}>
          Add Subject/Topic
        </h2>
        <form onSubmit={handleSubmit} className='form-style'>
          <div className='form-group'>
            <label htmlFor='classLevel'>Class Level</label>
            <select
              id='classLevel'
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              required
              className='input-field'>
              <option value=''>Select Class Level</option>
              <option value='commerce'>11 - Commerce</option>
              <option value='science'>11 - Science</option>
              <option value='commerce-12'>12 - Commerce</option>
              <option value='science-12'>12 - Science</option>
              <option value='engineering'>Engineering</option>
              <option value='mbbs'>MBBS</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='subject'>Subject</label>
            <select
              id='subject'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className='input-field'>
              <option value=''>Select Subject</option>
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
          <div className='form-group'>
            <label htmlFor='topic'>Topic</label>
            <input
              id='topic'
              type='text'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className='input-field'
              placeholder='Enter topic'
            />
          </div>
          <button type='submit' className='submit-button'>
            Add Subject/Topic
          </button>
        </form>

        <div className='task-list'>
          <h3>Your Tasks:</h3>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className='task-item'>
                <strong>{task.subject}</strong> - {task.topic} (Class Level:{" "}
                {task.classLevel}) - Due by:{" "}
                {new Date(task.dueDate).toLocaleString()}
                <button
                  onClick={() => searchYouTube(task.topic, index)}
                  className='task-button'>
                  YouTube Search
                </button>
                {task.youtubeResults.length > 0 && (
                  <div className='youtube-results'>
                    <h4>Related YouTube Videos:</h4>
                    <ul>
                      {task.youtubeResults.map((video, idx) => (
                        <li key={idx}>
                          <a
                            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='youtube-link'>
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

      <div className='calendar-container'>
        <h3>Google Calendar</h3>
        <iframe
          src='https://calendar.google.com/calendar/embed?src=primary&ctz=UTC'
          style={{ width: "300px", height: "300px", border: "0" }}
          frameBorder='0'
          scrolling='no'></iframe>
      </div>
    </div>
  );
}
