document.addEventListener("DOMContentLoaded", function () {
    /* Slider Logic */
    const sliderContainer = document.querySelector(".slider");
    const sliderTrack = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track img");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let index = 0;
    let isDragging = false;
    let startX, scrollLeft;

    // Duplicate slides for infinite effect
    sliderTrack.innerHTML += sliderTrack.innerHTML;
    const allSlides = document.querySelectorAll(".slider-track img");
    const slideWidth = slides[0].clientWidth;

    function updateSlider() {
        sliderTrack.style.transition = "transform 0.5s ease-in-out";
        sliderTrack.style.transform = `translateX(${-index * slideWidth}px)`;
    }

    nextBtn.addEventListener("click", () => {
        if (index >= slides.length) {
            sliderTrack.style.transition = "none";
            index = 0;
            sliderTrack.style.transform = `translateX(${0}px)`;
        }
        setTimeout(() => {
            index++;
            updateSlider();
        }, 10);
    });

    prevBtn.addEventListener("click", () => {
        if (index <= 0) {
            sliderTrack.style.transition = "none";
            index = slides.length;
            sliderTrack.style.transform = `translateX(${-index * slideWidth}px)`;
        }
        setTimeout(() => {
            index--;
            updateSlider();
        }, 10);
    });

    // Make slider scrollable
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
        const walk = (x - startX) * 1.5; // Adjust speed
        sliderContainer.scrollLeft = scrollLeft - walk;
    });

    // Loop the slider smoothly
    sliderTrack.addEventListener("transitionend", () => {
        if (index >= slides.length) {
            sliderTrack.style.transition = "none";
            index = 0;
            sliderTrack.style.transform = `translateX(${0}px)`;
        } else if (index < 0) {
            sliderTrack.style.transition = "none";
            index = slides.length - 1;
            sliderTrack.style.transform = `translateX(${-index * slideWidth}px)`;
        }
    });
});
