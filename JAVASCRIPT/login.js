



function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorEl = document.getElementById("error");

    if (!email || !password) {
        errorEl.innerText = "Please enter email and password";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        errorEl.innerText = "";
        // Redirect to products page
        window.location.href = "../Products/Products.html";
    } else {
        errorEl.innerText = "Invalid email or password";
    }
}