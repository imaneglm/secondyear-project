const db = require('../config/db');
const QRCode = require('qrcode');

// Controller to generate a QR code for a specific package by package_id
const generatePackageQR = async (req, res) => {
    const { package_id } = req.body;

    // Validate that package_id is provided
    if (!package_id) {
        return res.status(400).json({ success: false, error: 'Package ID is required.' });
    }

    try {
        // Get the package details from the database
        const packageResult = await db.query(
            'SELECT * FROM packages WHERE package_id = $1',
            [package_id]
        );

        if (packageResult.rowCount === 0) {
            return res.status(404).json({ success: false, error: 'Package not found.' });
        }

        const pkg = packageResult.rows[0];

        // Generate QR code from package data
        const qrContent = JSON.stringify({
            package_id:pkg.package_id,
            weight:pkg.weight,
            description:pkg.description,
            handling:pkg.handling,
            price:pkg.price,
            category:pkg.category,
            total_price:pkg.total_price,
            droplocation:pkg.droplocation,
            pickuplocation:pkg.pickuplocation,
            pck_state:pkg.pck_state,

        });
        const qrCode = await QRCode.toDataURL(qrContent);

        // Return the package and its QR code
        res.status(200).json({
            success: true,
            package: pkg,
            qrCode
        });

    } catch (error) {
        console.error('Error generating QR code:', error);
        res.status(500).json({ success: false, error: 'Internal server error while generating QR code.' });
    }
};

module.exports = {
    generatePackageQR
};
