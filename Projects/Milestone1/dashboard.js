document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    
    if (!user.username) {
        window.location.href = "profile.html"; // Redirect to login if no user is found
    }
    
    document.getElementById("username-display").textContent = user.username || "Guest";
    document.getElementById("email-display").textContent = user.email || "Not provided";
    
    // Load purchase history
    const purchaseList = document.getElementById("purchase-history");
    if (user.purchases && user.purchases.length > 0) {
        user.purchases.forEach(purchase => {
            const listItem = document.createElement("li");
            listItem.textContent = `${purchase.item} - $${purchase.price}`;
            purchaseList.appendChild(listItem);
        });
    } else {
        purchaseList.innerHTML = "<li>No purchases yet.</li>";
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (user.darkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        user.darkMode = !user.darkMode;
        localStorage.setItem("user", JSON.stringify(user));
    });

    // Update shipping & payment info
    document.getElementById("save-info").addEventListener("click", () => {
        user.address = document.getElementById("address").value;
        user.card = document.getElementById("card").value;
        localStorage.setItem("user", JSON.stringify(user));
        alert("Information updated!");
    });

    // Logout functionality
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "profile.html";
    });
});
