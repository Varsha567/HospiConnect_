document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const hospitalId = urlParams.get('id');
    
    if (!hospitalId) {
        document.getElementById('hospitalContent').innerHTML = 
            '<p class="error-message">No hospital specified</p>';
        return;
    }
  
    fetch('./hospital.json')
        .then(response => response.json())
        .then(hospitals => {
            const hospital = hospitals.find(h => h.id === hospitalId);
            if (!hospital) throw new Error('Hospital not found');
            displayHospitalDetails(hospital);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('hospitalContent').innerHTML = `
                <div class="error-message">
                    <p>⚠ ${error.message}</p>
                </div>
            `;
        });
  
    function displayHospitalDetails(hospital) {
        document.getElementById('hospitalName').textContent = hospital.name;
        
        // Generate doctors list HTML if doctors exist
        const doctorsHTML = hospital.doctors && hospital.doctors.length > 0 ? `
            <div class="detail-section">
                <h3>Our Doctors</h3>
                <div class="doctors-list">
                    ${hospital.doctors.map(doctor => `
                        <div class="doctor-card">
                            <h4>${doctor.name}</h4>
                            <p><strong>Specialty:</strong> ${doctor.specialty}</p>
                            <p><strong>Experience:</strong> ${doctor.experience}</p>
                            <p><strong>Availability:</strong> ${doctor.availability}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '<p class="no-doctors">No doctor information available</p>';
  
        document.getElementById('hospitalContent').innerHTML = `
            <div class="detail-section">
                <h3>Basic Information</h3>
                <p><strong>Location:</strong> ${hospital.location}</p>
                <p><strong>Contact:</strong> ${hospital.contact}</p>
                <p><strong>ICU Available:</strong> ${hospital.icuAvailable ? 'Yes' : 'No'}</p>
            </div>
            
            <div class="detail-section">
                <h3>Specialties</h3>
                <ul>${hospital.specialties.map(spec => `<li>${spec}</li>`).join('')}</ul>
            </div>
            
            ${doctorsHTML}
            
            <div class="detail-section">
                <h3>About</h3>
                <p>${hospital.name} in ${hospital.location} specializes in ${hospital.specialties.join(', ')}.</p>
            </div>
            
            <div class="book-appointment-container">
                <button onclick="window.location.href='appointmentbooking.html?hospital=${encodeURIComponent(hospital.name)}&contact=${encodeURIComponent(hospital.contact)}'" 
            class="book-appointment-btn">Book Appointment
                </button>
            </div>
        `;
    }
  });