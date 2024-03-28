package com.example.music.mapper;

import com.example.music.domain.Message;
import com.example.music.domain.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Select("select * from user where id = #{id}")
    User findById(Integer id);

    @Insert("insert into user(email, username, password) values (#{email}, #{username}, #{password})")
    void registerUser(User user);

    @Select("select count(*) from user where email = #{email}")
    boolean existsByEmail(String email);

    @Select("select * from user where email = #{email} and password = #{password}")
    User authenticateUser(String email, String password);

    // 根据email查找用户
    @Select("select * from user where email = #{email}")
    User findByEmail(String email);

    @Update("UPDATE user " +
            "SET imgname = #{imgname} " +  // 添加了 SET 子句
            "WHERE email = #{email}")
    void updateUserImgname(User user);

    @Insert("INSERT INTO messages (email,message_date, content) VALUES (#{email}, #{messageDate},#{content})")
    void insertMessage(Message message);

    @Select("SELECT * FROM messages")
    List<Message> getAllMessages();

    @Delete("DELETE FROM messages WHERE id = #{id}")
    void deleteMessageById(Long id);

    @Select("SELECT * FROM user")
    List<User> getAllUsers();

    @Select("SELECT * FROM user WHERE username LIKE CONCAT('%', #{username}, '%')")
    List<User> getUsersByUsername(@Param("username") String username);

    // 根据用户 ID 删除用户
    @Delete("DELETE FROM user WHERE id = #{userId}")
    int deleteUserById(@Param("userId") Long userId);
}
