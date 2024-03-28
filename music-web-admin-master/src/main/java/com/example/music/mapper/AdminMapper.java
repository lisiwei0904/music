package com.example.music.mapper;

import com.example.music.domain.Admin;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface AdminMapper {

    @Select("SELECT * FROM admin WHERE admin = #{admin}")
    Admin findByAdmin(String admin);

    @Select("SELECT * FROM admin WHERE admin = #{admin} AND password = #{password}")
    Admin authenticateAdmin(String admin, String password);
}
