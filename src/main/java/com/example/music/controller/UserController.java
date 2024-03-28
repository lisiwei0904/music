package com.example.music.controller;

import com.example.music.domain.Message;
import com.example.music.domain.Result;
import com.example.music.domain.UploadResponse;
import com.example.music.domain.User;
import com.example.music.service.FileService;
import com.example.music.service.UserService;
import com.example.music.config.JwtTokenProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private FileService fileService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        User user = userService.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/getInfo")
    public ResponseEntity<User> getUserInfo(@RequestHeader("Authorization") String token) {
        // 从token中解析出用户信息
        String email = jwtTokenProvider.getEmailFromToken(token);

        if (email != null) {
            // 根据email查找用户
            User user = userService.getUserByEmail(email);

            if (user != null) {
                // 返回用户信息
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 或其他适当的状态码
            }
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        User authenticatedUser = userService.authenticateUser(user.getEmail(), user.getPassword());

        if (authenticatedUser != null) {
            // 打印登录信息到控制台
            System.out.println("用户登录成功，用户信息：");
            System.out.println("Email: " + authenticatedUser.getEmail());
            System.out.println("Username: " + authenticatedUser.getUsername());

            // 生成并返回 JWT Token
            String token = jwtTokenProvider.generateToken(authenticatedUser.getEmail());
            return new ResponseEntity<>(token, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("登录失败，用户名或密码错误！", HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        log.info("注册");
        try {
            // 检查是否存在相同的用户名或邮箱
            if (userService.existsByEmail(user.getEmail())) {
                return new ResponseEntity<>("注册失败：邮箱已被注册！", HttpStatus.BAD_REQUEST);
            }

            userService.registerUser(user);

            return new ResponseEntity<>("注册成功！", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("注册失败：" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UploadResponse> uploadFile(@RequestParam("file") MultipartFile file, @RequestHeader("Authorization") String token) {
        String fileName = fileService.uploadImage(file);

        // 通过 Token 解析用户邮箱
        String email = jwtTokenProvider.getEmailFromToken(token);

        // 根据邮箱查找用户
        User user = userService.getUserByEmail(email);

        if (user != null) {
            // 更新用户的头像字段为文件名
            user.setImgname(fileName);
            userService.updateUser(user);

            // 返回成功信息和文件名
            UploadResponse uploadResponse = new UploadResponse(true, "头像上传成功", fileName);
            return new ResponseEntity<>(uploadResponse, HttpStatus.OK);
        } else {
            // 用户不存在，返回相应的错误信息
            UploadResponse uploadResponse = new UploadResponse(false, "用户不存在", null);
            return new ResponseEntity<>(uploadResponse, HttpStatus.NOT_FOUND);
        }
    }

    /*
            添加留言  http://localhost:80/user/addmessage  {
    "content":"这是一条测试留言"
}
     */


    @PostMapping("/addmessage")
    public Result addLove(@RequestHeader("Authorization") String token, @RequestBody Message message) {
        try {
            // 解析token获取用户邮箱
            String userEmail = jwtTokenProvider.getEmailFromToken(token);

            // 调用服务添加留言
            userService.addmessage(userEmail, message);

            return Result.success("添加留言成功");
        } catch (Exception e) {
            return Result.error("添加留言失败: " + e.getMessage());
        }
    }

    @GetMapping("/getAllMeassages")
    public List<Message> getAllMessages() {
        return userService.getAllMessages();
    }

    @DeleteMapping("/deleteMessage/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {
        try {
            userService.deleteMessageById(id);
            return ResponseEntity.ok("留言删除成功。");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("删除留言时发生错误: " + e.getMessage());
        }
    }

    /*
    http://localhost:80/getAllUser 获取所有的用户信息
     */
    @GetMapping()
    public Result getallUsers(){
        return Result.success(userService.getAllUsers());
    }

    // 根据用户名模糊搜索用户    http://localhost:80/user/search?username=tt
    @GetMapping("/search")
    public Result searchUsersByUsername(@RequestParam String username) {
        return Result.success(userService.getUsersByUsername(username));
    }

    @DeleteMapping("/{userId}")
    public Result deleteUserById(@PathVariable Long userId) {
        int rowsAffected = userService.deleteUserById(userId);
        if (rowsAffected > 0) {
            return Result.success();
        } else {
            return Result.error("User with ID " + userId + " not found or unable to delete.");
        }
    }

}
