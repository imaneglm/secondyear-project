import React, { useState, useEffect } from "react";
import "./package.css";
import axios from "axios"; 

// Package component: displays a list of packages for the current logged-in user
const Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetching the packages of the user if they are logged in
  useEffect(() => {
    const fetchPackages = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser?.id; // Retrieve user ID from localStorage

      if (!userId) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/package", {
          user_id: userId,
        });

        // If successful, update state with package data
        if (response.data.success) {
          setPackages(response.data.packages); 
        } else {
          setError(response.data.error || "Failed to fetch packages.");
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Server error while fetching packages.");
      } finally {
        setLoading(false); 
      }
    };

    fetchPackages();
  }, []);

  return (
    <div className="package-container">
      <h2>My Packages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : packages.length === 0 ? (
        <p>No packages available.</p>
      ) : (
        <div className="packages-list">
          {/* Render each package's key-value pairs */}
          {packages.map((pkg) => (
            <div key={pkg.package_id} className="package-card">
              {Object.entries(pkg).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {String(value)}</p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Package;
