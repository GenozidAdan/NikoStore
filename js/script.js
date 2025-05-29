document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            // Evita que se creen múltiples sets de estrellas si se pasa el cursor varias veces seguidas
            if (this.classList.contains('stars-active')) return;

            this.classList.add('stars-active');

            for (let i = 0; i < 20; i++) {
                createStar(this);
            }

            // Permite volver a crear estrellas después de 1 segundo
            setTimeout(() => {
                this.classList.remove('stars-active');
            }, 1000);
        });
    });

    function createStar(card) {
        const star = document.createElement('div');
        star.classList.add('star');

        const x = Math.random() * card.offsetWidth;
        const y = Math.random() * card.offsetHeight;
        const size = Math.random() * 10 + 5;

        Object.assign(star.style, {
            left: `${x}px`,
            top: `${y}px`,
            width: `${size}px`,
            height: `${size}px`,
            position: 'absolute',
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: '0',
            transform: 'scale(0)',
            transition: 'all 0.5s ease-out',
            pointerEvents: 'none',
        });

        card.appendChild(star);

        setTimeout(() => {
            star.style.opacity = '0.8';
            star.style.transform = 'scale(1)';
        }, 10);

        setTimeout(() => {
            star.style.opacity = '0';
            star.style.transform = 'scale(1.5)';
        }, 500);

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

document.querySelectorAll('.product-card').forEach(card => {
    if (isTouchDevice) {
        card.addEventListener('click', function() {
            this.querySelector('.card-inner').classList.toggle('flipped');
        });
    }
});



document.addEventListener('DOMContentLoaded', () => {
  // Detectar si es móvil (simple)
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (!isMobile) return; // Si no es móvil, no mostrar nada

  const cardsBack = document.querySelectorAll('.card-back');

  cardsBack.forEach((cardBack, index) => {
    const scrollHint = cardBack.querySelector('.scroll-hint');

    if (!scrollHint) return;

    // Mostrar hint solo si hay scroll vertical
    const hasScroll = cardBack.scrollHeight > cardBack.clientHeight;

    if (hasScroll) {
      scrollHint.classList.add('visible');
    } else {
      scrollHint.classList.remove('visible');
    }

    // Detectar primer toque de scroll para ocultar hint
    let touched = false;

    cardBack.addEventListener('touchstart', (e) => {
      if (!touched) {
        touched = true;
        scrollHint.classList.remove('visible');
      }
    }, { once: true });
  });
});
