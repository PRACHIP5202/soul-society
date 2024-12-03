import { useState } from "react";

export function SubjectTopicForm() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState(""); // Class level dropdown
  const [difficulty, setDifficulty] = useState("easy"); // Difficulty level dropdown
  const [tasks, setTasks] = useState([]); // To store the list of added subjects/topics

  // Predefined subjects for classes 1 to 10
  const classSubjects = {
    1: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    2: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    // ... Add for other classes as needed
  };

  // Predefined subjects for Commerce and Science streams (11th and 12th)
  const streamSubjects = {
    commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    science: [
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Computer Science",
    ],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new task to the list
    const newTask = { subject, topic, classLevel, difficulty };
    setTasks([...tasks, newTask]);

    // Clear input fields
    setSubject("");
    setTopic("");
    setClassLevel("");
    setDifficulty("easy");
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

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Class Level Dropdown */}
        <div>
          <label htmlFor='classLevel'>Class Level</label>
          <select
            id='classLevel'
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            required
            style={inputStyle}>
            <option value=''>Select Class Level</option>
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
            <option value='commerce'>11 - Commerce</option>
            <option value='science'>11 - Science</option>
            <option value='commerce-12'>12 - Commerce</option>
            <option value='science-12'>12 - Science</option>
          </select>
        </div>

        {/* Subject Input */}
        <div>
          <label htmlFor='subject'>Subject</label>
          <select
            id='subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={inputStyle}>
            <option value=''>Select Subject</option>
            {classLevel >= 1 &&
              classLevel <= 10 &&
              classSubjects[classLevel]?.map((subjectOption) => (
                <option key={subjectOption} value={subjectOption}>
                  {subjectOption}
                </option>
              ))}
            {["commerce", "commerce-12"].includes(classLevel) &&
              streamSubjects.commerce.map((subjectOption) => (
                <option key={subjectOption} value={subjectOption}>
                  {subjectOption}
                </option>
              ))}
            {["science", "science-12"].includes(classLevel) &&
              streamSubjects.science.map((subjectOption) => (
                <option key={subjectOption} value={subjectOption}>
                  {subjectOption}
                </option>
              ))}
          </select>
        </div>

        {/* Topic Input */}
        <div>
          <label htmlFor='topic'>Topic</label>
          <input
            id='topic'
            type='text'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            style={inputStyle}
            placeholder='Enter topic'
          />
        </div>

        {/* Difficulty Level Dropdown */}
        <div>
          <label htmlFor='difficulty'>Difficulty</label>
          <select
            id='difficulty'
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={inputStyle}>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>

        <button type='submit' style={buttonStyle}>
          Add Subject/Topic
        </button>
      </form>

      {/* Task List */}
      <div style={{ marginTop: "20px" }}>
        <h3>Your Tasks:</h3>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>
              <strong>{task.subject}</strong> - {task.topic} (Class Level:{" "}
              {task.classLevel}, Difficulty: {task.difficulty})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
