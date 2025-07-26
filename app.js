// MareSphere Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initContactForm();
    initScrollEffects();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (those starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    closeMobileMenu();
                }
            }
            // External links (like services.html) will work normally
        });
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + document.querySelector('.navbar').offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function handleFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Validate all fields
    const isValid = validateForm(form);
    
    if (!isValid) {
        showFormMessage('Please correct the errors above.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.classList.add('btn--loading');
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.classList.remove('btn--loading');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showFormMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
        
        // In a real implementation, you would send the form data to your server:
        // const formData = new FormData(form);
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => {
        //     // Handle response
        // });
        
    }, 2000);
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required.';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address.';
            isValid = false;
        }
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--space-4)';
    
    field.parentNode.appendChild(errorElement);
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message--${type}`;
    messageElement.textContent = message;
    
    // Style the message
    messageElement.style.padding = 'var(--space-12) var(--space-16)';
    messageElement.style.borderRadius = 'var(--radius-base)';
    messageElement.style.marginBottom = 'var(--space-16)';
    messageElement.style.fontSize = 'var(--font-size-sm)';
    messageElement.style.fontWeight = 'var(--font-weight-medium)';
    
    if (type === 'success') {
        messageElement.style.backgroundColor = `rgba(var(--color-success-rgb), 0.1)`;
        messageElement.style.color = 'var(--color-success)';
        messageElement.style.border = `1px solid rgba(var(--color-success-rgb), 0.2)`;
    } else if (type === 'error') {
        messageElement.style.backgroundColor = `rgba(var(--color-error-rgb), 0.1)`;
        messageElement.style.color = 'var(--color-error)';
        messageElement.style.border = `1px solid rgba(var(--color-error-rgb), 0.2)`;
    }
    
    // Insert message at the top of the form
    const form = document.getElementById('contactForm');
    form.insertBefore(messageElement, form.firstChild);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards for animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Observe footer sections for animation
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(section);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    if (mobileToggle && mobileNavMenu) {
        mobileToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
        
        // Close mobile menu when clicking the close button
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function() {
                closeMobileMenu();
            });
        }
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNavMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !mobileNavMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });
    }
}

function toggleMobileMenu() {
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileNavMenu.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function openMobileMenu() {
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    mobileNavMenu.classList.add('active');
    mobileToggle.classList.add('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    mobileNavMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth reveal animation for hero content
window.addEventListener('load', function() {
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroText.style.transition = 'opacity 1s ease, transform 1s ease';
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Add CSS for form validation
const style = document.createElement('style');
style.textContent = `
    .form-control.error {
        border-color: var(--color-error);
        box-shadow: 0 0 0 3px rgba(var(--color-error-rgb), 0.1);
    }
    
    .error-message {
        animation: fadeInUp 0.3s ease;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .form-message {
        animation: slideDown 0.3s ease;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);