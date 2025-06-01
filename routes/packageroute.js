const express = require('express');
const router = express.Router();

// Import the controller function
const { getPackagesByUserId } = require('../controller/packagecontroller');

// Route: Get packages by customer's phone number
// This expects a POST request with { phone_number } in the body
router.post('/', getPackagesByUserId);

module.exports = router;
