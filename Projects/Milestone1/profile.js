document.addEventListener("DOMContentLoaded", function () {
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");
    const toggleForm = document.getElementById("toggle-form");
    const profileContainer = document.getElementById("profile-container");

    function saveUserData(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    function getUserData() {
        return JSON.parse(localStorage.getItem("user"));
    }

    function updateProfilePage(user) {
        profileContainer.innerHTML = `
            <h2>Welcome, ${user.username}!</h2>
            <p>Email: ${user.email}</p>
            <button class="btn" id="logout-btn">Logout</button>
            <h3>Profile Settings</h3>
            <button class="btn" id="theme-toggle">Toggle Dark/Light Mode</button>
            <h3>Purchase History</h3>
            <p>No purchases yet.</p>
            <h3>Manage Payment & Shipping</h3>
            <input type="text" id="address" placeholder="Shipping Address" value="${user.address || ''}">
            <input type="text" id="credit-card" placeholder="Credit Card Info" value="${user.card || ''}">
            <button class="btn" id="save-info">Save Info</button>
        `;
        document.getElementById("logout-btn").addEventListener("click", logout);
        document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
        document.getElementById("save-info").addEventListener("click", saveProfileInfo);
    }

    function logout() {
        localStorage.removeItem("user");
        location.reload();
    }

    function toggleTheme() {
        document.body.classList.toggle("light-mode");
    }

    function saveProfileInfo() {
        let user = getUserData();
        user.address = document.getElementById("address").value;
        user.card = document.getElementById("credit-card").value;
        saveUserData(user);
        alert("Profile updated!");
    }

    toggleForm.addEventListener("click", () => {
        if (formTitle.textContent === "Sign Up") {
            formTitle.textContent = "Log In";
            submitBtn.textContent = "Log In";
            toggleForm.textContent = "Don't have an account? Sign Up";
        } else {
            formTitle.textContent = "Sign Up";
            submitBtn.textContent = "Create Account";
            toggleForm.textContent = "Already a member? Log in";
        }
    });

    submitBtn.addEventListener("click", () => {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        let user = getUserData();

        if (formTitle.textContent === "Sign Up") {
            if (username && email && password) {
                saveUserData({ username, email, password });
                updateProfilePage({ username, email });
            } else {
                alert("Please fill in all fields");
            }
        } else {
            if (user && email === user.email && password === user.password) {
                updateProfilePage(user);
            } else {
                alert("Invalid email or password");
            }
        }
    });

    let existingUser = getUserData();
    if (existingUser) {
        updateProfilePage(existingUser);
    }
});
