document.addEventListener('DOMContentLoaded', () => {
    
    // --- Typewriter Effect ---
    const textElement = document.querySelector('.typewriter-text');
    const textToType = 'Para la manicurista más talentosa y hermosa, Yeimi Acosta...';
    let charIndex = 0;
    let isTyping = true;

    function typeWriter() {
        if (charIndex < textToType.length) {
            textElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            // Once finished, after a while we trigger the fade-ins below it
            const fadeElements = document.querySelectorAll('.hero-content .fade-in-up');
            fadeElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 300);
            });
        }
    }

    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 500);


    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine what kind of animation to add based on the element
                if (entry.target.classList.contains('timeline-item') || entry.target.classList.contains('reason-card') || entry.target.classList.contains('letter-card')) {
                    entry.target.classList.add('fade-in-up', 'visible');
                }
                // Optional: Unobserve if we only want it to animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for scroll elements
    const scrollElements = document.querySelectorAll('.timeline-item, .reason-card, .letter-card');
    scrollElements.forEach(el => {
        // Pre-apply fade-in-up styling if not already present
        if (!el.classList.contains('fade-in-up')) {
            el.classList.add('fade-in-up');
            // Remove 'visible' class just in case to ensure it's hidden initially
            el.classList.remove('visible'); 
        }
        observer.observe(el);
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
