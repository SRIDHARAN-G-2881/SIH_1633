import React from "react";
import axios from "axios";

// Function to handle Alumni directory button click
const handledirectory = async (req, res) => {
  try {
    console.log("directtt");
    const directory = await axios.get('http://localhost:3000/getAlumni');
    console.log(directory);
    localStorage.setItem("alumniData", JSON.stringify(directory.data));
    window.location.href = "/alumnidirectory";
    console.log(directory);
  } catch (error) {
    console.log(error);
  }
};

// Function to handle submit action for connection (example placeholder)
const Handlesubmit = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:5000/connect");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

const StudentHomePage = () => {
  // Retrieve the student name from localStorage
  const userName = localStorage.getItem("userName");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Section */}
      <header className="bg-blue-600 text-white p-8">
        {/* Display the student's name */}
        <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
        <p className="mt-2 text-lg">
          Connect with our alumni community, seek guidance, and explore
          opportunities to shape your future.
        </p>
      </header>

      {/* AI-Powered Suggestions Section */}
      <section className="py-8 px-6">
        <h2 className="text-2xl font-semibold text-blue-600">Recommended Connections</h2>
        <p className="mt-2 text-gray-700">
          Based on your interests and career goals, here are some alumni you
          might want to connect with:
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-gray-700">Software Engineer at Google</p>
            <p className="text-sm text-gray-500">Specialization: AI & Machine Learning</p>
            <button onClick={Handlesubmit} className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Connect
            </button>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-gray-700">Entrepreneur & Founder of TechStart</p>
            <p className="text-sm text-gray-500">Specialization: Startups & Innovation</p>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Connect
            </button>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-8 px-6 bg-gray-100">
        <h2 className="text-2xl font-semibold text-blue-600">Quick Links</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <button onClick={handledirectory} className="border-4  text-lg font-semibold text-blue-600">Alumni Directory
          <p className="text-sm text-gray-600">
            Explore profiles of alumni and their achievements.
          </p>
          </button>
          <a href="/mentorship" className="p-4 bg-white shadow rounded-lg hover:shadow-lg">
            <h3 className="text-lg font-semibold text-blue-600">Mentorship Programs</h3>
            <p className="text-sm text-gray-600">Get personalized guidance from alumni.</p>
          </a>
          <a href="/forums" className="p-4 bg-white shadow rounded-lg hover:shadow-lg">
            <h3 className="text-lg font-semibold text-blue-600">Discussion Forums</h3>
            <p className="text-sm text-gray-600">
              Join conversations and learn from experiences.
            </p>
          </a>
          <a href="/events" className="p-4 bg-white shadow rounded-lg hover:shadow-lg">
            <h3 className="text-lg font-semibold text-blue-600">Upcoming Events</h3>
            <p className="text-sm text-gray-600">
              Attend alumni meetups, webinars, and more.
            </p>
          </a>
        </div>
      </section>

      {/* Recent Interactions Section */}
      <section className="py-8 px-6">
        <h2 className="text-2xl font-semibold text-blue-600">Recent Interactions</h2>
        <ul className="mt-4 list-disc list-inside text-gray-700">
          <li>
            <strong>John Doe</strong> conducted a webinar on <em>AI & Careers</em>.
          </li>
          <li>
            <strong>Jane Smith</strong> hosted a session on{" "}
            <em>Entrepreneurship Challenges</em>.
          </li>
          <li>
            <strong>Alumni Panel</strong> discussed <em>Industry Trends 2024</em>.
          </li>
        </ul>
        <a
          href="/interactions"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          View All Interactions
        </a>
      </section>

      {/* AI Chatbot Section */}
      <section className="py-8 px-6 bg-gray-100">
        <h2 className="text-2xl font-semibold text-blue-600">Need Help?</h2>
        <p className="mt-2 text-gray-700">
          Ask our AI-powered assistant for help navigating the platform, finding
          alumni, or getting career advice.
        </p>
        <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700">
          Chat with Assistant
        </button>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-blue-600 text-white text-center">
        <p>
          &copy; {new Date().getFullYear()} Technical Education Dept., Rajasthan
        </p>
      </footer>
    </div>
  );
};

export default StudentHomePage;
