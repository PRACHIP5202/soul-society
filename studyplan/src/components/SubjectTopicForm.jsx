import { useState } from "react";

export function SubjectTopicForm() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Submitted:", { subject, topic, difficulty });
    setSubject("");
    setTopic("");
    setDifficulty("medium");
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
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label htmlFor='subject'>Subject</label>
        <input
          id='subject'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder='Enter subject name'
          required
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor='topic'>Topic</label>
        <input
          id='topic'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder='Enter topic name'
          required
          style={inputStyle}
        />
      </div>
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
  );
}
