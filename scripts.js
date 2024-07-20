// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('map').setView([19.2184, 72.9781], 13); // Center on Thane, India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Example bus stop markers
    const busStops = [
        { lat: 19.2184, lng: 72.9781, name: 'Thane Station' },
        { lat: 19.2075, lng: 72.9861, name: 'Teen Hath Naka' }
    ];

    busStops.forEach(stop => {
        L.marker([stop.lat, stop.lng])
            .addTo(map)
            .bindPopup(stop.name);
    });
});
const busData = [
    { busStop: 'Thane Station', busNumber: 'A1', arrivalTime: '10:15 AM', destination: 'Kalyan' },
    { busStop: 'Thane Station', busNumber: 'A2', arrivalTime: '10:30 AM', destination: 'Dombivli' },
    { busStop: 'Teen Hath Naka', busNumber: 'B1', arrivalTime: '10:45 AM', destination: 'Mulund' },
    { busStop: 'Teen Hath Naka', busNumber: 'B2', arrivalTime: '11:00 AM', destination: 'Ghatkopar' }
];

function updateInfo() {
    const tableBody = document.getElementById('busTable');
    tableBody.innerHTML = ''; // Clear existing data

    busData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.busStop}</td>
            <td>${item.busNumber}</td>
            <td>${item.arrivalTime}</td>
            <td>${item.destination}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterData() {
    const query = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('#busTable tr');
    
    rows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let match = false;
        
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerText.toLowerCase().includes(query)) {
                match = true;
                break;
            }
        }
        
        row.style.display = match ? '' : 'none';
    });
}

// Initial call to populate the table
updateInfo();
// server.js
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Example route for getting bus data
app.get('/api/buses', (req, res) => {
    const busData = [
        { busStop: 'Thane Station', busNumber: 'A1', arrivalTime: '10:15 AM', destination: 'Kalyan' },
        { busStop: 'Thane Station', busNumber: 'A2', arrivalTime: '10:30 AM', destination: 'Dombivli' },
        // Add more entries as needed
    ];
    res.json(busData);
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(Server running on port ${PORT});
});
