import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from '../components/usercontext'; // Import the context hook

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Access the context to get the setter functions for global state
  const { setUserId: setGlobalUserId, setPassword: setGlobalPassword } = useUser(); // Correctly destructure

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(`User ID: ${userId}, Password: ${password}`);

    if (!userId || !password) {
      setLoading(false);
      setError("User ID and password are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/checklogin", { userId, password });
      console.log("Backend Response:", response.data);

      if (response.status === 200) {
        const { userType, userId: id, name } = response.data;
        console.log(`Received userType: ${userType}, User ID: ${id}, Name: ${name}`);

        // Save user data in localStorage (optional)
        localStorage.setItem("userType", userType);
        localStorage.setItem("userName", name);
        localStorage.setItem("userId", id);
        localStorage.setItem("password", password);  // Optional: Save password if needed

        // Set the global state for userId and password
        setGlobalUserId(id);
        setGlobalPassword(password);

        setLoading(false);

        if (userType === "student") {
          navigate("/student-home");
        } else if (userType === "alumnus") {
          navigate("/home");
        }
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setError(error.response.data.error || "Invalid credentials or server error");
      } else {
        setError("Server error or unexpected response");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Welcome Back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your User ID"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="mt-4 text-center text-red-500 font-semibold">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
