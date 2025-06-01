import React, { useState, useEffect } from "react";
import { MdOutlineAccessTimeFilled } from "react-icons/md";

function TimePrediction() {
  const [packageId, setPackageId] = useState('');
  const [error, setError] = useState('');
  const [showTime, setShowTime] = useState(false);
  const [packageIds, setPackageIds] = useState([]);

  // Load package IDs from localStorage on component mount
  useEffect(() => {
    const storedPackages = JSON.parse(localStorage.getItem('packages')) || [];
    const ids = storedPackages.map(pkg => String(pkg.package_id));
    setPackageIds(ids);
  }, []);
  // Handle input change
  const handleInputChange = (e) => {
    setPackageId(e.target.value);
  };
  // Handle form submission
  const handleTimePrediction = (e) => {
    e.preventDefault();
    if (!packageId) {
      setError('Package ID is required.');
      setShowTime(false);
      return;
    }
    if (!packageIds.includes(packageId)) {
      setError('you entered a package id that is not yours.');
      setShowTime(false);
      return;
    }
    // If valid
    setError('');
    setShowTime(true);
  };

  return (
    <div className="qr-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Left side icon */}
      <div className="qr-side">
        <MdOutlineAccessTimeFilled size={300} />
      </div>
      {/* Right side content */}
      <div className="qr-side">
        <h2>Expected Time of Arrival</h2>
        <p>
          Please enter your Package ID below to see the predicted arrival time for that package:
        </p>
        <form onSubmit={handleTimePrediction}>
          <label htmlFor="package-id">Package ID</label>
          <input
            type="number"
            id="package-id"
            value={packageId}
            onChange={handleInputChange}
            placeholder="Enter package ID"
          />
          <button type="submit">Predict Time</button>
        </form>
        {/* Display error message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Show static ETA if valid */}
        {showTime && (
          <div>
            <h3>Predicted Arrival Time:</h3>
            <p>Today between 3:00 PM and 5:00 PM</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default TimePrediction;