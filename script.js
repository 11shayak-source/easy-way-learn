/**
 * Trust & Wings Premium Dark Theme - script.js
 * Handles scroll animations, smooth navigation, and dynamic rendering effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Intersection Observer for Scroll Animations
       ========================================================================== */
    
    // Configure observer options: trigger when 15% of the element is visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    // Callback function to add the 'is-visible' class when elements enter viewport
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing once the animation has triggered to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need standard scroll animations
    const animatedElements = document.querySelectorAll('.fade-in-on-scroll, .slide-up-on-scroll');
    animatedElements.forEach(el => scrollObserver.observe(el));

    
    /* ==========================================================================
       2. Staggered Rendering Logic for "Hand in Hand" Banners
       ========================================================================== */
    
    // Select the contact banners
    const contactBanners = document.querySelectorAll('.contact-banner-placeholder');
    
    contactBanners.forEach((banner, index) => {
        // Dynamically add the animation class if not hardcoded in HTML
        banner.classList.add('slide-up-on-scroll');
        
        // Apply a staggered transition delay so they appear sequentially (e.g., 0s, 0.2s, 0.4s)
        banner.style.transitionDelay = `${index * 0.2}s`;
        
        // Add them to the intersection observer
        scrollObserver.observe(banner);
    });

    
    /* ==========================================================================
       3. Smooth Scrolling for Primary Navigation
       ========================================================================== */
    
    // Select all anchor links in the navigation that point to an ID
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    // Adjust this value based on the height of your fixed navigation bar
    const navHeaderOffset = 80; 

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default instant jump
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate the exact scroll position minus the fixed header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeaderOffset;

                // Execute the smooth scroll
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ==========================================================================
       4. Navigation Background Blur on Scroll (Optional Enhancement)
       ========================================================================== */
    
    const mainNav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Darken and blur the nav background when scrolling down
            mainNav.style.background = 'rgba(5, 5, 5, 0.95)';
            mainNav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            // Revert to semi-transparent state at the top of the page
            mainNav.style.background = 'rgba(5, 5, 5, 0.8)';
            mainNav.style.boxShadow = 'none';
        }
    });

});