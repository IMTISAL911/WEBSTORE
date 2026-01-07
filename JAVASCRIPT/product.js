
const container = document.getElementById("productContainer");

// Get selected product ID from localStorage
const productId = localStorage.getItem("selectedProductId");

async function loadProduct() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        const products = await res.json();

        // Find the selected product
        const product = products.find(p => p.id == productId);

        if (!product) {
            container.innerHTML = "<p>Product not found</p>";
            return;
        }

        // Render product details
        container.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-details">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <div class="price">$${product.price}</div>
                <div class="quantity-box">
                    <label>Quantity: </label>
                    <input type="number" id="quantity" value="1" min="1">
                </div>
                <button class="add-btn" id="addToCartBtn">Add to Cart</button>
            </div>
        `;

        // Add to cart functionality
        const addBtn = document.getElementById("addToCartBtn");
        addBtn.addEventListener("click", () => {
            const quantity = parseInt(document.getElementById("quantity").value);

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            // Check if product already in cart
            const existingIndex = cart.findIndex(item => item.id == product.id);
            if (existingIndex >= 0) {
                cart[existingIndex].quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            // Redirect to Carts.html instead of alert
            window.location.href = "Carts.html";
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Failed to load product</p>";
    }
}

loadProduct();
