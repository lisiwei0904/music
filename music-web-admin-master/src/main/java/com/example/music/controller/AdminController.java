package com.example.music.controller;

import com.example.music.domain.Admin;
import com.example.music.config.JwtTokenProvider;
import com.example.music.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Admin admin) {
        Admin authenticatedAdmin = adminService.authenticateAdmin(admin.getAdmin(), admin.getPassword());



        if (authenticatedAdmin != null) {

            // 生成并返回 JWT Token
            String token = jwtTokenProvider.generateToken(authenticatedAdmin.getAdmin());
            return new ResponseEntity<>(token, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("登录失败，管理员用户名或密码错误！", HttpStatus.UNAUTHORIZED);
        }
    }
}
