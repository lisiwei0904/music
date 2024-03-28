document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // 阻止表单默认提交行为

        // 获取输入的用户名和密码
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;

        const apiUrl = 'http://localhost/admin/login';

        // 发送登录请求
        loginAjaxRequest('POST', apiUrl, { admin: username, password: password });
    });
});

function loginAjaxRequest(method, url, data) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 请求成功的处理逻辑
                var response = xhr.responseText;
                var token = response;

                // 存储token到本地存储
                localStorage.setItem('admin-token', token);

                alert('登录成功！');
                window.location.href = "admin_index"

            } else {
                // 请求失败的处理逻辑
                alert('请求失败，状态码: ' + xhr.status + '，' + xhr.responseText);
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // 设置请求头，确保后端能正确解析数据
    xhr.send(JSON.stringify(data)); // 将数据转为 JSON 字符串并发送
}
