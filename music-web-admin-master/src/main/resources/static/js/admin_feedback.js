document.addEventListener('DOMContentLoaded', function () {
    // 页面加载完成后执行
    fetchData();
});

function fetchData() {
    const token = localStorage.getItem('admin-token');
    const headers = new Headers({
        'Authorization': `Bearer ${token}`
    });

    fetch('http://localhost:80/user/getAllMeassages', { headers })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Failed to fetch data. Status:', response.status);
            }
        })
        .then(data => {
            // 处理数据
            renderTable(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

}

function renderTable(data) {
    const tableBody = document.getElementById('messageTableBody');

    data.forEach(message => {
        const row = document.createElement('tr');

        // 创建表格单元格并填充数据
        const idCell = document.createElement('td');
        idCell.textContent = message.id;
        row.appendChild(idCell);

        const emailCell = document.createElement('td');
        emailCell.textContent = message.email;
        row.appendChild(emailCell);

        const contentCell = document.createElement('td');
        contentCell.textContent = message.content;
        row.appendChild(contentCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = message.messageDate;
        row.appendChild(dateCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', () => deleteMessage(message.id));
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        // 将行添加到表格体
        tableBody.appendChild(row);
    });
}

async function deleteMessage(id) {
    try {
        const response = await fetch(`user/deleteMessage/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin-token')
            }
        });

        if (response.ok) {
            // 请求成功
            alert('留言删除成功！');
            // 刷新表格数据
            window.location.reload()
            fetchData();
        } else {
            // 请求失败
            alert('删除留言失败。请重试或联系管理员。');
        }
    } catch (error) {
        console.error('Error deleting message:', error);
    }
}
