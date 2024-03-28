package com.example.music.service.impl;

import com.example.music.service.FileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {

    @Override
    public String uploadImage(MultipartFile file) {
        try {
            // 获取文件名
            String originalFileName = file.getOriginalFilename();

            // 生成新的文件名（使用UUID确保唯一性）
            String fileName = UUID.randomUUID().toString() + "-" + originalFileName;

            // 保存文件
            file.transferTo(new File("C:\\Users\\14180\\IdeaProjects\\Music\\src\\main\\resources\\static\\avatar\\" + fileName));
    
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
            // 处理上传失败的异常
            return null;
        }
    }

    // 其他可能的文件上传方法的实现
}
