const db = require('../config/db');

/**
 * Checks if the phone number belongs to a real customer (i.e., linked to a record in the customers table).
 */
exports.isPhoneInCustomers = async (phone_number) => {
  const query = `
    SELECT c.customer_id
    FROM customer c
    INNER JOIN users u ON c.user_id = u.user_id
    WHERE u.phone_number = $1;
  `;

  const result = await db.query(query, [phone_number]);
  return result.rows.length > 0;
};

