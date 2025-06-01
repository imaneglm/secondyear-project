const { Pool } = require('pg');
// connscetion to data base 
const db = require('../config/db');

// creating function to get the user by his username from the users data base
// we will use this function in login controllers
const getUserByEmail = async(email)=>{
  const result = await db.query('SELECT*FROM users WHERE email=$1',
    [email]
  );
}
const getUserByUsername = async (user_name) => {
  const result = await db.query(
    'SELECT * FROM users WHERE user_name = $1',
    [user_name]
  );
  console.log('User found:', result.rows[0]);
  return result.rows[0];
};
// Function to check if a phone number exists and the user has 'customer' role
const getUserByPhoneAndRole = async (phone_number) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE phone_number = $1 AND role = $2', [phone_number, 'customer']);
    return result.rows[0]; // return the user if found, or null if not found
  } catch (error) {
    throw error;
  }
};


// function of creating new user 
// using this function in signup controller
const createUser = async (userData) => {
  const { user_name, phone_number, email, password } = userData;

  const query = `
    INSERT INTO users (user_name, phone_number, email, password, role) 
    VALUES ($1, $2, $3, $4, 'customer') RETURNING *`;

  const params = [user_name, phone_number, email, password];

  const result = await db.query(query, params);
  return result.rows[0];
};


const getAllUsers = async () => {
  try {
    const result = await db.query(`
      SELECT 
        u.user_id,  
        u.email, 
        u.phone_number, 
        u.user_name, 
        u.joined_date,
        CASE 
          WHEN c.customer_id IS NOT NULL THEN 'customer'
          WHEN d.delieveryman_id IS NOT NULL THEN 'deliveryman'
          WHEN a.admin_id IS NOT NULL THEN 'admin'
          ELSE 'unknown'
        END AS role
      FROM users u
      LEFT JOIN customer c ON u.user_id = c.user_id
      LEFT JOIN delievery_man d ON u.user_id = d.user_id
      LEFT JOIN admin a ON u.user_id = a.user_id;
    `);
    return result.rows;
  } catch (error) {
    console.error('Error fetching users with roles:', error);
    throw error;
  }
};


module.exports = {
  // exporting the functions to use them in other files 
  getUserByUsername,
  createUser,
  getUserByPhoneAndRole,
  getUserByEmail,
  getAllUsers,
  
};