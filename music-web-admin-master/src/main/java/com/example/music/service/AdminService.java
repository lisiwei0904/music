package com.example.music.service;

import com.example.music.domain.Admin;

public interface AdminService {

    /**
     * 根据管理员用户名和密码进行身份验证
     * @param admin 管理员用户名
     * @param password 管理员密码
     * @return 验证通过时返回管理员信息，否则返回null
     */
    Admin authenticateAdmin(String admin, String password);

}
