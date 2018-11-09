function PopulateFilterItems(userSettings) {
	var self = this;

	var settings = {
		container: null,
		title: 'My Title',
		filterItems: ['first', 'second', 'third'],
		onSelect: noop,
		onDeselect: noop
	};

	// Call init at the end. This way all
	// properties and methods get applied to 'this', PopulateFilterItems
	function init() {
		applySettings();
		populateHTML();
		eventHandler();
	}

	// Public Methods

	/**
	 * Deselectes the given checkbox
	 *
	 * @param {HTMLElement} checkboxElem Checkbox it should deselect
	 */
	this.deselect = function(checkboxElem) {
		selectHandler(false, checkboxElem);
	};

	/**
	 * Selectes the given checkbox
	 *
	 * @param {HTMLElement} checkboxElem Checkbox it should select
	 */
	this.select = function(checkboxElem) {
		selectHandler(true, checkboxElem);
	};

	/**
	 * Toggles the given checkbox
	 *
	 * @param {HTMLElement} checkboxElem Checkbox it should toggle
	 */
	this.toggleSelect = function(checkboxElem) {
		var parentElem = findParentElemWithClassName(
			'filter-item',
			checkboxElem
		);

		parentElem.classList.contains('selected')
			? self.deselect(checkboxElem)
			: self.select(checkboxElem);
	};

	// Setup
	/**
	 * Handles whether it should select or deselect the checkbox
	 *
	 * @param {boolean} select Should select the checkbox?
	 * @param {HTMLElement} checkboxElem Checkbox it should select or deselect
	 */
	function selectHandler(select, checkboxElem) {
		var parentElem = findParentElemWithClassName(
			'filter-item',
			checkboxElem
		);
		var checkboxTextElem = parentElem.querySelector('.filter-item-text');
		var checkboxText = checkboxTextElem.innerText;

		if (checkboxText.indexOf('GB') !== -1)
			checkboxText = checkboxText.replace(/\D/g, '');

		if (select) {
			// Select the checkbox
			parentElem.classList.add('selected');
			settings.onSelect(parentElem, checkboxText, settings.title);
		} else {
			// Deselect the checkbox
			parentElem.classList.remove('selected');
			settings.onDeselect(parentElem, checkboxText, settings.title);
		}
	}

	/**
	 * Add HTML elements to 'div' in HTML.
	 */
	function populateHTML() {
		var html = '';
		html += '<h4 class="title">' + settings.title + '</h4>';

		html += '<ul>';
		settings.filterItems.forEach(function(text, index) {
			// Remove white spaces
			var title = settings.title.replace(/ /g, '');
			var uniqueId = title + index;

			html += '<li class="filter-item">';
			html += '<div class="checkbox"><span></span></div>';
			html += '<span class="filter-item-text">' + text + '</span>';
			html += '</li>';
		});
		html += '</ul>';

		settings.container.classList.add('filter');
		settings.container.insertAdjacentHTML('afterbegin', html);
	}

	/**
	 * Adds event to each filter element
	 */
	function eventHandler() {
		var filterItems = settings.container.querySelectorAll('.filter-item');

		filterItems.forEach(function(elem) {
			elem.addEventListener('click', function(e) {
				self.toggleSelect(e.target);
			});
		});
	}

	/**
	 * Apply default settings that hasn't been set yet.
	 */
	function applySettings() {
		if (userSettings.nodeType === 1) {
			settings.container = userSettings;
		} else {
			Object.keys(userSettings).forEach(function(key) {
				settings[key] = userSettings[key];
			});
		}

		if (!settings.container || settings.container.nodeType !== 1)
			throw 'Cannot initalize without having "container" set. Please set "container"';
	}

	/**
	 * Iterates through parents till it finds
	 * parent with class name of 'parentClassName',
	 * then returns that element
	 *
	 * @param {string} parentClassName Class name of parent element you're searching for.
	 * @param {HTMLElement} childElem Child element which you want to find parent of.
	 */
	function findParentElemWithClassName(parentClassName, childElem) {
		var parentElem = childElem;

		while (!parentElem.classList.contains(parentClassName)) {
			parentElem = parentElem.parentElement;
		}

		return parentElem;
	}

	function noop() {}

	init();
}
