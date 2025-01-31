document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "profile.html"; // Redirect if not logged in
    }

    // Display user info
    document.getElementById("username-display").textContent = user.username;
    document.getElementById("email-display").textContent = user.email;
    document.getElementById("address-display").textContent = user.address || "Not Provided";
    document.getElementById("card-display").textContent = user.card ? "**** **** **** " + user.card.slice(-4) : "Not Provided";

    // Load purchase history
    const purchaseHistory = user.purchaseHistory || [];
    const historyContainer = document.getElementById("purchase-history");
    if (purchaseHistory.length === 0) {
        historyContainer.innerHTML = "<p>No purchases yet.</p>";
    } else {
        purchaseHistory.forEach(purchase => {
            const div = document.createElement("div");
            div.classList.add("purchase-item");
            div.innerHTML = `<p>${purchase.item} - $${purchase.price} - ${purchase.date}</p>`;
            historyContainer.appendChild(div);
        });
    }

    // Dark mode toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (user.darkMode) {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }
    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");
        user.darkMode = document.body.classList.contains("dark-mode");
        localStorage.setItem("user", JSON.stringify(user));
    });

    // Logout function
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "profile.html";
    });
});
