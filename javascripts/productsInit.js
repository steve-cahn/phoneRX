/* ---------------------- */
/* ------  Products ----- */
/* ---------------------- */

(function () {
	var stylo4Container = document.getElementById('stylo-4');
	var stylo4 = new Product({
		container: stylo4Container,
		desc: {
			imgURL: 'https://i.postimg.cc/fyMCFtmN/lg-stylo-4.jpg',
			colors: ['Orange', 'Brown'],
			price: 80.11,
			dataAttr: {
				title: 'LG Stylo 4',
				brand: 'LG',
				internal: 16,
				ram: 3,
				network: 'CDMA',
				price: 299.99
			}
		}
	});

	var galaxyS7Container = document.getElementById('galaxy-s7');
	var galaxyS7 = new Product({
		container: galaxyS7Container,
		desc: {
			imgURL: 'https://i.postimg.cc/pLQN58Cf/samsung-sm-g930uzkaxaa-galaxy-s7-unlocked-cdma-1261398.jpg',
			colors: ['Black', 'Green'],
			dataAttr: {
				title: 'Galaxy S7',
				brand: 'Samsung',
				internal: 64,
				ram: 6,
				network: 'CDMA',
				price: 679.99
			}
		}
	});

	var galaxyS8Container = document.getElementById('galaxy-s8');
	var galaxyS8 = new Product({
		container: galaxyS8Container,
		desc: {
			imgURL: 'https://i.postimg.cc/FHsM4jjd/samsung-sm-g955f-ds-64gb-blk-galaxy-s8-duos-sm-g955f-1336287.jpg',
			colors: ['White', 'Pink'],
			dataAttr: {
				title: 'Galaxy S8',
				brand: 'Samsung',
				internal: 32,
				ram: 4,
				network: 'GSM',
				price: 759.99
			}
		}
	});

	var galaxyS9Container = document.getElementById('galaxy-s9');
	var galaxyS9 = new Product({
		container: galaxyS9Container,
		desc: {
			imgURL: 'https://i.postimg.cc/wBFS0pS3/samsung-sm-g960uzkaxaa-samsung-galaxy-s9-1394702.jpg',
			colors: ['Blue', 'Red'],
			dataAttr: {
				title: 'Galaxy S9',
				brand: 'Samsung',
				internal: 128,
				ram: 6,
				network: 'CDMA',
				price: 999.99
			}
		}
	});

	var iPhonexContainer = document.getElementById('iPhone-x');
	var iPhonex = new Product({
		container: iPhonexContainer,
		desc: {
			imgURL: 'https://i.postimg.cc/28ZNmgBX/image.jpg',
			colors: ['Black', 'Blue'],
			dataAttr: {
				title: 'iPhone X',
				brand: 'Apple',
				internal: 512,
				ram: 6,
				network: 'CDMA',
				price: 1119.99
			}
		}
	});

	var iPhone7Container = document.getElementById('iPhone-7');
	var iPhone7 = new Product({
		container: iPhone7Container,
		desc: {
			imgURL: 'https://i.postimg.cc/x1VDdgvj/image.png',
			colors: ['Black', 'Blue'],
			dataAttr: {
				title: 'iPhone 7',
				brand: 'Apple',
				internal: 64,
				ram: 4,
				network: 'GSM',
				price: 679.99
			}
		}
	});

	var nokia7Container = document.getElementById('nokia-7');
	var nokia7 = new Product({
		container: nokia7Container,
		desc: {
			imgURL: 'https://i.postimg.cc/fLL1PPNC/nokia-11ctls11a03-7-1-dual-sim-64gb-smartphone-1436796.jpg',
			colors: ['Black', 'Blue'],
			dataAttr: {
				title: 'Nokia 7',
				brand: 'Nokia',
				internal: 32,
				ram: 4,
				network: 'CDMA',
				price: 417.99
			}
		}
	});

	var motoG6Container = document.getElementById('moto-g6');
	var motoG6 = new Product({
		container: motoG6Container,
		desc: {
			imgURL: 'https://i.postimg.cc/G256nj3C/moto-paae0000us-moto-g6-32gb-smartphone-1400284.jpg',
			colors: ['Black', 'Blue'],
			dataAttr: {
				title: 'Moto G6',
				brand: 'Motorola',
				internal: 32,
				ram: 4,
				network: 'CDMA',
				price: 321.99
			}
		}
	});

	// 'productUtils' created in app.js
	productsUtils = ProductsDidLoad();
})();