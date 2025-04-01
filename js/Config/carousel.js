document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    console.log(prevBtn);
    const nextBtn = document.querySelector('.next');

    let index = 0;

    function showSlide(i) {
        index = (i + slides.length) % slides.length;
        document.querySelector('.carousel-container').style.transform = `translateX(${-index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => showSlide(index - 1));
    nextBtn.addEventListener('click', () => showSlide(index + 1));

// Auto-slide cada 3 segundos
    setInterval(() => showSlide(index + 1), 3000);
});