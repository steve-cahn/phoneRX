function Product(userSettings) {
	var settings = {
		container: null,
		desc: {
			imgURL: '',
			colors: ['black', 'gold', 'blue'],
			dataAttr: {
				title: 'My Title',
				brand: 'myBrand',
				internal: 16,
				ram: 2,
				network: 'GSM',
				price: 299.99
			}
		}
	};

	// Call init at the end. This way all
	// properties and methods get applied to 'this', Product
	function init() {
		applySettings();
		populateHTML();
	}

	// Setup

	/**
	 * Apply default settings that hasn't been set yet.
	 */
	function applySettings() {
		Object.keys(settings).forEach(function(key) {
			var userSettingProp = userSettings[key];
			if (userSettingProp === null) throw 'Provide a value for ' + key;

			settings[key] = userSettingProp;
		});
		settings.desc.dataAttr.imgSrc = userSettings.desc.imgURL;

		settings.desc.highlights = [];

		setHighlight('Brand', settings.desc.dataAttr.brand);
		setHighlight('Internal Storage', settings.desc.dataAttr.internal);
		setHighlight('Ram', settings.desc.dataAttr.ram);
		setHighlight('Network', settings.desc.dataAttr.network);

		function setHighlight(title, desc) {
			settings.desc.highlights.push([title, desc]);
		}
	}

	function populateHTML() {
		var html = '';
		html += '<div class="pointer">';
		html +=
			'<img src="' +
			settings.desc.imgURL +
			'" alt="' +
			settings.desc.dataAttr.title +
			'">';
		html += '</div>';
		html += '<ul class="product-colors">';
		settings.desc.colors.forEach(function(color) {
			html += '<li>';
			html += '<span class="color-tooltip">' + color + '</span>';
			html +=
				'<span class="color" style="background-color: ' +
				color +
				'"></span>';
			html += '</li>';
		});
		html += '</ul>';
		html +=
			'<div class="product-title pointer">' +
			settings.desc.dataAttr.title +
			'</div>';
		html += '<ul class="product-highlights desktop">';
		settings.desc.highlights.forEach(function(highlight) {
			html +=
				'<li><strong>' +
				highlight[0] +
				':</strong> ' +
				highlight[1] +
				'</li>';
		});
		html += '</ul>';
		html += '<div class="price-wrapper">';
		html += '<div class="price-title">Price:</div>';
		html +=
			'<div class="price">$' + settings.desc.dataAttr.price + '</div>';
		html += '</div>';
		html += '<div class="add-to-cart-wrapper">';
		html +=
			'<label for="qty' + settings.desc.dataAttr.title + '">Qty</label>';
		html +=
			'<input type="text" name="number" onkeyup="cartHandler.qtyInputValidater(event)" maxlength="1" value="1" id="qty' +
			settings.desc.dataAttr.title +
			'">';
		html +=
			'<button onclick="cartHandler.addToCartHandler(event)">Add to Cart</button>';
		html += '</div>';

		for (var property in settings.desc.dataAttr) {
			if (!settings.desc.dataAttr.hasOwnProperty(property)) continue;
			var value = settings.desc.dataAttr[property];

			settings.container.setAttribute('data-' + property, value);
		}

		settings.container.insertAdjacentHTML('afterbegin', html);
		settings.container.classList.add('product');
	}

	init();
}
