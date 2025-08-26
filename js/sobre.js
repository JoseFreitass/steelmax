// Sobre.js - JavaScript para a página Sobre Nós da SteelMax

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar componentes
    initializeNavigation();
    initializeContactForm();
    initializeAnimations();
    initializeScrollEffects();
});

// Navegação Mobile
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animar as barras do hamburger
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
}

// Formulário de Contato
function initializeContactForm() {
    const form = document.getElementById('aboutContactForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            try {
                // Mostrar loading
                submitBtn.innerHTML = '<span>Enviando...</span>';
                submitBtn.disabled = true;
                
                // Simular envio (aqui você integraria com seu backend)
                await simulateFormSubmission(formData);
                
                // Mostrar sucesso
                showFormMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                form.reset();
                
            } catch (error) {
                // Mostrar erro
                showFormMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
                console.error('Erro no formulário:', error);
            } finally {
                // Restaurar botão
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });

        // Validação em tempo real
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

// Simular envio do formulário
function simulateFormSubmission(formData) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Aqui você faria a integração real com seu backend
            const success = Math.random() > 0.1; // 90% chance de sucesso para demo
            
            if (success) {
                resolve();
            } else {
                reject(new Error('Simulação de erro'));
            }
        }, 2000);
    });
}

// Mostrar mensagem do formulário
function showFormMessage(message, type) {
    // Remove mensagem existente
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Criar nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    // Inserir no formulário
    const form = document.getElementById('aboutContactForm');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }, 5000);
    }
}

// Validar campo individual
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover erro anterior
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    // Validações específicas
    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Email inválido';
            }
            break;
            
        case 'tel':
            const phoneRegex = /^[\d\s\-\(\)\+]+$/;
            if (value && !phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Telefone inválido';
            }
            break;
    }
    
    // Validação de campos obrigatórios
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Campo obrigatório';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Mostrar erro no campo
function showFieldError(field, message) {
    field.style.borderColor = '#dc3545';
    
    // Criar ou atualizar mensagem de erro
    let errorDiv = field.parentNode.querySelector('.field-error');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            font-family: 'Kanit', sans-serif;
        `;
        field.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

// Limpar erro do campo
function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = '';
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Animações e efeitos visuais
function initializeAnimations() {
    // Animar números
    animateNumbers();
    
    // Animar cards ao entrar na viewport
    animateOnScroll();
}

// Animar contadores
function animateNumbers() {
    const experienceNumber = document.querySelector('.experience-number');
    if (experienceNumber) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target, 25, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(experienceNumber);
    }
}

// Animar contador
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animar elementos ao entrar na viewport
function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .call-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Efeitos de scroll
function initializeScrollEffects() {
    // Parallax no hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Efeito parallax no CTA background
        const ctaBackground = document.querySelector('.cta-bg');
        if (ctaBackground) {
            ctaBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Header sempre fixo (removido comportamento de ocultar/mostrar)
}

// Smooth scroll para links internos
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
});

// Lazy loading para imagens
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Utilitários
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

// Performance: debounce scroll events
const debouncedScrollHandler = debounce(() => {
    // Handlers de scroll que precisam de debounce
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Acessibilidade: navegação por teclado
document.addEventListener('keydown', function(e) {
    // ESC para fechar menu mobile
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        }
    }
});

// Controle de foco para acessibilidade
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Inicializar lazy loading quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initializeLazyLoading);
