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

$('#search_input').on('keyup', async function(e) {
    $('.search_result').empty();
    if (this.value == "") { return; }
    let result = await fetch(`/products/fetch?key=${this.value}`);
    result = await result.json();
    result.forEach(value => {
        $('.search_result').append(`<a href="/products/detail/${value.product_id}"><div class="text">${value.product_name}</div></a>`);
    })
})

$('#search_input2').on('keyup', async function(e) {

    if (this.value == "") { $('.search_result2').empty(); return; }
    let result = await fetch(`/products/fetch?key=${this.value}`);
    result = await result.json();
    $('.search_result2').empty();
    result.forEach(value => {
        $('.search_result2').append(`<a href="/products/detail/${value.product_id}"><div class="text">${value.product_name}</div></a>`);
    })
})


$('#register-btn').on('click', e => {
    e.preventDefault();

    if ($('#pass1').val() !== $('#pass2').val()) {
        $('.toast#f1').toast({ delay: 1500 })
        $('.toast#f1').toast('show')
    } else {
        $('#register-form').submit();
    }
})

$('.toast.instant').toast({ delay: 1500 })
$('.toast.instant').toast('show')

// $('#logout-btn').click(function(e) {
// 	e.preventDefault();
// 	$('#logout-form').submit();
// })

$('#logout-btn').on('click', function(e) {
    e.preventDefault();
    $('#logout-form').submit();
})

$('.addToCart').on('click', async function(e) {
    e.preventDefault();
    let id = $(this).data('id');
    console.log("id" + id);
    let res = await fetch(`/cart/add?id=${id}`)
    console.log("res" + res)
    res = await res.json();
    console.log("res json" + res);
    if (res.result == 'ok') {

        $('.toast#s1').toast({ delay: 1100 })
        $('.toast#s1').toast('show')
    } else if (res.result == 'redirect') {
        $(location).prop('href', '/login')
    } else {
        $('.toast#f2').toast({ delay: 1100 })
        $('.toast#f2').toast('show')
    }
})

$('#update-btn').on('click', async function(e) {
    e.preventDefault();
    $('#update-form').submit();
})

document.addEventListener('DOMContentLoaded', () => {
    $(document).ready(function() {

        $('#delete-form').on('show.bs.modal', function(event) {
            var button = $(event.relatedTarget)
            var _id = button.data('id')
            $('#deleteForm').attr('action', `/cart/remove/${_id}`);


        })

        $('#delete-confirm').on('click', () => {
            $('#deleteForm').submit();
        })

    })
});