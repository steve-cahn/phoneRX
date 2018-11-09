(function slideMenu() {
	var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

	var burgerIcon = document.getElementById('burger-icon');
	var menuContainer = document.getElementById('nav-container');
	var bg = document.getElementById('menu-bg');

	(function init() {
		addEvents();
	})();

	function addEvents() {
		var clickEvent = supportsTouch ? 'touchstart' : 'click';

		burgerIcon.addEventListener(clickEvent, openMenu);
		bg.addEventListener(clickEvent, closeMenu);
	}

	function closeMenu() {
		menuContainer.classList.remove('open');
	}

	function openMenu() {
		menuContainer.classList.add('open');
	}

	function toggleMenu(e) {
		if (menuContainer.classList.contains('open')) {
			closeMenu();
		} else {
			openMenu();
		}
	}
})();
