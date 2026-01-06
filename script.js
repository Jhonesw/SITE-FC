// --- LÓGICA DO CARROSSEL FULL (O primeiro) ---
let indexFull = 0;
const sliderFull = document.getElementById('sliderFull');
const totalFull = document.querySelectorAll('.slide-item-full').length;

function mostrarFull() {
    sliderFull.style.transform = `translateX(-${indexFull * 100}%)`;
}

function nextFull() {
    indexFull = (indexFull + 1) % totalFull; // Volta ao início automaticamente
    mostrarFull();
}

function prevFull() {
    indexFull = (indexFull - 1 + totalFull) % totalFull;
    mostrarFull();
}

// --- LÓGICA DAS VITRINES (Múltiplos carrosséis) ---
// Criamos um objeto para guardar a posição de cada carrossel na página
const vitrineStates = {};

function moverVitrine(btn, direcao) {
    // Encontra o container pai e o slider específico deste botão
    const container = btn.closest('.vitrine-wrapper');
    const slider = container.querySelector('.slider-vitrine');
    const cards = slider.querySelectorAll('.card-vitrine');
    
    // Identificador único baseado no título ou ordem (usaremos o conteúdo do slider para ID temporário)
    const totalCards = cards.length;
    const cardsVisiveis = window.innerWidth <= 600 ? 2 : (window.innerWidth <= 1000 ? 4 : 7);
    const maxIndex = Math.max(0, totalCards - cardsVisiveis);

    // Inicializa o estado se não existir
    const sliderId = slider.innerHTML.substring(0, 50); // Cria um ID baseado no conteúdo
    if (vitrineStates[sliderId] === undefined) vitrineStates[sliderId] = 0;

    // Atualiza o index
    vitrineStates[sliderId] += direcao;

    // Lógica de "Voltar ao início" ou "Ir para o fim"
    if (vitrineStates[sliderId] > maxIndex) {
        vitrineStates[sliderId] = 0; // Volta para a primeira
    } else if (vitrineStates[sliderId] < 0) {
        vitrineStates[sliderId] = maxIndex; // Vai para a última
    }

    // Calcula o deslocamento
    const larguraCard = cards[0].offsetWidth + 8; // card + gap
    slider.style.transform = `translateX(-${vitrineStates[sliderId] * larguraCard}px)`;
}

// Auto Play apenas para o Full
setInterval(nextFull, 5000);

// Ajusta layout se a tela mudar de tamanho
window.addEventListener('resize', () => {
    // Reseta vitrines para evitar bugs de posição no resize
    document.querySelectorAll('.slider-vitrine').forEach(s => s.style.transform = 'translateX(0)');
});