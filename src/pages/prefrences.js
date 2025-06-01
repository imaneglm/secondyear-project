import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../pagesstyle/prefrences.css';

const Preferences = () => {
  const [packages, setPackages] = useState([]);
  const [packageId, setPackageId] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const packageData = JSON.parse(localStorage.getItem('packages'));

    if (!userData || !packageData) {
      setSuccessMessage('User or packages not found in localStorage.');
      return;
    }

    setPackages(packageData);
  }, []);

  const handleSave = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    const user_id = userData?.id;

    if (!packageId || !notes || !day || !time) {
      setSuccessMessage('Please fill in all fields.');
      return;
    }

    
    const combinedPreferences = `Day: ${day}, Time: ${time}, Notes: ${notes}`;

    try {
      await axios.put(
        `http://localhost:5000/api/preferences/${packageId}/preferences`,
        {
          preferences: combinedPreferences,
          user_id: user_id
        },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setSuccessMessage('Preferences updated successfully!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      setSuccessMessage('Failed to save preferences. Please try again.');
    }
  };

  return (
    <div className="preferences-card">
      <h3>Delivery Preferences</h3>

      <label htmlFor="package">Select Package ID:</label>
      <select
        id="package"
        value={packageId}
        onChange={(e) => setPackageId(e.target.value)}
      >
        <option value="">-- Select a Package --</option>
        {packages.map((pkg) => (
          <option key={pkg.package_id} value={pkg.package_id}>
            {pkg.package_id}
          </option>
        ))}
      </select>

      <label htmlFor="day">Preferred Day:</label>
      <input
        type="text"
        id="day"
        placeholder="e.g., Monday"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      />

      <label htmlFor="time">Preferred Time:</label>
      <input
        type="text"
        id="time"
        placeholder="e.g., 14:00"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <label htmlFor="notes">Additional Notes:</label>
      <input
        type="text"
        id="notes"
        placeholder="e.g., Leave at doorstep"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button onClick={handleSave}>Save Preferences</button>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default Preferences;