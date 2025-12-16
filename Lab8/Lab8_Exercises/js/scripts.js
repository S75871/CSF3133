/*!
* FutureTech Solutions - Custom Script
*/
window.addEventListener('DOMContentLoaded', event => {
    // Current date logic removed as Open Hours list was replaced by Contact Form.
    // Placeholder for future form validation logic.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            alert('Thank you for your inquiry! We will contact you shortly.');
        });
    }
});