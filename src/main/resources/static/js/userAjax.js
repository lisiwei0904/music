// 封装Ajax请求
function registerAjaxRequest(method, url, data) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 请求成功的处理逻辑
                alert(xhr.responseText);
                window.location.reload()
            } else {
                // 请求失败的处理逻辑
                alert('请求失败，状态码: ' + xhr.status + '，' + xhr.responseText);
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // 设置请求头，确保后端能正确解析数据
    xhr.send(JSON.stringify(data)); // 将数据转为JSON字符串并发送
}

function loginAjaxRequest(method, url, data) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 请求成功的处理逻辑
                var response = xhr.responseText;
                var token = response;

                // 存储token到本地存储
                localStorage.setItem('token', token);

                // 隐藏登录弹窗
                closeModal();

                alert("登录成功！")
                window.location.reload()
            } else {
                // 请求失败的处理逻辑
                alert('请求失败，状态码: ' + xhr.status + '，' + xhr.responseText);
            }
        }
    };

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // 设置请求头，确保后端能正确解析数据
    xhr.send(JSON.stringify(data)); // 将数据转为JSON字符串并发送
}



// 获取信息
function getInfoAjaxRequest(method, url) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // 请求成功的处理逻辑
                var response = JSON.parse(xhr.responseText);

                // 将用户信息存储在本地缓存
                localStorage.setItem('userInfo', JSON.stringify(response));
                userInfo = JSON.parse(userInfo);
                // 隐藏登录按钮，显示退出按钮
                document.querySelector('.loginBtn').style.display = 'none';
                document.querySelector('.logoutBtn').style.display = 'block';
                document.querySelector('.username').style.display = 'block';

                // 隐藏注册按钮
                document.querySelector('.registerBtn').style.display = 'none';
                if (userInfo !== null)
                {
                    console.log(userInfo)
                    document.querySelector('.username').innerText = userInfo.username;
                    const avatar = document.querySelector('.avatar');
                    avatar.src = 'http://localhost/avatar/' + userInfo.imgname;
                    document.querySelector('.Email').innerText = userInfo.email;

                    document.getElementById('personalCenterContainer').style.filter = 'blur(0)';
                }
                else
                {
                    window.location.reload()
                }
            }
        }
    };

    xhr.open(method, url, true);

    // 添加token到请求头
    var token = localStorage.getItem('token');
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);

    xhr.send();
}

