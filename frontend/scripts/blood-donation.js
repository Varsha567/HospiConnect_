document.addEventListener('DOMContentLoaded', function() {
    // Search Blood Banks Form
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const location = document.getElementById('location').value;

            // Simulate search results (replace with actual API call)
            const searchResults = [
                { name: 'City Blood Bank', address: '123 Main St, City' },
                { name: 'Community Blood Center', address: '456 Elm St, Town' },
                { name: 'Regional Blood Donation', address: '789 Oak St, Village' }
            ];

            const resultsDiv = document.getElementById('searchResults');
            resultsDiv.innerHTML = '<h5>Search Results:</h5>';
            searchResults.forEach(result => {
                resultsDiv.innerHTML += `
                    <div class="card mb-2">
                        <div class="card-body">
                            <h6 class="card-title">${result.name}</h6>
                            <p class="card-text">${result.address}</p>
                        </div>
                    </div>
                `;
            });
        });
    }

    // Donor Registration Form
    const donorForm = document.getElementById('donorForm');
    if (donorForm) {
        donorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const donorName = document.getElementById('donorName').value;
            const donorEmail = document.getElementById('donorEmail').value;
            const donorPhone = document.getElementById('donorPhone').value;
            const donorLocation = document.getElementById('donorLocation').value;
            const bloodGroup = document.getElementById('bloodGroup').value;

            // Simulate registration (replace with actual API call)
            alert(`Thank you, ${donorName}! You have been registered as a donor.`);
            donorForm.reset();
        });
    }
});