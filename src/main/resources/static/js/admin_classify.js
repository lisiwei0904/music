document.addEventListener('DOMContentLoaded', function () {
    fetchMusicAndPagination('popColumn', 'Pop', 1, 10);

    fetchMusicAndPagination('rockColumn', 'Rock', 1, 10);

    fetchMusicAndPagination('hiphopColumn', 'Hiphop', 1, 10);

    fetchMusicAndPagination('instrumentalColumn', 'Instrumental', 1, 10);

    fetchMusicAndPagination('balladColumn', 'Ballad', 1, 10);
});

function fetchMusicAndPagination(columnId, classify, page, pageSize) {
    fetch(`/music/musiclist?classify=${classify}&page=${page}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            populateGenreColumn(columnId, data);
            renderPagination(columnId, classify, data[0].totalInClassify, page, pageSize);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderPagination(columnId, classify, total, currentPage, pageSize) {
    const pageCount = Math.ceil(total / pageSize);
    const paginationContainer = document.getElementById(`${columnId}-pagination`);
    console.log(paginationContainer)

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', function () {
            loadPage(columnId, classify, i, pageSize);
        });
        paginationContainer.appendChild(pageButton);
    }

    // 高亮当前页码按钮
    const buttons = paginationContainer.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    buttons[currentPage - 1].classList.add('active');
}

function loadPage(columnId, classify, page, pageSize) {
    fetchMusicAndPagination(columnId, classify, page, pageSize);
}
// 编辑歌曲的功能
function editSong(musicId) {
    // 根据音乐ID执行编辑操作
    showIntroductionInput(musicId)
}

// 操作删除歌曲的功能
function deleteSong(musicId) {
    // 根据音乐ID执行删除操作
    confirmDelete(musicId)
}

// 确认删除歌曲
function confirmDelete(musicId) {
    const confirmation = confirm("确定要删除这首歌曲吗？");

    if (confirmation) {
        // 用户点击确定按钮
        deleteSongf(musicId);
    } else {
        // 用户点击取消按钮
        console.log("用户取消了删除操作");
    }
}

// 删除歌曲的功能
function deleteSongf(musicId) {
    fetch(`/music/${musicId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('admin-token')
        }
    })
        .then(response => {
            if (response.ok) {
                alert(`歌曲已删除`);
                // 刷新页面
                window.location.reload()
            } else {
                console.error('删除歌曲失败');
            }
        })
        .catch(error => console.error('网络请求错误:', error));
}

// 显示音乐介绍输入框
function showIntroductionInput(musicId) {
    const introduction = prompt("请输入新的音乐介绍：");

    if (introduction !== null) {
        // 用户点击确定按钮
        updateIntroduction(musicId, introduction);
    } else {
        // 用户点击取消按钮
        console.log("用户取消了操作");
    }
}

// 更新音乐介绍
function updateIntroduction(musicId, newIntroduction) {
    fetch(`/music/${musicId}?introduction=${encodeURIComponent(newIntroduction)}`, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('admin-token')
        }
    })
        .then(response => {
            if (response.ok) {
                alert(`音乐介绍已更新：${newIntroduction}`);
            } else {
                alert('更新音乐介绍失败');
            }
        })
        .catch(error => console.error('网络请求错误:', error));
}

// 将音乐项目添加到列
function populateGenreColumn(columnId, data) {
    const column = document.getElementById(columnId);

    // 清除现有内容
    column.innerHTML = `<h2>${data[0].classify}</h2>`;

    // 将音乐项目添加到列
    data.forEach(music => {
        const musicItem = document.createElement('div');
        musicItem.innerHTML = `<p>${music.songName}-${music.artist}</p>
                              <button onclick="editSong(${music.musicId})">修改歌曲介绍</button>
                              <button onclick="deleteSong(${music.musicId})">删除</button>`;
        column.appendChild(musicItem);
    });
}

