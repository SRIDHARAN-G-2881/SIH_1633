import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const Historypage = () => {
  const navigate = useNavigate(); // Ensure useNavigate is imported

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800">Job market and how to set yourself apart</h2>
            <p className="text-gray-600 mt-2">Monday, 20 Aug 2023</p>
            <button
              onClick={() => navigate('/documents')} // Navigate to DocumentsPage
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 mt-4"
            >
              Documents
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800">Introduction to the Technical Industry</h2>
            <p className="text-gray-600 mt-2">Sunday, 22 Mar 2023</p>
            <button
              onClick={() => navigate('/documents')} // Navigate to DocumentsPage
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 mt-4"
            >
              Documents
            </button>
          </div>
        </div>
      </main>
      <Navbar />
    </div>
  );
};

export default Historypage;