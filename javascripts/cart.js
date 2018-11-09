function CartPopulate(userDesc) {
	var cartContainers = document.getElementById('cart-items');
	var desc = {
		title: '',
		price: 0,
		qty: 1,
		imgsrc: ''
	};

	(function init() {
		applySettings();
		populateHTML();
	})();

	function populateHTML() {
		var html = '<li>';
		html += '<img src="' + desc.imgsrc + '" width="70" height="70">';
		html += '<div class="cart-desc">';
		html += '<div class="cart-item-title">' + desc.title + '</div>';
		html += '<div class="cart-item-info">';
		html += '<div class="cart-item-price">$ ' + desc.price + '</div>';
		html += '<div class="cart-item-qty">Qty: ' + desc.qty + '</div>';
		html += '</div>';
		html += '</div>';
		html += '</li>';

		cartContainers.insertAdjacentHTML('afterbegin', html);
	}

	/**
	 * Apply default settings that hasn't been set yet.
	 */
	function applySettings() {
		Object.keys(desc).forEach(function(key) {
			var userSettingProp = userDesc[key];
			if (userSettingProp === null) throw 'Provide a value for ' + key;

			desc[key] = userSettingProp;
		});
	}
}
