import "./navbar.css";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Sideslide from '../components/sideslide';
import Logo from '../assets/logo.jpg';
//the side bar control of visibaility 
function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="Navbar">
    <div className="left-section">
      <div className="logopart">
        <img src={Logo} alt="TO" />
      </div>
      <div className="logotext">
        <h1>OT Deliveries</h1>
        <p>Get your package on time with us</p>
      </div>
    </div>
    <div className="pagesmenu">
      <Link to="/">Home</Link>
      <Link to="/livetracking">Live Tracking</Link>
      <Link to="/map">Map</Link>
      <Link to="/ouroffers">Our Offers</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/aboutus">About Us</Link>
    </div>
    <button className="sidetoggle" onClick={toggleSidebar}>
      {isSidebarOpen ? '' : '≡'}
    </button>
    <Sideslide isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  </div>
  
  );
}

export default Navbar;
