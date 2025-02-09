// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const spans = hamburger?.querySelectorAll('span');

    const toggleMenu = () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        if (spans) {
            spans[0].style.transform = navLinks.classList.contains('active') ? 
                'rotate(45deg) translate(8px, 8px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ?
                'rotate(-45deg) translate(7px, -7px)' : 'none';
        }

        // Slide in menu
        navLinks.style.transform = navLinks.classList.contains('active') ?
            'translateX(0)' : 'translateX(100%)';
        navLinks.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    };

    hamburger?.addEventListener('click', toggleMenu);
});

// Enhanced form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const validateForm = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const message = formData.get('message')?.trim();

        const notifications = {
            required: 'All fields are required',
            email: 'Please enter a valid email',
            success: 'Message sent! I\'ll get back to you soon.',
            error: 'Something went wrong. Please try again.'
        };

        try {
            if (!name || !email || !message) {
                throw new Error(notifications.required);
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                throw new Error(notifications.email);
            }

            // Disable form while submitting
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            showToast(notifications.success, 'success');
            contactForm.reset();

        } catch (error) {
            showToast(error.message, 'error');
        } finally {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    };

    const showToast = (message, type) => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        // Remove after delay
        setTimeout(() => {
            toast.style.transform = 'translateY(-100%)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    contactForm.addEventListener('submit', validateForm);
}

// Smooth typewriter with cursor effect
const typewriter = async (element, text, speed = 80) => {
    if (!element) return;

    element.innerHTML = '<span class="cursor">|</span>';
    const cursor = element.querySelector('.cursor');
    
    for (const char of text) {
        const span = document.createElement('span');
        span.textContent = char;
        element.insertBefore(span, cursor);
        
        // Random slight variation in typing speed
        const delay = speed + (Math.random() * 40 - 20);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Blink cursor
    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 530);
};

const typewriterText = document.querySelector('.typewriter');
if (typewriterText) {
    const text = typewriterText.textContent;
    typewriter(typewriterText, text);
}
