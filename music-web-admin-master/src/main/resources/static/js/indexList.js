// 音乐控制台
var audioPlayer = document.getElementById('audioPlayer');

// 定义全局变量 musicData
let musicData = [];

// 从后端请求数据
function fetchMusicData(albumId) {
    fetch(`http://localhost/music/getSongsByAlbumId/${albumId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('songTitle').innerText = `${data[0].songName}-${data[0].artist}`;
            audioPlayer.src = data[0].mp3Url;
            parseLrc(data[0].lrcUrl);
            // 更新全局变量 musicData
            musicData = data;

            // 调用渲染函数
            renderMusicList(data);
            renderPagination();
            document.querySelector('#pagination li:first-child').click();
        })
        .catch(error => {
            console.error('获取歌曲数据时发生错误:', error);
        });
}

// 初始页面加载时获取数据
const urlParams = new URLSearchParams(window.location.search);
const initialAlbumId = urlParams.get('key');

fetchMusicData(initialAlbumId);


// 下载音乐的函数
function downloadMusic(url) {
    // 在这里实现下载音乐的逻辑
    window.location.href = url
}

// 分享音乐的函数
function shareMusic(url) {
    // 在这里实现分享音乐的逻辑
    window.location.href = url
}

// 其他函数和代码保持不变...

function audioPlayerMusic() {
    // console.log(audioPlayer.src)
    if (audioPlayer.src === 'http://localhost/musicPath')
    {
        audioPlayer.src = musicData[0].url;
        audioPlayer.play();
    }
    else {
        audioPlayer.play();
    }
}

// 播放音乐的函数
function playMusic(name, mp3Url, lrcUrl) {
    console.log(lrcUrl)
    console.log("运行！");
    // 在控制台显示播放的音乐名称和链接
    console.log("播放音乐：" + name + "，链接：" + mp3Url);

    // 更新播放器中的音乐名称
    document.getElementById('songTitle').innerText = name;

    // 更新播放器中的音乐链接
    audioPlayer.src = mp3Url;
    audioPlayer.play();

    parseLrc(lrcUrl);
}

function pauseMusic() {
    audioPlayer.pause();
}

function changeVolume(volume) {
    audioPlayer.volume = volume / 100;
}

// 音乐进度条
function changeProgress(progress) {
    var duration = audioPlayer.duration; // 获取音乐总时长
    audioPlayer.currentTime = (progress / 100) * duration; // 设置音乐当前播放时间
}

function updateProgress() {
    var progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    document.querySelector('.progress-bar').value = progress;

    var currentTime = formatTime(audioPlayer.currentTime);
    var duration = formatTime(audioPlayer.duration);
    document.getElementById('currentTime').innerText = currentTime;
    document.getElementById('duration').innerText = duration;
}

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var sec = Math.floor(seconds % 60);
    if (sec < 10) {
        sec = '0' + sec;
    }
    return minutes + ':' + sec;
}

audioPlayer.addEventListener('timeupdate', updateProgress);

// 歌词
// 解析lrc文件并显示歌词
function parseLrc(lrcPath) {
    fetch(lrcPath)
        .then(response => response.text())
        .then(data => {
            displayLyrics(data);
        })
        .catch(error => {
            console.error('Error fetching the lyrics:', error);
        });
}

// 显示歌词
function displayLyrics(lyrics) {
    const lyricsDisplay = document.getElementById('lyricsDisplay');
    lyricsDisplay.innerText = lyrics;
}

// 点击歌词显示区域时收起歌词
const lyricsDisplay = document.getElementById('lyricsDisplay');
lyricsDisplay.addEventListener('click', function() {
    lyricsDisplay.style.display = 'none';
    toggleLyricsBtn.innerText = '展开歌词';
});

// 切换展开/收起歌词
const toggleLyricsBtn = document.getElementById('toggleLyricsBtn');
toggleLyricsBtn.addEventListener('click', function() {
    const lyricsDisplay = document.getElementById('lyricsDisplay');
    if (lyricsDisplay.style.display === 'none') {
        lyricsDisplay.style.display = 'block';
        toggleLyricsBtn.innerText = '收起歌词';
    } else {
        lyricsDisplay.style.display = 'none';
        toggleLyricsBtn.innerText = '展开歌词';
    }
});

// 喜欢
// 添加喜欢音乐的函数
function loveMusic(musicId) {
    // 从本地缓存获取token
    const token = localStorage.getItem('token');

    const url = `http://localhost/music/addLove?music_id=${musicId}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // 将token放在Authorization头中
        },
    })
        .then(response => response.json())
        .then(data => {
            if (JSON.stringify(data.data) === "null")
            {
                alert("请先登录！")
            }
            else {
                alert(JSON.stringify(data.data));
            }
            // 在这里可以更新页面，例如改变按钮状态等
        })
        .catch(error => {
            alert(error);
        });
}


// 分页器
// 每页显示的行数
const itemsPerPage = 5;
// 当前页数
let currentPage = 1;

// 渲染音乐列表
function renderMusicList(page) {
    const musicListDiv = document.getElementById("musicList");
    musicListDiv.innerHTML = ""; // 清空音乐列表

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const musicDataForPage = musicData.slice(start, end);

    musicDataForPage.forEach(function(music) {
        const musicItem = document.createElement("div");
        musicItem.innerHTML = `
                    <p>歌曲名称：${music.songName}</p>
                    <p>歌曲类型：${music.classify}</p>
                    <div>
                        <button onclick="playMusic('${music.songName}-${music.artist}', '${music.mp3Url}', '${music.lrcUrl}')">播放</button>
                        <button onclick="downloadMusic('${music.mp3Url}')">下载</button>
                        <button onclick="shareMusic('${music.mp3Url}')">分享</button>
                        <button onclick="loveMusic('${music.musicId}')">喜欢</button>
                    </div>
                `;
        musicListDiv.appendChild(musicItem);
    });
}

// 渲染分页器
function renderPagination() {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = ""; // 清空分页器

    const totalPages = Math.ceil(musicData.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.innerText = i;
        li.addEventListener("click", function() {
            currentPage = i;
            renderMusicList(currentPage);
            renderPagination();
        });
        pagination.appendChild(li);
    }
}

// 初始化页面
// renderMusicList(currentPage);
// renderPagination();



