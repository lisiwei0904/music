// 获取用户表格的 tbody 元素
const userTableBody = document.getElementById('userTableBody');

// 获取搜索框和搜索按钮
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// 获取弹框元素
const modal = document.getElementById('userModal');
const modalContent = document.getElementById('modalContent');

// 获取所有用户并渲染到表格
async function fetchAndRenderUsers() {
    try {
        const response = await fetch('/user');
        const data = await response.json();
        const users = data.data

        // 清空表格
        userTableBody.innerHTML = '';

        // 渲染用户数据
        users.forEach(user => {
            const row = userTableBody.insertRow();
            const idCell = row.insertCell(0);
            const emailCell = row.insertCell(1);
            const contentCell = row.insertCell(2);
            const actionsCell = row.insertCell(3);

            idCell.textContent = user.id;
            emailCell.textContent = user.email;
            contentCell.textContent = user.username;

            // 添加删除按钮
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.addEventListener('click', () => deleteUser(user.id));
            actionsCell.appendChild(deleteButton);
        });
    } catch (error) {
        console.error('Error fetching and rendering users:', error);
    }
}

// 删除用户
async function deleteUser(userId) {
    try {
        const response = await fetch(`/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('admin-token')
            }
        });

        if (response.ok) {
            // 删除成功，刷新表格数据
            fetchAndRenderUsers();
        } else {
            // 删除失败
            alert('删除用户失败，请重试或联系管理员。');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        // 异常情况
        alert('发生错误，请重试或联系管理员。');
    }
}

// 搜索用户
async function searchUsers() {
    const searchValue = searchInput.value;

    if (searchValue.trim() !== '') {
        try {
            const response = await fetch(`/user/search?username=${searchValue}`);
            const users = await response.json();
            const data = users.data

            // 弹出搜索结果的弹框
            showModal(data);
        } catch (error) {
            console.error('Error searching users:', error);
            // 异常情况
            alert('发生错误，请重试或联系管理员。');
        }
    }
}

// 弹出搜索结果的弹框
function showModal(users) {
    // 清空弹框内容
    modalContent.innerHTML = '';

    // 渲染用户数据到弹框
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.textContent = `ID: ${user.id}, Email: ${user.email}, 用户名: ${user.username}`;
        modalContent.appendChild(userDiv);
    });

    // 显示弹框
    modal.style.display = 'block';
}

// 隐藏弹框
function hideModal() {
    modal.style.display = 'none';
}

// 绑定搜索按钮的点击事件
searchButton.addEventListener('click', searchUsers);

// 初始化页面时获取并渲染用户数据
fetchAndRenderUsers();
