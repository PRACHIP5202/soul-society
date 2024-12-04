import { useState } from "react";
import { auth } from "../firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created successfully");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label htmlFor='email' className='block mb-1'>
            Email
          </label>
          <input
            id='email'
            type='email'
            placeholder='m@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        <div>
          <label htmlFor='password' className='block mb-1'>
            Password
          </label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>
        <button
          type='submit'
          disabled={loading}
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${
            loading ? "bg-blue-300" : "hover:bg-blue-600"
          }`}>
          {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button
        className='w-full mt-4 text-blue-500 hover:underline'
        onClick={() => setIsLogin(!isLogin)}>
        {isLogin
          ? "Need an account? Sign Up"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}
