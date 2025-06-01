// Connect to the database
const db =  require('../config/db');

// Import getAllUsers function from user model
const usersmodel = require('../models/usersmodel');

// ===========================
// GET all users for Admin page
// ===========================
exports.getUsers = async (req, res) => {
  try {
    const users = await usersmodel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// ===========================
// Get new users statistics (today, this week, this month)
// ===========================
exports.getNewUsersStats = async (req, res) => {
  try {
    // Get all users' join dates
    const result = await db.query(`SELECT joined_date FROM users`);

    // Get today's date
    const today = new Date();
    
    // Initialize counters
    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    // Loop through all users and calculate stats
    result.rows.forEach(user => {
      const joinedDate = new Date(user.joined_date);

      // Check if the user joined today
      if (joinedDate.toDateString() === today.toDateString()) {
        todayCount++;
      }

      // Check if the user joined in the last 7 days
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      if (joinedDate >= sevenDaysAgo) {
        weekCount++;
      }

      // Check if the user joined in the last 30 days
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      if (joinedDate >= thirtyDaysAgo) {
        monthCount++;
      }
    });

    res.json({
      today: todayCount,
      week: weekCount,
      month: monthCount
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
};

// ===========================
// Create a package by admin
// ===========================
exports.createPackage = async (req, res) => {
  const {
    
    weight,
    description,
    handling,
    category,
    price,
    total_price,
    droplocation,
    pickuplocation,
    office_id,
    pck_state,
    preferences,
    customer_id,
    date,
    Return // Make sure 'Return' column in DB is capitalized
  } = req.body;

  try {
    const query = `
      INSERT INTO packages( weight, description, handling, category, price, total_price, droplocation, pickuplocation, office_id, pck_state, preferences, customer_id, date, Return)
      VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`;

    const values = [
    
      weight,
      description,
      handling,
      category,
      price,
      total_price,
      droplocation,
      pickuplocation,
      office_id,
      pck_state,
      preferences,
      customer_id,
      date,
      Return
    ];

    const result = await db.query(query, values);

    res.status(201).json({
      message: 'Package created successfully.',
      package: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating package:', error);
    res.status(500).json({ message: 'Server error while creating package.' });
  }
};

// ===========================
// Calculate revenue (profit = total_price - price) for today, week, and month
// ===========================
exports.getRevenueStats = async (req, res) => {
  try {
    const todayResult = await db.query(`
      SELECT total_price, price FROM packages 
      WHERE date >= (NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Algiers')::date
        AND date < ((NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Algiers')::date + INTERVAL '1 day')
    `);

    const weekResult = await db.query(`
      SELECT total_price, price FROM packages 
      WHERE date >= (NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Algiers') - INTERVAL '7 days'
    `);

    const monthResult = await db.query(`
      SELECT total_price, price FROM packages 
      WHERE date >= (NOW() AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Algiers') - INTERVAL '1 month'
    `);

    const calculateProfit = (rows) => {
      return rows.reduce((acc, row) => {
        const total = parseFloat(row.total_price ?? 0);
        const price = parseFloat(row.price ?? 0);
        return acc + (total - price);
      }, 0);
    };

    const todayProfit = calculateProfit(todayResult.rows);
    const weekProfit = calculateProfit(weekResult.rows);
    const monthProfit = calculateProfit(monthResult.rows);

    res.json({
      today: todayProfit,
      week: weekProfit,
      month: monthProfit
    });
  } catch (error) {
    console.error('Error fetching revenue stats:', error);
    res.status(500).json({ error: 'Failed to fetch revenue stats' });
  }
};


// ===========================
// Count packages for today, week, and month
// ===========================
exports.getPackageStats = async (req, res) => {
  try {
   
    const todayResult = await db.query(`
      SELECT COUNT(*) FROM packages WHERE date::date = CURRENT_DATE
    `);

   
    const weekResult = await db.query(`
      SELECT COUNT(*) FROM packages WHERE date >= NOW() - INTERVAL '7 days'
    `);

  
    const monthResult = await db.query(`
      SELECT COUNT(*) FROM packages WHERE date >= NOW() - INTERVAL '1 month'
    `);

    res.status(200).json({
      today: parseInt(todayResult.rows[0].count),
      week: parseInt(weekResult.rows[0].count),
      month: parseInt(monthResult.rows[0].count)
    });
  } catch (error) {
    console.error('Error fetching package stats:', error);
    res.status(500).json({ error: 'Failed to fetch package statistics' });
  }
};
// ===========================
// Update package state by ID
// ===========================
exports.updatePackageState = async (req, res) => {
  const { package_id, new_state } = req.body;

  if (!package_id || !new_state) {
    return res.status(400).json({ error: 'Package ID and new state are required.' });
  }

  try {
    const result = await db.query(
      'UPDATE packages SET pck_state = $1 WHERE package_id = $2 RETURNING *',
      [new_state, package_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Package not found.' });
    }

    res.status(200).json({
      message: 'Package state updated successfully.',
      package: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating package state:', error);
    res.status(500).json({ error: 'Failed to update package state' });
  }
};
exports. getAllPackages = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM packages');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching all packages:', error);
        res.status(500).json({ error: 'Failed to fetch packages' });
    }
};
// ===========================
// Search for packages by customer first_name or last_name
// ===========================
exports.searchPackagesByCustomerName = async (req, res) => {
  const searchQuery = req.query.q;

  if (!searchQuery) {
    return res.status(400).json({ message: 'Query parameter "q" is required' });
  }

  try {
    const result = await db.query(
      `
      SELECT p.*
      FROM packages p
      JOIN customer c ON p.customer_id = c.customer_id
      WHERE c.first_name ILIKE $1 OR c.last_name ILIKE $1
      `,
      [`%${searchQuery}%`]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error searching packages by customer name:', error);
    res.status(500).json({ error: 'Failed to search packages' });
  }
};
// Admin creates a new user (no password encryption)
exports.createUser = async (req, res) => {
  try {
    // Extract user fields from the request body
    const { user_name, email, password, phone_number, role } = req.body;

    // Check for existing customer by phone number
    if (role === 'customer') {
      const existing = await db.query(
        'SELECT * FROM users WHERE phone_number = $1 AND role = $2',
        [phone_number, 'customer']
      );

      if (existing.rows.length > 0) {
        return res.status(400).json({
          message: 'A customer with this phone number already exists.'
        });
      }
    }

    // Directly insert user into the database (no validation or encryption)
    const result = await db.query(
      `INSERT INTO users (user_name, email, password, phone_number, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_name, email, password, phone_number, role]
    );

    // Send success response with the created user
    res.status(201).json({
      message: 'User created successfully by admin',
      user: result.rows[0],
    });
  } catch (error) {
    // Log and return server error
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error while creating user' });
  }
};
