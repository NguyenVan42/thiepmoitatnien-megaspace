// Function to scroll to specific section
function scrollToSection(num) {
    const section = document.getElementById('section' + num);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Update active dot on scroll
const sections = document.querySelectorAll('.section');
const navDots = document.querySelectorAll('.nav-dot');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionIndex = Array.from(sections).indexOf(entry.target);
            navDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === sectionIndex);
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const currentSection = Array.from(sections).findIndex(section => {
        const rect = section.getBoundingClientRect();
        return rect.top >= -100 && rect.top <= 100;
    });

    if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentSection + 2);
    } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        scrollToSection(currentSection);
    }
});

// Add stars dynamically (from version 1)
sections.forEach(section => {
    const starsContainer = section.querySelector('.stars');
    if (starsContainer) {
        for (let i = 0; i < 15; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }
});

// Enable image zoom on mobile
const images = document.querySelectorAll('.section-image');
images.forEach(img => {
    img.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            this.classList.toggle('zoomed');
            if (this.classList.contains('zoomed')) {
                // Enable pinch zoom
                this.style.transform = 'scale(1)';
            } else {
                this.style.transform = 'scale(1)';
            }
        }
    });
});

// Improved mouse wheel navigation - removed blocking for better scroll
let wheelTimeout;
document.addEventListener('wheel', (e) => {
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
        // Allow normal scrolling behavior
    }, 100);
}, { passive: true });