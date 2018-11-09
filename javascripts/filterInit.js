/* ---------------------- */
/* -------  Filter ------ */
/* ---------------------- */

(function() {
	var filterContainer = document.getElementById('left-side-filter');
	var currentFilters = [];

	moblieHandler();
	function moblieHandler() {
		var applyBtn = document.getElementById('filter-apply');
		var filterBtn = document.getElementById('filter-btn');

		applyBtn.addEventListener('touchstart', close);
		filterBtn.addEventListener('touchstart', open);

		function close() {
			filterContainer.classList.remove('open');
		}

		function open() {
			filterContainer.classList.add('open');
		}
	}

	/**
	 * Iterates through ALL data attributes, excluding 'skipItems',
	 * and creates a filter container for every attribute
	 *
	 * @param {Array} skipItems Items to skip, and not create a filter container
	 */
	(function populateFilters(skipItems) {
		for (var title in productsUtils.getAllAttributes) {
			if (!productsUtils.getAllAttributes.hasOwnProperty(title)) continue;

			// Check if 'title' is in 'skipItems'.
			// If it is, don't create a filter container
			if (skipItems.indexOf(title) !== -1) continue;

			var value = productsUtils.getAllAttributes[title];
			createSingleFilter(title, value);
		}
	})(['title', 'price', 'imgsrc']);

	/**
	 * Creates filter with the values of the paramaters
	 *
	 * @param {String} title Defines the title of the filter collection
	 * @param {Array} values All filter values of the current title
	 */
	function createSingleFilter(title, values) {
		var currentFilterContainer = document.createElement('div');

		var sotyBy = new PopulateFilterItems({
			container: currentFilterContainer,
			title: title,
			filterItems: values,
			onSelect: selected,
			onDeselect: deselected
		});

		filterContainer.appendChild(currentFilterContainer);
	}

	function selected(filterElem, filterText, filterTitle) {
		currentFilters.push([filterTitle, filterText]);
		configFilteredProdcuts();
	}
	function deselected(filterElem, filterText, filterTitle) {
		// Find and remove filter
		currentFilters.forEach(function(filter, index) {
			// Found a match, remove from 'currentFilters'
			if (filter[1] === filterText) {
				currentFilters.splice(index, 1);
				return;
			}
		});

		configFilteredProdcuts();
	}

	/**
	 * Filters by brand, then applies all other filters of that brand
	 */
	function configFilteredProdcuts() {
		var filteredProducts = [];

		currentFilters.forEach(function(filter) {
			if (filter[0] === 'brand') {
				productsUtils.getAllProducts().forEach(function(product) {
					if (filter[1] === product.dataset[filter[0]]) {
						filteredProducts.push(product);
					}
				});
			}
		});

		var productsToIterate = !filteredProducts.length
			? productsUtils.getAllProducts()
			: filteredProducts;
		var temp = [];

		currentFilters.forEach(function(filter) {
			productsToIterate.forEach(function(product, index) {
				if (filter[0] !== 'brand') {
					if (filter[1] === product.dataset[filter[0]]) {
						temp.push(product);
					}
				}
			});
		});

		productsUtils.setProductsShown(temp.length ? temp : productsToIterate);
	}
})();
