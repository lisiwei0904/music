// 在页面加载时检查admin-token
document.addEventListener('DOMContentLoaded', function () {
    // 从localStorage中获取admin-token
    const adminToken = localStorage.getItem('admin-token');

    // 如果admin-token不存在
    if (!adminToken) {
        // 这里不再需要设置模糊或隐藏元素，因为用户将被重定向到登录页面
        window.location.href = 'admin_login'
        alert('请先登录！');
    }
});
