const { Pool } = require('pg');
const pool = require('./db');

const getAdminById = async (userId) => {
    const result = await db.query('SELECT * FROM admin WHERE user_id = $1', [userId]);
    return result.rows[0]; 
};

module.exports = { getAdminById };



