import React from 'react';
import axios from 'axios';

const AlumniDirectory = () => {
  const [alumniData, setAlumniData] = React.useState([]);
  const [pendingRequests, setPendingRequests] = React.useState({});

  React.useEffect(() => {
    const storedData = localStorage.getItem("alumniData");
    if (storedData) {
      setAlumniData(JSON.parse(storedData));
    }
  }, []);

  // Handle "Connect" button click
  const handleConnect = async () => {
    const alumniId="al1"
    try {
      const studentId = "mounees"; // Use the logged-in student's ID (e.g., from localStorage or context)
      const message = "Iam mounees and i need to connect with you";

      // Optimistically update the UI to show pending status
      setPendingRequests((prevState) => ({
        ...prevState,
        [alumniId]: true, // Mark the alumni as having a pending request
      }));

      // Send the connection request to the server
      const response = await axios.post('http://localhost:3000/connect', {
        studentId,
        alumniId,
        message,
      });

      // Show success message
      alert(response.data.message);

      // Optionally, update the pending request status after the response if needed (e.g., to reset after some time)
    } catch (error) {
      console.error("Error sending connection request:", error);

      // Revert the optimistic update if the request fails
      setPendingRequests((prevState) => ({
        ...prevState,
        [alumniId]: false,
      }));

      alert("Failed to send connection request.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-blue-600 text-white p-8">
        <h1 className="text-3xl font-bold">Alumni Directory</h1>
        <p className="mt-2 text-lg">
          Explore profiles of alumni and their achievements.
        </p>
      </header>

      <section className="py-8 px-6">
        <h2 className="text-2xl font-semibold text-blue-600">Alumni List</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {alumniData.length > 0 ? (
            alumniData.map((alumnus) => (
              <div key={alumnus._id} className="p-4 bg-white shadow rounded-lg">
                <h3 className="text-xl font-semibold">{alumnus.Name}</h3>
                <p className="text-gray-700">{alumnus.JobRole}</p>
                <p className="text-sm text-gray-500">{alumnus.email}</p>

                {/* Render the connect button or the pending status */}
                {pendingRequests[alumnus._id] ? (
                  <span className="text-sm text-yellow-600 mt-2 block">Pending...</span>
                ) : (
                  <button
                    onClick={() => handleConnect(alumnus._id)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Connect
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No alumni data available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AlumniDirectory;
