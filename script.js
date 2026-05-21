// Enable strict mode for better error catching
'use strict';

/**
 * Aura Premium Fine Dining - Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initReservationForm();
    initBackToTop();
    initCopyrightYear();
    initScrollSpy();
});

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Navigation Toggle
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger || !navLinks) return;

    const toggleMenu = () => {
        const isActive = hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    };

    const closeMenu = () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Support keyboard triggers (Enter / Space) for hamburger menu
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/**
 * Reservation Form Handling
 */
function initReservationForm() {
    const form = document.getElementById('reservationForm');
    const btn = document.getElementById('submitBtn');
    const dateInput = document.getElementById('date');

    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${year}-${month}-${day}`;
    }

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const originalText = btn.innerText;
        btn.innerText = 'Processing...';
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            btn.innerText = 'Reservation Confirmed!';
            btn.style.background = '#28a745';
            btn.style.color = '#fff';
            
            form.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = 'var(--primary-color)';
                btn.style.color = 'var(--bg-color)';
                btn.style.opacity = '1';
            }, 3000);
            
        }, 1500);
    });
}

/**
 * Back to Top Button Logic
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Dynamically Update Copyright Year
 */
function initCopyrightYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

/**
 * ScrollSpy: Highlight active section in navbar
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.setAttribute('aria-current', 'page');
                    } else {
                        link.removeAttribute('aria-current');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (document.querySelector(`.nav-links a[href="#${section.id}"]`)) {
            spyObserver.observe(section);
        }
    });
}

// End of main application logic


// Future utility functions placeholder




const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = newsletterForm.querySelector('.newsletter-btn');
        const originalText = btn.innerText;
        btn.innerText = 'Subscribed!';
        btn.style.background = '#28a745';
        btn.style.color = '#fff';
        newsletterForm.reset();
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = 'var(--primary-color)';
            btn.style.color = 'var(--bg-color)';
        }, 3000);
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.menu-card, .testimonial-card').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});
