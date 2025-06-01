const express = require('express');
const router = express.Router();

//  call the function of QRcontroller
const { generatePackageQR } = require('../controller/QRcontroller');

// POST route 
// api/route
router.post('/generate-qr', generatePackageQR);
// export the router
module.exports = router;
