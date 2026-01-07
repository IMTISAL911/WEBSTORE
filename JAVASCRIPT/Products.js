




const container = document.getElementById("productsContainer");

async function fetchProducts() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
            throw new Error("API Error");
        }

        const products = await res.json();

        container.innerHTML = "";

        products.forEach(product => {
            container.innerHTML += `
                <div class="carts-product">
                    <div class="img">
                        <img src="${product.image}" alt="product">
                    </div>

                    <div>
                        <p>${product.description}</p>
                    </div>

                    <div class="btn-box">
                        <button class="view-btn" onclick="viewProduct(${product.id})">View</button>
                    </div>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Failed to load products</p>";
    }
}

fetchProducts();



function viewProduct(id) {
    localStorage.setItem('selectedProductId',id)
    window.location.href = `../Products/product.html?id=${id}`;
}


