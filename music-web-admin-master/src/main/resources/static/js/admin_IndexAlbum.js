function uploadFile(number) {
    var fileInput = document.getElementById('fileInput'+ number);
    if (fileInput) {
        var file = fileInput.files[0];
        if (file) {
            console.log(file)
            var formData = new FormData();
            formData.append('filename', 'swiper'+number);
            formData.append('image', file);
            // 发送 formData 到后端接口进行文件上传
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/music/modify_index_img', true);

            var token = localStorage.getItem('admin-token');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);

            xhr.onload = function () {
                if (xhr.status === 200) {
                    alert('文件上传成功');
                } else {
                    alert('文件上传失败');
                }
            };
            xhr.send(formData);
        } else {
            alert('请选择要上传的文件');
        }
    } else {
        alert('未找到文件输入元素');
    }
}

function modifyAlbumName() {
    var albumIdInput = document.getElementById('albumId');
    var modifiedAlbumNameInput = document.getElementById('modifiedAlbumName');

    if (albumIdInput && modifiedAlbumNameInput) {
        var albumId = albumIdInput.value;
        var modifiedAlbumName = modifiedAlbumNameInput.value;

        if (albumId && modifiedAlbumName) {
            // 发送数据到后端接口进行专辑名修改
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/music/modifyAlbumName', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            var token = localStorage.getItem('admin-token');
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    alert('专辑名修改成功');
                } else {
                    alert('专辑名修改失败');
                }
            };

            xhr.send('albumId=' + encodeURIComponent(albumId) + '&modifiedAlbumName=' + encodeURIComponent(modifiedAlbumName));
        } else {
            alert('请输入专辑ID和修改后的专辑名');
        }
    } else {
        alert('未找到输入元素');
    }
}
