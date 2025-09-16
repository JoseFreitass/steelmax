// Funcionalidades do header e navegação da página de projetos
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Smooth scroll para links internos (se houver)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Encontra o título dentro da seção para fazer scroll até ele
                const titleElement = targetElement.querySelector('.category-title');
                if (titleElement) {
                    // Calcula a posição do título considerando o header fixo
                    const headerHeight = 80; // Altura aproximada do header
                    const elementPosition = titleElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback para a seção inteira
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Scroll automático quando a página é carregada com âncora na URL
    function scrollToAnchor() {
        const hash = window.location.hash;
        if (hash) {
            // Aguarda um pouco para garantir que a página foi totalmente carregada
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    // Encontra o título dentro da seção para fazer scroll até ele
                    const titleElement = targetElement.querySelector('.category-title');
                    if (titleElement) {
                        // Calcula a posição do título considerando o header fixo
                        const headerHeight = 80; // Altura aproximada do header
                        const elementPosition = titleElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: elementPosition,
                            behavior: 'smooth'
                        });
                    } else {
                        // Fallback para a seção inteira
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }, 200);
        }
    }
    
    // Executa o scroll quando a página carrega
    scrollToAnchor();
    
    // Também executa quando a página é redimensionada (para casos de mudança de layout)
    window.addEventListener('resize', scrollToAnchor);
});
