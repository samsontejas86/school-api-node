# School Management API

A Node.js API service for managing school data with location-based sorting capabilities.

## Features

- Add new schools with location data
- List schools sorted by proximity to a given location
- Input validation for all endpoints
- Distance-based sorting using Haversine formula
- MySQL database integration

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

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
# Development mode
npm run dev

# Production mode
npm start
```

## API Documentation

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

## Error Responses

### Validation Error
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
```json
{
  "error": "Internal server error"
}
```

## Development

### Running Tests
```bash
npm test
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

## Deployment

1. Set up your production environment:
   - Install Node.js and MySQL
   - Configure environment variables
   - Set up a process manager (e.g., PM2)

2. Deploy the application:
```bash
# Install PM2 globally
npm install -g pm2

# Start the application with PM2
pm2 start src/server.js --name school-api

# Save PM2 configuration
pm2 save
```

3. Configure a reverse proxy (e.g., Nginx) to forward requests to your Node.js application.

## Postman Collection

Import the following collection in Postman to test the APIs:

[Download Postman Collection](./postman/School_Management_API.postman_collection.json)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 