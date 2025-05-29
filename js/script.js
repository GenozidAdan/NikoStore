document.addEventListener('DOMContentLoaded', function() {
    // Crear estrellas dinámicas al hacer hover
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Crear estrellitas
            for (let i = 0; i < 20; i++) {
                createStar(this);
            }
        });
    });
    
    function createStar(card) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Posición aleatoria dentro de la card
        const x = Math.random() * card.offsetWidth;
        const y = Math.random() * card.offsetHeight;
        
        // Tamaño aleatorio
        const size = Math.random() * 10 + 5;
        
        // Estilos de la estrella
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.position = 'absolute';
        star.style.backgroundColor = 'white';
        star.style.borderRadius = '50%';
        star.style.opacity = '0';
        star.style.transform = 'scale(0)';
        star.style.transition = 'all 0.5s ease-out';
        star.style.pointerEvents = 'none';
        
        card.appendChild(star);
        
        // Animación
        setTimeout(() => {
            star.style.opacity = '0.8';
            star.style.transform = 'scale(1)';
        }, 10);
        
        setTimeout(() => {
            star.style.opacity = '0';
            star.style.transform = 'scale(1.5)';
        }, 500);
        
        // Eliminar después de la animación
        setTimeout(() => {
            star.remove();
        }, 1000);
    }
});

// Preloader Animation
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    const boxLid = document.querySelector('.box-lid');
    
    // Inicia la animación de la caja
    setTimeout(() => {
        boxLid.style.transform = 'rotateX(-120deg)';
        
        // Efecto de destellos cuando se abre
        const sparkles = document.querySelector('.item-sparkles');
        sparkles.style.animation = 'sparkles 1s ease forwards';
        
        // Oculta el preloader después de la animación
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Elimina el preloader del DOM después de la transición
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }, 2000); // Tiempo que la caja "tiembla" antes de abrirse
});

// Detectar si es dispositivo táctil
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Activar volteo con click en móviles
document.querySelectorAll('.product-card').forEach(card => {
    if (isTouchDevice) {
        card.addEventListener('click', function() {
            this.querySelector('.card-inner').classList.toggle('flipped');
        });
    }
});