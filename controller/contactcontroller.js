

// const db = require('../../config/db');

// Array to temporarily store contact messages
let contactMessages = [];

// Function to handle sending a message
const sendMessage = async (req, res) => {
    // Destructuring the message data from the request body
    const { name, email, message } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please enter all your information before submitting." });
    }

    try {
        // Create a new message object with the data received  
        const newMessage = { name, email, message };
        
        // Push the new message to the contactMessages array (temporary storage)
        contactMessages.push(newMessage);

        // Log the received message to the console (for debugging purposes)
        console.log(`Received message from ${name} (${email}): ${message}`);

        // Return a success response to the client
        res.status(200).json({ success: true, message: "Message received successfully!" });
    } catch (error) {
        // In case of any error during the process, log it and return a 500 error response
        console.error('Error receiving message:', error);
        res.status(500).json({ error: "Internal server error." });
    }
};

// Export the sendMessage function to be used in the route
module.exports = { sendMessage };