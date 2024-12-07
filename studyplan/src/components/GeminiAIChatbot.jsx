import { useState } from "react";
// import axios from "axios";
import "./GeminiAIChatbot.css"; // Import the updated CSS file
import { GoogleGenerativeAI } from "@google/generative-ai";

export function GeminiAIChatbot() {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDBbKEoJ5AXfrTteS3zAL2QYCksuWc0ulM"
  );
  const [userInput, setUserInput] = useState(""); // User input
  const [chatHistory, setChatHistory] = useState([]); // Chat history for conversation
  const [loading, setLoading] = useState(false); // Loading state

  // Function to send input to Gemini API and get response
  const handleUserInput = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return; // Prevent empty messages

    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Could you please answer this question ${userInput} and give me a brief answer?`;

      const result = await model.generateContent(prompt);
      const reply = result.response.text();

      // Ensure the response structure is correct
      if (reply) {
        const botResponse = reply; // Assuming 'generated_text' is the correct field

        // Update chat history with new message
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { user: userInput, bot: botResponse },
        ]);
      } else {
        throw new Error("Invalid response format or missing data.");
      }

      setUserInput(""); // Clear the input field after sending
    } catch (error) {
      console.error("Error fetching data from Gemini API:", error);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { user: userInput, bot: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Function to handle 'Enter' key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Check for Enter key press without Shift (to prevent new line)
      e.preventDefault(); // Prevent default behavior (new line in textarea)
      handleUserInput(e); // Trigger the message send
    }
  };

  return (
    <div className='gemini-chatbot-container'>
      <h2>Chat with AI</h2>

      {/* Chat History */}
      <div className='chat-history'>
        {chatHistory.map((chat, index) => (
          <div key={index} className='chat-message'>
            <div className='user-message'>
              <strong>You:</strong> {chat.user}
            </div>
            <div className='bot-message'>
              <strong>Bot:</strong> {chat.bot}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input Form */}
      <form onSubmit={handleUserInput} className='chat-form'>
        <textarea
          placeholder='Ask something...'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress} // Listen for key press
          rows='4'
          className='input-textarea'
        />
        <button type='submit' className='submit-button' disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default GeminiAIChatbot;
