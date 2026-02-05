/* PIPOCAFLIX ENGINE v2.0
    Otimizado para Performance e Interação
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Loader & Inicialização
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 800);
    });

    // 2. Header Inteligente com Throttling
    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // 3. VSL Player Funcional
    const video = document.getElementById('vslPlayer');
    const overlay = document.getElementById('videoOverlay');
    
    if(overlay) {
        overlay.addEventListener('click', () => {
            overlay.classList.add('hide');
            video.play();
            video.controls = true;
        });
    }

    // 4. Efeito Tilt 3D nas Coleções (Vanilla JS Performance)
    const cards = document.querySelectorAll('.collection-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });

    // 5. Contador Animado com Intersection Observer
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.8 });

    counters.forEach(c => observer.observe(c));

    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target.toLocaleString() + '+';
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current).toLocaleString();
            }
        }, 30);
    }

    // 6. Smooth Scroll Otimizado
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});