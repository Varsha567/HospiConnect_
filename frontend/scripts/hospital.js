
// DOM elements
const hospitalList = document.getElementById('hospitalList');
const searchInput = document.getElementById('searchInput');
const locationFilter = document.getElementById('locationFilter');
const specialtyFilter = document.getElementById('specialtyFilter');
const availabilityFilter = document.getElementById('availabilityFilter');

// Hospital data
let hospitals = [];

// Show loading state
function showLoading() {
  hospitalList.innerHTML = '<p class="loading-message">Loading hospitals...</p>';
}

// Show error message
function showError(message) {
  hospitalList.innerHTML = `
    <div class="error-message">
      <p>⚠ ${message}</p>
      <button onclick="fetchHospitals()">Retry</button>
    </div>
  `;
}

// Fetch hospital data from JSON file
async function fetchHospitals() {
  showLoading();
  try {
    const response = await fetch('hospital.json');
    if (!response.ok) throw new Error('Failed to load hospital data');
    hospitals = await response.json();
    displayHospitals(hospitals);
  } catch (error) {
    console.error('Error loading hospital data:', error);
    showError('Error loading hospital data. Please try again.');
  }
}

// Display hospitals in the UI
function displayHospitals(hospitalsToDisplay) {
  if (hospitalsToDisplay.length === 0) {
    hospitalList.innerHTML = '<p class="error-message">No hospitals found matching your criteria.</p>';
    return;
  }

  hospitalList.innerHTML = hospitalsToDisplay.map(hospital => `
    <div class="hospital-card">
      <div class="hospital-name">${hospital.name}</div>
      <div class="hospital-info">
        <p><strong>Location:</strong> ${hospital.location}</p>
        <p><strong>Specialties:</strong> ${hospital.specialties.join(', ')}</p>
        <p><strong>Contact:</strong> ${hospital.contact}</p>
        <p class="availability ${hospital.icuAvailable ? '' : 'unavailable'}">
          ICU: ${hospital.icuAvailable ? 'Available' : 'Unavailable'}
        </p>
        <a href="hospital-details.html?id=${hospital.id}" class="view-more-btn">View More</a>
      </div>
    </div>
  `).join('');}

// Filter hospitals based on search and filters
function filterHospitals() {
  const searchTerm = searchInput.value.toLowerCase();
  const location = locationFilter.value;
  const specialty = specialtyFilter.value;
  const availability = availabilityFilter.value;

  const filtered = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm) || 
                         hospital.location.toLowerCase().includes(searchTerm) ||
                         hospital.specialties.some(s => s.toLowerCase().includes(searchTerm));
    
    const matchesLocation = location ? hospital.location === location : true;
    const matchesSpecialty = specialty ? 
      hospital.specialties.some(s => s.toLowerCase() === specialty.toLowerCase()) : true;
    const matchesAvailability = availability ? 
      (availability === 'true' ? hospital.icuAvailable : !hospital.icuAvailable) : true;

    return matchesSearch && matchesLocation && matchesSpecialty && matchesAvailability;
  });

  displayHospitals(filtered);
}

// Clear all filters
function clearFilters() {
  searchInput.value = '';
  locationFilter.value = '';
  specialtyFilter.value = '';
  availabilityFilter.value = '';
  filterHospitals();
}

// Search hospitals (called from HTML button)
function searchHospitals() {
  filterHospitals();
}

// Debounce function to limit how often a function is called
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

// Event listeners
locationFilter.addEventListener('change', filterHospitals);
specialtyFilter.addEventListener('change', filterHospitals);
availabilityFilter.addEventListener('change', filterHospitals);
searchInput.addEventListener('input', debounce(filterHospitals));

// Initialize the app
document.addEventListener('DOMContentLoaded', fetchHospitals);
