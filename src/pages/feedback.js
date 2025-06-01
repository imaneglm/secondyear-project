import "../pagesstyle/feedback.css";
import React, { useState } from "react";
import axios from "axios";

function Feedback() {
  // State to hold the feedback text and a message to show status
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if feedback is not empty or just whitespace
    if (!feedback.trim()) {
      setMessage("Please enter your feedback.");
      return;
    }

    try {
      // Send feedback to the backend
      const response = await axios.post("http://localhost:5000/api/feedback/feedback", {
        message: feedback,
      });

      // If submission is successful, show confirmation and reset input
      if (response.data.success) {
        setMessage(" Feedback submitted successfully!");
        setFeedback(""); // Clear input
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      setMessage("Error occurred while submitting feedback.");
    }
  };

  return (
    <div className="feedback">
      {/* Page title and description */}
      <h1>Give Us Your Feedback</h1>
      <p>Your opinion matters for future platform updates</p>

      {/* Feedback input section */}
      <div className="feedbacksection">
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
        ></textarea>
        
        <button onClick={handleSubmit}>Send</button>

        {/* Display success or error message */}
        {message && <p className="feedback-message">{message}</p>}
      </div>
    </div>
  );
}

export default Feedback;
