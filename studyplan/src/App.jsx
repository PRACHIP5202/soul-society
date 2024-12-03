import { useState } from "react";
import { LoginPage } from "../src/components/LoginPage.jsx";
import { Navbar } from "../src/components/Navbar.jsx";
import { SubjectTopicForm } from "../src/components/SubjectTopicForm.jsx";
import { PomodoroTimer } from "../src/components/PomodoroTimer.jsx";
import { ProgressDashboard } from "../src/components/ProgressDashboard.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("subjects");

  const handleLogin = (email) => {
    // TODO: Implement actual authentication logic
    setUser({ email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
          }}>
          Welcome, {user.email}
        </h1>
        {activeTab === "subjects" && (
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}>
              Add Subject/Topic
            </h2>
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
      </div>
    </div>
  );
}
