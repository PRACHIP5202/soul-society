import { useState } from "react";
import { auth, GoogleAuthProvider } from "../firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const motivationalQuotes = [
  "The only way to do great work is to love what you do.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Your time is limited, don't waste it living someone else's life.",
  "The best way to predict the future is to create it.",
  "It always seems impossible until it's done.",
];

export default function SignUpPage({ onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Add a name field for sign-up
  const [error, setError] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation (email, password, and name check)
    if (!email || !password || !name) {
      setError("All fields are required.");
      return;
    }

    setError("");

    // Firebase sign-up logic
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignUp(name, email); // Callback after successful sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;
      onSignUp(user.displayName, user.email); // Callback after Google sign-in
    } catch (error) {
      setError(error.message);
    }
  };

  const cardStyle = {
    width: "100%",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    marginTop:"50%",
    height: "100%",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
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

  const quoteStyle = {
    fontStyle: "italic",
    fontWeight: "bold",
    color: "#fff",
    fontSize: "26px",
    position: "absolute",
    top: "60%",
    left: "10%",
    transform: "translateY(-50%)",
    width: "80%",
    textAlign: "center",
    maxWidth: "90%",
    backgroundColor: "#000",
    opacity: 0.9
  };

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "10px",
  };

  // Cycle through the quotes every 5 seconds
  setTimeout(() => {
    setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
  }, 5000);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "row",
      }}
    >
      {/* Left Half: Motivational Quotes */}
      <div
        style={{
          width: "50%",
          backgroundImage: "url('https://assets.mixkit.co/videos/4761/4761-thumb-360-0.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* Motivational Quote */}
        <div style={quoteStyle}>
          <p>{motivationalQuotes[quoteIndex]}</p>
        </div>
      </div>

      {/* Right Half: Sign-Up Form */}
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={cardStyle}>
          <h2 style={{ marginBottom: "20px", textAlign: "center", color:"#5FBFF9", fontSize:"64px", fontWeight:"bold", fontFamily:"serif" }}>
            Welcome to StudySphere
          </h2>
          <p style={{ marginBottom: "20px", textAlign: "center", color: "#666" }}>
            Please sign up to continue
          </p>
          <form onSubmit={handleSubmit}>
            {/* Error message */}
            {error && <p style={errorStyle}>{error}</p>}

            <div>
              <label htmlFor="name" style={labelStyle}>Full Name:</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="email" style={labelStyle}>Email ID:</label>
              <input
                id="email"
                type="email"
                placeholder="Your mail - m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor="password" style={labelStyle}>Password:</label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={buttonStyle}>
              Sign Up
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
            Already have an account? <a href="/login">Login here</a>
          </p>
          <button onClick={handleGoogleSignIn} style={buttonStyle}>
            Sign Up with Google
          </button>
        </div>
      </div>
    </div>
  );
}
