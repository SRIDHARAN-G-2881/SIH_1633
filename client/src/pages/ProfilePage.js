import React from "react";
import { useNavigate } from "react-router-dom";
import pro from "../Assets/icon.jpg";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleScheduleMeet = () => {
    navigate("/schedule-meet"); // Navigate to the Schedule Meet page
  };

  const handleEditProfile = () => {
    navigate("/edit-profile"); // Navigate to the Edit Profile page
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear user data
    navigate("/"); // Redirect to Login page
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-12">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b-2 border-gray-400 pb-6 mb-10">
        <h1 className="text-5xl font-bold text-gray-800">Profile</h1>
        <div className="bg-gray-300 rounded-full p-2 shadow-md">
          <img
            src={pro}
            alt="Profile Icon"
            className="w-16 h-16 rounded-full"
          />
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="flex items-center mb-10">
        <div className="mr-10">
          <img
            src={pro}
            alt="Profile"
            className="w-40 h-40 rounded-full shadow-lg object-cover"
          />
        </div>
        <div className="text-left space-y-2">
          <h2 className="text-3xl font-semibold text-gray-800">AAA</h2>
          <p className="text-lg text-gray-600">Blockchain | AI Expert</p>
          <p className="text-lg text-gray-500">Wipro Inc.</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-8 py-10">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md"
          onClick={() => navigate("/downloads")}
        >
          Downloads
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md"
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md"
          onClick={handleScheduleMeet}
        >
          Schedule Meet
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition duration-300 shadow-md"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
