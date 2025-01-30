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
        document.getElementById("main-image").src = product.image;
        document.getElementById("product-title").innerText = product.name;
        document.getElementById("product-price").innerText = product.price;
        document.getElementById("product-description").innerText = product.description;

        // Display extra images if available
        const extraImagesContainer = document.getElementById("extra-images");
        product.extraImages.forEach(image => {
            let imgElement = document.createElement("img");
            imgElement.src = image;
            imgElement.alt = product.name;
            imgElement.classList.add("thumbnail");
            imgElement.addEventListener("click", () => {
                document.getElementById("main-image").src = image;
            });
            extraImagesContainer.appendChild(imgElement);
        });

        // Add to Cart functionality
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

    document.addEventListener("DOMContentLoaded", function () {
        const track = document.querySelector(".slider-track");
        const images = document.querySelectorAll(".slider img");
        const prevButton = document.getElementById("prev");
        const nextButton = document.getElementById("next");
    
        let currentIndex = 0;
        const totalImages = images.length;
    
        function updateSlider() {
            const offset = -currentIndex * 100 + "%";
            track.style.transform = `translateX(${offset})`;
        }
    
        nextButton.addEventListener("click", () => {
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });
    
        prevButton.addEventListener("click", () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalImages - 1;
            updateSlider();
        });
    
        // Auto-slide every 4 seconds
        setInterval(() => {
            currentIndex = (currentIndex < totalImages - 1) ? currentIndex + 1 : 0;
            updateSlider();
        }, 4000);
    
        updateSlider();
    });
    
});
