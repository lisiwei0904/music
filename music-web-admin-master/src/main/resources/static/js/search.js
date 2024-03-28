// 搜索函数
function searchSong() {
    // 获取输入框元素
    const searchInput = document.getElementById('searchInput').value;
    const apiUrl = 'http://localhost:80/music/search?songname=' + searchInput;

    // 发送GET请求
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            // 检查响应是否成功
            if (!response.ok) {
                throw new Error('Network error');
            }
            // 将响应解析为JSON
            return response.json();
        })
        .then(data => {
            const song = data[0]
            // 处理从后端获取的数据
            const queryParams = `findkey=${song.songName}-${song.artist}&imgname=${song.album}&id=${song.musicId}&introduction=${song.introduction}`;
            const url = `audio_player?${queryParams}`;
            window.location.href = url;
        })
        .catch(error => {
            console.error('error:', error);
        });
}