// // import { GoogleGenerativeAI } from "@google/generative-ai";

// // const apiKey = process.env.GEMINI_API_KEY;
// // const genAI = new GoogleGenerativeAI(apiKey);

// // const model = genAI.getGenerativeModel({
// //   model: "gemini-1.5-flash",
// // });

// // const generationConfig = {
// //   temperature: 1,
// //   topP: 0.95,
// //   topK: 40,
// //   maxOutputTokens: 8192,
// //   responseMimeType: "text/plain",
// // };

// // async function run() {
// //   try {
// //     const chatSession = model.startChat({
// //       generationConfig,
// //       history: [],
// //     });

// //     const result = await chatSession.sendMessage("INSERT_INPUT_HERE");

// //     console.log(result.response.text); // Corrected to access the 'text' property
// //   } catch (error) {
// //     console.error("Error during chat session:", error);
// //   }
// // }

// // run();


// import { useState } from "react";
// import axios from "axios";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// import "./GeminiAIChatbot.css";  // Import the updated CSS file


// export function GeminiAIChatbot() {
//   const [userInput, setUserInput] = useState(""); // User input
//   const [chatHistory, setChatHistory] = useState([]); // Chat history for conversation
//   const [loading, setLoading] = useState(false); // Loading state

//   // Function to send input to Gemini API and get response
//   const handleUserInput = async (e) => {
//     e.preventDefault();
//     if (!userInput.trim()) return; // Prevent empty messages

//     setLoading(true);

//     try {
//       // Set up the API call
//       const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Get the key from .env
//       const response = await axios.post(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyD4haSX9Ul6lxdQS34CI2F2ZVb9YCxxOo0", // Replace with actual Gemini API endpoint
//         {
//           model: "gemini-1.5", // Model name (update with actual model if different)
//           messages: [
//             { role: "user", content: userInput },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer AIzaSyD4haSX9Ul6lxdQS34CI2F2ZVb9YCxxOo0`, // Use the API key here
//           },
//         }
//       );

//       // Update chat history with new message
//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { user: userInput, bot: response.data.choices[0].message.content },
//       ]);
//       setUserInput(""); // Clear the input field after sending
//     } catch (error) {
//       console.error("Error fetching data from Gemini API:", error);
//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { user: userInput, bot: "Sorry, something went wrong." },
//       ]);
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };

//   return (
//     <div className="gemini-chatbot-container">
//       <h2>Chat with Gemini AI</h2>

//       {/* Chat History */}
//       <div className="chat-history">
//         {chatHistory.map((chat, index) => (
//           <div key={index} className="chat-message">
//             <div className="user-message">
//               <strong>You:</strong> {chat.user}
//             </div>
//             <div className="bot-message">
//               <strong>Bot:</strong> {chat.bot}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Input Form */}
//       <form onSubmit={handleUserInput} className="chat-form">
//         <textarea
//           placeholder="Ask something..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           rows="4"
//           className="input-textarea"
//         />
//         <button type="submit" className="submit-button" disabled={loading}>
//           {loading ? "Loading..." : "Send"}
//         </button>
//       </form>
//     </div>
//   );
// }



// import { useState } from "react";
// import axios from "axios";
// import "./GeminiAIChatbot.css"; // Import the updated CSS file

// export function GeminiAIChatbot() {
//   const [userInput, setUserInput] = useState(""); // User input
//   const [chatHistory, setChatHistory] = useState([]); // Chat history for conversation
//   const [loading, setLoading] = useState(false); // Loading state

//   // Function to send input to Gemini API and get response
//   const handleUserInput = async (e) => {
//     e.preventDefault();
//     if (!userInput.trim()) return; // Prevent empty messages

//     setLoading(true);

//     try {
//       // Set up the API call
//       const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Get the key from .env
//       const response = await axios.post(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key= AIzaSyD4haSX9Ul6lxdQS34CI2F2ZVb9YCxxOo0", // Correct endpoint
//         {
//           model: "gemini-1.5", // Model name (update with actual model if different)
//           messages: [
//             { role: "user", content: userInput },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer AIzaSyD4haSX9Ul6lxdQS34CI2F2ZVb9YCxxOo0`, // Use the API key from environment variables
//           },
//         }
//       );

//       // Log the full response to check structure
//       console.log(response.data); // Log full response for debugging

