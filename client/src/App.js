import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage"; // Login Page
import HomePage from "./pages/HomePage"; // Admin Home Page
import StudentHomePage from "./pages/StudentHomePage"; // Student Home Page
import HistoryPage from "./pages/HistoryPage"; // History of Events
import DocumentsPage from "./pages/DocumentsPage"; // Documents Section
import ProfilePage from "./pages/ProfilePage"; // View Profile
import EditProfilePage from "./pages/EditProfilePage"; // Edit Profile
import ScheduleMeetPage from "./pages/ScheduleMeetPage"; // Schedule Meet

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-200">
        {/* Routes for Navigation */}
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<Login />} />

          {/* Admin Pages */}
          <Route path="/home" element={<HomePage />} />

          {/* Student Pages */}
          <Route path="/student-home" element={<StudentHomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/schedule-meet" element={<ScheduleMeetPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
