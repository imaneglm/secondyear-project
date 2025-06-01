const db = require('../config/db');  // import database connection

const getNotificationsForPackage = async (req, res) => {
  const package_id = req.query.packageId;

  if (!package_id) {
    return res.status(400).json({
      success: false,
      message: "Package ID is required"
    });
  }

  try {
    // 1. Get package state and date for the given package_id
    const packageResult = await db.query(
      'SELECT pck_state, date FROM packages WHERE package_id = $1',
      [package_id]
    );

    if (packageResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    const pkg = packageResult.rows[0];

    // 2. Format notification
    const notifications = [{
      message: `Your package with ID "${package_id}" is now ${pkg.pck_state}`,
      createdAt: pkg.date
    }];

    return res.status(200).json({
      success: true,
      notifications
    });

  } catch (error) {
    console.error('Error fetching package notification:', error);
    return res.status(500).json({
      success: false,
      message: 'There was an error retrieving the notification'
    });
  }
};

module.exports = { getNotificationsForPackage };
