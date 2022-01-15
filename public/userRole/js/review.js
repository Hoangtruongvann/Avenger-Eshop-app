function checkRating() {
    if (document.getElementById("star5").checked)
        return true;
    if (document.getElementById("star4").checked)
        return true;
    if (document.getElementById("star3").checked)
        return true;
    if (document.getElementById("star2").checked)
        return true;
    if (document.getElementById("star1").checked)
        return true;
    return false;
}

function errorMessage() {
    var error = document.getElementById("error");
    let checkUser = document.getElementById("check-user").value
    if (checkUser == 0) {
        error.textContent = "Bạn vui lòng đăng nhập trước khi đánh giá"
        error.style.color = "red"
        return false
    }

    if (checkRating()) {
        document.getElementById("form-review").submit()
    } else {
        error.textContent = "Bạn vui lòng đánh giá số sao trước khi gửi"
        error.style.color = "red"
        return false
    }
}

