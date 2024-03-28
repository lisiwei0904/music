// 音乐控制台
var audioPlayer = document.getElementById('audioPlayer');

// 获取URL传值
const urlParams = new URLSearchParams(window.location.search);
const musicId = urlParams.get('id')
const song = urlParams.get('findkey');
const imgname = urlParams.get('imgname');
const introduction = urlParams.get('introduction');

// 设置音乐封面
const audioPlayerImage = document.getElementById('audioPlayerImage');
audioPlayerImage.src = '/img/'+ imgname + '.png';

// 设置音乐标题
const songTitle = document.getElementById('songTitle');
songTitle.innerText = song;

// 设置音乐路径
audioPlayer.src = '/MP3/'+ song +'.mp3';

// 解析新的歌词路径
parseLrc('/lrc/'+ song +'.lrc');

// 更新歌曲介绍
const songDescription = document.getElementById('songDescription');
songDescription.innerHTML = '<h4>Song introduction</h4><p>'+introduction+'</p>';

// 切换展开/收起歌词
function toggleLyricsDisplay() {
    const lyricsDisplay = document.getElementById('lyricsDisplay');
    const toggleLyricsBtn = document.getElementById('toggleLyricsBtn');

    lyricsDisplay.classList.toggle('hidden');

    toggleLyricsBtn.innerText = lyricsDisplay.classList.contains('hidden') ? '展开歌词' : '收起歌词';
}

function audioPlayerMusic() {
    if (audioPlayer.src === 'http://localhost/musicPath') {
        audioPlayer.src = musicData[0].url;
        audioPlayer.play();
    } else {
        audioPlayer.play();
    }
}

// 喜欢按钮
// 添加喜欢音乐的函数
function LoveMusic() {
    // 从本地缓存获取token
    const token = localStorage.getItem('token');

    const url = `http://localhost/music/addLove?music_id=${musicId}`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
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
        })
        .catch(error => {
            alert(error);
        });
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
lyricsDisplay.addEventListener('click', function () {
    lyricsDisplay.style.display = 'none';
    toggleLyricsBtn.innerText = '展开歌词';
});

// 切换展开/收起歌词
const toggleLyricsBtn = document.getElementById('toggleLyricsBtn');
toggleLyricsBtn.addEventListener('click', function () {
    const lyricsDisplay = document.getElementById('lyricsDisplay');
    if (lyricsDisplay.style.display === 'none') {
        lyricsDisplay.style.display = 'block';
        toggleLyricsBtn.innerText = '收起歌词';
    } else {
        lyricsDisplay.style.display = 'none';
        toggleLyricsBtn.innerText = '展开歌词';
    }
});

// 调用解析lrc文件的函数
parseLrc('/lrc/' + song + '.lrc');