import { useState } from "react";

export function SubjectTopicForm() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null); // For tracking the active task

  const streamSubjects = {
    commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    science: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
    engineering: ["Mechanics", "Thermodynamics", "Computer Science", "Electronics", "Civil Engineering"],
    mbbs: ["Anatomy", "Physiology", "Biochemistry", "Pathology", "Pharmacology"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { subject, topic, classLevel };
    setTasks([...tasks, newTask]);
    setSubject("");
    setTopic("");
    setClassLevel("");
  };

  const startTask = (task) => {
    setActiveTask(task);
    window.location.href = "./PomodoroTimer.jsx"; // Redirect to Pomodoro Timer component
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const taskButtonStyle = {
    padding: "5px 10px",
    marginLeft: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Form Inputs */}
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
              streamSubjects.commerce.map((subjectOption) => (
                <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
              ))}
            {["science", "science-12"].includes(classLevel) &&
              streamSubjects.science.map((subjectOption) => (
                <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
              ))}
            {classLevel === "engineering" &&
              streamSubjects.engineering.map((subjectOption) => (
                <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
              ))}
            {classLevel === "mbbs" &&
              streamSubjects.mbbs.map((subjectOption) => (
                <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
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

      {/* Task List */}
      <div style={{ marginTop: "20px" }}>
        <h3>Your Tasks:</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{task.subject}</strong> - {task.topic} (Class Level: {task.classLevel})
              <button onClick={() => startTask(task)} style={taskButtonStyle}>
                Start
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
