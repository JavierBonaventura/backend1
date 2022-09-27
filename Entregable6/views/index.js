const socket = io();

// Products form
const $formAddProduct = document.querySelector('#form-add-product');
const $listProducts = document.querySelector('#list-products');
const $nameInput = document.querySelector('#name-product');
const $priceInput = document.querySelector('#price-product');
const $imgInput = document.querySelector('#img-product');
const $tableProducts = document.querySelector('#table-products');

$formAddProduct.addEventListener('submit', e => {
	e.preventDefault();
	const newProduct = {
		name: $nameInput.value,
		price: $priceInput.value,
		img: $imgInput.value
	};
	socket.emit('newProduct', newProduct);
	e.target.reset();
	location.href = '/';
});

const renderProducts = products => {
	if (products.length > 0) $tableProducts.innerHTML = '';
	products.forEach(product => {
		$tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.name}</td>
			<td class="align-middle">${product.price}</td>
			<td class="align-middle">
				<img src="${product.img}" alt="${product.name}" width="50">
			</td>
		</tr>`;
	});
}



socket.on('products', products => {
	renderProducts(products);
});



function render(data) {
	const html = data
		.map((elemento) => {
			return `<div>
			<strong><em style="color:blue;">${elemento.author}</em></strong>
            <em style="color:brown">${elemento.date}</em>    
			<i><em style="color:green">${elemento.text}</em></i>
				</div>
        `;
		})
		.join(" ");
	document.getElementById("mensajes").innerHTML = html;
}

function addMessage(e) {
	const mensaje = {
		author: document.getElementById("username").value,
		text: document.getElementById("texto").value,
		date: new Date
		
	};

	socket.emit("new-message", mensaje);
	return false;
}

socket.on("messages", (data) => {
	render(data);
});