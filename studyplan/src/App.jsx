// import { useState } from "react";
// import { LoginPage } from "../src/components/LoginPage.jsx";
// import { Navbar } from "../src/components/Navbar.jsx";
// import { SubjectTopicForm } from "../src/components/SubjectTopicForm.jsx";
// import { PomodoroTimer } from "../src/components/PomodoroTimer.jsx";
// import { ProgressDashboard } from "../src/components/ProgressDashboard.jsx";
// import { auth } from "./firebase-config.js"; // Adjust the path to your firebase-config.js
// import { signInWithEmailAndPassword } from "firebase/auth";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("subjects");

//   const handleLogin = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       setUser({ email: userCredential.user.email });
//     } catch (error) {
//       console.error("Login failed:", error.message);
//     }
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   if (!user) {
//     return <LoginPage onLogin={handleLogin} />;
//   }

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
//       <Navbar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         onLogout={handleLogout}
//       />
//       <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
//         <h1
//           style={{
//             fontSize: "24px",
//             fontWeight: "bold",
//             marginBottom: "20px",
//             textAlign: "center",
//           }}>
//           Welcome, {user.email}
//         </h1>
//         {activeTab === "subjects" && (
//           <div>
//             <h2
//               style={{
//                 fontSize: "20px",
//                 fontWeight: "bold",
//                 marginBottom: "10px",
//               }}>
//               Add Subject/Topic
//             </h2>
//             <SubjectTopicForm />
//           </div>
//         )}
//         {activeTab === "pomodoro" && (
//           <div>
//             <h2
//               style={{
//                 fontSize: "20px",
//                 fontWeight: "bold",
//                 marginBottom: "10px",
//               }}>
//               Pomodoro Timer
//             </h2>
//             <PomodoroTimer />
//           </div>
//         )}
//         {activeTab === "progress" && (
//           <div>
//             <h2
//               style={{
//                 fontSize: "20px",
//                 fontWeight: "bold",
//                 marginBottom: "10px",
//               }}>
//               Progress Dashboard
//             </h2>
//             <ProgressDashboard />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage"; // Adjust the path if your Login component is in a different folder.
import { SubjectTopicForm } from "../src/components/SubjectTopicForm.jsx";

const App = () => {
  return (
    <Router>
      <div className='min-h-screen bg-gray-100'>
        <Routes>
          {/* Login Page */}
          <Route path='/' element={<LoginPage />} />
          <Route path='' element={<SubjectTopicForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
