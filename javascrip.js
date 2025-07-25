// Smooth scrolling para navegação
// Faz a rolagem suave ao clicar nos links do menu que levam para seções da página
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Só executa o scroll suave se o href começa com "#"
        const href = this.getAttribute('href');
        // Se não for um link interno, não faz nada
        if (!href.startsWith("#")) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Adicionar classe ativa na navegação
// Destaca o link do menu correspondente à seção visível na tela
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section'); // Seleciona todas as seções do site
    const navLinks = document.querySelectorAll('nav a');   // Seleciona todos os links do menu
    
    let current = '';
    // Para cada seção, verifica se ela está próxima do topo da página
    sections.forEach(section => {
        const sectionTop = section.offsetTop; // Posição da seção na página
        if (scrollY >= sectionTop - 200) {    // Se a rolagem passou por essa seção (ajuste de 200px)
            current = section.getAttribute('id'); // Pega o id da seção atual
        }
    });
    
    // Para cada link do menu, remove a classe ativa e adiciona só no link da seção atual
    navLinks.forEach(link => {
        link.classList.remove('active'); // Remove a classe ativa de todos os links
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active'); // Adiciona a classe ativa no link da seção atual
        }
    });
});

// Animação de entrada dos projetos
// Faz os projetos aparecerem suavemente quando entram na tela
const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) { // Se o projeto está visível na tela
            entry.target.style.opacity = '1'; // Torna visível
            entry.target.style.transform = 'translateY(0)'; // Move para posição original
        }
    });
});

// Aplica a animação em cada projeto
document.querySelectorAll('.projeto').forEach(projeto => {
    projeto.style.opacity = '0'; // Começa invisível
    projeto.style.transform = 'translateY(20px)'; // Começa deslocado para baixo
    projeto.style.transition = 'opacity 0.6s, transform 0.6s'; // Transição suave
    observador.observe(projeto); // Observa quando o projeto aparece na tela
});


// Permite que você selecione um PDF ou JPG do seu computador para o botão "Meu currículo"
const uploadInput = document.getElementById('upload-curriculo');
const curriculoLink = document.getElementById('curriculo-link');

uploadInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file && (file.type === "application/pdf" || file.type === "image/jpeg")) {
        const url = URL.createObjectURL(file);
        curriculoLink.href = url;
        curriculoLink.download = file.name;
        curriculoLink.textContent = "Baixar meu arquivo";
        curriculoLink.style.pointerEvents = "auto";
        curriculoLink.style.opacity = "1";
    } else {
        curriculoLink.href = "#";
        curriculoLink.textContent = "Meu currículo";
        curriculoLink.style.pointerEvents = "none";
        curriculoLink.style.opacity = "0.5";
        alert("Por favor, selecione um arquivo PDF ou JPG.");
    }
});