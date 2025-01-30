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

    /* Product Page Logic */
    const products = [
        {
            id: "1",
            title: "Deep Noir Tee",
            price: "$250",
            description: "A timeless black tee made from the finest cotton for superior comfort and style.",
            image: "images/BlackShirt.png"
        },
        {
            id: "2",
            title: "Scottish Wool Coat",
            price: "$1,260",
            description: "Handcrafted from premium Scottish wool, this coat is the epitome of luxury and warmth.",
            image: "images/WoolCoat.png"
        },
        {
            id: "3",
            title: "Designer Pants",
            price: "$750",
            description: "Elegantly tailored designer pants to elevate your wardrobe.",
            image: "images/Pants.png"
        },
        {
            id: "4",
            title: "Grey Luxe Hoodie",
            price: "$550",
            description: "A soft, high-quality grey hoodie with a minimalistic yet luxurious design.",
            image: "images/Hoodie.png"
        },
        {
            id: "5",
            title: "Long Sleeve",
            price: "$450",
            description: "A premium long sleeve shirt, perfect for layering or standalone wear.",
            image: "images/LongSleeve.png"
        },
        {
            id: "6",
            title: "White Long Sleeve",
            price: "$450",
            description: "A crisp white long sleeve that exudes class and simplicity.",
            image: "images/WhiteSleeve.png"
        }
    ];

    function getProductDetails() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get("id");
        const product = products.find(p => p.id === productId);

        if (product) {
            document.getElementById("main-image").src = product.image;
            document.getElementById("product-title").textContent = product.title;
            document.getElementById("product-price").textContent = product.price;
            document.getElementById("product-description").textContent = product.description;
        }
    }

    if (window.location.pathname.includes("product.html")) {
        getProductDetails();
    }
});
