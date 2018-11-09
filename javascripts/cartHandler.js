var cartHandler = new CartHandler();

function CartHandler() {
	var cartHeader = document.getElementById('cart-header');
	var cartSubtotal = document.getElementById('cart-subtotal');
	var cartBottomContainer = document.getElementById('cart-bottom-container');
	var cartContainers = document.getElementById('cart-items');
	var cartQty = document.getElementById('cart-qty');

	var cartProducts = [];
	var isEmpty = true;

	(function init() {
		updateInfo();
	})();

	function addToCartHandler(e) {
		var productData = e.target.parentElement.parentElement.dataset;
		productData.qty = e.target.previousSibling.value;

		var index = null;

		cartProducts.forEach(function(product, currentIndex) {
			if (product.title === productData.title) {
				index = currentIndex;
				return;
			}
		});

		// Check if cart doesn't have the product
		// If doesn't, add product to 'cartProducts' array.
		// If 'cartProducts' contains the product,
		// just update the quantity.
		if (index === null) {
			cartProducts.push(productData);
		} else {
			cartProducts[index].qty =
				parseInt(cartProducts[index].qty, 10) +
				parseInt(productData.qty, 10);
		}

		cartProducts = JSON.parse(JSON.stringify(cartProducts));
		repopulate();
	}

	function updateInfo() {
		totalInCartHandler();
		subtotalPriceHandler();
	}

	function totalInCartHandler() {
		var amount = cartProducts.length;

		if (amount) {
			var text = 'You have ' + amount;
			text += amount === 1 ? ' item' : ' items';
			text += ' in your cart.';

			cartHeader.innerText = text;
			if (isEmpty) cartBottomContainer.classList.remove('hide');

			isEmpty = false;
		} else {
			cartBottomContainer.classList.add('hide');
			cartHeader.innerText = 'Your cart is empty.';
			isEmpty = true;
		}

		/* Update the quantity div that's on top of the cart icon */
		cartQty.innerText = amount;
	}

	function subtotalPriceHandler() {
		var price = 0;
		cartProducts.forEach(function(product) {
			price += product.price * product.qty;
		});

		// Round price to tenths place
		cartSubtotal.innerText = (Math.round(price * 100) / 100).toFixed(2);
	}

	function repopulate() {
		// Remove all items to repopulate
		cartContainers.innerText = '';

		// Loop through 'cartProducts' and create card
		// for every product in 'cartProducts'
		cartProducts.forEach(function(product) {
			new CartPopulate(product);
		});
		updateInfo();
	}

	/**
	 * Validates the input so that there is no
	 * characters other than numbers.
	 *
	 * @param {event} e
	 */
	function qtyInputValidater(e) {
		var value = e.target.value;
		if (/\D/g.test(value)) {
			// Filter non-digits from input value.
			e.target.value = value.replace(/\D/g, '');
		}
	}

	return {
		addToCartHandler: addToCartHandler,
		qtyInputValidater: qtyInputValidater
	};
}
