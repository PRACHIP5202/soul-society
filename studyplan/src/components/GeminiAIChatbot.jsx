import { useState } from "react";

export function GeminiAIChatbot() {
  const [messages, setMessages] = useState([
    { user: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (input.trim()) {
      // User message
      const newMessage = { user: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput(""); // Clear input field
      setIsLoading(true); // Start loading

      try {
        // Call to Gemini AI API
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAtBQbt7HnG-6Jys0msHon16aLTze2eRKA", // Replace with correct API key
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "BearerAIzaSyAtBQbt7HnG-6Jys0msHon16aLTze2eRKA",  // Use Bearer authentication
            },
            body: JSON.stringify({ prompt: input }), // Ensure prompt format matches the API requirements
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch response");
        }

        const data = await response.json(); // Assuming the response contains a 'text' or 'reply' property
        console.log(data); // Log the response for debugging

        // Bot's response
        const botReply = {
          user: "bot",
          text: data.reply || "I couldn't understand your request.",
        };

        setMessages((prevMessages) => [...prevMessages, botReply]);
      } catch (error) {
        console.error(error); // Log error for debugging
        // Error message
        const errorMessage = {
          user: "bot",
          text: "Sorry, something went wrong. Please try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false); // End loading
      }
    }
  };

  // Handle the input field change
  const handleChange = (e) => setInput(e.target.value);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3 style={{ textAlign: "center" }}>Gemini AI Chatbot</h3>
      <div
        style={{
          maxHeight: "300px",
          overflowY: "auto",
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.user === "bot" ? "left" : "right",
              margin: "10px 0",
            }}
          >
            <strong>{message.user === "bot" ? "Gemini AI:" : "You:"}</strong>
            <p
              style={{
                display: "inline-block",
                backgroundColor: message.user === "bot" ? "#f1f1f1" : "#007bff",
                color: message.user === "bot" ? "#333" : "#fff",
                padding: "8px 12px",
                borderRadius: "5px",
              }}
            >
              {message.text}
            </p>
          </div>
        ))}

        {/* Show loading indicator when the bot is typing */}
        {isLoading && (
          <div style={{ textAlign: "left", margin: "10px 0" }}>
            <strong>Gemini AI:</strong>
            <p style={{ display: "inline-block", color: "#007bff" }}>
              I am typing...
            </p>
          </div>
        )}
      </div>

      {/* Input and Send button */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Type your message"
          style={{
            flex: "1",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
