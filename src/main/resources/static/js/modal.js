function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function showRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('registerModal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target === document.getElementById('loginModal')) {
        closeModal();
    } else if (event.target === document.getElementById('registerModal')) {
        closeModal();
    }
}

function entryadmin() {
    window.location.href = 'admin_login'
}