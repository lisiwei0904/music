function submitFeedback() {
    // 获取留言内容
    var feedbackMessage = document.getElementById('feedbackMessage').value;

    // 构建要发送的数据对象
    var data = {
        content: feedbackMessage
    };

    var token = localStorage.getItem('token');

    // 发送 POST 请求到后端接口，添加 Authorization 头
    fetch('http://localhost/user/addmessage', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
        .then(response => response.json())
        .then(data => {
            // 在这里处理后端返回的数据
            if (JSON.stringify(data.data) === "null")
            {
                alert("请先登录！")
            }
            else {
                alert(JSON.stringify(data.data));
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
