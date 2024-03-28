package com.example.music.config;

import com.example.music.interceptor.LoginCheckInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private LoginCheckInterceptor loginCheckInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginCheckInterceptor)
                .addPathPatterns(
                        // 拦截音乐接口
                        "/music/modify_index_img",
                        "/music/modifyAlbumName",
                        "/music/addMusicWithFiles",
                        "/music/addLove",
                        "/music/removeLove",
                        "/music/favoriteMusicList",
//                        "music/musiclist",
                        // 拦截用户接口
                        "/user/getInfo",
                        "/user/upload",
                        "/user/addmessage",
                        "/user/deleteMessage/{id}",
//                        "/user/getAllUser",
                        "/user/search",
                        "/user/{userId}"
                        )
                .excludePathPatterns("/static/**", "/templates/**", "/img/**", "/MP3/**", "/lrc/**", "/avatar/**",
                        "getAllUser",
                        "getAllMessages"
                );
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");
        registry.addResourceHandler("/templates/**")
                .addResourceLocations("classpath:/templates/");
        registry.addResourceHandler("/img/**")
                .addResourceLocations("classpath:/static/img/");
        registry.addResourceHandler("/MP3/**")
                .addResourceLocations("classpath:/static/MP3/");
        registry.addResourceHandler("/lrc/**")
                .addResourceLocations("classpath:/static/lrc/");
        registry.addResourceHandler("/avatar/**")
                .addResourceLocations("classpath:/static/avatar/");
    }
}
