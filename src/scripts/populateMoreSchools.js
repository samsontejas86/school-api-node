const axios = require('axios');

// Function to generate random coordinates within a radius of a city
function generateNearbyCoordinates(baseLat, baseLong, maxRadius = 0.1) {
    const lat = baseLat + (Math.random() - 0.5) * maxRadius;
    const long = baseLong + (Math.random() - 0.5) * maxRadius;
    return { latitude: Number(lat.toFixed(4)), longitude: Number(long.toFixed(4)) };
}

// Base cities with their coordinates
const baseCities = [
    { city: "New York", state: "NY", lat: 40.7128, long: -74.0060 },
    { city: "Los Angeles", state: "CA", lat: 34.0522, long: -118.2437 },
    { city: "Chicago", state: "IL", lat: 41.8781, long: -87.6298 },
    { city: "Houston", state: "TX", lat: 29.7604, long: -95.3698 },
    { city: "Phoenix", state: "AZ", lat: 33.4484, long: -112.0740 },
    { city: "Philadelphia", state: "PA", lat: 39.9526, long: -75.1652 },
    { city: "San Antonio", state: "TX", lat: 29.4241, long: -98.4936 },
    { city: "San Diego", state: "CA", lat: 32.7157, long: -117.1611 },
    { city: "Dallas", state: "TX", lat: 32.7767, long: -96.7970 },
    { city: "San Jose", state: "CA", lat: 37.3382, long: -121.8863 }
];

// School types and subjects for variety
const schoolTypes = ['High School', 'Academy', 'Preparatory School', 'College Prep', 'Secondary School'];
const subjects = ['STEM', 'Arts', 'Science', 'Technology', 'International', 'Leadership', 'Innovation'];
const descriptors = ['Advanced', 'Elite', 'Premier', 'Excellence in', 'Distinguished', 'Progressive'];
const streetTypes = ['Avenue', 'Street', 'Boulevard', 'Road', 'Lane', 'Drive', 'Way', 'Circle'];

// Generate a school name
function generateSchoolName(city) {
    const type = schoolTypes[Math.floor(Math.random() * schoolTypes.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];
    const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
    return `${city} ${descriptor} ${subject} ${type}`;
}

// Generate an address
function generateAddress(num, city, state) {
    const streetType = streetTypes[Math.floor(Math.random() * streetTypes.length)];
    return `${num} ${subjects[Math.floor(Math.random() * subjects.length)]} ${streetType}, ${city}, ${state}`;
}

// Generate 200 schools
const schools = [];
baseCities.forEach(baseCity => {
    // Generate 20 schools per base city
    for (let i = 0; i < 20; i++) {
        const coords = generateNearbyCoordinates(baseCity.lat, baseCity.long);
        schools.push({
            name: generateSchoolName(baseCity.city),
            address: generateAddress(Math.floor(Math.random() * 9000) + 1000, baseCity.city, baseCity.state),
            latitude: coords.latitude,
            longitude: coords.longitude
        });
    }
});

async function populateSchools() {
    try {
        console.log('Starting to populate additional schools...');
        let successCount = 0;
        let errorCount = 0;

        for (const school of schools) {
            try {
                const response = await axios.post('http://localhost:3001/api/addSchool', school);
                console.log(`Added school: ${school.name} - ID: ${response.data.schoolId}`);
                successCount++;
            } catch (error) {
                console.error(`Error adding school ${school.name}:`, error.response?.data || error.message);
                errorCount++;
            }
            // Add a small delay to prevent overwhelming the server
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        console.log(`\nPopulation completed!`);
        console.log(`Successfully added: ${successCount} schools`);
        console.log(`Failed to add: ${errorCount} schools`);
    } catch (error) {
        console.error('Script error:', error);
    }
}

populateSchools(); 