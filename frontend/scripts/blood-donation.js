// Sample JSON data for blood banks
const bloodBanksData = {
    "bloodBanks": [
        {
            "id": 1,
            "name": "City Central Blood Bank",
            "location": "New York",
            "address": "123 Health St, New York, NY 10001",
            "contact": "+1 212-555-1001",
            "bloodTypes": ["A+", "B+", "AB+", "O+", "O-"],
            "hours": "8:00 AM - 8:00 PM",
            "inventory": {
                "A+": 15,
                "B+": 12,
                "AB+": 8,
                "O+": 20,
                "O-": 5
            }
        },
        {
            "id": 2,
            "name": "Metro Blood Center",
            "location": "Chicago",
            "address": "456 Life Ave, Chicago, IL 60601",
            "contact": "+1 312-555-2002",
            "bloodTypes": ["A+", "A-", "B+", "B-", "O+"],
            "hours": "9:00 AM - 7:00 PM",
            "inventory": {
                "A+": 10,
                "A-": 4,
                "B+": 8,
                "B-": 3,
                "O+": 15
            }
        },
        {
            "id": 3,
            "name": "Sunshine Blood Services",
            "location": "Los Angeles",
            "address": "789 Care Blvd, Los Angeles, CA 90001",
            "contact": "+1 213-555-3003",
            "bloodTypes": ["A+", "B+", "AB+", "AB-", "O+", "O-"],
            "hours": "7:00 AM - 9:00 PM",
            "inventory": {
                "A+": 20,
                "B+": 15,
                "AB+": 10,
                "AB-": 2,
                "O+": 25,
                "O-": 7
            }
        },
        {
            "id": 4,
            "name": "Gulf Coast Blood Bank",
            "location": "Hyderabad",
            "address": "101 Donor Lane, Houston, TX 77001",
            "contact": "+1 713-555-4004",
            "bloodTypes": ["A+", "A-", "B+", "O+", "O-"],
            "hours": "8:30 AM - 6:30 PM",
            "inventory": {
                "A+": 12,
                "A-": 3,
                "B+": 9,
                "O+": 18,
                "O-": 4
            }
        }
    ]
};

// Sample JSON data for donors (initially empty)
let donorsData = {
    "donors": []
};

// Function to search blood banks
function searchBloodBanks() {
    const location = document.getElementById('location').value.trim().toLowerCase();
    const bloodType = document.getElementById('bloodType').value;
    
    const resultsContainer = document.getElementById('bloodBanksResults');
    resultsContainer.innerHTML = '';
    
    // Filter blood banks based on search criteria
    const filteredBanks = bloodBanksData.bloodBanks.filter(bank => {
        const locationMatch = location === '' || bank.location.toLowerCase().includes(location);
        const bloodTypeMatch = bloodType === '' || bank.bloodTypes.includes(bloodType);
        return locationMatch && bloodTypeMatch;
    });
    
    if (filteredBanks.length === 0) {
        resultsContainer.innerHTML = '<p>No blood banks found matching your criteria.</p>';
        return;
    }
    
    // Create table to display results
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Available Blood Types</th>
                <th>Hours</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    
    const tbody = table.querySelector('tbody');
    
    filteredBanks.forEach(bank => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bank.name}</td>
            <td>${bank.location}</td>
            <td>${bank.address}</td>
            <td>${bank.contact}</td>
            <td>${bank.bloodTypes.join(', ')}</td>
            <td>${bank.hours}</td>
        `;
        tbody.appendChild(row);
    });
    
    resultsContainer.appendChild(table);
}

// Function to register a new donor
function registerDonor(event) {
    event.preventDefault();
    
    const donor = {
        id: donorsData.donors.length + 1,
        name: document.getElementById('donorName').value,
        age: document.getElementById('donorAge').value,
        gender: document.getElementById('donorGender').value,
        bloodType: document.getElementById('donorBloodType').value,
        contact: document.getElementById('donorContact').value,
        email: document.getElementById('donorEmail').value,
        location: document.getElementById('donorLocation').value,
        registrationDate: new Date().toISOString().split('T')[0]
    };
    
    // Add donor to JSON data
    donorsData.donors.push(donor);
    
    // Display confirmation
    const confirmation = document.getElementById('donorConfirmation');
    confirmation.innerHTML = `
        <h3>Thank you for registering, ${donor.name}!</h3>
        <p>You have been successfully registered as a blood donor.</p>
        <p><strong>Your details:</strong></p>
        <ul>
            <li>Blood Type: ${donor.bloodType}</li>
            <li>Location: ${donor.location}</li>
            <li>Contact: ${donor.contact}</li>
        </ul>
        <p>We will contact you when there is a need for your blood type in your area.</p>
    `;
    
    // Reset form
    document.getElementById('donorForm').reset();
    
    // For demonstration, log the updated donors data
    console.log('Updated donors data:', donorsData);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchBtn').addEventListener('click', searchBloodBanks);
    document.getElementById('donorForm').addEventListener('submit', registerDonor);
});