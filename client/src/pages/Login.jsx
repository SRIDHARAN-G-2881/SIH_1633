import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const usersData = [
    { userId: "S101", dob: "11/06/2005", type: "student" },
    { userId: "A101", dob: "26/07/2005", type: "alumnus" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (!userId || !dob) {
        setLoading(false);
        setError("User ID and DOB are required!");
        return;
      }

      const user = usersData.find(
        (user) => user.userId === userId && user.dob === dob
      );

      if (user) {
        localStorage.setItem("userType", user.type);
        localStorage.setItem("userId", user.userId);
        setLoading(false);

        // Redirect based on user type
        if (user.type === "student") {
          navigate("/student-home");
        } else {
          navigate("/home");
        }
      } else {
        setLoading(false);
        setError("Invalid User ID or DOB");
      }
    }, 1000);
  };

  const handleDobChange = (e) => {
    // Enforce DD/MM/YYYY format
    const input = e.target.value;
    const regex = /^(\d{0,2})(\/?)(\d{0,2})(\/?)(\d{0,4})$/;

    const match = input.match(regex);
    if (match) {
      let formattedDob = "";
      if (match[1]) formattedDob += match[1];
      setDob(formattedDob);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your User ID"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500 shadow-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth (DD/MM/YYYY)
            </label>
            <input
              type="text"
              id="dob"
              value={dob}
              onChange={handleDobChange}
              placeholder="DD/MM/YYYY"
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
        {error && (
          <p className="mt-4 text-center text-red-500 font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;