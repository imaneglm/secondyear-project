import React, { useState, useEffect, useRef } from 'react';
import '../pagesstyle/aboutus.css';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { MdMarkEmailRead } from "react-icons/md";

function AboutUs() {
  // Form state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }

    // Save form data to localStorage
    localStorage.setItem('contact_name', name);
    localStorage.setItem('contact_email', email);
    localStorage.setItem('contact_message', message);

    try {
      // Send message to backend server
      const response = await axios.post('http://localhost:5000/api/contact', {
        name,
        email,
        message
      });

      console.log(response.data);

      // Open user's default email client with a pre-filled body
      const companyEmail = 'OTDELIEVERY@gmail.com';
      const body = `\n${message}\n${name}`;
      const mailtoLink = `mailto:${companyEmail}?&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      // Clear form and show success message
      setName('');
      setEmail('');
      setMessage('');
      setSuccess(true);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred while sending the message. Please try again later.');
    }
  };

  const mapRef = useRef(null);

  // Initialize Leaflet map with marked the main office with red icon
  useEffect(() => {
    if (mapRef.current) return;

    const batnaCoords = [35.55, 6.1667];
    const map = L.map('batna-map').setView(batnaCoords, 12);
    mapRef.current = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const redIcon = new L.Icon({
      iconUrl: 'https://img.icons8.com/ios-filled/50/ff0000/marker.png',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    L.marker(batnaCoords, { icon: redIcon })
      .addTo(map)
      .bindPopup('<strong>Batna - Main Office</strong>')
      .openPopup();
  }, []);

  return (
    <div className="contact">
      {/* Page Header */}
      <header className="header">
        <h1>About Us</h1>
        <p>All about our delivery company</p>
      </header>

      <div className="contact-content">
        {/* Contact Info Section */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Contact us for any questions or if you are having problems.</p>
          <div className="info-box">
            <h3>📍 Head Office</h3>
            <p>Batna, fisdis</p>
          </div>
          <div className="info-box">
            <h3>📧 Email Us</h3>
            <p>OTDELIEVERY@gmail.com</p>
          </div>
          <div className="info-box">
            <h3>📞 Call Us</h3>
            <p>+213 675647898</p>
            <p>Fax: 03673930</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit">Send Message</button>
            {success && <p className="success-message">Message sent successfully!</p>}
          </form>
        </div>
      </div>
      {/* Leaflet Map Display */}
      <div className="map-container" style={{ marginTop: '20px', height: '300px', width: '100%' }}>
        <div id="batna-map" style={{ height: '100%', width: '100%', borderRadius: '8px' }}></div>
      </div>
      {/* Footer Section */}
      <footer>
        <div className="footerContainer">
          <div className="socialIcons">
            <a href="/"><FaFacebook /></a>
            <a href="/"><FaInstagram /></a>
            <a href="/"><MdMarkEmailRead /></a>
          </div>
          <div className="footerNav">
            <ul>
              <li><a href="/aboutus">About us</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/ouroffices">Offers</a></li>
              <li><a href="/aboutus">Contact Us</a></li>
              <li><a href="/map">Our Offices</a></li>
            </ul>
          </div>
        </div>
        <div className="footerBottom">
          <p>&copy; 2025 Designed by <span className="designer">Imane</span></p>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
