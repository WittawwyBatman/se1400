document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    const products = {
        1: {
            name: 'Luxury Hoodie',
            description: 'Crafted from the finest materials, this hoodie embodies luxury and comfort.',
            price: '$250',
            image: 'images/BlackShirt.png',
            extraImages: ['images/BlackShirt1.png', 'images/BlackShirt2.png']
        },
        2: {
            name: 'Wool Coat',
            description: 'Stay warm and stylish with this premium wool coat.',
            price: '$300',
            image: 'images/WoolCoat.png',
            extraImages: ['images/WoolCoat1.png', 'images/WoolCoat2.png']
        },
        3: {
            name: 'Designer Pants',
            description: 'These designer pants offer both comfort and style.',
            price: '$150',
            image: 'images/DesignerPants.png',
            extraImages: ['images/DesignerPants1.png', 'images/DesignerPants2.png']
        }
    };

    if (productId && products[productId]) {
        const product = products[productId];
        const mainImage = document.getElementById("main-image");
        const title = document.getElementById("product-title");
        const price = document.getElementById("product-price");
        const description = document.getElementById("product-description");
        const extraImagesContainer = document.getElementById("extra-images");
        const addToCartButton = document.getElementById("add-to-cart");

        // Set product details
        mainImage.src = product.image;
        title.innerText = product.name;
        price.innerText = product.price;
        description.innerText = product.description;

        // Display extra images
        product.extraImages.forEach(image => {
            let imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = product.name;
            imgElement.classList.add("thumbnail");

            imgElement.addEventListener("click", () => {
                // Smooth image fade transition
                mainImage.style.opacity = "0";
                setTimeout(() => {
                    mainImage.src = image;
                    mainImage.style.opacity = "1";
                }, 300);
            });

            extraImagesContainer.appendChild(imgElement);
        });

        // Add to Cart functionality
        addToCartButton.addEventListener("click", () => addToCart(productId));
    }

    function addToCart(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(products[id]);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(products[id].name + " added to cart!");
    }

    // ---- Enhanced Slider ----
    const track = document.querySelector(".slider-track");
    const images = document.querySelectorAll(".slider img");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let currentIndex = 0;
    const totalImages = images.length;

    function updateSlider() {
        track.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        track.style.transform = `translateX(${-currentIndex * 100}%)`;
    }

    nextButton.addEventListener("click", () => {
        if (currentIndex < totalImages - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    });

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalImages - 1;
        }
        updateSlider();
    });

    // Auto-slide every 4 seconds
    let autoSlide = setInterval(() => {
        currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 4000);

    // Pause auto-slide on hover
    document.querySelector(".slider").addEventListener("mouseenter", () => clearInterval(autoSlide));
    document.querySelector(".slider").addEventListener("mouseleave", () => {
        autoSlide = setInterval(() => {
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 4000);
    });

    updateSlider();
});
