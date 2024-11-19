import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar component

const ProfilePage = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <div className="w-full bg-white shadow-2xl p-12 mt-5 flex flex-col min-h-screen">
      <div className="flex justify-between items-center border-b-2 pb-8 mb-10">
        <h1 className="text-5xl font-bold text-gray-900">Profile</h1>
        <div className="bg-gray-300 rounded-full p-2">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile Icon"
            className="w-16 h-16 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center mb-14">
        <div className="mr-12">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-40 h-40 rounded-full shadow-lg"
          />
        </div>
        <div className="text-left space-y-4">
          <h2 className="text-4xl font-semibold text-gray-900">AAA</h2>
          <p className="text-xl text-gray-700">Blockchain | AI Expert</p>
          <p className="text-lg text-gray-600">Wipro Inc.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-14">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          onClick={() => navigate("/downloads")} // Add functionality as needed
        >
          Downloads
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          onClick={() => navigate("/edit-profile")} // Add functionality as needed
        >
          Edit Profile
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          onClick={() => navigate("/schedule-meet")} // Navigate to Schedule Meet page
        >
          Schedule Meet
        </button>
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          onClick={() => navigate("/logout")} // Add functionality as needed
        >
          Log Out
        </button>
      </div>

      <Navbar /> {/* Add Navbar here */}
    </div>
  );
};

export default ProfilePage;