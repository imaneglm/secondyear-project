const db = require('../config/db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { getUserByEmail, createUser } = require('../models/usersmodel');
const { isPhoneInCustomers } = require('../models/customermodel'); // Import the customer check

/**
 * Registers a new user.
 * If the phone number is not found in the `customers` table, the user is treated as a visitor.
 */
exports.signup = async (req, res) => {
  const { user_name, phone_number, email, password } = req.body;

  // Check for missing required fields
  if (!user_name || !phone_number || !email || !password) {
    return res.status(400).json({ message: 'Please enter all required fields.' });
  }

  // Validate phone number format (must be exactly 10 digits)
  if (!/^\d{10}$/.test(phone_number)) {
    return res.status(400).json({ message: 'Phone number must be exactly 10 digits.' });
  }

  try {
    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    // Check if the phone number belongs to an actual customer
    const isCustomer = await isPhoneInCustomers(phone_number);
    

if (isCustomer) {
  return res.status(409).json({
    message: 'This phone number is already registered as a customer. Please login instead.',
  });
}

    // Create the new user in the `users` table
    const newUser = await createUser({
      user_name,
      phone_number,
      email,
      password, // Should be hashed (e.g., using bcrypt)
      role: 'customer'
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        user_id: newUser.user_id,
        email: newUser.email,
        role: 'customer'
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Response message based on customer status
    const message = isCustomer
      ? 'Customer registered successfully.'
      : 'Customer registered successfully as a visitor (not linked to any packages yet).';

    // Send successful response
    res.status(201).json({
      message,
      user: {
        user_id: newUser.user_id,
        user_name: newUser.user_name,
        email: newUser.email,
        phone_number: newUser.phone_number,
      },
      token,
    });

  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error during signup.' });
  }
};
