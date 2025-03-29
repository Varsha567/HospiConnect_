// Organ Donation Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const organDonorForm = document.getElementById('organDonorForm');
    const confirmationMessage = document.getElementById('donor-confirmation');

    organDonorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('donor-name').value,
            dob: document.getElementById('donor-dob').value,
            phone: document.getElementById('donor-phone').value,
            email: document.getElementById('donor-email').value,
            address: document.getElementById('donor-address').value,
            bloodType: document.getElementById('donor-blood-type').value,
            organs: Array.from(document.getElementById('donor-organ').selectedOptions)
                        .map(option => option.value),
            consent: document.getElementById('legal-consent').checked
        };
        
        // Simple validation
        if (!formData.consent) {
            alert('You must consent to organ donation to register.');
            return;
        }
        
        if (formData.organs.length === 0) {
            alert('Please select at least one organ you are willing to donate.');
            return;
        }
        
        // In a real application, you would send this data to your server
        console.log('Form submitted:', formData);
        
        // Show confirmation
        showConfirmation(formData);
        
        // Reset form
        organDonorForm.reset();
    });
    
    function showConfirmation(data) {
        const organsList = data.organs.map(organ => 
            organ.charAt(0).toUpperCase() + organ.slice(1)
        ).join(', ');
        
        confirmationMessage.innerHTML = `
            <h3>Thank you, ${data.name}!</h3>
            <p>You have been registered as an organ donor.</p>
            <p><strong>Organs pledged:</strong> ${organsList}</p>
            <p>We appreciate your commitment to saving lives. Your information has been recorded in our registry.</p>
            <p>A confirmation email has been sent to ${data.email || 'your provided email'}.</p>
        `;
        confirmationMessage.className = 'confirmation-message success-message';
        
        // Scroll to confirmation
        confirmationMessage.scrollIntoView({ behavior: 'smooth' });
    }
});