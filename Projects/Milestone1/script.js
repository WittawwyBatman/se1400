document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".image-track");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    let index = 0;
    const totalImages = document.querySelectorAll(".image-track img").length;
    const imagesPerSlide = 3;
    const maxIndex = Math.ceil(totalImages / imagesPerSlide) - 1;
    let autoSlide;

    function updateSlider() {
        const moveAmount = index * -(100 / imagesPerSlide) + "%";
        track.style.transform = "translateX(" + moveAmount + ")";
    }

    function nextSlide() {
        if (index < maxIndex) {
            index++;
        } else {
            index = 0; // Restart from the first slide
        }
        updateSlider();
    }

    function prevSlide() {
        if (index > 0) {
            index--;
        } else {
            index = maxIndex; // Go to last slide
        }
        updateSlider();
    }

    nextButton.addEventListener("click", function () {
        nextSlide();
        resetAutoSlide();
    });

    prevButton.addEventListener("click", function () {
        prevSlide();
        resetAutoSlide();
    });

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, 3000); // Change slides every 3 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // Start auto-sliding when the page loads
    startAutoSlide();
});
