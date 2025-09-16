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
    
    // Inicializar EmailJS
    (function() {
        emailjs.init("39SOTBdgPQobUQYzD");
    })();

    // Formulário de contato - envio com EmailJS
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
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
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                return;
            }
            
            // Mostrar loading
            const submitBtn = contactForm.querySelector('.submit-btn');
            if (submitBtn) {
                const span = submitBtn.querySelector('span');
                if (span) {
                    span.textContent = 'Enviando...';
                }
                submitBtn.disabled = true;
            }
            
            // Preparar dados do formulário
            const formData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                title: document.getElementById('service').value,
                message: document.getElementById('message').value,
                time: new Date().toLocaleString('pt-BR')
            };
            
            // Enviar email usando EmailJS
            emailjs.send('service_tyc0ark', 'template_639q598', formData)
                .then(function(response) {
                    console.log('Email enviado com sucesso!', response.status, response.text);
                    showSuccessNotification();
                }, function(error) {
                    console.error('Erro ao enviar email:', error);
                    showErrorNotification();
                })
                .finally(function() {
                    // Restaurar botão
                    if (submitBtn) {
                        const span = submitBtn.querySelector('span');
                        if (span) {
                            span.textContent = 'Enviar Mensagem';
                        }
                        submitBtn.disabled = false;
                    }
                });
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
    
    // Função para mostrar notificação de sucesso
    function showSuccessNotification() {
        // Criar overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Criar modal de sucesso
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <div style="color: #32CD32; font-size: 60px; margin-bottom: 20px;">✓</div>
            <h2 style="color: #2c3e50; margin: 0 0 15px 0; font-family: 'Kanit', sans-serif;">Mensagem Enviada!</h2>
            <p style="color: #666; margin: 0 0 25px 0; line-height: 1.5;">
                Sua mensagem foi enviada com sucesso!<br>
                Entraremos em contato em breve.
            </p>
            <button id="successBtn" style="
                background: #32CD32;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s ease;
            ">Voltar ao Início</button>
        `;
        
        // Adicionar animação CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Limpar formulário
        contactForm.reset();
        
        // Evento do botão
        document.getElementById('successBtn').addEventListener('click', function() {
            document.body.removeChild(overlay);
            window.location.href = 'index.html';
        });
        
        // Fechar ao clicar no overlay
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
                window.location.href = 'index.html';
            }
        });
    }
    
    // Função para mostrar notificação de erro
    function showErrorNotification() {
        // Criar overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        // Criar modal de erro
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            animation: slideIn 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <div style="color: #e74c3c; font-size: 60px; margin-bottom: 20px;">⚠</div>
            <h2 style="color: #2c3e50; margin: 0 0 15px 0; font-family: 'Kanit', sans-serif;">Ops! Algo deu errado</h2>
            <p style="color: #666; margin: 0 0 25px 0; line-height: 1.5;">
                Não foi possível enviar sua mensagem.<br>
                Tente novamente ou entre em contato pelo telefone (15) 99720-7828
            </p>
            <button id="errorBtn" style="
                background: #e74c3c;
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s ease;
            ">Tentar Novamente</button>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Evento do botão
        document.getElementById('errorBtn').addEventListener('click', function() {
            document.body.removeChild(overlay);
        });
        
        // Fechar ao clicar no overlay
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
});