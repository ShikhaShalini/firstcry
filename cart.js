// Get cart items container
const cartItemsContainer = document.getElementById('cart-items');

// Get summary elements
const totalItemsElem = document.getElementById('total-items');
const totalPriceElem = document.getElementById('total-price');

// Get checkout elements
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutOverlay = document.getElementById('checkoutOverlay');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutForm = document.getElementById('checkout-form');

// Get error message elements
const fullnameError = document.getElementById('fullname-error');
const emailError = document.getElementById('email-error');
const addressError = document.getElementById('address-error');
const paymentError = document.getElementById('payment-error');

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

// Function to render cart items
function renderCart() {
    const cart = getCart();
    cartItemsContainer.innerHTML = '';

    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;

        const tr = document.createElement('tr');

        tr.innerHTML = `
      <td class="product-info">
        <img src="${item.image}" alt="${item.title}" class="cart-product-image">
        <span>${item.title}</span>
      </td>
      <td>₹${item.price.toFixed(2)}</td>
      <td>
        <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input">
      </td>
      <td>₹${(item.price * item.quantity).toFixed(2)}</td>
      <td>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </td>
    `;

        cartItemsContainer.appendChild(tr);
    });

    totalItemsElem.textContent = totalItems;
    totalPriceElem.textContent = totalPrice.toFixed(2);

    // Update cart count in localStorage
    updateCartCount();
}

// Function to update cart count in localStorage
function updateCartCount() {
    const cart = getCart();
    let count = 0;
    cart.forEach(item => {
        count += item.quantity;
    });
    localStorage.setItem('cart-count', count);
}

// Function to handle quantity change
function handleQuantityChange(e) {
    if (e.target.classList.contains('quantity-input')) {
        const productId = e.target.getAttribute('data-id');
        const newQuantity = parseInt(e.target.value);

        if (newQuantity < 1) {
            e.target.value = 1;
            return;
        }

        let cart = getCart();
        const productIndex = cart.findIndex(item => item.id === productId);
        if (productIndex !== -1) {
            cart[productIndex].quantity = newQuantity;
            saveCart(cart);
            renderCart();
        }
    }
}

// Function to handle remove item
function handleRemoveItem(e) {
    if (e.target.classList.contains('remove-btn')) {
        const productId = e.target.getAttribute('data-id');
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
        renderCart();
    }
}

// Function to open checkout modal
function openCheckout() {
    checkoutOverlay.style.display = 'flex';
}

// Function to close checkout modal
function closeCheckoutModal() {
    checkoutOverlay.style.display = 'none';
    clearFormErrors();
}

// Function to clear form errors
function clearFormErrors() {
    fullnameError.textContent = '';
    emailError.textContent = '';
    addressError.textContent = '';
    paymentError.textContent = '';
}

// Function to validate form
function validateForm() {
    let isValid = true;

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const payment = document.getElementById('payment').value;

    // Validate Full Name
    if (fullname === '') {
        fullnameError.textContent = 'Full Name is required.';
        isValid = false;
    } else {
        fullnameError.textContent = '';
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        emailError.textContent = 'Email Address is required.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Validate Address
    if (address === '') {
        addressError.textContent = 'Delivery Address is required.';
        isValid = false;
    } else {
        addressError.textContent = '';
    }

    // Validate Payment Method
    if (payment === '') {
        paymentError.textContent = 'Please select a payment method.';
        isValid = false;
    } else {
        paymentError.textContent = '';
    }

    return isValid;
}

// Function to handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
        // For demonstration, we'll just clear the cart and show a success message
        alert('Your order has been placed successfully!');
        localStorage.removeItem('cart');
        renderCart();
        closeCheckoutModal();
    }
}

// Function to get cart count from localStorage and display it
function displayCartCount() {
    const count = localStorage.getItem('cart-count') || 0;
    const cartCountElem = document.getElementById('cart-count');
    if (cartCountElem) {
        cartCountElem.textContent = count;
    }
}

// Event Listeners
cartItemsContainer.addEventListener('change', handleQuantityChange);
cartItemsContainer.addEventListener('click', handleRemoveItem);
checkoutBtn.addEventListener('click', openCheckout);
closeCheckout.addEventListener('click', closeCheckoutModal);
checkoutForm.addEventListener('submit', handleFormSubmit);
window.addEventListener('click', (e) => {
    if (e.target === checkoutOverlay) {
        closeCheckoutModal();
    }
});

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    displayCartCount();
});