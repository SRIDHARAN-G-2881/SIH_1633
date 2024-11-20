import React from "react";
import "./StudentHomePage.css";

const StudentHomePage = () => {
  return (
    <div className="home-page">
      {/* Header Section */}
      <header className="header">
        <h1>Welcome, [Student Name]!</h1>
        <p>
          Connect with our alumni community, seek guidance, and explore
          opportunities to shape your future.
        </p>
      </header>

      {/* AI-Powered Suggestions Section */}
      <section className="ai-suggestions">
        <h2>Recommended Connections</h2>
        <p>
          Based on your interests and career goals, here are some alumni you
          might want to connect with:
        </p>
        <div className="suggestions-container">
          <div className="alumni-card">
            <h3>John Doe</h3>
            <p>Software Engineer at Google</p>
            <p>Specialization: AI & Machine Learning</p>
            <button>Connect</button>
          </div>
          <div className="alumni-card">
            <h3>Jane Smith</h3>
            <p>Entrepreneur & Founder of TechStart</p>
            <p>Specialization: Startups & Innovation</p>
            <button>Connect</button>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="quick-links">
        <h2>Quick Links</h2>
        <div className="links-container">
          <a href="/alumni-directory" className="link-card">
            <h3>Alumni Directory</h3>
            <p>Explore profiles of alumni and their achievements.</p>
          </a>
          <a href="/mentorship" className="link-card">
            <h3>Mentorship Programs</h3>
            <p>Get personalized guidance from alumni.</p>
          </a>
          <a href="/forums" className="link-card">
            <h3>Discussion Forums</h3>
            <p>Join conversations and learn from experiences.</p>
          </a>
          <a href="/events" className="link-card">
            <h3>Upcoming Events</h3>
            <p>Attend alumni meetups, webinars, and more.</p>
          </a>
        </div>
      </section>

      {/* Recent Interactions Section */}
      <section className="recent-interactions">
        <h2>Recent Interactions</h2>
        <ul className="interaction-list">
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
        <a href="/interactions" className="view-all">
          View All Interactions
        </a>
      </section>

      {/* AI Chatbot Section */}
      <section className="chatbot">
        <h2>Need Help?</h2>
        <p>
          Ask our AI-powered assistant for help navigating the platform, finding
          alumni, or getting career advice.
        </p>
        <button className="chatbot-btn">Chat with Assistant</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Technical Education Dept., Rajasthan</p>
      </footer>
    </div>
  );
};

export default StudentHomePage;
