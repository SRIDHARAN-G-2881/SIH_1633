import React, { useState } from "react";

const ScheduleMeetPage = () => {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [meridian, setMeridian] = useState("AM");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      const value = i.toString().padStart(2, "0");
      options.push(
        <option key={value} value={value}>
          {value}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="w-full bg-[#F9FAFB] shadow-2xl p-8 mt-5 flex flex-col min-h-screen border border-gray-200 rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Schedule Meet</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-600 text-lg font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#8B8BE0] focus:border-[#8B8BE0]"
            placeholder="Enter title"
          />
        </div>
        <div>
          <label className="block text-gray-600 text-lg font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#8B8BE0] focus:border-[#8B8BE0]"
            placeholder="Enter description"
          />
        </div>

        {/* Time Section */}
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-gray-600 text-lg font-medium mb-2" htmlFor="time">
              Time
            </label>
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="px-4 py-3 border-none focus:outline-none text-lg"
              >
                {generateOptions(1, 12)} {/* Hours */}
              </select>
              <span className="text-xl">:</span>
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="px-4 py-3 border-none focus:outline-none text-lg"
              >
                {generateOptions(0, 59)} {/* Minutes */}
              </select>
              <select
                value={meridian}
                onChange={(e) => setMeridian(e.target.value)}
                className="px-4 py-3 border-none focus:outline-none text-lg"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          {/* Date Section */}
          <div className="w-1/3">
            <label className="block text-gray-600 text-lg font-medium mb-2" htmlFor="date">
              Date
            </label>
            <input
              id="date"
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#8B8BE0] focus:border-[#8B8BE0] text-lg"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow-lg font-medium text-lg"
        >
          Schedule
        </button>
      </form>
    </div>
  );
};

export default ScheduleMeetPage;