import  { useState } from "react";

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement Firebase authentication logic
    console.log("Submitted:", { email, password, isLogin });
  };

  return (
    <div className='w-full max-w-md bg-white p-8 rounded-lg shadow-md'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <p className='text-gray-600 text-center mb-6'>
        {isLogin
          ? "Enter your credentials to access your account"
          : "Create a new account to get started"}
      </p>
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
          className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
          {isLogin ? "Login" : "Sign Up"}
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
