document.addEventListener("DOMContentLoaded", function () {
    /* Slider Logic */
    const sliderContainer = document.querySelector(".slider");
    const sliderTrack = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slider-track img");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    let index = 1;
    let isDragging = false;
    let startX, scrollLeft;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    sliderTrack.appendChild(firstClone);
    sliderTrack.insertBefore(lastClone, slides[0]);

    const allSlides = document.querySelectorAll(".slider-track img");
    const slideWidth = slides[0].clientWidth;

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

    /* Product Click Event - Redirect to Product Page */
    document.querySelectorAll(".product-link").forEach(img => {
        img.addEventListener("click", function () {
            const productElement = this.closest(".product");
            const productId = productElement.getAttribute("data-id");
            window.location.href = `product.html?id=${productId}`;
        });
    });

    /* Product Page Logic */
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const products = {
        1: { title: "Deep Noir Tee", price: "$250", image: "images/BlackShirt.png", description: "A premium black tee crafted from high-quality materials for a timeless luxury look." },
        2: { title: "Scottish Wool Coat", price: "$1,260", image: "images/WoolCoat.png", description: "A sophisticated wool coat made from the finest Scottish wool." },
        3: { title: "Designer Pants", price: "$750", image: "images/Pants.png", description: "Elegant designer pants with a modern fit and premium craftsmanship." },
        4: { title: "Grey Luxe Hoodie", price: "$550", image: "images/Hoodie.png", description: "A soft, stylish grey hoodie perfect for layering and comfort." },
        5: { title: "Long Sleeve", price: "$450", image: "images/LongSleeve.png", description: "A versatile long sleeve made from breathable, high-end fabric." },
        6: { title: "White Long Sleeve", price: "$450", image: "images/WhiteSleeve.png", description: "A crisp white long sleeve that pairs well with any outfit." }
    };

    if (productId && products[productId]) {
        document.getElementById("product-title").textContent = products[productId].title;
        document.getElementById("product-price").textContent = products[productId].price;
        document.getElementById("product-image").src = products[productId].image;
        document.getElementById("product-description").textContent = products[productId].description;
    } else if (document.querySelector(".product-details")) {
        document.querySelector(".product-details").innerHTML = "<p>Product not found.</p>";
    }

    /* Cart Functionality */
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const productElement = this.closest(".product");
            const productId = productElement.getAttribute("data-id");
            const productTitle = productElement.getAttribute("data-title");
            const productPrice = productElement.getAttribute("data-price");
            const productImage = productElement.getAttribute("data-image");

            const cartItem = {
                id: productId,
                title: productTitle,
                price: productPrice,
                image: productImage
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${productTitle} has been added to your cart!`);
        });
    });

    /* Hamburger Menu Logic */
    function toggleMenu() {
        const mobileNav = document.querySelector('.mobile-nav');
        mobileNav.classList.toggle('show');
    }

    document.querySelector('.hamburger-menu').addEventListener('click', toggleMenu);
});