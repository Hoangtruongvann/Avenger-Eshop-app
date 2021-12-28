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

$('#search_input2').on('keyup', async function(e){

	$('.search_result2').empty();
	if (this.value == ""){return;}
	let result = await fetch(`/products/fetch?key=${this.value}`);
	result = await result.json();
	result.forEach(value=>{
		$('.search_result2').append(`<a href="/products/detail/${value.product_id}"><div class="text">${value.product_name}</div></a>`);
	})
})


$('#register-btn').on('click',e=>{
	e.preventDefault();

	if($('#pass1').val() !== $('#pass2').val()){
		$('.toast').toast({delay:5000})
		$('.toast').toast('show')
	}
	else{
		$('#register-form').submit();
	}
})

// $('#logout-btn').click(function(e) {
// 	e.preventDefault();
// 	$('#logout-form').submit();
// })

$('#logout-btn').on('click', function(e) {
	e.preventDefault();
	$('#logout-form').submit();
})


