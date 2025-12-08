// MareSphere Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
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
        link.addEventListener('click', function (e) {
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
    window.addEventListener('scroll', function () {
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
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleFormSubmission(this);
        });

        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', function () {
                validateField(this);
            });

            input.addEventListener('input', function () {
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
        showFormMessage('Bitte korrigieren Sie die Fehler oben.', 'error');
        return;
    }

    // Show loading state
    submitButton.classList.add('btn--loading');
    submitButton.textContent = 'Senden...';
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
        showFormMessage('Vielen Dank für Ihre Nachricht! Wir werden uns innerhalb von 24 Stunden bei Ihnen melden.', 'success');

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
        errorMessage = 'Dieses Feld ist erforderlich.';
        isValid = false;
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
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

    window.addEventListener('scroll', function () {
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

    const observer = new IntersectionObserver(function (entries) {
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
        mobileToggle.addEventListener('click', function () {
            toggleMobileMenu();
        });

        // Close mobile menu when clicking the close button
        if (mobileNavClose) {
            mobileNavClose.addEventListener('click', function () {
                closeMobileMenu();
            });
        }

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNavMenu.querySelectorAll('.nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function () {
                closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!mobileToggle.contains(e.target) && !mobileNavMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', function () {
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
window.addEventListener('load', function () {
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
            title: 'Nautisch-Technische Koordination',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>`,
            description: `
                <p><strong>Effiziente Prozesse, klare Schnittstellen und technische Sicherheit.</strong></p>
                <p>Als Schnittstelle zwischen Reederei, Crew, technischen Dienstleistern und Behörden sorgt MareSphere dafür, dass nautisch-technische Abläufe strukturiert und erfolgreich umgesetzt werden.</p>
                <ul>
                    <li><strong>Vorbereitung & Begleitung von Inspektionen:</strong> Strukturierte Planung und Vorab-Checks für Klassifikations-, Flaggenstaats- oder Kundeninspektionen (z.B. IMCA, OVID).</li>
                    <li><strong>Werft- & Reparaturkoordination:</strong> Unterstützung bei der Planung, Abstimmung und Überwachung von Werftaufenthalten, Umbauten oder Reparaturprojekten – vor Ort oder remote.</li>
                    <li><strong>Technische Kommunikation:</strong> Klärung technischer Fragen zwischen Schiff und Land sowie Schnittstellenmanagement zu externen Firmen.</li>
                </ul>
                <p><strong>Ihr Vorteil:</strong> Sie gewinnen Zeit, behalten den Überblick und erhalten einen verlässlichen Ansprechpartner, der maritime Prozesse verständlich macht und Ihr Tagesgeschäft entlastet – egal, ob es um Einzelprojekte oder fortlaufende Betreuung geht.</p>
            `
        },
        'documentation': {
            title: 'Dokumentations- & Zertifikate Management',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
            </svg>`,
            description: `
                <p><strong>Damit Ihre Schiffsdokumente immer „auf Kurs“ bleiben.</strong></p>
                <p>In der modernen Schifffahrt ist die lückenlose Pflege von Dokumenten und Zertifikaten entscheidend – ob bei Audits, Inspektionen, Umflaggungen oder dem täglichen Betrieb. MareSphere übernimmt für Sie das professionelle Management aller schiffs- und betriebsrelevanten Unterlagen.</p>
                <ul>
                    <li>Wir organisieren und strukturieren Ihre technischen Dokumente, Zertifikate und Zeichnungen – digital oder klassisch.</li>
                    <li>Wir behalten Fristen für Inspektionen, Audits und Zertifikatserneuerungen im Blick, erinnern rechtzeitig an anstehende Maßnahmen und unterstützen aktiv bei der Vorbereitung und Umsetzung. Ganz wie es Ihnen beliebt.</li>
                    <li>Bei Umflaggungen, Klassifikationswechseln, Class Inspections oder auch Flaggenstaatsinspektionen und IMCA-Audits als auch bei Inspektionen Dritter, begleiten wir Sie vom Antrag bis zur erfolgreichen Abnahme. Wir prüfen, koordinieren und arrangieren und sorgen für eine lückenlose Nachverfolgung.</li>
                    <li>Auf Wunsch erstellen wir aus Ihrer bestehenden Dokumentation praxisnahe Auditvorlagen und Checklisten.</li>
                </ul>
                <p><strong>Ihr Vorteil:</strong> Sie sparen Zeit und Nerven, vermeiden unnötigen Aufwand und minimieren Risiken durch fehlende oder fehlerhafte Dokumente. MareSphere hilft Ihnen, dass Ihr Schiff jederzeit und bestens vorbereitet ist.</p>
            `
        },
        'ship-management': {
            title: 'Individualisiertes Bereederungs- & Projektmanagement',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
            </svg>`,
            description: `
                <p><strong>Persönliche Betreuung und maßgeschneiderte Lösungen für Ihre Schiffe.</strong></p>
                <p>Nicht jede Reederei oder Schiffseigner verfügt über ein eigenes Backoffice oder erfahrenes Projektpersonal für die Vielzahl an technischen, organisatorischen und administrativen Aufgaben im Betriebsalltag. MareSphere bietet Ihnen als unabhängiger Dienstleistungspartner flexible Unterstützung exakt dort, wo Sie sie benötigen.</p>
                <ul>
                    <li><strong>Bereederungsmanagement nach Maß:</strong> Von Vertragswesen über Versicherungsfragen bis zum technischen Einkauf– wir begleiten Sie proaktiv und übernehmen auf Wunsch die Koordination mit z.B. Behörden, Klassifikationsgesellschaften, Partnern uvm.</li>
                    <li><strong>Projektsteuerung und Umsetzung:</strong> Ob Modernisierung, Umbau oder nautisch/technische Sonderprojekte – MareSphere hilft Ihnen maßgeschneidert bei der Planung, dem Zeitmanagement und bei Schnittstellen zu externen Dienstleistern oder Lieferanten und unterstützt bei einer wirtschaftlichen und konformen Umsetzung.</li>
                    <li><strong>Anpassungsfähig & lösungsorientiert:</strong> Sie erhalten maßgeschneiderte Betreuung, zugeschnitten auf Größe und Bedarf Ihrer Flotte – egal ob regelmäßige Unterstützung, punktuelle Projektbegleitung oder Überbrückung bei Personalausfall.</li>
                </ul>
                <p><strong>Ihr klarer Mehrwert:</strong> Sie behalten den Fokus auf den Schiffsbetrieb, reduzieren interne Ressourcenbindung und gewinnen einen fachlich versierten, persönlich erreichbaren Partner für alle bereederungsspezifischen und nautisch- / technischen Herausforderungen.</p>
            `
        },
        'spare-parts': {
            title: 'Spezialisierte Ersatzteilbeschaffung & Einlaufmanagement',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 7h-3V6a4 4 0 0 0-8 0v1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="15" r="2"/>
                <path d="M8 7V6a4 4 0 0 1 8 0v1"/>
            </svg>`,
            description: `
                <p><strong>Wenn das richtige Teil zur richtigen Zeit am richtigen Ort sein muss.</strong></p>
                <p>Stillliegezeiten kosten Geld – besonders dann, wenn ein Schiff auf ein spezielles Bauteil oder technisches Equipment wartet. MareSphere unterstützt Sie dabei, kritische Ersatzteile schnell, zielgerichtet und mit Blick auf Qualität und Verlässlichkeit zu beschaffen und den Einlauf so zu organisieren, dass der operative Betrieb möglichst wenig beeinträchtigt wird.</p>
                <ul>
                    <li><strong>Spezialisierte Ersatzteilsuche:</strong> Unterstützung bei der Identifikation und Auswahl passender Komponenten, insbesondere bei schwer verfügbaren oder obsoleten Teilen.</li>
                    <li><strong>Koordination von Angebot und Bestellung:</strong> Unterstützung bei der Einholung, Bewertung und Auswahl von Angeboten sowie bei der Abstimmung mit Lieferanten und Dienstleistern.</li>
                    <li><strong>Einlaufbezogene Abstimmung:</strong> Begleitende Organisation rund um den Hafeneinlauf im Zusammenhang mit der Teilelieferung, z. B. Abstimmung mit Technikern, Werft oder Servicepartnern vor Ort.</li>
                    <li><strong>Nachverfolgung und Dokumentation:</strong> Transparente Kommunikation zum Status, Unterstützung bei Rückfragen und geordnetes Ablegen der relevanten Unterlagen für spätere Nachweise.</li>
                </ul>
                <p><strong>Ihr Vorteil:</strong> Sie erhalten eine unabhängige, praxisnahe Unterstützung, die Ihre technischen Anforderungen versteht und die Kommunikation zwischen Reederei, Lieferanten und Dienstleistern strukturiert.</p>
                <p><em>Shipping connects. Wir helfen dabei, dass das richtige Teil und die richtigen Menschen zur richtigen Zeit zusammenkommen – damit Ihr Schiff in Bewegung bleibt.</em></p>
            `
        },
        'mediation': {
            title: 'Maritime Services (Brokerage)',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>`,
            description: `
                <p><strong>Verlässliche Partner, klar koordiniert.</strong></p>
                <p>Nicht jede Reederei oder jeder Schiffseigner hat für jeden Fall den passenden Dienstleister „an der Hand“. Genau hier setzt MareSphere an: Als neutraler, erfahrener Partner unterstützt MareSphere dabei, spezialisierte maritime Services, Charterschiffe oder Schlepper bedarfsgerecht zu finden, anzusprechen und strukturiert einzubinden.</p>
                <ul>
                    <li><strong>Vermittlung spezialisierter Dienstleister:</strong> Unterstützung bei der Auswahl und Kontaktaufnahme zu passenden Unternehmen, etwa für technische Einsätze, Sonderreinigungen, Inspektionen, Bergungs- oder Unterstützungsleistungen.</li>
                    <li><strong>Charter- und Schleppunterstützung:</strong> Unterstützung bei der Suche nach geeigneten Charterschiffen oder Schleppern für konkrete Einsätze, inklusive Abstimmung der Rahmenbedingungen und Koordination der Kommunikation.</li>
                    <li><strong>Koordination und Nachverfolgung:</strong> Strukturierte Begleitung vom Erstkontakt bis zur Durchführung, inklusive Terminabstimmung, Informationsfluss und sinnvoller Dokumentation der vereinbarten Leistungen.</li>
                </ul>
                <p>MareSphere tritt dabei nicht als Großanbieter auf, sondern als unabhängiger Koordinator mit maritimer Praxiserfahrung und gutem Zugang zu verschiedenen Akteuren im Markt.</p>
                <p><em>Shipping connects. MareSphere hilft, die passenden Partner zusammenzubringen, damit Ihre Projekte zur See und im Hafen verlässlich umgesetzt werden.</em></p>
            `
        },
        'emergency': {
            title: 'Maritime Notfallkoordination',
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>`,
            description: `
                <p><strong>Wenn es ernst wird, braucht es Struktur und einen klaren Ansprechpartner.</strong></p>
                <p>Im Notfall zählt jede Minute – und gleichzeitig braucht es Ruhe, Übersicht und saubere Koordination. MareSphere unterstützt kleine und mittelständische Reeder sowie Einzelschiffseigner dabei, in kritischen Situationen handlungsfähig zu bleiben und die richtigen Schritte in sinnvoller Reihenfolge einzuleiten.</p>
                <ul>
                    <li><strong>Zentraler Ansprechpartner im Ernstfall:</strong> Sie haben eine feste Anlaufstelle, die Vorgänge sortiert, Informationen bündelt und hilft, die passenden Dienstleister, Behörden und Partner einzubeziehen.</li>
                    <li><strong>Koordination von Maßnahmen:</strong> Unterstützung bei der Organisation und Abstimmung von technischen Einsätzen, Werftkontakten, Gutachtern oder sonstigen Dienstleistern – mit Fokus darauf, Abläufe nachvollziehbar und dokumentierbar zu halten.</li>
                    <li><strong>Dokumentation und Nachbereitung:</strong> Begleitende Unterstützung bei der Zusammenstellung der wesentlichen Informationen und Unterlagen, etwa für Versicherung, interne Auswertung oder spätere Prüfungen.</li>
                </ul>
                <p>MareSphere ersetzt keinen Havariekommandanten und keine spezialisierte Behörde, schafft jedoch Struktur, Entlastung und Übersicht – gerade dort, wo interne Ressourcen begrenzt sind oder Routine in Krisensituationen fehlt.</p>
                <p><em>Shipping connects. Auch im Notfall sorgt MareSphere dafür, dass die richtigen Informationen und Beteiligten zusammenfinden – damit Sie nicht allein vor komplexen Entscheidungen stehen.</em></p>
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
        card.addEventListener('click', function () {
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
    document.addEventListener('keydown', function (e) {
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