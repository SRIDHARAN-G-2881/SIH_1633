import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 px-6">
        <ul className="flex justify-between items-center">
          <li>
            <Link
              to="/"
              className={`hover:text-gray-300 ${
                location.pathname === "/" ? "text-blue-500" : ""
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </Link>
          </li>
          <li>
            <button
              onClick={toggleChatbot}
              className="hover:text-gray-300 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 12H7a1 1 0 010-2h2a1 1 0 010 2zm4-2H11a1 1 0 000 2h2a1 1 0 000-2zm-3-7a8 8 0 110 16H5a1 1 0 01-.894-1.447L5.618 13H5a1 1 0 110-2h2a1 1 0 01.894.553L10 15h2a6 6 0 10-1.292-11.657A1 1 0 0111 5H9a1 1 0 01-1-1V4z" />
              </svg>
            </button>
          </li>
          <li>
            <Link
              to="/profile"
              className={`hover:text-gray-300 ${
                location.pathname === "/profile" ? "text-blue-500" : ""
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Chatbot Popup */}
      {isChatbotOpen && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg w-full max-w-sm md:max-w-md p-4 flex flex-col space-y-4 h-[450px]"> {/* Increased height here */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Chatbot</h2>
            <button
              onClick={toggleChatbot}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="text-gray-600">
              {/* Sample Chat Messages */}
              <p className="mb-2">Hi! How can I assist you today?</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
