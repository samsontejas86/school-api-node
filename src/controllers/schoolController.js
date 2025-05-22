const { pool } = require('../config/database');
const { calculateDistance } = require('../utils/distance');
const { validationResult } = require('express-validator');

/**
 * Add a new school to the database
 */
async function addSchool(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, address, latitude, longitude } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      message: 'School added successfully',
      schoolId: result.insertId
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * List all schools sorted by distance from user's location
 */
async function listSchools(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { latitude, longitude } = req.query;
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const [schools] = await pool.query('SELECT * FROM schools');

    // Calculate distance for each school and add it to the school object
    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    }));

    // Sort schools by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json({
      schools: schoolsWithDistance.map(school => ({
        id: school.id,
        name: school.name,
        address: school.address,
        latitude: school.latitude,
        longitude: school.longitude,
        distance: Math.round(school.distance * 100) / 100 // Round to 2 decimal places
      }))
    });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  addSchool,
  listSchools
}; 