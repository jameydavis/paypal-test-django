let cart = [];
let cartTotal = 0;

function updateCartUI() {
    const badge = document.querySelector('.cart-icon .badge');
    const totalSpan = document.querySelector('.cart-icon + span');
    badge.textContent = cart.length;
    totalSpan.textContent = `$${cartTotal.toFixed(2)}`;
    
    // Update modal contents
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span>${item.name}</span>
            <span>$${item.price}</span>
        </div>
    `).join('');
    
    document.getElementById('cart-total').textContent = cartTotal.toFixed(2);
}

function addToCart(productId, name, price) {
    cart.push({id: productId, name: name, price: price});
    cartTotal += parseFloat(price);
    updateCartUI();
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make cart icon clickable
    document.querySelector('.cart-icon').addEventListener('click', () => {
        new bootstrap.Modal(document.getElementById('cartModal')).show();
    });

    // Initialize PayPal buttons
    document.querySelectorAll('[id^="paypal-button-"]').forEach(button => {
        const productId = button.id.split('-')[2];
        const price = button.getAttribute('data-price');
        
        paypal.Buttons({
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: price
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert('Thank you for your purchase, ' + details.payer.name.given_name + '!');
                });
            }
        }).render('#' + button.id);
    });
});