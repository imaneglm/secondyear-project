// Import the pool instance from db.js to manage PostgreSQL connection
const pool = require('../config/db');

const getPackagesByCustomerId = async (customer_id) => {
  try {
    const query = `
      SELECT *
      FROM packages
      WHERE customer_id = $1
    `;
    const result = await pool.query(query, [customer_id]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching packages by customer_id:', error);
    throw error;
  }
};

module.exports = getPackagesByCustomerId;


