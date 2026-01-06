// CARROSSEL
let indexFull = 0;
const sliderFull = document.getElementById('sliderFull');
const totalFull = document.querySelectorAll('.slide-item-full').length;

function mostrarFull() {
    sliderFull.style.transform = `translateX(-${indexFull * 100}%)`;
}

function nextFull() {
    indexFull = (indexFull + 1) % totalFull;
    mostrarFull();
}

function prevFull() {
    indexFull = (indexFull - 1 + totalFull) % totalFull;
    mostrarFull();
}

setInterval(nextFull, 5000);

// MODAL DE IMAGEM
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("imgExpanded");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll('.img-zoomable').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = "flex";
        modalImg.src = this.src;
        document.body.style.overflow = "hidden";
    });
});

closeModal.onclick = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
};