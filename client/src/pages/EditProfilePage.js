import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pro from "../Assets/icon.jpg";

const EditProfilePage = () => {
  const navigate = useNavigate();

  // Load profile data from localStorage if available
  const savedProfile = JSON.parse(localStorage.getItem("profile"));
  const [name, setName] = useState(savedProfile ? savedProfile.name : "AAA");
  const [email, setEmail] = useState(savedProfile ? savedProfile.email : "aaa@example.com");
  const [company, setCompany] = useState(savedProfile ? savedProfile.company : "Wipro Inc.");
  const [expertise, setExpertise] = useState(savedProfile ? savedProfile.expertise : "Blockchain | AI Expert");
  const [image, setImage] = useState(savedProfile ? savedProfile.image : pro);  // Default to previous image or placeholder

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Save the image URL
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    // Create the updated profile object
    const updatedProfile = {
      name,
      email,
      company,
      expertise,
      image,
    };

    // Save the updated profile to localStorage
    localStorage.setItem("profile", JSON.stringify(updatedProfile));

    // Navigate back to the Profile page
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center py-10 px-5">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">Edit Profile</h1>

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-4">
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Upload Button */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="imageUpload"
            className="hidden"  // Hide the default file input
          />
          <label
            htmlFor="imageUpload"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg cursor-pointer hover:bg-blue-700"
          >
            Upload
          </label>
        </div>

        <form className="space-y-4" onSubmit={handleSaveChanges}>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Expertise</label>
            <input
              type="text"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
