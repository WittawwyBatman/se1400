document.addEventListener("DOMContentLoaded", function () {
    // ---- Image Slider (Netflix-Style) ----
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
        index = (index < maxIndex) ? index + 1 : 0; // Loop back to first
        updateSlider();
    }

    function prevSlide() {
        index = (index > 0) ? index - 1 : maxIndex; // Loop back to last
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
        autoSlide = setInterval(nextSlide, 3000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    startAutoSlide();

    // ---- Product Page Functionality ----
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("item");

    const products = {
        1: {
            name: "Luxury Jacket",
            price: "$2,640",
            image: "images/WoolCoat.png",
            description: "A premium wool blend coat designed for the ultimate luxurious experience.",
            extraImages: ["images/WoolCoat1.png", "images/WoolCoat2.png"]
        },
        2: {
            name: "Designer Pants",
            price: "$1,200",
            image: "images/Pants.png",
            description: "Tailored fit designer pants with high-end fabric for an exclusive look.",
            extraImages: ["images/Pants1.png", "images/Pants2.png"]
        },
        3: {
            name: "Black Noir Luxe Tee",
            price: "$650",
            image: "images/BlackShirt.png",
            description: "A classic yet sophisticated black tee made with premium cotton.",
            extraImages: ["images/BlackShirt1.png", "images/BlackShirt2.png"]
        }
    };

    if (productId && products[productId]) {
        document.getElementById("product-image").src = products[productId].image;
        document.getElementById("product-title").innerText = products[productId].name;
        document.getElementById("product-price").innerText = products[productId].price;
        document.getElementById("product-description").innerText = products[productId].description;

        const extraImagesContainer = document.getElementById("extra-images");
        products[productId].extraImages.forEach(image => {
            let imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = products[productId].name;
            imgElement.classList.add("thumbnail");
            imgElement.addEventListener("click", () => {
                document.getElementById("product-image").src = image;
            });
            extraImagesContainer.appendChild(imgElement);
        });

        document.getElementById("add-to-cart").addEventListener("click", function () {
            addToCart(productId);
        });
    }

    // ---- Add to Cart Functionality ----
    function addToCart(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(products[id]);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(products[id].name + " added to cart!");
    }
});
