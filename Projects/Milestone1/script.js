document.addEventListener("DOMContentLoaded", function () {
    /* Slider Logic */
    const sliderContainer = document.querySelector(".slider");
    const sliderTrack = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track img");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let index = 1; // Start at first real image
    let isDragging = false;
    let startX, scrollLeft;

    // Clone first and last images for seamless looping
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    sliderTrack.appendChild(firstClone);
    sliderTrack.insertBefore(lastClone, slides[0]);

    // Get all slides again after cloning
    const allSlides = document.querySelectorAll(".slider-track img");
    const slideWidth = slides[0].clientWidth;

    // Set initial position to first real image
    sliderTrack.style.transform = `translateX(${-slideWidth * index}px)`;

    function updateSlider() {
        sliderTrack.style.transition = "transform 0.5s ease-in-out";
        sliderTrack.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
        if (index >= allSlides.length - 1) return;
        index++;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        if (index <= 0) return;
        index--;
        updateSlider();
    });

    // Loop back after transition ends
    sliderTrack.addEventListener("transitionend", () => {
        if (index >= allSlides.length - 1) {
            sliderTrack.style.transition = "none";
            index = 1;
            sliderTrack.style.transform = `translateX(${-slideWidth * index}px)`;
        } else if (index <= 0) {
            sliderTrack.style.transition = "none";
            index = allSlides.length - 2;
            sliderTrack.style.transform = `translateX(${-index * slideWidth}px)`;
        }
    });

    // Make slider scrollable with dragging
    sliderContainer.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.pageX - sliderContainer.offsetLeft;
        scrollLeft = sliderContainer.scrollLeft;
    });

    sliderContainer.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    sliderContainer.addEventListener("mouseup", () => {
        isDragging = false;
    });

    sliderContainer.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - sliderContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        sliderContainer.scrollLeft = scrollLeft - walk;
    });
});
