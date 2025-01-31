document.addEventListener("DOMContentLoaded", () => {
    const formTitle = document.getElementById("form-title");
    const submitBtn = document.getElementById("submit-btn");
    const toggleForm = document.getElementById("toggle-form");
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        window.location.href = "dashboard.html";
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
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!username || !email || !password) {
            alert("Please fill in all fields");
            return;
        }

        if (formTitle.textContent === "Sign Up") {
            // Sign Up Process
            let users = JSON.parse(localStorage.getItem("users")) || {};
            if (users[email]) {
                alert("Email already in use. Please log in.");
                return;
            }
            
            users[email] = { username, email, password, purchaseHistory: [], settings: { theme: "light" }, paymentInfo: {} };
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(users[email]));
            
            window.location.href = "dashboard.html";
        } else {
            // Log In Process
            let users = JSON.parse(localStorage.getItem("users")) || {};
            if (!users[email] || users[email].password !== password) {
                alert("Invalid email or password");
                return;
            }
            
            localStorage.setItem("currentUser", JSON.stringify(users[email]));
            window.location.href = "dashboard.html";
        }
    });
});
