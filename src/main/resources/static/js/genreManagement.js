let currentPage = 1;
const songsPerPage = 10;
let currentClassification = 'Pop';

function cacheTotalInClassify(totalInClassify) {
    localStorage.setItem('totalInClassify', totalInClassify);
}

async function changeClassification(classification) {
    currentPage = 1;
    currentClassification = classification;
    await loadAndRenderSongs(classification);
}

async function loadAndRenderSongs(classification) {
    try {
        await loadSongs(classification);
    } catch (error) {
        console.error('发生错误:', error);
    }
}

async function loadSongs(classification) {
    const apiUrl = `http://localhost/music/musiclist?classify=${classification}&page=${currentPage}&pageSize=${songsPerPage}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        cacheTotalInClassify(data[0].totalInClassify);
        renderPagination();
        console.log(data)
        // 确保在renderSongs之前等待其他异步操作完成
        await renderSongs(data);
    } catch (error) {
        console.error('加载歌曲时出错:', error);
        throw error;
    }
}
const songContainer = document.getElementById('songContainer');

const startIndex = (currentPage - 1) * songsPerPage;
const endIndex = startIndex + songsPerPage;

function renderSongs(songsData) {

    songContainer.innerHTML = '';
    const currentPageSongs = songsData.slice(startIndex, endIndex);

    currentPageSongs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.className = 'song';
        songElement.innerHTML = `
            <img src="${song.imgUrl}" alt="歌曲图片">
            <div style="font-size: larger">${song.songName}</div>
            <p>${song.artist}</p>
            <p>语言：${song.language}</p>
            <p>发行日期：${parseDate(song.releaseDate)}</p>
        `;
        songElement.addEventListener('click', function () {
            const queryParams = `findkey=${song.songName}-${song.artist}&imgname=${song.album}&id=${song.musicId}&introduction=${song.introduction}`;
            const url = `audio_player?${queryParams}`;
            window.location.href = url;
        });
        songContainer.appendChild(songElement);
    });
}

function renderPagination() {
    const totalInClassify = localStorage.getItem('totalInClassify');
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalInClassify / songsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.onclick = function() {
            currentPage = i;
            loadAndRenderSongs(currentClassification);
        };
        pagination.appendChild(button);
    }
}

// 初始加载
changeClassification('pop');

function parseDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
}