//       // Make sure the response format is correct and handle it accordingly
//       if (response.data && response.data.generated_text) {
//         const botResponse = response.data.generated_text; // Assuming 'generated_text' is the correct field

//         // Update chat history with new message
//         setChatHistory((prevHistory) => [
//           ...prevHistory,
//           { user: userInput, bot: botResponse },
//         ]);
//       } else {
//         throw new Error("Invalid response format.");
//       }

//       setUserInput(""); // Clear the input field after sending
//     } catch (error) {
//       console.error("Error fetching data from Gemini API:", error);
//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { user: userInput, bot: "Sorry, something went wrong." },
//       ]);
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };

//   return (
//     <div className="gemini-chatbot-container">
//       <h2>Chat with Gemini AI</h2>

//       {/* Chat History */}
//       <div className="chat-history">
//         {chatHistory.map((chat, index) => (
//           <div key={index} className="chat-message">
//             <div className="user-message">
//               <strong>You:</strong> {chat.user}
//             </div>
//             <div className="bot-message">
//               <strong>Bot:</strong> {chat.bot}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Input Form */}
//       <form onSubmit={handleUserInput} className="chat-form">
//         <textarea
//           placeholder="Ask something..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           rows="4"
//           className="input-textarea"
//         />
//         <button type="submit" className="submit-button" disabled={loading}>
//           {loading ? "Loading..." : "Send"}
//         </button>
//       </form>
//     </div>
//   );
// }





// import { useState } from "react";
// import axios from "axios";
// import "./GeminiAIChatbot.css"; // Import the updated CSS file

// export function GeminiAIChatbot() {
//   const [userInput, setUserInput] = useState(""); // User input
//   const [chatHistory, setChatHistory] = useState([]); // Chat history for conversation
//   const [loading, setLoading] = useState(false); // Loading state

//   // Function to send input to Gemini API and get response
//   const handleUserInput = async (e) => {
//     e.preventDefault();
//     if (!userInput.trim()) return; // Prevent empty messages

//     setLoading(true);

//     try {
//       // Set up the API call
//       const API_KEY = process.env.REACT_APP_GEMINI_API_KEY; // Get the key from .env
//       const response = await axios.post(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDdgMjTJACZbdLAS1aBfKW2GRRadZLvFys", // Correct endpoint
//         {
//           model: "gemini-1.5", // Model name (update with actual model if different)
//           messages: [
//             { role: "user", content: userInput },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `AIzaSyDdgMjTJACZbdLAS1aBfKW2GRRadZLvFys`, // Use the API key from environment variables
//           },
//         }
//       );

//       // Log the full response to check the structure
//       console.log(response.data); // Log full response for debugging

//       // Ensure the response structure is correct
//       if (response.data && response.data.generated_text) {
//         const botResponse = response.data.generated_text; // Assuming 'generated_text' is the correct field

//         // Update chat history with new message
//         setChatHistory((prevHistory) => [
//           ...prevHistory,
//           { user: userInput, bot: botResponse },
//         ]);
//       } else {
//         throw new Error("Invalid response format or missing data.");
//       }

//       setUserInput(""); // Clear the input field after sending
//     } catch (error) {
//       console.error("Error fetching data from Gemini API:", error);
//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { user: userInput, bot: "Sorry, something went wrong." },
//       ]);
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };

//   return (
//     <div className="gemini-chatbot-container">
//       <h2>Chat with  AI</h2>

//       {/* Chat History */}
//       <div className="chat-history">
//         {chatHistory.map((chat, index) => (
//           <div key={index} className="chat-message">
//             <div className="user-message">
//               <strong>You:</strong> {chat.user}
//             </div>
//             <div className="bot-message">
//               <strong>Bot:</strong> {chat.bot}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Input Form */}
//       <form onSubmit={handleUserInput} className="chat-form">
//         <textarea
//           placeholder="Ask something..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           rows="4"
//           className="input-textarea"
//         />
//         <button type="submit" className="submit-button" disabled={loading}>
//           {loading ? "Loading..." : "Send"}
//         </button>
//       </form>
//     </div>
//   );
// }
// export default GeminiAIChatbot;


// import { useState } from "react";
// import axios from "axios";
// import "./GeminiAIChatbot.css"; // Import the updated CSS file

// export function GeminiAIChatbot() {
//   const [userInput, setUserInput] = useState(""); // User input
//   const [chatHistory, setChatHistory] = useState([]); // Chat history for conversation
//   const [loading, setLoading] = useState(false); // Loading state

