package com.example.music.domain;

import lombok.Data;

import java.time.LocalDateTime;


@Data
public class Message {
        private int id;
        private String email;
        private String content;
        private LocalDateTime messageDate;
}
