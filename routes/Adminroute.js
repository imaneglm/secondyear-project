const express = require('express');
const router = express.Router();

// controller route
const admincontroller = require('../controller/adminh');



// get all users
router.get('/users', admincontroller.getUsers);

// rout for showing the new users
router.get('/users/stats',  admincontroller.getNewUsersStats);

// create package route
router.post('/create-package',  admincontroller.createPackage);

// revenu route
router.get('/revenue',  admincontroller.getRevenueStats);
// the package stats route
router.get('/package-stats', admincontroller.getPackageStats);
// update packagestat
router.put('/update-package-state', admincontroller.updatePackageState);
// grt all packages
router.get('/packages', admincontroller.getAllPackages);
// searching bar route
router.get('/search-packages', admincontroller.searchPackagesByCustomerName);
// creating users
router.post('/users', admincontroller. createUser);


module.exports = router;
