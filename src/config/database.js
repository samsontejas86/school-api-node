const mysql = require('mysql2/promise');
require('dotenv').config();

// Log environment variables (for debugging)
console.log('Database Config:', {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  // password is hidden
  database: process.env.DB_NAME || 'school_management',
  port: process.env.DB_PORT || 3306
});

// Pool for regular database operations
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || process.env.DB_HOST || 'localhost',
  user: process.env.MYSQLUSER || process.env.DB_USER || 'root',
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || 'samson123',
  database: process.env.MYSQLDATABASE || process.env.DB_NAME || 'school_management',
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
  ssl: process.env.MYSQLHOST ? {
    rejectUnauthorized: false
  } : false,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to initialize database and create tables if they don't exist
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database');
    
    // Create schools table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(500) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

module.exports = {
  pool,
  initializeDatabase
}; 