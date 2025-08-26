// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Gallery Lightbox Effect
const galleryImages = document.querySelectorAll('.gallery-image');
let currentImageIndex = 0;

// Create lightbox
function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-image" src="" alt="">
            <button class="lightbox-prev">❮</button>
            <button class="lightbox-next">❯</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
}

// Add lightbox styles
function addLightboxStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(5px);
        }
        
        .lightbox.active {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-image {
            width: 100%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            background: rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }
        
        .lightbox-close:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .lightbox-prev, .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            border: none;
            padding: 1rem;
            cursor: pointer;
            font-size: 1.5rem;
            border-radius: 4px;
            transition: background 0.3s ease;
        }
        
        .lightbox-prev {
            left: -60px;
        }
        
        .lightbox-next {
            right: -60px;
        }
        
        .lightbox-prev:hover, .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 768px) {
            .lightbox-prev {
                left: 10px;
            }
            .lightbox-next {
                right: 10px;
            }
            .lightbox-close {
                top: 10px;
                right: 10px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize lightbox
if (galleryImages.length > 0) {
    addLightboxStyles();
    const lightbox = createLightbox();
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    const imageSrcs = Array.from(galleryImages).map(img => img.src);
    
    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = imageSrcs[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + imageSrcs.length) % imageSrcs.length;
        lightboxImage.src = imageSrcs[currentImageIndex];
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageSrcs.length;
        lightboxImage.src = imageSrcs[currentImageIndex];
    }
    
    // Event listeners
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });
    
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.gallery-item, .appointment-card, .project-specs, .related-project').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// CTA Button interaction
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // Here you would typically redirect to contact page or open a modal
        // For now, let's scroll to contact section or redirect to contact page
        window.location.href = 'contato.html';
    });
}
