import React, { useState } from "react";
import axios from "axios";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const adminId = "al1"; // Example: adminId

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      fetchPendingRequests(); // Fetch data when sidebar opens
    }
  };

  const fetchPendingRequests = async () => {
    try {
      // Send GET request to the backend to fetch pending requests for this admin
      const response = await axios.get(`http://localhost:3000/getrequest/${adminId}`);
      setRequests(response.data); // Assuming response is an array of requests
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      const response = await axios.post("http://localhost:3000/updateRequest", {
        requestId,
        action, // 'Approved' or 'Rejected'
      });
      alert(response.data.message); // Show success message
      fetchPendingRequests(); // Refresh the list of requests
    } catch (error) {
      console.error("Error updating request:", error);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">SIWA</h1>

        {/* Button to open sidebar */}
        <button
          onClick={toggleSidebar}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Requests
        </button>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <button
          onClick={toggleSidebar}
          className="text-white bg-red-500 px-4 py-2 rounded-lg mb-4 hover:bg-red-600"
        >
          Close
        </button>
        <h2 className="text-lg font-bold mb-4">Requests</h2>

        {/* List of Requests */}
        <ul>
          {requests.length > 0 ? (
            requests.map((req) => (
              <li
                key={req.id}
                className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md"
              >
                <h4 className="font-bold">Student ID: {req.studentId}</h4>
                <p className="text-sm text-gray-400">Message: {req.message}</p>
                <p className="text-sm text-gray-400">Status: {req.status}</p>

                {/* Approve/Reject Buttons */}
                <div className="mt-2 flex space-x-2">
                  <button
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    onClick={() => handleAction(req.id, "Approved")}
                    disabled={req.status !== "Pending"}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    onClick={() => handleAction(req.id, "Rejected")}
                    disabled={req.status !== "Pending"}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No pending requests.</p>
          )}
        </ul>
      </div>

      {/* Backdrop (optional) */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        ></div>
      )}
    </div>
  );
};

export default Header;
