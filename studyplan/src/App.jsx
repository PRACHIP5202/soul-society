import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "../src/components/LoginPage.jsx";
import { Navbar } from "../src/components/Navbar.jsx";
import { SubjectTopicForm } from "../src/components/SubjectTopicForm.jsx";
import { PomodoroTimer } from "../src/components/PomodoroTimer.jsx";
import { ProgressDashboard } from "../src/components/ProgressDashboard.jsx";
import { TimetableGenerator } from "../src/components/TimetableGenerator.jsx";
import { GeminiAIChatbot } from "../src/components/GeminiAIChatbot.jsx";

const App = () => {
  // State management for login and active tab
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state
  const [activeTab, setActiveTab] = useState("subjects");

  const handleLogin = () => {
    // Handle login functionality
    setIsLoggedIn(true); // Set logged-in state to true
  };

  const handleLogout = () => {
    // Handle logout functionality
    setIsLoggedIn(false); // Set logged-in state to false
    console.log("User logged out");
  };

  return (
    <Router>
      <div style={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
        {/* Conditional Navbar and Logout */}
        {isLoggedIn && (
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={handleLogout}
          />
        )}

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
          {/* Conditionally render content based on login state */}
          {!isLoggedIn ? (
            <Routes>
              <Route path='/' element={<LoginPage onLogin={handleLogin} />} />
            </Routes>
          ) : (
            <>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                  textAlign: "center",
                }}>
                Welcome to StudySphere
              </h1>

              {/* Conditional rendering based on activeTab */}
              {activeTab === "subjects" && (
                <div>
                  <SubjectTopicForm />
                </div>
              )}

              {activeTab === "pomodoro" && (
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}>
                    Pomodoro Timer
                  </h2>
                  <PomodoroTimer />
                </div>
              )}

              {activeTab === "progress" && (
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}>
                    Progress Dashboard
                  </h2>
                  <ProgressDashboard />
                </div>
              )}

              {activeTab === "TimetableGenerator" && (
                <div>
                  <TimetableGenerator />
                </div>
              )}

              {activeTab === "chatbot" && (
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}>
                    Chat with Gemini AI
                  </h2>
                  <GeminiAIChatbot />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Router>
  );
};

export default App;
