// JavaScript para a página principal SteelMax
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle do menu hambúrguer
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', (e) => {
        if (hamburger && navMenu && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Função para atualizar link ativo
    function updateActiveLink() {
        // Manter o link "Início" sempre ativo na página inicial
        const inicioLink = document.querySelector('a[href="#inicio"]');
        if (inicioLink) {
            // Remove active de todos os links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // Mantém o link "Início" sempre ativo
            inicioLink.classList.add('active');
        }
    }
    
    // Atualizar link ativo no scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Scroll suave para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Se for um link externo (contato.html), não preventDefault
            if (targetId.includes('.html')) {
                return; // Deixa o comportamento padrão do link
            }
            
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Atualizar link ativo inicial
    updateActiveLink();
    
    // Smooth scroll para âncoras
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Hero button functionality
    const heroButton = document.querySelector('.hero-button');
    if (heroButton) {
        heroButton.addEventListener('click', function() {
            smoothScroll('.about');
        });
    }
    
    // About button functionality
    const aboutButton = document.querySelector('.about-button');
    if (aboutButton) {
        aboutButton.addEventListener('click', function() {
            smoothScroll('.services');
        });
    }
    
    // Video play buttons
    const videoButtons = document.querySelectorAll('.video-play-button, .video-play-icon');
    const videoModal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const videoClose = document.querySelector('.video-close');
    
    videoButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Opção 1: Abrir modal com vídeo embedded (mais elegante)
            if (videoModal && videoFrame) {
                const videoUrl = 'https://www.youtube.com/embed/duvwz-r4LhI?autoplay=1&rel=0';
                videoFrame.src = videoUrl;
                videoModal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Previne scroll
            } else {
                // Opção 2: Abrir em nova aba (fallback)
                window.open('https://www.youtube.com/watch?v=duvwz-r4LhI&list=TLGGgnmYdGwI7_0yMjA4MjAyNQ', '_blank');
            }
        });
    });
    
    // Fechar modal de vídeo
    if (videoClose && videoModal) {
        videoClose.addEventListener('click', function() {
            closeVideoModal();
        });
    }
    
    // Fechar modal clicando fora do conteúdo
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal && videoModal.style.display === 'block') {
            closeVideoModal();
        }
    });
    
    // Função para fechar modal de vídeo
    function closeVideoModal() {
        if (videoModal && videoFrame) {
            videoModal.style.display = 'none';
            videoFrame.src = ''; // Para o vídeo
            document.body.style.overflow = 'auto'; // Restaura scroll
        }
    }
    // Partners Carousel - CSS Animation Only (no JavaScript needed)
    
    // Service buttons
    const serviceButtons = document.querySelectorAll('.service-button');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'contato.html';
        });
    });
    
    // Project buttons
    const projectButtons = document.querySelectorAll('.project-button');
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Portfólio completo em desenvolvimento! Entre em contato para ver mais projetos.');
        });
    });
    

    

    
    // Scroll animations
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .service-card');
        
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .service-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Check on load
    
    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target >= 200 ? '+' : '+');
        }, 20);
    }
    
    // Initialize counter animations when in viewport
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;
    
    function checkCounters() {
        if (!countersAnimated && statNumbers.length > 0) {
            const firstStat = statNumbers[0];
            if (isElementInViewport(firstStat)) {
                statNumbers.forEach((stat, index) => {
                    const target = index === 0 ? 200 : 10;
                    setTimeout(() => {
                        animateCounter(stat, target);
                    }, index * 200);
                });
                countersAnimated = true;
            }
        }
    }
    
    window.addEventListener('scroll', checkCounters);
    checkCounters(); // Check on load
    
    // Parallax effect for hero background
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg-image');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
    
    window.addEventListener('scroll', handleParallax);
    

    
    // Form validation for future contact forms
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[\(\)\s\-\+\d]{10,}$/;
        return re.test(phone);
    }
    
    // Expose utilities globally
    window.SteelMaxUtils = {
        smoothScroll,
        validateEmail,
        validatePhone,
        animateCounter
    };
    
    // Console log for development
    console.log('SteelMax - Página Principal Carregada com Sucesso! 🏗️');
    console.log('Funcionalidades ativas: Navegação, Animações, Carrosséis, Contadores');
});
