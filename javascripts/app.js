/*



Difficultys:

- Updating quantity in cart. Products which were objects would get coppied
into the array with reference pointing to the original



*/

// Set 'productUtils' to 'ProductDidLoad()' in productsInit.js file
var productsUtils;

function ProductsDidLoad() {
	var productContainer = document.getElementById('product-container');
	var allProducts = Array.prototype.slice.call(productContainer.children);
	var productsShown = allProducts; // All products get displayed at first

	// Cleanup code for when view is loaded
	(function viewDidLoad() {
		document.querySelector('body').classList.remove('no-transition');
	})();

	function getAttr() {
		var allAttributes = {};

		allProducts.forEach(function(product) {
			for (var title in product.dataset) {
				if (!product.dataset.hasOwnProperty(title)) continue;
				var value = product.dataset[title];

				// Add GB at end of value if it's a number
				if (/^-?[\d.]+(?:e-?\d+)?$/.test(value)) value += ' GB';

				// If object values array isn't initialized yet, create empty array
				// so that we can 'push' value in the array.
				if (typeof allAttributes[title] === 'undefined')
					allAttributes[title] = [];

				// Don't insert if it's a duplicate
				if (allAttributes[title].indexOf(value) === -1)
					allAttributes[title].push(value);
			}
		});
		return allAttributes;
	}

	function setProductsShown(products) {
		productsShown = products;
		render(products);
	}

	function getProductsShown() {
		return productsShown;
	}

	function getAllProducts() {
		return allProducts;
	}

	/**
	 * ReRenders the products view. Uses data
	 * from 'productsShown' to populate data.
	 */
	function render(products) {
		while (productContainer.firstChild) {
			productContainer.firstChild.remove();
		}

		Array.prototype.forEach.call(products, function(product) {
			productContainer.appendChild(product);
		});
	}

	return {
		productContainer: productContainer,
		getAllAttributes: getAttr(),
		getAllProducts: getAllProducts,
		setProductsShown: setProductsShown,
		getProductsShown: getProductsShown
	};
}

(function miniPopUpsHandler() {
	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

	var miniIcons = document.getElementsByClassName('mini-icon');
	var mouseLeaveTimer;
	// Assing random element to it so that we don't have to check for null later on
	var openedContainer = miniIcons[0];

	Array.prototype.forEach.call(miniIcons, function(elem) {
		if (supportsTouch) {
			elem.addEventListener('touchstart', toggle.bind({}, elem));
		} else {
			elem.addEventListener('mouseover', open.bind({}, elem));
			elem.addEventListener('mouseout', close.bind({}, elem));
		}
	});

	function open(elem) {
		// Make sure another container is closed before openeing new
		if (openedContainer !== elem) openedContainer.classList.remove('open');
		else clearTimeout(mouseLeaveTimer);

		elem.classList.add('open');
		openedContainer = elem;
	}

	function close(elem) {
		mouseLeaveTimer = setTimeout(function() {
			elem.classList.remove('open');
		}, 250);
	}

	function toggle(elem) {
		if (elem.classList.contains('open')) {
			close(elem);
		} else {
			open(elem);
			if (supportsTouch) {
				setTimeout(function() {
					close(elem);
				}, 2000);
			}
		}
	}
})();
