import React, { useState, useEffect } from 'react';
import '../components/sideslide.css';
import { useNavigate } from 'react-router-dom';
// the sid bar and standered state of the components it has 
function Sideslide({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState('');

  // Available pages for navigation
  const pages = [
    { value: '', label: 'Select Page' },
    { value: '/notifications', label: 'Notifications' },
    { value: '/feedback', label: 'Feedback' },
    { value: '/qrscanner', label: 'QR Scanner' },
    { value: '/prefrences', label: 'Prefrences' },
    { value: '/time', label: 'Time' }
  ];
//the logout handling 
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
//dark mode controller
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handlePageNavigation = (e) => {
    const selectedPath = e.target.value;
    setSelectedPage(selectedPath);
    if (selectedPath && selectedPath !== '') {
      navigate(selectedPath);
      toggleSidebar(); // Close sidebar after navigation
    }
  };
  //profil photo and name display and  updating handling
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "User");
  const [profilePhoto, setProfilePhoto] = useState(() => localStorage.getItem("profilePhoto") || "");
 
  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);
  useEffect(() => {
    localStorage.setItem("profilePhoto", profilePhoto);
  }, [profilePhoto]);
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Apply or remove dark mode
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`sideslide ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3>User Settings</h3>
          <button className="close-btn" onClick={toggleSidebar}>×</button>
        </div>
        
        <div className="profile">
          <div className="profile-image-container">
            <img
              src={profilePhoto || "https://via.placeholder.com/100"}
              alt="Profile"
              className="profile-image"
            />
            <button
              className="add-photo-btn"
              onClick={() => document.getElementById('photo-upload').click()}
            >
              <span>+</span>
            </button>
          </div>
          
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input"
            placeholder="Enter your name"
          />
        </div>

        {/* Page Navigation */}
        <div className="sidebar-item">
          <label htmlFor="page-select">
            Services pages:
          </label>
          <select
            id="page-select"
            value={selectedPage}
            onChange={handlePageNavigation}
            className="page-selector"
          >
            {pages.map((page) => (
              <option key={page.value} value={page.value}>
                {page.label}
              </option>
            ))}
          </select>
        </div>

        {/* Language Settings */}
        <div className="sidebar-item">
          <label htmlFor="language">
            Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-selector"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <div className="sidebar-item">
          <label className="theme-label">
            Dark Mode:
          </label>
          <label className="switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
            <span className="slider round"></span>
          </label>
        </div>

        {/* Logout Button */}
        <div className="logout-section">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sideslide;