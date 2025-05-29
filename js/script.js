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

if (isTouchDevice) {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function () {
            const clickedInner = this.querySelector('.card-inner');

            // Cierra todas las demás cards
            document.querySelectorAll('.card-inner.flipped').forEach(openCard => {
                if (openCard !== clickedInner) {
                    openCard.classList.remove('flipped');
                }
            });

            // Alterna la card actual (abre si está cerrada, cierra si ya estaba abierta)
            clickedInner.classList.toggle('flipped');
        });
    });
}

window.addEventListener('load', () => {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) return;

  const cardsBack = document.querySelectorAll('.card-back');

  cardsBack.forEach((cardBack) => {
    const scrollHint = cardBack.querySelector('.scroll-hint');
    const cardBody = cardBack.querySelector('.card-body');
    const cardTitle = cardBack.querySelector('.card-title');
    if (!scrollHint || !cardBody || !cardTitle) return;

    const hasVerticalScroll = cardBody.scrollHeight > cardBody.clientHeight;

    if (hasVerticalScroll) {
      scrollHint.classList.add('visible');

      // Mover scroll-hint justo encima de .card-title
      if (!cardBody.contains(scrollHint)) {
        cardBody.insertBefore(scrollHint, cardTitle);
        scrollHint.classList.add('inside-flow');
      }
    } else {
      scrollHint.classList.remove('visible');
    }

    const onFirstScroll = () => {
      scrollHint.classList.remove('visible');

      // Volver a poner scrollHint fuera del flujo para que no deje espacio
      scrollHint.classList.remove('inside-flow');
      cardBack.insertBefore(scrollHint, cardBody);

      cardBody.removeEventListener('scroll', onFirstScroll);
    };

    cardBody.addEventListener('scroll', onFirstScroll, { passive: true });
  });
});
