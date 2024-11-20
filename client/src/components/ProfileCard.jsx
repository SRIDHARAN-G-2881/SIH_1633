import React from "react";

const ProfileCard = ({ name, role, company }) => {
  return (
    <div className="relative bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-lg p-4 flex items-center hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Avatar Section */}
      <div className="w-14 h-14 bg-blue-100 rounded-full flex justify-center items-center shadow-md">
        {/* Placeholder for an avatar */}
        <span className="text-blue-500 font-bold text-xl">{name[0]}</span>
      </div>

      {/* Info Section */}
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{role}</p>
        {company && <p className="text-sm text-gray-500 italic">{company}</p>}
      </div>

      {/* Play Button */}
      <button className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.752 11.168l-5.197-3.027A1 1 0 008 9.027v5.946a1 1 0 001.555.832l5.197-3.027a1 1 0 000-1.664z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProfileCard;
