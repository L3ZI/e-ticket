import { useState } from "react";
import StudentList from "../components/StudentList";
import "../styles/Homepage.css"; // Import the CSS file

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="homepage-container">
      <div className="content-wrapper">
        {/* Header with improved styling */}
        <header className="page-header">
          <h1 className="page-title">
            Farewell E-Tickets
          </h1>
          <div className="title-underline"></div>
          <p className="header-description">
            Welcome to our digital farewell celebration. Find your name and download your personalized e-ticket.
          </p>
        </header>
        
        {/* Main card with enhanced styling */}
        <div className="main-card">
          <div className="card-header">
            <h2 className="card-title">
              <span className="card-icon">👨‍🎓</span>
              Student List
            </h2>
            <p className="card-subtitle">
              Find your name and click to generate your e-ticket
            </p>
          </div>
          
          {/* Search bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search by name..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearch}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          
          {/* Student list with enhanced container */}
          <div className="student-list-container">
            <StudentList searchQuery={searchQuery} />
          </div>
          
          {/* Info box with enhanced styling */}
          <div className="info-box">
            <p>Can't find your name? Please contact the event organizers.</p>
          </div>
        </div>
        
        {/* Enhanced footer */}
        <footer className="page-footer">
          <p>© {new Date().getFullYear()} Farewell Celebration. All rights reserved.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Contact</a>
            <a href="#" className="footer-link">About</a>
            <a href="#" className="footer-link">Privacy</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;