import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ time, date, title }) => {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate("/history");
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-lg p-6 flex items-center justify-between w-full max-w-3xl mx-auto">
      {/* Left Section (Time and Date) */}
      <div className="flex flex-col items-center justify-between text-center w-1/2 h-full space-y-2">
        <div>
          <p className="text-2xl font-bold text-gray-800">{time}</p>
          <p className="text-lg text-gray-600">{date}</p>
        </div>
        <button className="mt-auto bg-gray-800 text-white text-sm px-6 py-2 rounded-lg shadow hover:bg-gray-900">
          View
        </button>
      </div>

      {/* Divider */}
      <div className="h-24 w-px bg-gray-300"></div>

      {/* Right Section (Title) */}
      <div className="flex flex-col items-center justify-between text-center w-1/2 h-full space-y-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        </div>
        <br></br>

        <button
          className="mt-auto bg-gray-800 text-white text-sm px-6 py-2 rounded-lg shadow hover:bg-gray-900"
          onClick={handleHistoryClick}
        >
          History
        </button>
      </div>
    </div>
  );
};

export default EventCard;
