// Add event listeners to "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.getAttribute('data-id'),
            title: button.getAttribute('data-title'),
            price: parseFloat(button.getAttribute('data-price')),
            image: button.getAttribute('data-image')
        };

        console.log('Adding product:', product); // Debugging line

        addToCart(product);
        alert(`${product.title} has been added to your cart.`);
    });
});
// Function to add item to cart
function addToCart(product) {
    let cart = getCart();

    console.log('Current cart:', cart); // Debugging line to check the cart state before adding

    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        // If product already exists, increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Else, add new product with quantity 1
        cart.push({...product, quantity: 1 });
    }

    console.log('Updated cart:', cart); // Debugging line to check the cart state after adding

    saveCart(cart);
    updateCartCount();
}

function getCart() {
    let cart = localStorage.getItem('cart');
    console.log('Fetched cart from localStorage:', cart); // Debugging line
    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
}

function updateCartCount() {
    const cart = getCart();
    let count = 0;
    cart.forEach(item => {
        count += item.quantity;
    });

    console.log('Cart count:', count); // Debugging line

    cartCount.textContent = count;
}