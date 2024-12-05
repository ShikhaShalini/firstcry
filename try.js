// Get all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Get cart count element
const cartCount = document.getElementById('cart-count');

// Get popup elements
const popupOverlay = document.getElementById('popupOverlay');
const closeBtn = document.getElementById('closeBtn');
const popupImage = document.getElementById('popupImage');
const popupTitle = document.getElementById('popupTitle');
const popupPrice = document.getElementById('popupPrice');
const popupDescription = document.getElementById('popupDescription');

// Function to get cart from localStorage
function getCart() {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
}

// Function to save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update cart count
function updateCartCount() {
    const cart = getCart();
    let count = 0;
    cart.forEach(item => {
        count += item.quantity;
    });
    cartCount.textContent = count;
}

// Function to add item to cart
function addToCart(product) {
    let cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
        // If product already exists, increase quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // Else, add new product with quantity 1
        cart.push({...product, quantity: 1 });
    }
    saveCart(cart);
    updateCartCount();
}

// Add event listeners to "Add to Cart" buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.getAttribute('data-id'),
            title: button.getAttribute('data-title'),
            price: parseFloat(button.getAttribute('data-price')),
            image: button.getAttribute('data-image')
        };
        addToCart(product);
        // Optionally, show a notification or update the UI
        alert(`${product.title} has been added to your cart.`);
    });
});

// Get all "Quick View" buttons
const quickViewButtons = document.querySelectorAll('.quick-view-btn');

// Function to open popup with product details
quickViewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const title = button.getAttribute('data-title');
        const price = button.getAttribute('data-price');
        const description = button.getAttribute('data-description');
        const image = button.getAttribute('data-image');

        popupImage.src = image;
        popupTitle.textContent = title;
        popupPrice.textContent = `Price: ₹${price}`;
        popupDescription.textContent = description;

        popupOverlay.style.display = 'flex';
    });
});

// Function to close popup
const closePopup = () => {
    popupOverlay.style.display = 'none';
};

// Event listener for close button
closeBtn.addEventListener('click', closePopup);

// Event listener for clicking outside the popup content
window.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        closePopup();
    }
});

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
s