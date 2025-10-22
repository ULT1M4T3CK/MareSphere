// MareSphere Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initContactForm();
    initScrollEffects();
    initMobileMenu();
    initServiceModals();
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

// Service Modal Functionality
function initServiceModals() {
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('serviceModal');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const modalClose = modal?.querySelector('.modal-close');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // Service data
    const serviceData = {
        'nautical': {
            title: 'Nautical-Technical Coordination',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>`,
            description: `
                <ul>
                    <li>Coordination and supervision of shipyard stays, conversions, repairs, and technical projects</li>
                    <li>Technical project planning, schedule monitoring, and quality control as Owner's Representative</li>
                    <li>Interface between shipowner, shipyard, suppliers, authorities, and classification societies</li>
                    <li>Pre-inspections to prepare for official, classification, or customer audits (including action catalogs, reports, and documentation checks)</li>
                </ul>
            `
        },
        'emergency': {
            title: 'Maritime Emergency Management',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>`,
            description: `
                <ul>
                    <li>24/7 availability in technical or organizational emergencies (e.g., casualties, deficiencies, document issues)</li>
                    <li>Coordination of all immediate measures and necessary communication with authorities</li>
                    <li>Mobilization and management of qualified service providers in case of damage</li>
                    <li>Documentation of all actions for insurance, authorities, and customers</li>
                </ul>
            `
        },
        'spare-parts': {
            title: 'Spare Parts Procurement',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 7h-3V6a4 4 0 0 0-8 0v1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="15" r="2"/>
                <path d="M8 7V6a4 4 0 0 1 8 0v1"/>
            </svg>`,
            description: `
                <ul>
                    <li>Research, procurement, and organization of spare parts (focus on hard-to-get or obsolete parts)</li>
                    <li>Supplier evaluation, quality control, and tracking of the supply chain</li>
                    <li>Coordination of express and emergency deliveries</li>
                    <li>Transparent, order-related processing (no commissions on service providers, clear procurement fee)</li>
                </ul>
            `
        },
        'mediation': {
            title: 'Service Mediation & Commission',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>`,
            description: `
                <ul>
                    <li>Mediation of specialized service providers (e.g., technicians, inspectors, shipyard services, surveyors, specialist consultants)</li>
                    <li>Organization and follow-up of service assignments on behalf/interest of the customer</li>
                    <li>Contract management between customer and service provider, transparent commission structure</li>
                    <li>Quality assurance of outsourced services provided</li>
                    <li>Focus: everything beyond pure spare parts procurement (e.g., special cleaning, NDT, consulting)</li>
                </ul>
            `
        },
        'documentation': {
            title: 'Documentation & Certification Management',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
            </svg>`,
            description: `
                <ul>
                    <li>Organization, maintenance, and central archiving of all ship- and operation-relevant documents</li>
                    <li>ISM/ISPS manuals, maintenance documentation, deadline management, audit support</li>
                    <li>Support with reflagging, classifications, and class inspections</li>
                </ul>
            `
        },
        'ship-management': {
            title: 'Customized Ship Management',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
            </svg>`,
            description: `
                <ul>
                    <li>Administrative support for ship operators without their own back office</li>
                    <li>Contract management, insurance, crew administration, authority contacts</li>
                    <li>Digital document management and compliance monitoring</li>
                </ul>
            `
        }
    };

    // Open modal function
    function openModal(serviceId) {
        const service = serviceData[serviceId];
        if (!service || !modal) return;

        modalIcon.innerHTML = service.icon;
        modalTitle.textContent = service.title;
        modalBody.innerHTML = service.description;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click event to service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service');
            openModal(serviceId);
        });
    });

    // Close modal on overlay click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal on close button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });
}

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