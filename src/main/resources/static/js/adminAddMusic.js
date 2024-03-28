// 添加音乐
function addMusic() {
    const addMusicForm = document.getElementById('addMusicForm');
    const formData = new FormData(addMusicForm);

    fetch('http://localhost:80/music/addMusicWithFiles', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('admin-token')
        }
    })
        .then(response => {
            if (response.ok) {
                if (response.data !== null) {
                    alert('添加成功');
                    window.location.reload();
                } else {
                    alert('添加失败');
                }
            } else {
                alert('Failed to add music');
            }
        })
        .catch(error => console.error('Network error:', error));
}
