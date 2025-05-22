const express = require('express');
const { body, query } = require('express-validator');
const { addSchool, listSchools } = require('../controllers/schoolController');

const router = express.Router();

// Validation middleware for addSchool
const addSchoolValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('School name is required')
    .isLength({ max: 255 })
    .withMessage('School name must be less than 255 characters'),
  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ max: 500 })
    .withMessage('Address must be less than 500 characters'),
  body('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180')
];

// Validation middleware for listSchools
const listSchoolsValidation = [
  query('latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  query('longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180')
];

// Routes
router.post('/addSchool', addSchoolValidation, addSchool);
router.get('/listSchools', listSchoolsValidation, listSchools);

module.exports = router; 