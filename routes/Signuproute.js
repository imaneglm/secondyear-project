// library of express
const express = require('express');
// express router
const router = express.Router();
// calling the signupcontroller
const {signup} = require('../controller/Signupcontroller');

router.post('/signup',signup);
// exporting the route
module.exports = router;