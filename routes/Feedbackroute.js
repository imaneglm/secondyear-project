const express = require ('express');
const router = express.Router();

// Import controller functions
const { submitFeedback, getAllFeedback } = require('../controller/feedbackcontroller');

// Route to submit feedback (for customers)
router.post('/feedback', submitFeedback);

// Route to get all feedbacks (for admin)
router.get('/feedbacks', getAllFeedback);

module.exports = router;
