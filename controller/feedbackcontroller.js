// This array will temporarily store all feedback messages in memory
let feedbackList = [];

// Controller function to handle feedback submission from users
const submitFeedback = (req, res) => {
    const { message } = req.body;

    // Check if the feedback message is provided
    if (!message) {
        return res.status(400).json({ error: "Feedback message is required." });
    }

    // Create a new feedback object with timestamp
    const newFeedback = {
        message,
        createdAt: new Date()
    };

    // Add the new feedback to the list
    feedbackList.push(newFeedback);

    // Log the feedback (for debugging or monitoring purposes)
    console.log("New feedback received:", message);

    // Send success response
    res.status(200).json({ success: true, message: "Thank you for your feedback!" });
};

// Controller function to get all feedbacks (for admin view)
const getAllFeedback = (req, res) => {
    // Return all the stored feedbacks
    res.status(200).json(feedbackList);
};

module.exports = {
    submitFeedback,
    getAllFeedback
};
