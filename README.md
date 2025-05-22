# School Management API

A Node.js API service for managing school data with location-based sorting capabilities. The system includes a comprehensive database of 230+ schools across major US cities.

## Features

- Add new schools with location data
- List schools sorted by proximity to a given location
- Input validation for all endpoints
- Distance-based sorting using Haversine formula
- MySQL database integration
- 230+ schools across 10 major US cities
- Deployed and accessible via Railway

## Live Demo

The API is deployed and accessible at:
```
https://web-production-33b1c.up.railway.app
```

Try it out:
- Health Check: `GET /health`
- List Schools: `GET /api/listSchools?latitude=40.7128&longitude=-74.0060`
- Add School: `POST /api/addSchool` (see API Documentation for request format)

## Dataset Coverage

The database includes schools from major US cities:
- New York
- Los Angeles
- Chicago
- Houston
- Phoenix
- Philadelphia
- San Antonio
- San Diego
- Dallas
- San Jose

Each city has approximately 20-25 schools within a 5km radius of the city center, providing a realistic geographic distribution.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager
- Postman (for testing API endpoints)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd school-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
# Server Configuration
PORT=3001

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=school_management
DB_PORT=3306
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Documentation

### Health Check
Check if the API is running.

- **URL**: `/health`
- **Method**: `GET`

**Success Response**:
- **Code**: 200
- **Content**:
```json
{
  "status": "OK",
  "timestamp": "2024-05-22T10:54:53.984Z"
}
```

### Add School
Adds a new school to the database.

- **URL**: `/api/addSchool`
- **Method**: `POST`
- **Content-Type**: `application/json`

**Request Body**:
```json
{
  "name": "Example School",
  "address": "123 Education St",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Success Response**:
- **Code**: 201
- **Content**:
```json
{
  "message": "School added successfully",
  "schoolId": 1
}
```

**Field Constraints**:
- `name`: String (1-255 characters)
- `address`: String (1-500 characters)
- `latitude`: Float (-90 to 90)
- `longitude`: Float (-180 to 180)

### List Schools
Retrieves all schools sorted by distance from provided coordinates.

- **URL**: `/api/listSchools`
- **Method**: `GET`
- **Query Parameters**:
  - `latitude`: User's latitude (float between -90 and 90)
  - `longitude`: User's longitude (float between -180 and 180)

**Example Request**:
```
GET /api/listSchools?latitude=40.7128&longitude=-74.0060
```

**Success Response**:
- **Code**: 200
- **Content**:
```json
{
  "schools": [
    {
      "id": 1,
      "name": "Example School",
      "address": "123 Education St",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "distance": 0.00
    }
  ]
}
```

**Notes**:
- Distance is calculated using the Haversine formula
- Results are sorted by distance in ascending order
- Distance is returned in kilometers
- All schools in the database are returned, sorted by distance

## Error Responses

### Validation Error
- **Code**: 400
```json
{
  "errors": [
    {
      "msg": "School name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

### Server Error
- **Code**: 500
```json
{
  "error": "Internal server error"
}
```

### Common Error Codes
- `400` - Bad Request (invalid input)
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- test/schools.test.js
```

### Database Schema
The application automatically creates the required database and tables on startup. The schema includes:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
```

**Field Descriptions**:
- `id`: Unique identifier for each school
- `name`: School name (max 255 characters)
- `address`: Physical address (max 500 characters)
- `latitude`: Geographic latitude (-90 to 90)
- `longitude`: Geographic longitude (-180 to 180)
- `created_at`: Timestamp of record creation
- `updated_at`: Timestamp of last update

## Deployment

The application is deployed on Railway.app with a MySQL database. To deploy your own instance:

1. Fork this repository
2. Sign up for Railway.app
3. Create a new project from your GitHub repository
4. Add a MySQL service to your project
5. Configure the following environment variables:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `MYSQL_URL` (automatically set by Railway)

## Data Population Scripts

The project includes two scripts for populating the database:
1. `populateSchools.js` - Adds an initial set of schools
2. `generateMoreSchools.js` - Generates additional schools with realistic data

To run the scripts:
```bash
# For initial schools
node src/scripts/populateSchools.js

# For generating more schools
NODE_ENV=production node src/scripts/generateMoreSchools.js
```

## Testing with Postman

1. Import the Postman collection from:
   ```
   ./postman/School_Management_API.postman_collection.json
   ```

2. The collection includes requests for:
   - Health Check
   - Add School
   - List Schools
   - Error Cases

3. Environment variables are included for both local and production URLs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.