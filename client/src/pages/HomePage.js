import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import ProfileCard from "../components/ProfileCard";
import Navbar from "../components/Navbar";
// import { useUser } from './usercontext.js'; // Import the custom hook
import { useUser } from "../components/usercontext";

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [alumniData, setAlumniData] = useState([]);
  const [acceptedStudents, setAcceptedStudents] = useState([]);

  // Get alumni id and password from the context
  const { id, password } = useUser(); // Use the context to get the current user data

  const updateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString()); 
  };

  // Use effect to set the current time every second
  useEffect(() => {
    updateTime();
    const timeInterval = setInterval(updateTime, 1000); 
    return () => clearInterval(timeInterval); 
  }, []);

  // Fetch alumni data from the backend
  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        // Send GET request with id and password as query parameters
        const response = await axios.get("http://localhost:3000/getAlumni", {
          params: {
            id,
            password,
          },
        });
        if (response.data) {
          setAlumniData([response.data]); // Assuming you want to display a single alumni
          console.log("Alumni Data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching alumni:", error.response ? error.response.data : error.message);
      }
    };

    // Make sure to fetch alumni data if id and password are available
    if (id && password) {
      fetchAlumniData();
    }
  }, [id, password]); // Dependencies: fetch data when id or password changes

  // Fetch accepted students data from the connection database
  useEffect(() => {
    const fetchAcceptedStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/connection", {
          params: { status: "Accepted" },
        });
        if (response.data) {
          setAcceptedStudents(response.data); // Assuming the response contains accepted students
        }
      } catch (error) {
        console.error("Error fetching accepted students:", error);
      }
    };

    fetchAcceptedStudents();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <main className="flex-1 p-6">
        <EventCard
          time={currentTime} 
          date={new Date().toLocaleDateString()} // Show current date
          title="Blockchain & AI in Digital Marketing"
          onViewClick={() => console.log("Navigating to event details")}
          onHistoryClick={() => console.log("Navigating to event history")}
        />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Render alumni data */}
          {alumniData.length > 0 ? (
            alumniData.map((alumni) => (
              <ProfileCard
                key={alumni.id} 
                name={alumni.Name} // Assuming alumni object has 'Name'
                role={`${alumni.JobRole} | ${alumni.location}`} // Combine role and location
                company={alumni.company} // Assuming alumni object has 'company' (if applicable)
                onProfileClick={() => console.log("Navigating to alumni profile page")}
              />
            ))
          ) : (
            <p>No alumni data available.</p>
          )}

          {/* Render accepted students data */}
          {acceptedStudents.length > 0 ? (
            acceptedStudents.map((student) => (
              <ProfileCard
                key={student.studentId} // Assuming each student has 'studentId' as unique key
                name={student.studentName} // Assuming student object has 'studentName'
                role={student.jobRole} // Assuming student has 'jobRole'
                company={student.company} // Assuming student has 'company'
                onProfileClick={() => console.log("Navigating to student profile page")}
              />
            ))
          ) : (
            <p>No accepted students available.</p>
          )}
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default HomePage;
