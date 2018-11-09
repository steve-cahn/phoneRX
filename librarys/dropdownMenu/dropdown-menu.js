function DropdownMenu(options) {
	var self = this;
	var selectedItemElem = null;
	var menuItemElements = null;
	var settings = {
		container: null,
		menuItems: ['Option 1', 'Option 2', 'Option 3'],
		initialMenuItem: 0, // Accepts a number or string
		onChange: noop,
		onOpen: noop,
		onClose: noop
	};

	// Call init at the end. This way all
	// properties and methods get applied to 'this', DropdownMenu
	function init() {
		applySettings();
		populateHTML();
		eventHandler();

		// Set the initial menu item
		self.setSelectedMenu(settings.initialMenuItem);
	}

	function windowEvent(e) {
		// If selected container or something in the container,
		// let container event handle
		if (settings.container.contains(e.target)) return;
		else self.closeMenu();
	}

	// Public

	// Methods

	/**
	 * Get the text of the current selected menut item.
	 */
	this.getSelectedMenu = function() {
		return selectedItemElem.innerText;
	};

	this.setSelectedMenu = function(target) {
		var targetElem = null;

		switch (typeof target) {
			case 'string':
				targetElem = findMenuItemElemByText(target);
				break;
			case 'number':
				targetElem = findMenuItemElemByIndex(target);
				break;
			case 'object':
				if (target.nodeType === 1) targetElem = target;
				break;

			default:
				throw "Type of 'target' must be a string, number, or an HTML Element";
		}

		self.closeMenu();
		selectedItemElem.innerText = targetElem.innerText;

		// Callback function
		var targetIndex = settings.menuItems.indexOf(targetElem.innerText);
		settings.onChange(targetElem, targetElem.innerText, targetIndex);
	};

	/**
	 * Calls 'DropdownMenu.closeMenu' or 'DropdownMenu.openMenu',
	 * depending on whether menu is open.
	 */
	this.toggleMenu = function() {
		settings.container.classList.contains('open')
			? self.closeMenu()
			: self.openMenu();
	};

	/**
	 * Opens menu using class names to update UI. Calls callback function.
	 */
	this.openMenu = function() {
		settings.container.classList.add('open');
		settings.container.classList.remove('close');

		// Callback function
		settings.onOpen(settings.container);

		window.addEventListener('click', windowEvent);
	};

	/**
	 * Closes menu using class names to update UI. Calls callback function.
	 */
	this.closeMenu = function() {
		settings.container.classList.add('close');
		settings.container.classList.remove('open');

		// Callback function
		settings.onClose(settings.container);

		window.removeEventListener('click', windowEvent);
	};

	// Setup

	/**
	 * Apply default settings that hasn't been set yet.
	 */
	function applySettings() {
		if (options.nodeType === 1) {
			settings.container = options;
		} else {
			Object.keys(options).forEach(function(key) {
				settings[key] = options[key];
			});
		}

		if (!settings.container || settings.container.nodeType !== 1)
			throw 'Cannot initalize without having "container" set. Please set "container"';
	}

	/**
	 * Add HTML elements to 'div' in HTML.
	 */
	function populateHTML() {
		var html = '';
		html += '<span class="title">Sort By:</span>';
		html += '<div class="selected-wrapper">';
		html += '<div class="selected">';
		html += '<div class="text"></div>';
		html += '<i class="arrow-icon material-icons">expand_more</i>';
		html += '</div>';
		html += '<ul>';
		settings.menuItems.forEach(function(text) {
			html += '<li class="menu-item">';
			html += text;
			html += '</li>';
		});
		html += '</ul>';
		html += '</div>';

		settings.container.insertAdjacentHTML('afterbegin', html);
		settings.container.classList.add('dropdown-menu');

		selectedItemElem = settings.container.querySelector('.selected .text');
		menuItemElements = settings.container.querySelectorAll('.menu-item');
	}

	/**
	 * Add and handle click events on menu items
	 */
	function eventHandler() {
		settings.container.addEventListener('click', function(e) {
			var target = e.target;

			if (
				target.classList.contains('menu-item') &&
				isParentOf(settings.container, target)
			) {
				self.setSelectedMenu(target);
			} else {
				self.toggleMenu();
			}
		});
	}

	function findMenuItemElemByText(text) {
		if (typeof text !== 'string')
			throw "The paramater 'text' must be a string";

		var targetElem = Array.prototype.filter.call(menuItemElements, function(
			elem
		) {
			if (elem.innerText == text) return elem;
		})[0];

		if (targetElem === undefined)
			throw '"' + text + '" is not found in the dropdown menu list';

		return targetElem;
	}

	// index starting from zero
	function findMenuItemElemByIndex(index) {
		if (typeof index !== 'number')
			throw "The paramater 'index' must be a numerical value";
		else if (index > settings.menuItems.length || index < 0)
			throw "The paramater 'index' must be a value of 0 - " +
				settings.menuItems.length;

		var targetElem = findMenuItemElemByText(settings.menuItems[index]);

		if (targetElem.nodeType !== 1)
			throw "The value of 'index' is out of bounds.";

		return targetElem;
	}

	/**
	 * Check if child element has 'parent' element
	 *
	 * @param {HTMLElement} parent Parent element to check if child is inside
	 * @param {HTMLElement} child Child element
	 */
	function isParentOf(parent, child) {
		var currentParent = child;

		while (currentParent.parentElement) {
			currentParent = currentParent.parentElement;

			if (currentParent === parent) return true;
		}

		// Traversed all the way up to "document Element"
		// and didn't find "parent Element"
		return false;
	}

	/**
	 * Empty function.
	 */
	function noop() {}

	init();
}
