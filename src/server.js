const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { initializeDatabase } = require('./config/database');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
const port = process.env.PORT || 3001;

// Log environment variables (excluding sensitive data)
console.log('Server Configuration:', {
  port: port,
  nodeEnv: process.env.NODE_ENV,
  databaseHost: process.env.MYSQLHOST || process.env.DB_HOST,
  databaseName: process.env.MYSQLDATABASE || process.env.DB_NAME
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', schoolRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Initialize database and start server
async function startServer() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();
    console.log('Database initialization successful');
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    console.error('Environment:', {
      port: port,
      nodeEnv: process.env.NODE_ENV,
      hasDbHost: !!process.env.MYSQLHOST,
      hasDbUser: !!process.env.MYSQLUSER,
      hasDbName: !!process.env.MYSQLDATABASE
    });
    process.exit(1);
  }
}

startServer(); 