package com.example.music.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    String uploadImage(MultipartFile file);

    // 其他可能的文件上传方法
}
