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