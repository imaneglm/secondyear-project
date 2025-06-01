const db = require('../config/db');
// controller/packagecontroller.js

const getPackagesByCustomerId = require('../models/packagemodel');


const getPackagesByUserId = async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ success: false, error: 'user_id is required.' });
    }

    try {
        // Step 1: Find the corresponding customer using the user_id
        const customerResult = await db.query(
            'SELECT customer_id FROM customer WHERE user_id = $1',
            [user_id]
        );

        if (customerResult.rowCount === 0) {
            return res.status(404).json({ success: false, error: 'Customer not found.' });
        }

        const customer_id = customerResult.rows[0].customer_id;

        // Step 2: Fetch packages
        const packages = await getPackagesByCustomerId(customer_id);

         if (!packages || packages.length === 0) {
      return res.status(200).json({
        success: true,
        packageCount: 0,
        packages: []
      });
    }

const content = (pkg) => {
  return {
    package_id: pkg.package_id,
    weight: pkg.weight,
    description: pkg.description,
    handling: pkg.handling,
    price: pkg.price,
    category: pkg.category,
    total_price: pkg.total_price,
    droplocation: pkg.droplocation,
    pickuplocation: pkg.pickuplocation,
    pck_state: pkg.pck_state,
    
  };
};


     const filteredPackages = packages.map(pkg => content(pkg));

res.status(200).json({
  success: true,
  packageCount: filteredPackages.length,
  packages: filteredPackages
});


    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal server error.' });
    }
};

module.exports = {
    getPackagesByUserId
};

