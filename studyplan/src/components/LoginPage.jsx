import { useState, useEffect } from "react";
import { auth } from "../firebase-config.js";
import { signInWithEmailAndPassword } from "firebase/auth";

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

  return (
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
