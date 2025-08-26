// Navegação ativa e funcionalidades da página de contato
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('contactForm');
    
    // Toggle do menu hambúrguer
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
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
    
    // Funcionalidade do formulário de contato
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar campos obrigatórios
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            let firstInvalidField = null;
            
            // Remover mensagens anteriores
            const existingMessage = document.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Validar cada campo obrigatório
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#333333';
                    if (!firstInvalidField) {
                        firstInvalidField = field;
                    }
                } else {
                    field.style.borderColor = '#e9ecef';
                }
                
                // Validação específica para email
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        isValid = false;
                        field.style.borderColor = '#333333';
                        if (!firstInvalidField) {
                            firstInvalidField = field;
                        }
                    }
                }
                
                // Validação para telefone
                if (field.type === 'tel' && field.value.trim()) {
                    const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
                    if (!phoneRegex.test(field.value.trim())) {
                        isValid = false;
                        field.style.borderColor = '#333333';
                        if (!firstInvalidField) {
                            firstInvalidField = field;
                        }
                    }
                }
            });
            
            if (!isValid) {
                showMessage('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
                if (firstInvalidField) {
                    firstInvalidField.focus();
                }
                return;
            }
            
            // Simular envio do formulário
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('span').textContent;
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('span').textContent = 'Enviando...';
            submitBtn.style.opacity = '0.7';
            
            // Simular delay de envio
            setTimeout(() => {
                // Resetar formulário
                contactForm.reset();
                
                // Resetar estilos dos campos
                requiredFields.forEach(field => {
                    field.style.borderColor = '#e9ecef';
                });
                
                // Mostrar mensagem de sucesso
                showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                
                // Resetar botão
                submitBtn.disabled = false;
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.style.opacity = '1';
                
                // Scroll para o topo do formulário para mostrar a mensagem
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
            }, 2000);
        });
    }
    
    // Função para mostrar mensagens
    function showMessage(text, type) {
        // Remover mensagem anterior se existir
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Criar nova mensagem
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = text;
        messageDiv.style.display = 'block';
        
        // Inserir no início do formulário
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Auto-remove após 5 segundos se for mensagem de sucesso
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.style.opacity = '0';
                    setTimeout(() => {
                        if (messageDiv.parentNode) {
                            messageDiv.remove();
                        }
                    }, 300);
                }
            }, 5000);
        }
    }
    
    // Animação dos campos ao focar
    const formFields = document.querySelectorAll('.form-field input, .form-field textarea, .form-field select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        field.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
        
        // Limpar estilo de erro ao digitar
        field.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(51, 51, 51)') {
                this.style.borderColor = '#e9ecef';
            }
        });
    });
    
    // Máscara para telefone
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
            }
            
            e.target.value = value;
        });
    }
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
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
