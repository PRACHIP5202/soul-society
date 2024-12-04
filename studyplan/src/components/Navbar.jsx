// export function Navbar({ activeTab, setActiveTab, onLogout }) {
//   const navStyle = {
//     backgroundColor: "#333",
//     padding: "10px",
//     color: "white",
//   };

//   const containerStyle = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     maxWidth: "1200px",
//     margin: "0 auto",
//   };

//   const buttonStyle = {
//     backgroundColor: "transparent",
//     border: "none",
//     color: "white",
//     cursor: "pointer",
//     marginLeft: "10px",
//     padding: "5px 10px",
//     borderRadius: "4px",
//   };

//   const activeButtonStyle = {
//     ...buttonStyle,
//     backgroundColor: "#555",
//   };

//   return (
//     <nav style={navStyle}>
//       <div style={containerStyle}>
//         <div style={{ fontSize: "20px", fontWeight: "bold" }}>
//           Study Planner
//         </div>
//         <div>
//           <button
//             style={activeTab === "subjects" ? activeButtonStyle : buttonStyle}
//             onClick={() => setActiveTab("subjects")}
//           >
//             Subjects
//           </button>
//           <button
//             style={activeTab === "pomodoro" ? activeButtonStyle : buttonStyle}
//             onClick={() => setActiveTab("pomodoro")}
//           >
//             Pomodoro
//           </button>
//           <button
//             style={activeTab === "progress" ? activeButtonStyle : buttonStyle}
//             onClick={() => setActiveTab("progress")}
//           >
//             Progress
//           </button>
//           {/* <button
//             style={
//               activeTab === "timetableGenerator" ? activeButtonStyle : buttonStyle
//             }
//             onClick={() => setActiveTab("timetableGenerator")}
//           >
//             Time Table Generator
//           </button> */}
//           <button
//             style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
//             onClick={onLogout}
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// import { useState } from "react";

export function Navbar({ activeTab, setActiveTab, onLogout }) {
  const navStyle = {
    backgroundColor: "#333",
    padding: "10px",
    color: "white",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    marginLeft: "10px",
    padding: "5px 10px",
    borderRadius: "4px",
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#555",
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>Study Planner</div>
        <div>
          <button
            style={activeTab === "subjects" ? activeButtonStyle : buttonStyle}
            onClick={() => setActiveTab("subjects")}
          >
            Subjects
          </button>
          {/* <button
            style={activeTab === "pomodoro" ? activeButtonStyle : buttonStyle}
            onClick={() => setActiveTab("pomodoro")}
          >
            Pomodoro
          </button> */}
          {/* <button
            style={activeTab === "progress" ? activeButtonStyle : buttonStyle}
            onClick={() => setActiveTab("progress")}
          >
            Progress
          </button> */}
          <button
            style={activeTab === "TimetableGenerator" ? activeButtonStyle : buttonStyle}
            onClick={() => setActiveTab("TimetableGenerator")}
          >
            Time Table Generator
          </button>
          <button
            style={activeTab === "chatbot" ? activeButtonStyle : buttonStyle}
            onClick={() => setActiveTab("chatbot")}
          >
             AI Chatbot
          </button>
          <button
            style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
