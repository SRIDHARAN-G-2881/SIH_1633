import React, { useState } from "react";
import axios from "axios";
import { useUser } from "./usercontext.jsx";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const { userId } = useUser(); // Get the logged-in user ID from context

  const fetchRequests = async () => {
    if (userId) {
      try {
        const response = await axios.get(`http://localhost:3000/getrequest/${userId}`);
        setRequests(response.data); // Update state with fetched requests
      } catch (error) {
        console.error("Error fetching requests:", error.response ? error.response.data : error.message);
      }
    }
  };

  const toggleSidebar = () => {
    if (!isSidebarOpen) {
      fetchRequests(); // Fetch requests when opening the sidebar
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAction = async (studentId, alumniId, action) => {
    try {
      // Send the request to the backend with studentId, alumniId, and action
      const response = await axios.post('http://localhost:3000/updateRequest', {
        alumniId: alumniId,
        studentId: studentId,
        action: action,
      });
  
      // Optionally update the UI with the new status
      setRequests((prevRequests) =>
        prevRequests
          .filter((req) => !(req.studentId === studentId && req.alumniId === alumniId)) // Remove the request from the list
      );
  
      // Display a message confirming the action
      alert(`Connection request has been ${action === 'Approved' ? 'accepted' : 'rejected'}`);
  
      console.log('Request updated:', response.data);
    } catch (error) {
      console.error("Error updating request:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <div>
      {/* Header Section */}
      <header className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">SIWA</h1>
        <button
          onClick={toggleSidebar}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Requests
        </button>
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-gray-900 text-white p-6 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
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
              <li key={req.id} className="mb-4 p-4 bg-gray-800 rounded-lg shadow-md">
                <h4 className="font-bold text-lg">
                  {req.studentName} ({req.studentId})
                </h4>
                <p className="text-sm text-gray-300 mt-1">{req.message}</p>
                <p className="text-sm text-gray-400 mt-1">Status: {req.status}</p>
                <div className="mt-2 flex space-x-2">
                <button
               className="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
               onClick={() => handleAction(req.studentId,userId,"Approved")}
                
               >
                Approve
                 </button>
                  <button
                className="bg-red-600 text-white w-full py-2 rounded-lg hover:bg-red-700 text-sm font-medium"
                 onClick={() => handleAction(req.studentId,userId, "Rejected")}

                     >
                   Reject
                    </button>
                        </div>

              </li>
            ))
          ) : (
            <p className="text-gray-400">No pending requests found.</p>
          )}
        </ul>
      </div>

      {/* Backdrop */}
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
