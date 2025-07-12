import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3004/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 sm:px-6 py-6 sm:py-0">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h2 className="text-xl sm:text-2xl mb-4 font-bold text-center">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm sm:text-base mb-3 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            className="w-full mb-3 p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full mb-3 p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="w-full bg-blue-600 text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-base hover:bg-blue-700 transition-colors duration-200"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm sm:text-base">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 underline hover:text-blue-700">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
