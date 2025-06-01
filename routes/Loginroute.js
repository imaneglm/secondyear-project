const express = require ('express');
const router = express.Router();
router.use(express.json());
//controller
// the controller calls the function login means that any order come from this route will be deal with by this route
const {login} = require('../controller/Logincontroller');
//post/api/login
// post define the route of login so if we want to send the order to /login the function will be executed
// here we use post in this route just to make the user to send data by login (enter the email and password)
router.post('/',login)


module.exports = router; // export the router to use in any file