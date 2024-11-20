import React from 'react';
import Navbar from '../components/Navbar'; // Import Navbar component

const DocumentsPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="p-4 bg-blue-500 text-white text-center font-bold text-lg">
        Docs
      </header>
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold text-gray-800">Job market and how to set yourself apart</h1>
        <p className="text-gray-600 mt-2">2:00 to 4:00 Monday, 20 Aug 2023</p>
        <div className="mt-6 space-y-4">
          <div className="bg-white shadow-md rounded-md p-4 flex justify-between items-center">
            <span className="text-gray-800 font-medium">sample-resume.pdf</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Download
            </button>
          </div>
          <div className="bg-white shadow-md rounded-md p-4 flex justify-between items-center">
            <span className="text-gray-800 font-medium">job-market-analysis.pdf</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Download
            </button>
          </div>
          <div className="bg-white shadow-md rounded-md p-4 flex justify-between items-center">
            <span className="text-gray-800 font-medium">interview-questions.doc</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Download
            </button>
          </div>
        </div>
      </main>
      <Navbar /> {/* Add Navbar here */}
    </div>
  );
};

export default DocumentsPage;
