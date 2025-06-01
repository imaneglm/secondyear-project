const db = require('../../config/db');

async function testDatabaseConnection() {
  try {
    console.log('Starting database connection test...');

    // 1. Test basic connection
    const timeRes = await db.query('SELECT NOW()');
    console.log('Server time:', timeRes.rows[0].now);

    // 2. Check existing tables
    console.log('\nChecking tables...');
    
    const tablesToCheck = [
      'users',
      'customer',
      'offices',
      'packages',
      'admin',
      'delievery_man' // Note: corrected spelling from "delieveryman"
    ];

    for (const table of tablesToCheck) {
      try {
        const res = await db.query(`SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_name = '${table}'
        )`);
        
        if (res.rows[0].exists) {
          const countRes = await db.query(`SELECT COUNT(*) FROM ${table}`);
          console.log(`✔ Table ${table} exists (rows: ${countRes.rows[0].count})`);
        } else {
          console.log(`✖ Table ${table} does not exist`);
        }
      } catch (err) {
        console.error(`Error checking table ${table}:`, err.message);
      }
    }

    console.log('\nDatabase connection test completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('\nDatabase connection test failed:', err.message);
    process.exit(1);
  }
}

testDatabaseConnection();