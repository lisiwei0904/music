document.addEventListener('DOMContentLoaded', function () {
    // 获取上传按钮和文件输入框
    const uploadBtn = document.getElementById('uploadBtn');
    const fileInput = document.getElementById('fileInput');

    // 添加点击事件监听器
    uploadBtn.addEventListener('click', function () {
        // 触发文件输入框点击事件
        fileInput.click();
    });

    // 添加文件输入框变化事件监听器
    fileInput.addEventListener('change', function () {
        // 获取文件
        const file = fileInput.files[0];

        // 检查是否选择了文件
        if (file) {
            // 调用上传函数
            uploadFile(file);
        }
    });

    // 上传文件的函数
    function uploadFile(file) {
        // 创建 FormData 对象
        const formData = new FormData();

        // 将文件添加到 FormData
        formData.append('file', file);

        // 获取本地缓存的 token
        const token = localStorage.getItem('token');

        // 发送 POST 请求到后端接口，添加 Authorization 头
        fetch('http://localhost/user/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(response => response.json())
            .then(data => {
                // 在这里处理后端返回的数据，例如更新用户头像等
                if (data.success) {
                    // 成功上传，可以更新页面或其他操作
                    alert('头像上传成功！');
                    // 这里可以根据实际情况更新页面，例如设置新的头像路径
                    const avatar = document.querySelector('.avatar');
                    avatar.src = 'http://localhost/avatar/' + data.fileName;
                    userInfo.imgname = data.fileName;
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                } else {
                    // 失败时的处理
                    alert('头像上传失败，请重试。');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    if (localStorage.getItem('token'))
    {
        // 请求后端接口获取用户的喜欢音乐列表
        const token = localStorage.getItem('token');
        fetch('http://localhost/music/favoriteMusicList', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(response => response.json())
            .then(data => {
                // 在这里处理后端返回的音乐列表数据
                if (data && data.length > 0) {
                    // 渲染到页面上
                    renderFavoriteMusicList(data);
                } else {
                    // // 处理没有喜欢音乐的情况
                    // alert('您还没有喜欢的音乐！');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

});

// 渲染喜欢音乐列表到页面上
function renderFavoriteMusicList(musicList) {
    const favoriteMusicListDiv = document.getElementById('musicList');
    favoriteMusicListDiv.innerHTML = '';

    musicList.forEach(function (music) {
        const musicItem = document.createElement('div');
        musicItem.innerHTML = `
            <p>歌曲名称：${music.songName}</p>
            <p>歌曲类型：${music.classify}</p>
            <div>
                <button onclick="playMusic('${music.songName}-${music.artist}', '${music.album}', '${music.musicId}', '${music.introduction}')">播放</button>
                <button onclick="downloadMusic('${music.songName}-${music.artist}')">下载</button>
                <button onclick="shareMusic('${music.songName}-${music.artist}')">分享</button>
                <button onClick="removeLove('${music.musicId}')">移除</button>
            </div>
        `;
        favoriteMusicListDiv.appendChild(musicItem);
    });
}

// 取消喜欢音乐的函数
function removeLove(musicId) {
    // 从本地缓存获取token
    const token = localStorage.getItem('token');

    // 构建取消喜欢的URL
    const url = `http://localhost/music/removeLove?music_id=${musicId}`;

    fetch(url, {
        method: 'DELETE',  // 修改为DELETE请求
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // 将token放在Authorization头中
        },
    })
        .then(response => response.json())
        .then(data => {
            if (JSON.stringify(data.data) === "null") {
                alert("请先登录！");
            } else {
                alert(JSON.stringify(data.data));
                window.location.reload()
            }
            // 在这里可以更新页面，例如改变按钮状态等
        })
        .catch(error => {
            alert(error);
        });
}


function playMusic(songName, album, musicId, introduction) {
    const queryParams = `findkey=${songName}&imgname=${album}&id=${musicId}&introduction=${introduction}`;
    const url = `audio_player?${queryParams}`;
    window.location.href = url;
}

function downloadMusic(url) {
    window.location.href = 'http://localhost/MP3/' + url + '.mp3';
}

function shareMusic(url) {
    window.location.href = 'http://localhost/MP3/' + url + '.mp3';
}

if (localStorage.getItem('userInfo')) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const avatar = document.querySelector('.avatar');
    avatar.src = 'http://localhost/avatar/' + userInfo.imgname;
}

// 渲染用户名等
var userInfo = localStorage.getItem('userInfo');

if (userInfo) {
    userInfo = JSON.parse(userInfo);
    // 如果本地缓存中有用户信息，则解析并显示在页面上
    document.querySelector('.userName').innerText = userInfo.username;
    document.querySelector('.Email').innerText = userInfo.email;
    const avatar = document.querySelector('.avatar');
    avatar.src = 'http://localhost/avatar/' + userInfo.imgname;
} else {
    // 如果本地缓存中没有用户信息，发起获取用户信息的Ajax请求
    getInfoAjaxRequest('GET', 'http://localhost/user/getInfo');
}