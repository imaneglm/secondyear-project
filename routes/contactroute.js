// routes/contactroute.js

const express = require('express');
const router = express.Router();

const { sendMessage } = require('../controller/contactcontroller');

router.post('/', sendMessage);

module.exports = router;
