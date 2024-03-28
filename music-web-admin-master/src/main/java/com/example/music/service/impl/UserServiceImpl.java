package com.example.music.service.impl;

import com.example.music.config.JwtTokenProvider;
import com.example.music.domain.Message;
import com.example.music.domain.User;
import com.example.music.mapper.UserMapper;
import com.example.music.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public User findById(Integer id) {
        return userMapper.findById(id);
    }

    @Override
    public User authenticateUser(String email, String password) {
        // 在这里实现用户身份验证的逻辑
        User user = userMapper.authenticateUser(email, password);

        // 如果用户存在且密码匹配，则返回用户对象；否则返回null
        return (user != null && user.getPassword().equals(password)) ? user : null;
    }

    @Override
    public void registerUser(User user) {
        // 检查用户名是否为空
        if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("用户名不能为空");
        }

        // 检查邮箱是否已存在
        if (existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("该邮箱已被注册");
        }

        // 其他注册逻辑
        userMapper.registerUser(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userMapper.existsByEmail(email);
    }

    @Override
    public User getUserByEmail(String email) {

        User user = userMapper.findByEmail(email);

        return user;
    }

    @Override
    public void updateUser(User user) {
        // 检查用户是否存在
        if (userMapper.findById(user.getId()) != null) {
            // 更新用户信息
            userMapper.updateUserImgname(user);
        } else {
            // 用户不存在，抛出异常或者进行其他适当的处理
            throw new IllegalArgumentException("用户不存在");
        }
    }

    @Override
    public void addmessage(String userEmail, Message message) {
        message.setEmail(userEmail);
        message.setMessageDate(LocalDateTime.now());
        System.out.println(message);
        userMapper.insertMessage(message);
    }

    @Override
    public List<Message> getAllMessages() {
        return userMapper.getAllMessages();
    }

    @Override
    public void deleteMessageById(Long id) {
        userMapper.deleteMessageById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }

    @Override
    public List<User> getUsersByUsername(String username) {
        return userMapper.getUsersByUsername(username);
    }

    @Override
    public int deleteUserById(Long userId) {
        return userMapper.deleteUserById(userId);
    }

}
