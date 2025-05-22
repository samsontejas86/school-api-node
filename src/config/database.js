const mysql = require('mysql2/promise');
require('dotenv').config();

// Log connection attempt
console.log('Database Connection Info:', {
  isProduction: process.env.NODE_ENV === 'production',
  hasMySQLUrl: !!process.env.MYSQL_URL
});

let pool;

if (process.env.NODE_ENV === 'production') {
  // Production configuration (Railway)
  if (!process.env.MYSQL_URL) {
    throw new Error('MYSQL_URL is required in production environment');
  }

  pool = mysql.createPool({
    uri: process.env.MYSQL_URL,
    ssl: {
      rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
  console.log('Using production database configuration with MYSQL_URL');
} else {
  // Development configuration
  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'samson123',
    database: process.env.DB_NAME || 'school_management',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
  console.log('Using development database configuration');
}

// Function to initialize database and create tables if they don't exist
async function initializeDatabase() {
  try {
    console.log('Attempting to connect to database...');
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
    console.error('Environment details:', {
      NODE_ENV: process.env.NODE_ENV,
      hasMySQLUrl: !!process.env.MYSQL_URL
    });
    throw error;
  }
}

module.exports = {
  pool,
  initializeDatabase
}; 