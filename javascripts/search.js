(function() {
	var searchInput = document.getElementById('search');
	var searchResults = document.getElementById('search-results');
	var results = [];

	(function init() {
		addEvents();
		removeResults();
	})();

	function addEvents() {
		searchInput.addEventListener('keyup', searchHandler);
		searchInput.addEventListener('blur', removeResults);
		searchInput.addEventListener('focus', searchHandler);
		searchResults.addEventListener('click', resultSelected);
	}

	/**
	 * Makes sure element clicked isn't the "no results found text".
	 * If it's not, make the textfield the text of the clicked element
	 *
	 * @param {event} e Gets event from addEventListener
	 */
	function resultSelected(e) {
		if (e.target.classList.contains('empty-result')) return;

		searchInput.value = e.target.innerText;
	}

	function searchHandler() {
		results = [];
		text = searchInput.value.toLowerCase();

		// Only iterate through products if text input has a value
		// Otherwise, when 'text' is empty, 'forEach' will
		// return all the prodcuts.
		if (text.length) {
			productsUtils.getAllProducts().forEach(function(product) {
				var title = product.dataset.title.toLowerCase();
				var indexStart = title.indexOf(text);
				var indexEnd = indexStart + text.length;

				if (indexStart !== -1) {
					results.push([title, indexStart, indexEnd]);
				}
			});
		}

		populateResultsLogic(text);
	}

	function populateResultsLogic(text) {
		if (typeof text !== 'string') text = '';

		var html = '';

		if (results.length) {
			searchResults.classList.remove('hide');

			results.forEach(function(result) {
				var part1 = result[0].substring(0, result[1]);
				var part2 = result[0].substring(result[1], result[2]);
				var part3 = result[0].substring(result[2], result[0].length);
				html +=
					'<li>' +
					part1 +
					'<strong>' +
					part2 +
					'</strong>' +
					part3 +
					'</li>';
			});
			populateResults(html);
		} else if (text.length !== 0) {
			// Textbox has text, but can't find results
			searchResults.classList.remove('hide');
			html = '<li class="empty-result">No results found.</li>';
			populateResults(html);
		} else {
			// 'populateResults' got called and textbox
			// is empty
			removeResults();
		}
	}

	function removeResults(e) {
		setTimeout(function() {
			searchResults.classList.add('hide');
			searchResults.innerHTML = '';
		}, 200);
	}

	function populateResults(html) {
		searchResults.innerHTML = '';
		searchResults.insertAdjacentHTML('afterbegin', html);
	}
})();
