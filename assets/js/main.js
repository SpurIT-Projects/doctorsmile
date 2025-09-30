// ===== DOCTOR SMILE MAIN JAVASCRIPT =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    initMobileMenu();
    initScrollToTop();
    initSmoothScroll();
    initAppointmentModal();
    initFormHandling();
    initNavbarScroll();
    initAnimations();
    initAutoScrollOnPageChange();
}

// ===== AUTO SCROLL TO TOP ON PAGE CHANGE =====
function initAutoScrollOnPageChange() {
    // Listen for navigation clicks
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If it's an internal anchor link, scroll to top after navigation
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                // Delay scroll to top to allow smooth scrolling to complete
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });
    
    // Listen for browser back/forward buttons
    window.addEventListener('popstate', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Auto scroll to top on page reload
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        window.scrollTo(0, 0);
    }
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = navbarMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Reset hamburger menu
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbarMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navbarMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                
                // Reset hamburger menu
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
}

// ===== SCROLL TO TOP BUTTON =====
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });
}

// ===== UPDATE ACTIVE NAV LINK =====
function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbarScroll() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// ===== APPOINTMENT MODAL =====
function initAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    
    if (modal) {
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAppointmentModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeAppointmentModal();
            }
        });
    }
}

// ===== OPEN APPOINTMENT MODAL =====
function openAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus on first input
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

// ===== CLOSE APPOINTMENT MODAL =====
function closeAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
        
        // Clear form
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            if (!data.name || !data.phone) {
                showNotification('Пожалуйста, заполните обязательные поля', 'error');
                return;
            }
            
            // Validate phone format (basic)
            const phoneRegex = /^[\+]?[0-9\(\)\-\s]+$/;
            if (!phoneRegex.test(data.phone)) {
                showNotification('Пожалуйста, введите корректный номер телефона', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправляем...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showNotification('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
                
                // Close modal
                closeAppointmentModal();
                
                // Log form data (in real app, this would be sent to server)
                console.log('Appointment request:', data);
            }, 2000);
        });
        
        // Phone input formatting
        const phoneInput = appointmentForm.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 0) {
                    if (value.startsWith('375')) {
                        value = '+375 ' + value.slice(3);
                    } else if (value.startsWith('80')) {
                        value = '+375 ' + value.slice(2);
                    } else if (!value.startsWith('+')) {
                        value = '+375 ' + value;
                    }
                }
                e.target.value = value;
            });
        }
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(el => el.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        animation: slideInRight 0.3s ease-out;
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        border-left: 4px solid ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
    `;
    
    const icon = content.querySelector('i');
    icon.style.color = type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db';
    
    const closeBtn = content.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: #7f8c8d;
        cursor: pointer;
        margin-left: auto;
        padding: 4px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add animation styles if not exist
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(styles);
    }
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
    // Intersection Observer for scroll animations
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
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .doctor-card, .why-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== ACTIVE SECTION DETECTION =====
function initActiveSectionDetection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    const observerOptions = {
        threshold: 0.6,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSection = entry.target.getAttribute('id');
                
                // Update navigation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize active section detection
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initActiveSectionDetection, 100);
});

// ===== PERFORMANCE OPTIMIZATION =====

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        img.style.opacity = '0';
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initLazyLoading, 500);
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Use throttled scroll for better performance
window.addEventListener('scroll', throttle(function() {
    // Scroll-based functions are already throttled in their respective init functions
}, 16));

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key handling for modals
    if (e.key === 'Escape') {
        const modal = document.getElementById('appointmentModal');
        if (modal && modal.style.display === 'block') {
            closeAppointmentModal();
        }
    }
    
    // Tab trap for modal
    if (e.key === 'Tab') {
        const modal = document.getElementById('appointmentModal');
        if (modal && modal.style.display === 'block') {
            const focusableElements = modal.querySelectorAll('input, select, textarea, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// Focus management
function manageFocus() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Перейти к основному содержимому';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        z-index: 10000;
        text-decoration: none;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', manageFocus);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you might want to send this to an error tracking service
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Handle unhandled promise rejections
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.openAppointmentModal = openAppointmentModal;
window.closeAppointmentModal = closeAppointmentModal;
window.showNotification = showNotification;