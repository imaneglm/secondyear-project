// controllers/preferencesController.js
const pool = require('../config/db');

const updatePreferences = async (req, res) => {
  const { packageId } = req.params;
  const { preferences, user_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE packages SET preferences = $1 WHERE package_id = $2 AND customer_id = $3`,
      [preferences, packageId, user_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Package not found or unauthorized' });
    }

    res.status(200).json({ message: 'Preferences updated successfully' });
  } catch (err) {
    console.error('Error updating preferences:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserPackages = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT package_id FROM packages WHERE customer_id = $1`,
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching packages:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updatePreferences, getUserPackages };
