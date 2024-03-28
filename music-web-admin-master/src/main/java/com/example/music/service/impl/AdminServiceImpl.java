package com.example.music.service.impl;

import com.example.music.domain.Admin;
import com.example.music.mapper.AdminMapper;
import com.example.music.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminMapper adminMapper;

    @Override
    public Admin authenticateAdmin(String admin, String password) {
        // 在这里实现管理员身份验证的逻辑
        Admin adminUser = adminMapper.authenticateAdmin(admin, password);

        // 如果管理员存在且密码匹配，则返回管理员对象；否则返回null
        return (adminUser != null && adminUser.getPassword().equals(password)) ? adminUser : null;
    }
}
