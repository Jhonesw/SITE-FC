document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO CARROSSEL FULL ---
    let indexFull = 0;
    const sliderFull = document.getElementById('sliderFull');
    const totalFull = document.querySelectorAll('.slide-item-full').length;

    function mostrarFull() {
        if (sliderFull) {
            sliderFull.style.transform = `translateX(-${indexFull * 100}%)`;
        }
    }

    window.nextFull = function() {
        indexFull = (indexFull + 1) % totalFull;
        mostrarFull();
    }

    window.prevFull = function() {
        indexFull = (indexFull - 1 + totalFull) % totalFull;
        mostrarFull();
    }

    // Auto Play Full
    setInterval(window.nextFull, 5000);

    // --- LÓGICA DAS VITRINES ---
    const vitrineStates = {};

    window.moverVitrine = function(btn, direcao) {
        const container = btn.closest('.vitrine-wrapper');
        const slider = container.querySelector('.slider-vitrine');
        const cards = slider.querySelectorAll('.card-vitrine');
        
        const totalCards = cards.length;
        const cardsVisiveis = window.innerWidth <= 600 ? 2 : (window.innerWidth <= 1000 ? 4 : 7);
        const maxIndex = Math.max(0, totalCards - cardsVisiveis);

        const sliderId = slider.innerHTML.substring(0, 50); 
        if (vitrineStates[sliderId] === undefined) vitrineStates[sliderId] = 0;

        vitrineStates[sliderId] += direcao;

        if (vitrineStates[sliderId] > maxIndex) {
            vitrineStates[sliderId] = 0;
        } else if (vitrineStates[sliderId] < 0) {
            vitrineStates[sliderId] = maxIndex;
        }

        const larguraCard = cards[0].offsetWidth + 8; 
        slider.style.transform = `translateX(-${vitrineStates[sliderId] * larguraCard}px)`;
    }

    window.addEventListener('resize', () => {
        document.querySelectorAll('.slider-vitrine').forEach(s => s.style.transform = 'translateX(0)');
    });
});