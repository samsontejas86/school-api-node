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

// First create a connection without database selection
const createDbConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'samson123', // Add default password
    port: process.env.DB_PORT || 3306
  });

  // Create database if it doesn't exist
  await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'school_management'}`);
  await connection.end();
};

// Pool for regular database operations
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'samson123', // Add default password
  database: process.env.DB_NAME || 'school_management',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to initialize database and create tables if they don't exist
async function initializeDatabase() {
  try {
    // First ensure database exists
    await createDbConnection();

    const connection = await pool.getConnection();
    
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