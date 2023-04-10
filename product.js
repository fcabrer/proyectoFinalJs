const btnCart = document.querySelector(".container-icon");
const containerCartProducts = document.querySelector(".container-cart-products");
const carritoInfo = document.querySelector(".cart-product");
const productsList = document.querySelector(".contenedor");
const valorTotal = document.querySelector(".total-pagar");
const countProducts = document.querySelector("#contador-productos");
const rowProduct = document.querySelector(".row-product");
const cartTotal = document.querySelector(".cart-total");

let allProducts = [];

btnCart.addEventListener("click", () => containerCartProducts.classList.toggle("hidden-cart"));

const getAllProducts = () => {
	fetch('https://fakestoreapi.com/products?limit=4')
            .then(res=>res.json())
            .then(json => {
				const airShoesPrice = json[0].price;
				const jourdanPrice = json[1].price;
				const runningPrice = json[2].price;
				const airforcePrice = json[3].price;

				document.getElementById('airShoes').innerHTML = `$${airShoesPrice}`;
				const airShoesButton = document.querySelector('#airShoesButton');
				airShoesButton.dataset.precio = airShoesPrice;

				document.getElementById('jourdan').innerHTML = `$${jourdanPrice}`;
				const jourdanButton = document.querySelector('#jourdanButton');
				jourdanButton.dataset.precio = jourdanPrice;

				document.getElementById('running').innerHTML = `$${runningPrice}`;
				const runningButton = document.querySelector('#runningButton');
				runningButton.dataset.precio = runningPrice;
			
				document.getElementById('airforce').innerHTML = `$${airforcePrice}`;
				const airforceButton = document.querySelector('#airforceButton');
				airforceButton.dataset.precio = airforcePrice;
			})
}

productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-cart")) {
    const { nombre: title, precio: price } = e.target.dataset;
    const infoProduct = { quantity: 1, title, price };
    const exists = allProducts.some((product) => product.title === infoProduct.title);

    if (exists) allProducts = allProducts.map((product) => (product.title === infoProduct.title ? {...product, quantity: product.quantity + 1} : product));
    else allProducts = [...allProducts, infoProduct];
    showHTML();
  }
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const {textContent: title} = e.target.parentElement.querySelector('p');
		allProducts = allProducts.filter(product => product.title !== title);
		showHTML();
	}
});

const showHTML = () => {
	rowProduct.innerHTML = '';
	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');
		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        `;
		rowProduct.append(containerProduct);
	});

	if (!allProducts.length) {
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	const total = allProducts.reduce((total, product) => total + parseInt(Number(product.quantity) * Number(product.price)), 0);
	localStorage.setItem('totalProducts', allProducts.reduce((total, product) => total + product.quantity, 0));

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = localStorage.getItem('totalProducts');
};

getAllProducts();