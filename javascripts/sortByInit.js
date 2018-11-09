/* ---------------------- */
/* -------  Sort By ----- */
/* ---------------------- */

var windowWidth =
	window.screen.width < window.outerWidth
		? window.screen.width
		: window.outerWidth;
var isMobile = windowWidth < 500;

if (isMobile) {
	sortByHandler().mobileHandler();
} else {
	sortByHandler().desktopHandler();
}

function sortByHandler() {
	function mobileHandler() {
		var sortByPopOut = document.getElementById('sort-by-pop-out');
		var sortBtn = document.getElementById('sortBtn');
		var popOutContainer = sortByPopOut.getElementsByTagName('ul')[0];
		var selected = popOutContainer.firstElementChild;

		sortBtn.addEventListener('touchstart', open);

		sortByPopOut.addEventListener('touchstart', function(e) {
			if (e.target.id === 'sort-by-pop-out') {
				close();
			} else if (e.target.classList.contains('pop-out-menu-item')) {
				var child = e.target;

				// Get index of child
				var index = Array.prototype.indexOf.call(
					popOutContainer.children,
					child
				);

				// Apply css styling for 'selected' element
				selected.classList.remove('selected');
				child.classList.add('selected');
				selected = child;

				sortProducts(0, 0, index);
				close();
			}
		});

		function close() {
			sortByPopOut.classList.remove('open');
		}
		function open() {
			sortByPopOut.classList.add('open');
		}
	}

	function desktopHandler() {
		var sortByContainer = document.getElementById('sort-by');
		var sortBy = new DropdownMenu({
			container: sortByContainer,
			menuItems: [
				'Name: A to Z',
				'Name: Z to A',
				'Price: High to Low',
				'Price: Low to High'
			],
			onChange: sortProducts
		});
	}

	function sortProducts(elem, text, index) {
		switch (index) {
			case 0:
				productsUtils.setProductsShown(
					sortByArray('title').Ascending()
				);
				break;
			case 1:
				productsUtils.setProductsShown(
					sortByArray('title').Descending()
				);
				break;
			case 2:
				productsUtils.setProductsShown(
					sortByArray('price').Descending()
				);
				break;
			case 3:
				productsUtils.setProductsShown(
					sortByArray('price').Ascending()
				);
		}
	}

	function sortByArray(sortBy) {
		return {
			Ascending: function() {
				return productsUtils.getProductsShown().sort(function(a, b) {
					a = a.dataset[sortBy];
					b = b.dataset[sortBy];
					var isNumber = /^\d+\.\d+$/.test(a);

					if (isNumber) return a - b;
					// Passed a string
					a = a.toLowerCase();
					b = b.toLowerCase();

					if (a < b) return -1;
					if (a > b) return 1;
					return 0;
				});
			},
			Descending: function() {
				return this.Ascending().reverse();
			}
		};
	}

	return {
		desktopHandler: desktopHandler,
		mobileHandler: mobileHandler
	};
}
