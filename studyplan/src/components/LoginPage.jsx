import { useState } from "react";


export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic client-side validation (email and password check)
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    
    // Clear error on successful submit attempt
    setError("");
    
    // TODO: Implement actual authentication logic
    onLogin(email, password);
  };

  const cardStyle = {
    width: "350px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
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
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div style={cardStyle}>
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Welcome to Study Planner
        </h2>
        <p style={{ marginBottom: "20px", textAlign: "center", color: "#666" }}>
          Please login to continue
        </p>
        <form onSubmit={handleSubmit}>
          {/* Error message */}
          {error && <p style={errorStyle}>{error}</p>}

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Don't have an account? Contact administrator.
        </p>
      </div>
    </div>
  );
}
