// MareSphere Translation System
const translations = {
    de: {
        // Navigation
        'nav.home': 'Startseite',
        'nav.about': 'Über mich',
        'nav.services': 'Dienstleistungen',
        'nav.contact': 'Kontakt',

        // Hero Section (index.html)
        'hero.tagline': 'Shipping Connects',
        'hero.description': 'Umfassende maritime Beratungsdienstleistungen mit einem ganzheitlichen Ansatz für Schiffsbetrieb, Sicherheit und nachhaltige Praktiken.',
        'hero.cta.services': 'Dienstleistungen',
        'hero.cta.contact': 'Kontaktieren Sie uns',

        // Home Intro
        'home.intro.title': 'Ihr Partner für maritime Exzellenz',
        'home.intro.text': 'MareSphere steht für verlässliche, unabhängige und ganzheitliche Beratung in der Schifffahrt. Wir verbinden technisches Know-how mit operativem Verständnis, um Ihre Flotte sicher und effizient auf Kurs zu halten. "Shipping Connects" ist nicht nur unser Slogan, sondern unser Versprechen: Wir bringen die richtigen Menschen, Teile und Lösungen zusammen.',

        // Features
        'feature.experienced.title': 'Erfahren & Kompetent',
        'feature.experienced.text': 'Jahrelange Expertise im nautischen und technischen Schiffsmanagement.',
        'feature.global.title': 'Global Vernetzt',
        'feature.global.text': 'Zugang zu einem weltweiten Netzwerk spezialisierter maritime Partner.',
        'feature.efficient.title': 'Effizient & Transparent',
        'feature.efficient.text': 'Optimierte Prozesse und klare Kommunikation für Ihren Erfolg.',

        // Home Services
        'home.services.title': 'Unsere Expertise',
        'home.services.subtitle': 'Maßgeschneiderte Lösungen für Ihre maritimen Herausforderungen',
        'home.services.technical.title': 'Technische Koordination',
        'home.services.technical.text': 'Überwachung von Werftaufenthalten, Reparaturen und technischen Projekten.',
        'home.services.emergency.title': 'Notfallmanagement',
        'home.services.emergency.text': '24/7 Unterstützung in kritischen Situationen und bei technischen Ausfällen.',
        'home.services.spareparts.title': 'Ersatzteilbeschaffung',
        'home.services.spareparts.text': 'Schnelle Identifikation und zuverlässige Beschaffung schwer erhältlicher Teile.',
        'home.services.viewall': 'Alle Dienstleistungen ansehen',

        // Quote
        'quote.text': '"Wir helfen dabei, dass das richtige Teil und die richtigen Menschen zur richtigen Zeit zusammenkommen – damit Ihr Schiff in Bewegung bleibt."',
        'quote.author': 'MareSphere - Shipping Connects',

        // CTA
        'cta.title': 'Bereit für den nächsten Schritt?',
        'cta.text': 'Kontaktieren Sie uns für eine unverbindliche Beratung und erfahren Sie, wie wir Ihren Schiffsbetrieb optimieren können.',
        'cta.contact': 'Kontakt aufnehmen',
        'cta.learnmore': 'Mehr erfahren',

        // About Page
        'about.hero.title': 'Über mich',
        'about.hero.subtitle': 'Professionelle Maritime Kompetenz',
        'about.intro.title': 'Ihr Partner in der maritimen Branche',
        'about.intro.text': 'MareSphere verbindet fundiertes Fachwissen mit praktischer Erfahrung, um Ihnen maßgeschneiderte Lösungen für Ihre maritimen Herausforderungen zu bieten.',
        'about.profile.name': 'Finn Burchard',
        'about.profile.title': 'Gründer & Maritimer Berater',
        'about.profile.bio1': 'Mit über einem Jahrzehnt Erfahrung in der maritimen Industrie hat Finn Burchard ein tiefgreifendes Verständnis für die komplexen Anforderungen des modernen Schiffsbetriebs entwickelt. Seine Karriere begann an Bord verschiedener Schiffstypen, bevor er in leitende Positionen im technischen Management und der Betriebskoordination wechselte.',
        'about.profile.bio2': 'Heute vereint MareSphere diese praxisnahe Expertise mit einem strukturierten, kundenorientierten Ansatz. Ob bei der Koordination von Werftaufenthalten, der Beschaffung kritischer Ersatzteile oder der Begleitung durch Inspektionen und Audits – der Fokus liegt stets auf klaren Prozessen, transparenter Kommunikation und nachhaltigen Ergebnissen.',
        'about.profile.bio3': 'Die Philosophie hinter MareSphere: Maritime Dienstleistungen sollten verbinden, nicht verkomplizieren. "Shipping Connects" bedeutet, dass Reedereien, Zulieferer, Behörden und Crews reibungslos zusammenarbeiten können – mit einem verlässlichen Partner an ihrer Seite.',
        'about.value.reliability.title': 'Verlässlichkeit',
        'about.value.reliability.text': 'Verbindliche Zusagen und termingerechte Umsetzung – darauf können Sie sich verlassen.',
        'about.value.transparency.title': 'Transparenz',
        'about.value.transparency.text': 'Klare Kommunikation und nachvollziehbare Prozesse ohne versteckte Überraschungen.',
        'about.value.partnership.title': 'Partnerschaft',
        'about.value.partnership.text': 'Langfristige Zusammenarbeit auf Augenhöhe – Ihr Erfolg ist unser gemeinsames Ziel.',
        'about.cta.text': 'Überzeugen Sie sich selbst von unserer Expertise.',
        'about.cta.button': 'Kontakt aufnehmen',

        // Services Page
        'services.hero.title': 'Unsere Dienstleistungen',
        'services.hero.subtitle': 'Umfassende maritime Lösungen',
        'services.nautical.title': 'Nautisch-Technische Koordination',
        'services.nautical.excerpt': 'Effiziente Prozesse, klare Schnittstellen und technische Sicherheit für Ihre Flotte.',
        'services.emergency.title': 'Maritime Notfallkoordination',
        'services.emergency.excerpt': 'Wenn es ernst wird, braucht es Struktur und einen klaren Ansprechpartner.',
        'services.spareparts.title': 'Spezialisierte Ersatzteilbeschaffung',
        'services.spareparts.excerpt': 'Wenn das richtige Teil zur richtigen Zeit am richtigen Ort sein muss.',
        'services.brokerage.title': 'Maritime Services (Brokerage)',
        'services.brokerage.excerpt': 'Verlässliche Partner, klar koordiniert – für jeden Bedarf den passenden Dienstleister.',
        'services.documentation.title': 'Dokumentations- & Zertifikatsmanagement',
        'services.documentation.excerpt': 'Damit Ihre Schiffsdokumente immer „auf Kurs" bleiben.',
        'services.management.title': 'Individualisiertes Bereederungs- & Projektmanagement',
        'services.management.excerpt': 'Persönliche Betreuung und maßgeschneiderte Lösungen für Ihre Schiffe.',
        'services.learnmore': 'Mehr erfahren',
        'services.cta.title': 'Bereit loszulegen?',
        'services.cta.text': 'Kontaktieren Sie uns noch heute, um zu besprechen, wie wir Ihre spezifischen Anforderungen unterstützen können.',

        // Contact Page
        'contact.hero.title': 'Kontakt',
        'contact.hero.subtitle': 'Nehmen Sie Kontakt für maritime Lösungen auf',
        'contact.person': 'Ansprechpartner',
        'contact.phone': 'Telefon',
        'contact.email': 'E-Mail',
        'contact.address': 'Adresse',
        'contact.hours': 'Öffnungszeiten',
        'contact.hours.value': 'Montag - Freitag\n8:00 - 18:00 Uhr MEZ',
        'contact.form.name': 'Name',
        'contact.form.email': 'E-Mail',
        'contact.form.service': 'Interesse an Dienstleistung',
        'contact.form.service.select': 'Wählen Sie eine Dienstleistung',
        'contact.form.message': 'Nachricht',
        'contact.form.submit': 'Nachricht senden',

        // Terms Page
        'terms.hero.title': 'AGB',
        'terms.hero.subtitle': 'Unsere Geschäftsbedingungen',
        'terms.download': 'PDF herunterladen',
        'terms.notsupported': 'PDF kann nicht angezeigt werden.',

        // Footer
        'footer.navigation': 'Navigation',
        'footer.services': 'Dienstleistungen',
        'footer.legal': 'Rechtliches',
        'footer.terms': 'Allgemeine Geschäftsbedingungen',
        'footer.copyright': '© 2025 MareSphere. Alle Rechte vorbehalten. | Shipping Connects',

        // Language Switcher
        'lang.switch': 'EN'
    },

    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.contact': 'Contact',

        // Hero Section (index.html)
        'hero.tagline': 'Shipping Connects',
        'hero.description': 'Comprehensive maritime consulting services with a holistic approach to ship operations, safety, and sustainable practices.',
        'hero.cta.services': 'Our Services',
        'hero.cta.contact': 'Contact Us',

        // Home Intro
        'home.intro.title': 'Your Partner for Maritime Excellence',
        'home.intro.text': 'MareSphere stands for reliable, independent, and holistic consulting in shipping. We combine technical know-how with operational understanding to keep your fleet safely and efficiently on course. "Shipping Connects" is not just our slogan, but our promise: We bring together the right people, parts, and solutions.',

        // Features
        'feature.experienced.title': 'Experienced & Competent',
        'feature.experienced.text': 'Years of expertise in nautical and technical ship management.',
        'feature.global.title': 'Globally Connected',
        'feature.global.text': 'Access to a worldwide network of specialized maritime partners.',
        'feature.efficient.title': 'Efficient & Transparent',
        'feature.efficient.text': 'Optimized processes and clear communication for your success.',

        // Home Services
        'home.services.title': 'Our Expertise',
        'home.services.subtitle': 'Tailored solutions for your maritime challenges',
        'home.services.technical.title': 'Technical Coordination',
        'home.services.technical.text': 'Supervision of yard stays, repairs, and technical projects.',
        'home.services.emergency.title': 'Emergency Management',
        'home.services.emergency.text': '24/7 support in critical situations and technical failures.',
        'home.services.spareparts.title': 'Spare Parts Procurement',
        'home.services.spareparts.text': 'Fast identification and reliable procurement of hard-to-find parts.',
        'home.services.viewall': 'View All Services',

        // Quote
        'quote.text': '"We help ensure the right part and the right people come together at the right time – so your ship keeps moving."',
        'quote.author': 'MareSphere - Shipping Connects',

        // CTA
        'cta.title': 'Ready for the Next Step?',
        'cta.text': 'Contact us for a non-binding consultation and discover how we can optimize your ship operations.',
        'cta.contact': 'Get in Touch',
        'cta.learnmore': 'Learn More',

        // About Page
        'about.hero.title': 'About Me',
        'about.hero.subtitle': 'Professional Maritime Expertise',
        'about.intro.title': 'Your Partner in the Maritime Industry',
        'about.intro.text': 'MareSphere combines expert knowledge with practical experience to provide you with tailored solutions for your maritime challenges.',
        'about.profile.name': 'Finn Burchard',
        'about.profile.title': 'Founder & Maritime Consultant',
        'about.profile.bio1': 'With over a decade of experience in the maritime industry, Finn Burchard has developed a deep understanding of the complex requirements of modern ship operations. His career began aboard various vessel types before moving into leadership positions in technical management and operations coordination.',
        'about.profile.bio2': 'Today, MareSphere combines this hands-on expertise with a structured, customer-oriented approach. Whether coordinating yard stays, procuring critical spare parts, or guiding through inspections and audits – the focus is always on clear processes, transparent communication, and sustainable results.',
        'about.profile.bio3': 'The philosophy behind MareSphere: Maritime services should connect, not complicate. "Shipping Connects" means that shipping companies, suppliers, authorities, and crews can work together seamlessly – with a reliable partner at their side.',
        'about.value.reliability.title': 'Reliability',
        'about.value.reliability.text': 'Binding commitments and timely delivery – you can count on it.',
        'about.value.transparency.title': 'Transparency',
        'about.value.transparency.text': 'Clear communication and traceable processes without hidden surprises.',
        'about.value.partnership.title': 'Partnership',
        'about.value.partnership.text': 'Long-term collaboration at eye level – your success is our shared goal.',
        'about.cta.text': 'See for yourself what we can do for you.',
        'about.cta.button': 'Get in Touch',

        // Services Page
        'services.hero.title': 'Our Services',
        'services.hero.subtitle': 'Comprehensive Maritime Solutions',
        'services.nautical.title': 'Nautical-Technical Coordination',
        'services.nautical.excerpt': 'Efficient processes, clear interfaces, and technical safety for your fleet.',
        'services.emergency.title': 'Maritime Emergency Coordination',
        'services.emergency.excerpt': 'When things get serious, you need structure and a clear point of contact.',
        'services.spareparts.title': 'Specialized Spare Parts Procurement',
        'services.spareparts.excerpt': 'Getting the right part to the right place at the right time.',
        'services.brokerage.title': 'Maritime Services (Brokerage)',
        'services.brokerage.excerpt': 'Reliable partners, clearly coordinated – the right service provider for every need.',
        'services.documentation.title': 'Documentation & Certificate Management',
        'services.documentation.excerpt': 'Keeping your ship documents always "on course".',
        'services.management.title': 'Individualized Ship & Project Management',
        'services.management.excerpt': 'Personal support and tailored solutions for your vessels.',
        'services.learnmore': 'Learn More',
        'services.cta.title': 'Ready to Get Started?',
        'services.cta.text': 'Contact us today to discuss how we can support your specific requirements.',

        // Contact Page
        'contact.hero.title': 'Contact',
        'contact.hero.subtitle': 'Get in touch for maritime solutions',
        'contact.person': 'Contact Person',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.address': 'Address',
        'contact.hours': 'Business Hours',
        'contact.hours.value': 'Monday - Friday\n8:00 AM - 6:00 PM CET',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.service': 'Service of Interest',
        'contact.form.service.select': 'Select a service',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send Message',

        // Terms Page
        'terms.hero.title': 'Terms & Conditions',
        'terms.hero.subtitle': 'Our Terms of Service',
        'terms.download': 'Download PDF',
        'terms.notsupported': 'PDF cannot be displayed.',

        // Footer
        'footer.navigation': 'Navigation',
        'footer.services': 'Services',
        'footer.legal': 'Legal',
        'footer.terms': 'Terms & Conditions',
        'footer.copyright': '© 2025 MareSphere. All rights reserved. | Shipping Connects',

        // Language Switcher
        'lang.switch': 'DE'
    }
};

// Translation System Class
class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('maresphere-lang') || 'de';
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.updatePageLanguage();
            this.setupLanguageSwitcher();
        });
    }

    t(key) {
        return translations[this.currentLang][key] || key;
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('maresphere-lang', lang);
            this.updatePageLanguage();
            document.documentElement.lang = lang;
        }
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'de' ? 'en' : 'de';
        this.setLanguage(newLang);
    }

    updatePageLanguage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);

            if (el.tagName === 'INPUT' && el.type === 'submit') {
                el.value = translation;
            } else if (el.hasAttribute('placeholder')) {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        });

        // Update elements with data-i18n-html for HTML content
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            el.innerHTML = this.t(key);
        });

        // Update language switcher button text
        const switcher = document.querySelector('.lang-switch');
        if (switcher) {
            switcher.textContent = this.t('lang.switch');
        }

        // Update html lang attribute
        document.documentElement.lang = this.currentLang;
    }

    setupLanguageSwitcher() {
        const switchers = document.querySelectorAll('.lang-switch');
        switchers.forEach(switcher => {
            switcher.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleLanguage();
            });
        });
    }
}

// Initialize translation system
const i18n = new I18n();
