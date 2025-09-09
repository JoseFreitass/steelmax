// JavaScript simplificado para página de contato
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contato JS carregado');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('contactForm');
    
    // Toggle do menu hambúrguer
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu && 
            !hamburger.contains(e.target) && 
            !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Formulário de contato - envio real
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            console.log('Formulário sendo enviado para devjosefreitas@gmail.com');
            
            // Validação básica
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff0000';
                } else {
                    field.style.borderColor = '#e9ecef';
                }
                
                // Validação de email
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        isValid = false;
                        field.style.borderColor = '#ff0000';
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                return;
            }
            
            // Mostrar loading e permitir envio
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                const span = submitBtn.querySelector('span');
                if (span) {
                    span.textContent = 'Enviando...';
                }
                submitBtn.disabled = true;
            }
            
            // Feedback após envio
            setTimeout(function() {
                alert('Mensagem enviada com sucesso! Verifique sua caixa de entrada.');
            }, 1000);
        });
    }
    
    // Formatação de telefone
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 6) {
                    value = value.replace(/(\d{2})(\d{0,4})/, '($1) $2');
                } else if (value.length <= 10) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
                
                e.target.value = value;
            }
        });
    }
    
    // Efeitos visuais nos campos
    const formFields = document.querySelectorAll('.form-field input, .form-field textarea, .form-field select');
    formFields.forEach(function(field) {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Scroll suave para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});