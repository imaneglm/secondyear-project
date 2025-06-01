const express = require('express'); // Import the Express module
const router = express.Router(); // Create a new router instance

// Import the controller function that calculates the delivery time
const { getDeliveryTime } = require('../controller/intimecontroller');

// Route to get delivery time by package_id
// The package_id is passed as a URL parameter
router.get('/delivery-time/:package_id', getDeliveryTime);

module.exports = router; // Export the router for use in the main application
