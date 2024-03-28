package com.example.music.service;

import com.example.music.domain.Message;
import com.example.music.domain.User;

import java.util.List;

public interface UserService {
    User findById(Integer id);

    void registerUser(User user);

    // 注册时比对Email
    boolean existsByEmail(String email);

    User authenticateUser(String email, String password);

    User getUserByEmail(String email);

    void updateUser(User user);

    void addmessage(String userEmail, Message message);

    List<Message> getAllMessages();

    void deleteMessageById(Long id);

    List<User> getAllUsers();

    List<User> getUsersByUsername(String username);

    int deleteUserById(Long userId);
}