//   // Function to send input to Gemini API and get response
//   const handleUserInput = async (e) => {
//     e.preventDefault();
//     if (!userInput.trim()) return; // Prevent empty messages

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDBbKEoJ5AXfrTteS3zAL2QYCksuWc0ulM", // Correct endpoint with key
//         {
//           model: "gemini-1.5", // Model name (update with actual model if different)
//           messages: [
//             { role: "user", content: userInput },
//           ],
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer AIzaSyDBbKEoJ5AXfrTteS3zAL2QYCksuWc0ulM`, // Directly use the key here
//           },
//         }
//       );

//       // Log the full response to check the structure
//       console.log(response.data); // Log full response for debugging

//       // Ensure the response structure is correct
//       if (response.data && response.data.generated_text) {
//         const botResponse = response.data.generated_text; // Assuming 'generated_text' is the correct field

//         // Update chat history with new message
//         setChatHistory((prevHistory) => [
//           ...prevHistory,
//           { user: userInput, bot: botResponse },
//         ]);
//       } else {
//         throw new Error("Invalid response format or missing data.");
//       }

//       setUserInput(""); // Clear the input field after sending
//     } catch (error) {
//       console.error("Error fetching data from Gemini API:", error);
//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { user: userInput, bot: "Sorry, something went wrong." },
//       ]);
//     } finally {
//       setLoading(false); // Hide loading state
//     }
//   };

//   return (
//     <div className="gemini-chatbot-container">
//       <h2>Chat with AI</h2>

//       {/* Chat History */}
//       <div className="chat-history">
//         {chatHistory.map((chat, index) => (
//           <div key={index} className="chat-message">
//             <div className="user-message">
//               <strong>You:</strong> {chat.user}
//             </div>
//             <div className="bot-message">
//               <strong>Bot:</strong> {chat.bot}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chat Input Form */}
//       <form onSubmit={handleUserInput} className="chat-form">
//         <textarea
//           placeholder="Ask something..."
//           value={userInput}
//           onChange={(e) => setUserInput(e.target.value)}
//           rows="4"
//           className="input-textarea"
//         />
//         <button type="submit" className="submit-button" disabled={loading}>
//           {loading ? "Loading..." : "Send"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default GeminiAIChatbot;

import { useState } from "react";
import axios from "axios";
import "./GeminiAIChatbot.css"; // Import the updated CSS file
import {GoogleGenerativeAI} from "@google/generative-ai";

export function GeminiAIChatbot() {
    const genAI = new GoogleGenerativeAI("AIzaSyDBbKEoJ5AXfrTteS3zAL2QYCksuWc0ulM");
  const [userInput, setUserInput] = useState(""); // User input
  const [chatHistory, setChatHistory] = useState([]); // Chat history for conversation
  const [loading, setLoading] = useState(false); // Loading state

  // Function to send input to Gemini API and get response
  const handleUserInput = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return; // Prevent empty messages

    setLoading(true);

    try {
    //   const API_KEY = "AIzaSyDBbKEoJ5AXfrTteS3zAL2QYCksuWc0ulM"; // Get the key from .env file

    //   const response = await axios.post(
    //     `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?keyAIzaSyDBbKEoJ5AXfrTteS3zAL2QYCksuWc0ulM`, // Use the API key from env
    //     {
    //       model: "gemini-1.5", // Model name (update with actual model if different)
    //       messages: [
    //         { role: "user", content: userInput },
    //       ],
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer AIzaSyDBbKEoJ5AXfrTteS3zAL2QYCksuWc0ulM`, // Use the API key from env for Authorization header
    //       },
    //     }
    //   );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =`could you please answer this question ${userInput} give me a brief answer`;
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    const reply=result.response.text();
      // Log the full response to check the structure
      // Log full response for debugging

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

  return (
    <div className="gemini-chatbot-container">
      <h2>Chat with AI</h2>

      {/* Chat History */}
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className="chat-message">
            <div className="user-message">
              <strong>You:</strong> {chat.user}
            </div>
            <div className="bot-message">
              <strong>Bot:</strong> {chat.bot}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input Form */}
      <form onSubmit={handleUserInput} className="chat-form">
        <textarea
          placeholder="Ask something..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          rows="4"
          className="input-textarea"
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default GeminiAIChatbot;


