const db = require('../config/db');
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../models/usersmodel'); 

const login = async (req, res) => {
  console.log('Login request received with body:', req.body);

  const { user_name, password } = req.body;

  if (!user_name || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'You must enter your information' 
    });
  }

  try {
    const user = await getUserByUsername(user_name);

    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    if (password !== user.password) {
      return res.status(401).json({ 
        success: false,
        message: 'Incorrect password' 
      });
    }

    // Generate JWT
    const token = jwt.sign(
      { 
        id: user.user_id,
        user_name: user.user_name,
        role: user.role 
      },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1d' }
    );

    // Get customer_id using user_id directly (no role check)
    let packages = [];

    const customerResult = await db.query(
      'SELECT customer_id FROM customer WHERE user_id = $1',
      [user.user_id]
    );

    if (customerResult.rowCount > 0) {
      const customerId = customerResult.rows[0].customer_id;

      const packageResult = await db.query(
        'SELECT * FROM packages WHERE customer_id = $1',
        [customerId]
      );

      packages = packageResult.rows;
    }

    res.status(200).json({
      success: true,
      message: 'Successful login',
      token,
      user: {
        id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        role: user.role
      },
      packages
    });

  } catch (err) {
    console.error('Error in login operation:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = { login };
