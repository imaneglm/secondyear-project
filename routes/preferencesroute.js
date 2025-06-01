const express = require('express');
const router = express.Router();
const {
  getUserPackages,
  updatePreferences
} = require('../controller/preferencescontroller');

// get the package_id lists
router.get('/:user_id', getUserPackages);

// updating the preferences 
router.put('/:packageId/preferences', updatePreferences);

module.exports = router;

