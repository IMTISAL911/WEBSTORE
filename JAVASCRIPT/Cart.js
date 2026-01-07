const cartItemsContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartItemsContainer.innerHTML = "";

    if(cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
        totalPriceEl.innerText = "0.00";
        return;
    }

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="details">
                <h3>${item.title}</h3>
                <div class="price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="quantity">
                <input type="number" min="1" value="${item.quantity}" data-index="${index}">
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    totalPriceEl.innerText = total.toFixed(2);

    // Add event listeners to quantity inputs
    const quantityInputs = document.querySelectorAll(".quantity input");
    quantityInputs.forEach(input => {
        input.addEventListener("change", updateQuantity);
    });
}

function updateQuantity(e) {
    const index = e.target.getAttribute("data-index");
    const value = parseInt(e.target.value);

    if(value < 1) {
        e.target.value = 1;
        cart[index].quantity = 1;
    } else {
        cart[index].quantity = value;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Initial render
renderCart();
