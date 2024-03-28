package com.example.music.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MusicWebController {

    @RequestMapping("index")
    public String index() {
        return "index";
    }

    @RequestMapping("genre_management")
    public String genre_management() {
        return "genre_management";
    }

    @RequestMapping("user_center")
    public String user_center() {
        return "user_center";
    }

    @RequestMapping("feedback")
    public String feedback() {
        return "feedback";
    }

    @RequestMapping("index_list")
    public String index_list() {
        return "index_list";
    }

    @RequestMapping("audio_player")
    public String audio_player() {
        return "audio_player";
    }

    @RequestMapping("admin_login")
    public String admin_login() {
        return "admin_login";
    }

    @RequestMapping("admin_index")
    public String admin_index() {
        return "admin_index";
    }

    @RequestMapping("admin_IndexAlbum")
    public String admin_IndexAlbum() {
        return "admin_IndexAlbum";
    }

    @RequestMapping("admin_classify")
    public String admin_classify() {
        return "admin_classify";
    }

    @RequestMapping("admin_user")
    public String admin_user() {
        return "admin_user";
    }

    @RequestMapping("admin_feedback")
    public String admin_feedback() {
        return "admin_feedback";
    }

    @RequestMapping("admin_addMusic")
    public String admin_addMusic() {
        return "admin_addMusic";
    }
}