document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".image-track");
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");

    let index = 0;
    const totalImages = document.querySelectorAll(".image-track img").length;
    const imagesPerSlide = 3;
    const maxIndex = Math.ceil(totalImages / imagesPerSlide) - 1;

    function updateSlider() {
        const moveAmount = index * -(100 / imagesPerSlide) + "%";
        track.style.transform = "translateX(" + moveAmount + ")";
    }

    nextButton.addEventListener("click", function () {
        if (index < maxIndex) {
            index++;
            updateSlider();
        }
    });

    prevButton.addEventListener("click", function () {
        if (index > 0) {
            index--;
            updateSlider();
        }
    });
});
