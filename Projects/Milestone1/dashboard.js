document.addEventListener("DOMContentLoaded", function () {
    const userData = JSON.parse(localStorage.getItem("user")) || {};

    function updateDashboard() {
        document.getElementById("username-display").textContent = userData.username || "User";
        document.getElementById("email-display").textContent = userData.email || "No email provided";
        document.getElementById("address-display").textContent = userData.address || "No address provided";
        document.getElementById("card-display").textContent = userData.card ? `**** **** **** ${userData.card.slice(-4)}` : "No card on file";

        if (userData.darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }

    document.getElementById("dark-mode-toggle").addEventListener("click", function () {
        userData.darkMode = !userData.darkMode;
        localStorage.setItem("user", JSON.stringify(userData));
        updateDashboard();
    });

    document.getElementById("edit-info").addEventListener("click", function () {
        const newAddress = prompt("Enter new shipping address:", userData.address || "");
        const newCard = prompt("Enter new credit card number (last 4 digits will be shown):", userData.card || "");

        if (newAddress) userData.address = newAddress;
        if (newCard) userData.card = newCard;

        localStorage.setItem("user", JSON.stringify(userData));
        updateDashboard();
    });

    function loadPurchaseHistory() {
        const history = userData.purchaseHistory || [];
        const historyContainer = document.getElementById("purchase-history");
        historyContainer.innerHTML = history.length ? "" : "No purchases yet.";

        history.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("purchase-item");
            div.innerHTML = `<p>${item.date} - ${item.product} - $${item.price}</p>`;
            historyContainer.appendChild(div);
        });
    }

    updateDashboard();
    loadPurchaseHistory();
});
