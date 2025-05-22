const axios = require('axios');

const schools = [
    {
        name: "Manhattan High School",
        address: "123 Broadway, New York, NY",
        latitude: 40.7128,
        longitude: -74.0060
    },
    {
        name: "LA Science Academy",
        address: "456 Hollywood Blvd, Los Angeles, CA",
        latitude: 34.0522,
        longitude: -118.2437
    },
    {
        name: "Chicago STEM Institute",
        address: "789 Michigan Ave, Chicago, IL",
        latitude: 41.8781,
        longitude: -87.6298
    },
    {
        name: "Boston Grammar School",
        address: "321 Harvard Street, Boston, MA",
        latitude: 42.3601,
        longitude: -71.0589
    },
    {
        name: "Bay Area Tech Academy",
        address: "555 Silicon Valley Rd, San Francisco, CA",
        latitude: 37.7749,
        longitude: -122.4194
    },
    {
        name: "Seattle Innovation School",
        address: "888 Pike Street, Seattle, WA",
        latitude: 47.6062,
        longitude: -122.3321
    },
    {
        name: "Miami International Academy",
        address: "777 Ocean Drive, Miami, FL",
        latitude: 25.7617,
        longitude: -80.1918
    },
    {
        name: "Austin Tech High",
        address: "456 Congress Ave, Austin, TX",
        latitude: 30.2672,
        longitude: -97.7431
    },
    {
        name: "Denver Mountain School",
        address: "123 Rocky Road, Denver, CO",
        latitude: 39.7392,
        longitude: -104.9903
    },
    {
        name: "Portland Arts Academy",
        address: "789 Pearl District, Portland, OR",
        latitude: 45.5155,
        longitude: -122.6789
    },
    {
        name: "Phoenix Desert School",
        address: "321 Cactus Way, Phoenix, AZ",
        latitude: 33.4484,
        longitude: -112.0740
    },
    {
        name: "Minneapolis Lake Academy",
        address: "555 Lake Street, Minneapolis, MN",
        latitude: 44.9778,
        longitude: -93.2650
    },
    {
        name: "Atlanta Tech Prep",
        address: "678 Peachtree St, Atlanta, GA",
        latitude: 33.7490,
        longitude: -84.3880
    },
    {
        name: "Dallas Innovation Institute",
        address: "999 Main Street, Dallas, TX",
        latitude: 32.7767,
        longitude: -96.7970
    },
    {
        name: "Philadelphia Historic School",
        address: "234 Liberty Ave, Philadelphia, PA",
        latitude: 39.9526,
        longitude: -75.1652
    },
    {
        name: "Houston Space Academy",
        address: "456 NASA Blvd, Houston, TX",
        latitude: 29.7604,
        longitude: -95.3698
    },
    {
        name: "San Diego Ocean Institute",
        address: "789 Pacific Beach Dr, San Diego, CA",
        latitude: 32.7157,
        longitude: -117.1611
    },
    {
        name: "Nashville Music School",
        address: "321 Broadway, Nashville, TN",
        latitude: 36.1627,
        longitude: -86.7816
    },
    {
        name: "Las Vegas STEM Academy",
        address: "555 Strip Ave, Las Vegas, NV",
        latitude: 36.1699,
        longitude: -115.1398
    },
    {
        name: "Detroit Innovation Hub",
        address: "789 Motor City Dr, Detroit, MI",
        latitude: 42.3314,
        longitude: -83.0458
    },
    {
        name: "Salt Lake Mountain Institute",
        address: "123 Temple Square, Salt Lake City, UT",
        latitude: 40.7608,
        longitude: -111.8910
    },
    {
        name: "Kansas City Central School",
        address: "456 BBQ Road, Kansas City, MO",
        latitude: 39.0997,
        longitude: -94.5786
    },
    {
        name: "Charlotte Tech Academy",
        address: "789 Queens Road, Charlotte, NC",
        latitude: 35.2271,
        longitude: -80.8431
    },
    {
        name: "Indianapolis Racing School",
        address: "321 Speedway Blvd, Indianapolis, IN",
        latitude: 39.7684,
        longitude: -86.1581
    },
    {
        name: "Columbus Discovery Academy",
        address: "555 Ohio State St, Columbus, OH",
        latitude: 39.9612,
        longitude: -82.9988
    },
    {
        name: "Pittsburgh Science Center",
        address: "777 Steel City Road, Pittsburgh, PA",
        latitude: 40.4406,
        longitude: -79.9959
    },
    {
        name: "Cincinnati River School",
        address: "888 Ohio River Way, Cincinnati, OH",
        latitude: 39.1031,
        longitude: -84.5120
    },
    {
        name: "St. Louis Gateway Academy",
        address: "123 Arch Road, St. Louis, MO",
        latitude: 38.6270,
        longitude: -90.1994
    },
    {
        name: "Milwaukee Lake School",
        address: "456 Michigan Ave, Milwaukee, WI",
        latitude: 43.0389,
        longitude: -87.9065
    },
    {
        name: "New Orleans Jazz Academy",
        address: "789 French Quarter, New Orleans, LA",
        latitude: 29.9511,
        longitude: -90.0715
    }
];

async function populateSchools() {
    try {
        console.log('Starting to populate schools...');
        for (const school of schools) {
            try {
                const response = await axios.post('http://localhost:3001/api/addSchool', school);
                console.log(`Added school: ${school.name} - ID: ${response.data.schoolId}`);
            } catch (error) {
                console.error(`Error adding school ${school.name}:`, error.response?.data || error.message);
            }
        }
        console.log('Finished populating schools!');
    } catch (error) {
        console.error('Script error:', error);
    }
}

populateSchools(); 