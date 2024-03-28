function adminLogout() {
    localStorage.removeItem('admin-token')
    window.location.href = 'admin_login'
    alert('退出成功！')
}