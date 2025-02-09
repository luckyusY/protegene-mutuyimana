// Mobile menu toggle using modern syntax and animation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Add smooth animation
        navLinks.style.transition = 'transform 0.3s ease-in-out';
    };

    hamburger?.addEventListener('click', toggleMenu);
});

// Form validation with better UX
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const validateForm = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');

        // Custom validation messages
        const messages = {
            required: 'Please fill in all required fields',
            email: 'Please enter a valid email address',
            success: 'Message sent successfully!'
        };

        try {
            if (!name || !email) {
                throw new Error(messages.required);
            }

            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                throw new Error(messages.email); 
            }

            // Here you would typically send to server
            // await sendToServer(formData);
            
            // Show success message
            showNotification(messages.success, 'success');
            contactForm.reset();

        } catch (error) {
            showNotification(error.message, 'error');
        }
    };

    const showNotification = (message, type) => {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => notification.remove(), 3000);
    };

    contactForm.addEventListener('submit', validateForm);
}

// Modern typewriter effect with async/await
const typewriterEffect = async (element, text, speed = 100) => {
    if (!element) return;

    element.textContent = '';
    
    for (const char of text) {
        element.textContent += char;
        await new Promise(resolve => setTimeout(resolve, speed));
    }
};

const typewriterText = document.querySelector('.typewriter');
if (typewriterText) {
    const text = typewriterText.textContent;
    typewriterEffect(typewriterText, text);
}
