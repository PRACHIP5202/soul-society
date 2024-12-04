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

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);

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

const quotes = [
  "Success is the sum of small efforts, repeated day in and day out.",
  "Believe you can and you're halfway there.",
  "The expert in anything was once a beginner.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "Education is the most powerful weapon you can use to change the world.",
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentQuote, setCurrentQuote] = useState(0);

  // Cycle through motivational quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000); // Change quote every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");


    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
    } catch (err) {
      setError(err.message);
    }
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

      {/* Right Half: Login Form */}
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
            Please login to continue
          </p>
          <form onSubmit={handleSubmit}>
            {/* Error message */}
            {error && <p style={errorStyle}>{error}</p>}

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
            Don't have an account?{" "}
            Contact ++00000555551

    <div className='flex min-h-screen bg-gray-100'>
      {/* Left Side: Image + Quotes */}
      <div
        className='hidden lg:flex w-1/2 bg-cover bg-center'
        style={{
          backgroundImage:
            "url('https://st2.depositphotos.com/1177973/9688/i/450/depositphotos_96880176-stock-photo-young-man-reading-book-at.jpg')",
        }}>
        <div className='flex flex-col justify-center w-full h-full p-8 bg-black bg-opacity-50'>
          <h1 className='mb-4 text-4xl font-bold text-white'>Welcome Back!</h1>
          <p className='text-xl italic text-gray-300'>{quotes[currentQuote]}</p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className='flex items-center justify-center w-full lg:w-1/2 p-8'>
        <div className='w-full max-w-md p-8 space-y-6 bg-indigo-50 rounded shadow-md'>
          <h2 className='text-2xl font-bold text-center text-gray-900'>
            Login
          </h2>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200'
                placeholder='Enter your email'
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200'
                placeholder='Enter your password'
              />
            </div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
            <button
              type='submit'
              className='w-full px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200'>
              Login
            </button>
          </form>
          <p className='text-sm text-center text-gray-600'>
            Don’t have an account?{" "}
            <a href='/register' className='text-blue-500 hover:underline'>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
