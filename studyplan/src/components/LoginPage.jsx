import { useState, useEffect } from "react";
import { auth } from "../firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const motivationalQuotes = [
  "The only way to do great work is to love what you do.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Your time is limited, don't waste it living someone else's life.",
  "The best way to predict the future is to create it.",
  "It always seems impossible until it's done.",
];

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % motivationalQuotes.length);
    }, 5000); // Change quote every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      onLogin(email); // Notify parent component of successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const cardStyle = {
    width: "100%",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
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
    opacity: 0.9,
  };

  const labelStyle = {
    fontSize: "16px",
    marginBottom: "10px",
  };

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginBottom: "10px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#5FBFF9",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", flexDirection: "row" }}>
      {/* Left Half: Motivational Quotes */}
      <div
        style={{
          width: "50%",
          backgroundImage:
            "url('https://assets.mixkit.co/videos/4761/4761-thumb-360-0.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}>
        <div style={quoteStyle}>
          <p>{motivationalQuotes[quoteIndex]}</p>
        </div>
      </div>

      {/* Right Half: Login Form */}
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div style={cardStyle}>
          <h2
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#5FBFF9",
              fontSize: "64px",
              fontWeight: "bold",
              fontFamily: "serif",
            }}>
            Welcome to StudySphere
          </h2>
          <p
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#666",
            }}>
            Please login to continue
          </p>
          <form onSubmit={handleLogin}>
            {error && <p style={errorStyle}>{error}</p>}
            <div>
              <label htmlFor='email' style={labelStyle}>
                Email ID:
              </label>
              <input
                id='email'
                type='email'
                placeholder='Your email - m@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label htmlFor='password' style={labelStyle}>
                Password:
              </label>
              <input
                id='password'
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <button type='submit' style={buttonStyle}>
              Login
            </button>
          </form>
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              fontSize: "14px",
              color: "#666",
            }}>
            Don't have an account? Contact +00000555551
          </p>
        </div>
      </div>
    </div>
  );
}
