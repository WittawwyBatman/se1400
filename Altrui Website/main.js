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

const angles = ['front', 'side', 'back'];
let currentAngle = 0;
let currentFit = 'slightly-oversized';

const fitImage = document.getElementById('fitImage');

function updateImage() {
  const angle = angles[currentAngle];
  fitImage.src = `images/${currentFit}/${angle}.png`;
}

function setFit(fitName) {
  currentFit = fitName;
  currentAngle = 0;
  updateImage();
}

function prevAngle() {
  currentAngle = (currentAngle - 1 + angles.length) % angles.length;
  updateImage();
}

function nextAngle() {
  currentAngle = (currentAngle + 1) % angles.length;
  updateImage();
}

document.addEventListener("DOMContentLoaded", function () {
  const dropdownToggle = document.getElementById("dropdownToggle");
  const dropdownMenu = document.getElementById("dropdownMenu");

  dropdownToggle.addEventListener("click", function (e) {
    e.stopPropagation(); // Prevents closing immediately
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", function (e) {
    if (!dropdownMenu.contains(e.target) && e.target !== dropdownToggle) {
      dropdownMenu.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("promoPopup");
  const closeBtn = document.getElementById("closePopup");

  // Show popup after delay (optional)
  setTimeout(() => {
    if (popup) {
      popup.style.display = "flex";
    }
  }, 1000); // 1 second delay

  // Close button logic
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  // Optional: Close when clicking outside the content
  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  }
});

