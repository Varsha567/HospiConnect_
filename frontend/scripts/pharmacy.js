// Medicine data in JSON format
const medicineData = {
    "medicines": [
        {
            "id": 1,
            "name": "Paracetamol",
            "brand": "Tylenol",
            "description": "Pain reliever and fever reducer",
            "uses": ["Headache", "Fever", "Muscle aches"],
            "stock": 45,
            "price": 5.99,
            "requires_prescription": false
        },
        {
            "id": 2,
            "name": "Ibuprofen",
            "brand": "Advil",
            "description": "NSAID for pain, fever, and inflammation",
            "uses": ["Pain", "Inflammation", "Fever"],
            "stock": 32,
            "price": 7.49,
            "requires_prescription": false
        },
        {
            "id": 3,
            "name": "Amoxicillin",
            "brand": "Amoxil",
            "description": "Antibiotic for bacterial infections",
            "uses": ["Bacterial infections", "Strep throat", "Pneumonia"],
            "stock": 18,
            "price": 12.99,
            "requires_prescription": true
        },
        {
            "id": 4,
            "name": "Lisinopril",
            "brand": "Zestril",
            "description": "ACE inhibitor for high blood pressure",
            "uses": ["Hypertension", "Heart failure"],
            "stock": 5,
            "price": 15.25,
            "requires_prescription": true
        },
        {
            "id": 5,
            "name": "Atorvastatin",
            "brand": "Lipitor",
            "description": "Statin for high cholesterol",
            "uses": ["High cholesterol", "Cardiovascular prevention"],
            "stock": 0,
            "price": 22.50,
            "requires_prescription": true
        },
        {
            "id": 6,
            "name": "Omeprazole",
            "brand": "Prilosec",
            "description": "Proton pump inhibitor for acid reflux",
            "uses": ["GERD", "Heartburn", "Ulcers"],
            "stock": 24,
            "price": 9.99,
            "requires_prescription": false
        }
    ]
};

// Prescription orders data
let prescriptionOrders = {
    "orders": []
};

// DOM Elements
const searchInput = document.getElementById('medicine-search-input');
const searchButton = document.getElementById('search-medicine-btn');
const medicineResults = document.getElementById('medicine-results');
const prescriptionForm = document.getElementById('prescription-form');
const orderConfirmation = document.getElementById('order-confirmation');

// Search medicine function
function searchMedicine() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        medicineResults.innerHTML = '<p class="no-results">Please enter a search term</p>';
        return;
    }
    
    const results = medicineData.medicines.filter(medicine => {
        return (
            medicine.name.toLowerCase().includes(searchTerm) ||
            medicine.brand.toLowerCase().includes(searchTerm) ||
            medicine.uses.some(use => use.toLowerCase().includes(searchTerm))
        );
    });
    
    displayResults(results);
}

// Display search results
function displayResults(results) {
    if (results.length === 0) {
        medicineResults.innerHTML = '<p class="no-results">No medicines found matching your search</p>';
        return;
    }
    
    let html = '';
    
    results.forEach(medicine => {
        let stockStatus;
        let stockClass;
        
        if (medicine.stock === 0) {
            stockStatus = 'Out of stock';
            stockClass = 'out-of-stock';
        } else if (medicine.stock < 10) {
            stockStatus = 'Low stock';
            stockClass = 'low-stock';
        } else {
            stockStatus = 'In stock';
            stockClass = 'in-stock';
        }
        
        html += `
            <div class="medicine-item">
                <div class="medicine-info">
                    <h3>${medicine.name} ${medicine.requires_prescription ? '<span class="rx">(Rx)</span>' : ''}</h3>
                    <p><strong>Brand:</strong> ${medicine.brand}</p>
                    <p><strong>Uses:</strong> ${medicine.uses.join(', ')}</p>
                    <p>${medicine.description}</p>
                </div>
                <div class="medicine-stock ${stockClass}">
                    $${medicine.price.toFixed(2)}<br>
                    ${stockStatus} (${medicine.stock})
                </div>
            </div>
        `;
    });
    
    medicineResults.innerHTML = html;
}

// Handle prescription form submission
function handlePrescriptionSubmit(event) {
    event.preventDefault();
    
    const order = {
        id: Date.now(),
        patientName: document.getElementById('patient-name').value,
        patientDob: document.getElementById('patient-dob').value,
        patientPhone: document.getElementById('patient-phone').value,
        patientEmail: document.getElementById('patient-email').value,
        prescriptionDetails: document.getElementById('prescription-details').value,
        deliveryOption: document.getElementById('delivery-option').value,
        orderDate: new Date().toISOString(),
        status: "Received"
    };
    
    // Add to orders
    prescriptionOrders.orders.push(order);
    
    // Show confirmation
    showConfirmation(order);
    
    // Reset form
    prescriptionForm.reset();
    
    // For demo purposes, log the order
    console.log('New prescription order:', order);
    console.log('All orders:', prescriptionOrders);
}

// Show confirmation message
function showConfirmation(order) {
    orderConfirmation.innerHTML = `
        <h3>Thank you, ${order.patientName}!</h3>
        <p>Your prescription order has been received.</p>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p>We will contact you at ${order.patientPhone} to confirm details.</p>
        <p>Delivery option: ${order.deliveryOption === 'delivery' ? 'Home Delivery' : 'Store Pickup'}</p>
    `;
    orderConfirmation.className = 'confirmation-message success-message';
    
    // Scroll to confirmation
    orderConfirmation.scrollIntoView({ behavior: 'smooth' });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    searchButton.addEventListener('click', searchMedicine);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchMedicine();
        }
    });
    prescriptionForm.addEventListener('submit', handlePrescriptionSubmit);
});