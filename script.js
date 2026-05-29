// Interactive script modules for navigation, scrollspy, and booking validation
// Enable strict mode for better error catching
'use strict';

/**
 * Aura Premium Fine Dining - Main Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initMenuFilters();
    initReviews();
    initReservationForm();
    initBookingManager();
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
        
        const nameInput = document.getElementById('name');
        const dateVal = dateInput ? dateInput.value : '';
        const guestsSelect = document.getElementById('guests');
        const guestsVal = guestsSelect ? guestsSelect.value : '2';

        if (!nameInput.value.trim() || !dateVal) return;

        const originalText = btn.innerText;
        btn.innerText = 'Processing...';
        btn.style.opacity = '0.8';
        
        setTimeout(() => {
            // Save Booking to LocalStorage
            const bookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
            const newBooking = {
                id: Date.now(),
                name: nameInput.value.trim(),
                date: dateVal,
                guests: guestsVal
            };
            bookings.push(newBooking);
            localStorage.setItem('aura_bookings', JSON.stringify(bookings));

            // Refresh Bookings display if helper exists
            if (window.refreshBookingsList) {
                window.refreshBookingsList();
            }

            btn.innerText = 'Reservation Confirmed!';
            btn.style.background = '#28a745';
            btn.style.color = '#fff';
            
            form.reset();
            if (dateInput) {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                dateInput.min = `${year}-${month}-${day}`;
            }
            
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

/**
 * Menu Category Filtering Logic
 */
function initMenuFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    if (!filterBtns.length || !menuCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filterValue = btn.getAttribute('data-filter');

            // Update active state for buttons
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            // Filter menu items
            menuCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    // Reset animation state
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Handle Beverages navigation link redirecting to Menu with beverages filter
    const beveragesNavLink = document.querySelector('a[href="#beverages"]');
    if (beveragesNavLink) {
        beveragesNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
                // Trigger the click event on the beverages filter button
                const beveragesFilterBtn = document.querySelector('.filter-btn[data-filter="beverages"]');
                if (beveragesFilterBtn) {
                    beveragesFilterBtn.click();
                }
            }
        });
    }
}

/**
 * Testimonial Reviews System (Local Storage)
 */
function initReviews() {
    const testimonialForm = document.getElementById('testimonialForm');
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    const stars = document.querySelectorAll('.star-rating .star');
    let selectedRating = 5;

    if (!testimonialForm || !testimonialsGrid) return;

    // Handle Star Clicks
    stars.forEach(star => {
        // Mark stars selected by default
        star.classList.add('selected');

        star.addEventListener('click', () => {
            selectedRating = parseInt(star.getAttribute('data-value'));
            stars.forEach(s => {
                const val = parseInt(s.getAttribute('data-value'));
                if (val <= selectedRating) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });

        // Add keyboard support
        star.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                star.click();
            }
        });
    });

    // Helper to generate stars string
    const getStarsString = (count) => '★'.repeat(count) + '☆'.repeat(5 - count);

    // Helper to render a testimonial card
    const renderTestimonial = (name, text, rating, isNew = false) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="rating">${getStarsString(rating)}</div>
            <p class="testimonial-text">"${text}"</p>
            <p class="guest-name">— ${name}</p>
        `;
        
        if (isNew) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s ease-out';
            testimonialsGrid.appendChild(card);
            // Trigger reflow & animate
            void card.offsetWidth;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        } else {
            testimonialsGrid.appendChild(card);
        }
    };

    // Load saved reviews
    const savedReviews = JSON.parse(localStorage.getItem('aura_reviews') || '[]');
    savedReviews.forEach(rev => {
        renderTestimonial(rev.name, rev.text, rev.rating);
    });

    // Handle Form Submission
    testimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('reviewName');
        const textInput = document.getElementById('reviewText');
        const submitBtn = document.getElementById('submitReviewBtn');

        if (!nameInput.value.trim() || !textInput.value.trim()) return;

        const name = nameInput.value.trim();
        const text = textInput.value.trim();
        const rating = selectedRating;

        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Submitting...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Save to LocalStorage
            const currentReviews = JSON.parse(localStorage.getItem('aura_reviews') || '[]');
            currentReviews.push({ name, text, rating });
            localStorage.setItem('aura_reviews', JSON.stringify(currentReviews));

            // Render testimonial
            renderTestimonial(name, text, rating, true);

            // Reset form
            testimonialForm.reset();
            selectedRating = 5;
            stars.forEach(s => s.classList.add('selected'));

            submitBtn.innerText = 'Thank You!';
            submitBtn.style.background = '#28a745';
            submitBtn.style.color = '#fff';

            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'var(--primary-color)';
                submitBtn.style.color = 'var(--bg-color)';
            }, 2000);
        }, 1000);
    });
}




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

/**
 * Reservations Booking Manager (Local Storage & Simulation)
 */
function initBookingManager() {
    const listContainer = document.getElementById('bookingsList');
    const searchInput = document.getElementById('bookingSearchInput');

    if (!listContainer) return;

    // Helper to refresh bookings from localStorage
    window.refreshBookingsList = function(searchTerm = '') {
        const bookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
        listContainer.innerHTML = '';

        const filtered = bookings.filter(b => 
            b.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filtered.length === 0) {
            listContainer.innerHTML = searchTerm 
                ? '<p class="no-bookings">No matching reservations found.</p>'
                : '<p class="no-bookings">No active bookings yet.</p>';
            return;
        }

        filtered.forEach(booking => {
            const item = document.createElement('div');
            item.className = 'booking-item';
            item.setAttribute('data-id', booking.id);
            item.innerHTML = `
                <div class="booking-details">
                    <span class="booking-name">${escapeHTML(booking.name)}</span>
                    <span class="booking-meta">${booking.guests} ${parseInt(booking.guests) === 1 ? 'Person' : 'People'} • ${booking.date}</span>
                </div>
                <div class="booking-actions">
                    <span class="booking-badge confirmed">Confirmed</span>
                    <button class="cancel-booking-btn" data-id="${booking.id}">Cancel</button>
                </div>
            `;
            listContainer.appendChild(item);
        });
    };

    // Helper to escape HTML to prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
        );
    }

    // Handle cancellation delegation
    listContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('cancel-booking-btn')) {
            const bookingId = parseInt(e.target.getAttribute('data-id'));
            const bookingItem = e.target.closest('.booking-item');

            if (bookingItem) {
                bookingItem.classList.add('cancelling');
                
                setTimeout(() => {
                    let bookings = JSON.parse(localStorage.getItem('aura_bookings') || '[]');
                    bookings = bookings.filter(b => b.id !== bookingId);
                    localStorage.setItem('aura_bookings', JSON.stringify(bookings));
                    window.refreshBookingsList(searchInput ? searchInput.value : '');
                }, 300);
            }
        }
    });

    // Handle Search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            window.refreshBookingsList(e.target.value);
        });
    }

    // Initial render
    window.refreshBookingsList();
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
