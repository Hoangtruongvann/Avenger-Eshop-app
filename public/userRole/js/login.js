const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });

// $('.search_result').append(`<div class="text">xin chao</div>`);

$('#search_input').on('keyup', async function(e){
	$('.search_result').empty();
	if (this.value == ""){return;}
	let result = await fetch(`/products/fetch?key=${this.value}`);
	result = await result.json();
	result.forEach(value=>{
		$('.search_result').append(`<a href="/products/detail/${value.product_id}"><div class="text">${value.product_name}</div></a>`);
	})
})