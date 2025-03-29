document.addEventListener('DOMContentLoaded', function() {
    // Get search elements
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    // Add event listeners
    searchButton.addEventListener('click', searchHospitals);
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchHospitals();
      }
    });
  
    // Quick link cards hover effect
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
      });
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
      });
    });
  });
  
  // Search hospitals function
  async function searchHospitals() {
    const searchTerm = document.querySelector('.search-bar input').value.trim();
    
    if (!searchTerm) {
      alert('Please enter a search term');
      return;
    }
  
    try {
      // Show loading state
      const searchButton = document.querySelector('.search-bar button');
      searchButton.textContent = 'Searching...';
      searchButton.disabled = true;
  
      // Fetch hospital data
      const response = await fetch('hospital.json');
      if (!response.ok) throw new Error('Failed to load hospital data');
      const hospitals = await response.json();
  
      // Filter hospitals
      const filteredHospitals = hospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        hospital.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  
      // Redirect to hospitals page with search results
      if (filteredHospitals.length > 0) {
        localStorage.setItem('searchResults', JSON.stringify(filteredHospitals));
        window.location.href = 'hospitals.html';
      } else {
        alert('No hospitals found matching your search');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error searching hospitals. Please try again.');
    } finally {
      // Reset search button
      const searchButton = document.querySelector('.search-bar button');
      searchButton.textContent = 'Search';
      searchButton.disabled = false;
    }
  }