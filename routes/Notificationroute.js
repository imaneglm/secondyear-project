const express = require('express');
const router = express.Router();

// Import the controller for notifications
const { getNotificationsForPackage } = require('../controller/notificationscontroller');

// Route to get notification for a specific package by its packageId
// This route will retrieve the notification based on the package status
router.get('/', getNotificationsForPackage);

module.exports = router;

