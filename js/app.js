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
                if (entry.target.classList.contains('timeline-item') || entry.target.classList.contains('reason-card') || entry.target.classList.contains('letter-card') || entry.target.classList.contains('gallery-item')) {
                    entry.target.classList.add('fade-in-up', 'visible');
                }
                // Optional: Unobserve if we only want it to animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for scroll elements
    const scrollElements = document.querySelectorAll('.timeline-item, .reason-card, .letter-card, .gallery-item');
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

    // --- Creative Enhancements ---

    // 1. Heart Particles Generator
    const particlesContainer = document.getElementById('particles-container');
    const heartIcons = ['❤️', '💖', '✨', '💕', '🌸'];

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        
        // Random position and size
        const startX = Math.random() * 100;
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 5 + 7;
        
        particle.style.left = startX + 'vw';
        particle.style.fontSize = size + 'px';
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }

    // Create particles periodically
    setInterval(createParticle, 1000);

    // 2. Mouse Follow Parallax Effect
    const heroBg = document.querySelector('.hero-bg');
    document.addEventListener('mousemove', (e) => {
        if (window.scrollY < window.innerHeight) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
            heroBg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        }
    });

    // 3. Surprise Button Logic
    const surpriseBtn = document.getElementById('surprise-btn');
    const surpriseModal = document.getElementById('surprise-modal');
    const closeModal = document.querySelector('.close-modal');
    const surpriseMessage = document.getElementById('surprise-message');
    const confettiContainer = document.getElementById('confetti-container');

    const messages = [
        "¿Sabías que eres la razón de mis sonrisas más bonitas? ❤️",
        "Gracias por ser mi paz en medio del caos. 💖",
        "Eres la mejor manicurista del mundo, pero sobre todo, ¡la mejor novia! 💅✨",
        "Cada día a tu lado es un regalo que cuido con todo mi amor. 🎁",
        "Me encantas en todas tus versiones. 😍",
        "Oye Yeimi... ¿ya te dije que te amo muchísimo hoy? ❤️"
    ];

    surpriseBtn.addEventListener('click', () => {
        // Pick a random message
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        surpriseMessage.textContent = randomMsg;
        
        // Show modal
        surpriseModal.classList.add('visible');
        
        // Trigger confetti
        createConfetti();
    });

    closeModal.addEventListener('click', () => {
        surpriseModal.classList.remove('visible');
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === surpriseModal) {
            surpriseModal.classList.remove('visible');
        }
    });

    // 4. Confetti Explosion
    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'particle'; // Reuse particle style or create new
            confetti.textContent = '❤️';
            confetti.style.left = '50%';
            confetti.style.top = '50%';
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 10 + 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            confetti.style.position = 'absolute';
            confetti.style.transition = 'all 1s ease-out';
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.style.transform = `translate(${vx * 20}px, ${vy * 20}px) scale(0)`;
                confetti.style.opacity = '0';
            }, 50);
            
            setTimeout(() => {
                confetti.remove();
            }, 1000);
        }
    }
});
