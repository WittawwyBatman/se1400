document.addEventListener("DOMContentLoaded", function () {
    /* Slider Logic */
    const sliderTrack = document.querySelector(".slider-track");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    let index = 0;

    function updateSlider() {
        const translateX = -index * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % sliderTrack.children.length;
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + sliderTrack.children.length) % sliderTrack.children.length;
        updateSlider();
    });

    /* Product Page Logic */
    function loadProductDetails() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get("id");

        const products = {
            1: {
                title: "Luxury Hoodie",
                price: "$250",
                description: "A premium hoodie made from the finest fabrics.",
                image: "images/BlackShirt.png",
                extraImages: ["images/BlackShirt.png", "images/BlackShirt2.png", "images/BlackShirt3.png"]
            },
            2: {
                title: "Wool Coat",
                price: "$300",
                description: "Elegant and warm, perfect for winter.",
                image: "images/WoolCoat.png",
                extraImages: ["images/WoolCoat.png", "images/WoolCoat2.png"]
            },
            3: {
                title: "Designer Pants",
                price: "$150",
                description: "Stylish pants with a perfect fit.",
                image: "images/Pants.png",
                extraImages: ["images/Pants.png", "images/Pants2.png"]
            }
        };

        if (products[productId]) {
            document.getElementById("main-image").src = products[productId].image;
            document.getElementById("product-title").innerText = products[productId].title;
            document.getElementById("product-price").innerText = products[productId].price;
            document.getElementById("product-description").innerText = products[productId].description;

            const extraImagesDiv = document.getElementById("extra-images");
            extraImagesDiv.innerHTML = "";
            products[productId].extraImages.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.addEventListener("click", () => {
                    document.getElementById("main-image").src = imgSrc;
                });
                extraImagesDiv.appendChild(img);
            });
        }
    }

    if (window.location.pathname.includes("product.html")) {
        loadProductDetails();
    }
});
