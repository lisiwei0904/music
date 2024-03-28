// 获取当前路由
function getCurrentRoute() {
    return window.location.pathname;
}

// 检查token并显示登录弹窗，如果弹窗不存在，设置personalCenterContainer变模糊
function checkTokenAndShowLoginModal() {
    // 获取当前路由
    const currentRoute = getCurrentRoute();

    // 如果当前路由是 '/user'
    if (currentRoute === '/user') {
        // 从localStorage中获取token
        const token = localStorage.getItem('token');

        // 如果token不存在
        if (!token) {
            // 显示登录弹窗
            document.getElementById('loginModal').style.display = 'block';
        }
    }
}

// 在页面加载时检查token并显示登录弹窗
document.addEventListener('DOMContentLoaded', function () {
    checkTokenAndShowLoginModal();
    // 从localStorage中获取token
    const token = localStorage.getItem('token');

// 如果token不存在
    if (!token) {
        document.getElementById('personalCenterContainer').style.filter = 'blur(5px)';
        document.querySelector('.username').style.display = 'none';
    }
    else {
        // 隐藏登录按钮，显示退出按钮
        document.querySelector('.loginBtn').style.display = 'none';
        document.querySelector('.logoutBtn').style.display = 'block';
        document.querySelector('.username').style.display = 'block';
        // 隐藏注册按钮
        document.querySelector('.registerBtn').style.display = 'none';
        var userInfo = localStorage.getItem('userInfo');

        if (userInfo) {
            // 如果本地缓存中有用户信息，则解析并显示在页面上
            document.querySelector('.username').style.display = 'block';
            userInfo = JSON.parse(userInfo);
            document.querySelector('.username').innerText = userInfo.username;
        }
    }
});


