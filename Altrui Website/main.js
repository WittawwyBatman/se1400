// main.js

// ==============================
// Altrui Website - Main JS File
// ==============================

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Altrui site loaded.');
  
    // Example future feature: mobile nav toggle
    const menuToggle = document.querySelector('#menu-toggle');
    const nav = document.querySelector('.nav');
  
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
    }
  
    // Future features to be added:
    // - Scroll animations
    // - Product filtering
    // - Add to cart behavior
    // - Dynamic content loading
  });
  
  // Newsletter Form Submission (Optional)
const form = document.querySelector('.newsletter-form');
const input = document.querySelector('.newsletter-input');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value;

    // For now, just display an alert (you would hook up an API later)
    alert(`Thank you for subscribing, ${email}!`);
    input.value = ''; // Clear input after submission
  });
}

const fitButtons = document.querySelectorAll('.fit-button');
const fitImage = document.getElementById('fitImage');
const leftBtn = document.querySelector('.angle-button.left');
const rightBtn = document.querySelector('.angle-button.right');

const imageAngles = ["front", "side", "back", "three-quarter"];
let currentFit = "slightly-oversized";
let currentAngleIndex = 0;

const updateImage = () => {
  const angle = imageAngles[currentAngleIndex];
  fitImage.src = `/public/images/${currentFit}/${angle}.png`;
};

fitButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFit = button.getAttribute('data-fit');
    currentAngleIndex = 0;
    updateImage();
  });
});

leftBtn.addEventListener('click', () => {
  currentAngleIndex = (currentAngleIndex - 1 + imageAngles.length) % imageAngles.length;
  updateImage();
});

rightBtn.addEventListener('click', () => {
  currentAngleIndex = (currentAngleIndex + 1) % imageAngles.length;
  updateImage();
});
