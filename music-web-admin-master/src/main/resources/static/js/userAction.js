function login() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // 构建登录请求的数据对象
    var loginData = {
        email: email,
        password: password
    };

    // 发送登录请求
    loginAjaxRequest('POST', 'http://localhost/user/login', loginData);
}

function register() {
    var registerEmail = document.getElementById('registerEmail').value;
    var username = document.getElementById('username').value;
    var registerPassword = document.getElementById('registerPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // 检查密码是否一致，这一步可以在前端进行，也可以在后端进行
    if (registerPassword !== confirmPassword) {
        alert('密码不一致！');
        return;
    }

    // 构建注册请求的数据对象
    var registerData = {
        email: registerEmail,
        username: username,
        password: registerPassword
    };

    // 发送注册请求
    registerAjaxRequest('POST', 'http://localhost/user/register', registerData);
}

// 退出函数
function logout() {

    // 清除本地缓存的 token
    localStorage.removeItem('token');

    document.querySelector('.logoutBtn').style.display = 'none';
    document.querySelector('.username').style.display = 'none';

    // 恢复登录按钮状态
    document.querySelector('.loginBtn').style.display = 'block';

    // 显示注册按钮
    document.querySelector('.registerBtn').style.display = 'inline-block';

    localStorage.removeItem('userInfo')

    window.location.reload()

    alert('退出成功！')
}

// 在页面加载时尝试从本地缓存获取用户信息
function loadUserInfoFromLocalStorage() {
    var userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
        // 如果本地缓存中有用户信息，则解析并显示在页面上
        document.querySelector('.username').style.display = 'block';
        userInfo = JSON.parse(userInfo);
        document.querySelector('.username').innerText = userInfo.username;
    } else {
        // 如果本地缓存中没有用户信息，发起获取用户信息的Ajax请求
        getInfoAjaxRequest('GET', 'http://localhost/user/getInfo');
    }
}

// 在页面加载时调用加载用户信息的函数
loadUserInfoFromLocalStorage();