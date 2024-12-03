import { useState } from "react";

export function SubjectTopicForm() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState(""); // Class level dropdown
  const [tasks, setTasks] = useState([]); // To store the list of added subjects/topics

  // Predefined subjects for classes 1 to 10
  const classSubjects = {
    1: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    2: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    3: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    4: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    5: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    6: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    7: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    8: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    9: ["Maths", "English", "Science", "Social Studies", "Kannada"],
    10: ["Maths", "English", "Science", "Social Studies", "Kannada"]
  };

  // Predefined subjects for Commerce and Science streams (11th and 12th)
  const streamSubjects = {
    commerce: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    science: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"]
  };

  // Predefined topics for subjects
  const classTopics = {
    "Maths": ["Algebra", "Geometry", "Trigonometry", "Statistics", "Calculus"],
    "Science": ["Physics", "Chemistry", "Biology", "Earth Science", "Astronomy"],
    "English": ["Grammar", "Literature", "Writing", "Reading Comprehension"],
    "History": ["Ancient History", "Modern History", "World Wars", "Independence"],
    "Geography": ["Physical Geography", "Human Geography", "Climatic Zones", "Mapping"],
    "Kannada": ["Grammar", "Vocabulary", "Poetry", "Translation"],
    "Social Studies": ["Civics", "Economics", "Geography", "History"],
    "Accountancy": ["Journal Entries", "Ledger", "Trial Balance", "Financial Statements"],
    "Business Studies": ["Business Environment", "Marketing", "Finance", "Human Resource Management"],
    "Economics": ["Microeconomics", "Macroeconomics", "Supply and Demand", "Inflation"],
    "Physics": ["Mechanics", "Optics", "Thermodynamics", "Electromagnetism"],
    "Chemistry": ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"],
    "Biology": ["Cell Biology", "Genetics", "Ecology", "Evolution"],
    "Computer Science": ["Algorithms", "Data Structures", "Operating Systems", "Networking"]
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new task to the list
    const newTask = { subject, topic, classLevel };
    setTasks([...tasks, newTask]);

    // Clear input fields
    setSubject("");
    setTopic("");
    setClassLevel("");
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
<<<<<<< HEAD
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Class Level Dropdown */}
        <div>
          <label htmlFor="classLevel" className="block mb-1">Class Level</label>
          <select
            id="classLevel"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Class Level</option>
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
            <option value="commerce">11 - Commerce</option>
            <option value="science">11 - Science</option>
            <option value="commerce-12">12 - Commerce</option>
            <option value="science-12">12 - Science</option>
          </select>
        </div>

        {/* Subject Input (dynamic for Commerce/Science) */}
        <div>
          <label htmlFor="subject" className="block mb-1">Subject</label>
          <select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Subject</option>
            {/* Dynamic subjects for classes 1 to 10 */}
            {classLevel >= 1 && classLevel <= 10 && classSubjects[classLevel]?.map((subjectOption) => (
              <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
            ))}
            {/* Dynamic subjects for Commerce or Science streams */}
            {(classLevel === "commerce" || classLevel === "commerce-12") &&
              streamSubjects.commerce.map((subjectOption) => (
                <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
              ))
            }
            {(classLevel === "science" || classLevel === "science-12") &&
              streamSubjects.science.map((subjectOption) => (
                <option key={subjectOption} value={subjectOption}>{subjectOption}</option>
              ))
            }
            {/* For custom subject */}
            {(classLevel >= 1 && classLevel <= 10) && (
              <option value="custom">Custom Subject</option>
            )}
          </select>
        </div>

        {/* Topic Input - Allow writing instead of dropdown */}
        <div>
          <label htmlFor="topic" className="block mb-1">Topic</label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter topic"
          />
        </div>

        {/* Custom Topic Input */}
        {(topic === "custom-topic") && (
          <div>
            <label htmlFor="customTopic" className="block mb-1">Enter Custom Topic</label>
            <input
              id="customTopic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter custom topic"
            />
          </div>
        )}

        {/* Custom Subject Input */}
        {(subject === "custom") && (
          <div>
            <label htmlFor="customSubject" className="block mb-1">Enter Custom Subject</label>
            <input
              id="customSubject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter custom subject"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Subject/Topic
        </button>
      </form>

      {/* Task List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Your Tasks:</h3>
        <ul className="space-y-3 mt-4">
          {tasks.map((task, index) => (
            <li key={index} className="border p-4 rounded">
              <h4 className="font-semibold">{task.subject} - {task.topic}</h4>
              <p>Class Level: {task.classLevel}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
=======
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
>>>>>>> b2ce0b22c9711868c0d12882f1da5376dd38ff8c
  );
}
