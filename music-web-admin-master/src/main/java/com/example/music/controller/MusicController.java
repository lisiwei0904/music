package com.example.music.controller;

import com.example.music.config.JwtTokenProvider;
import com.example.music.domain.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.music.domain.Music;
import com.example.music.domain.MusicResponse;
import com.example.music.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
@Slf4j
@RestController
@RequestMapping("/music")
public class MusicController {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/modify_index_img")
    public Result upload(String filename, MultipartFile image) throws Exception {
        log.info("文件上传: {}, {}, {}", filename, image);
        //将localhost/img目录下 filename的图片替换为image前端上传的图片
        // 检查参数是否为空
        if (StringUtils.isEmpty(filename) || image == null || image.isEmpty()) {
            return Result.error("参数不能为空");
        }

        // 确定文件存储相对路径
        String uploadDirectory = "src/main/resources/static/img/";
        String filePath = uploadDirectory + filename + ".png";

        try {
            // 将上传的图片保存到指定路径
            byte[] bytes = image.getBytes();
            Path path = Paths.get(uploadDirectory);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
            Files.write(Paths.get(filePath), bytes);

            // 返回成功信息
            return Result.success();
        } catch (Exception e) {
            // 返回错误信息
            return Result.error("文件上传失败: " + e.getMessage());
        }
    }

    @Autowired
    private MusicService musicService;
/*
获取所有音乐
 */
    @GetMapping("/musiclist")
    public List<MusicResponse> getMusicPlaylist(@RequestParam String classify,
                                                @RequestParam(defaultValue = "1") int page,
                                                @RequestParam(defaultValue = "10") int pageSize) {
        return musicService.getMusicListByclassify(classify, page, pageSize);
    }

    @GetMapping("/getSongsByAlbumId/{albumId}")
    public ResponseEntity<List<MusicResponse>> getSongsByAlbumId(@PathVariable Integer albumId,
                                                                 @RequestParam(defaultValue = "1") int page,
                                                                 @RequestParam(defaultValue = "5") int pageSize) {
        // 在 AlbumService 中实现获取专辑名称的方法
        String albumName = musicService.getAlbumNameById(albumId);

        if (albumName != null) {
            // 在 MusicService 中实现获取专辑歌曲的方法
            List<MusicResponse> songs = musicService.getMusicListByAlbum(albumName, page, pageSize);

            if (!songs.isEmpty()) {
                // 返回歌曲信息
                return new ResponseEntity<>(songs, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 或其他适当的状态码
            }
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 或其他适当的状态码
        }
    }

    @PostMapping("/modifyAlbumName")
    public Result modifyAlbumName(@RequestParam Integer albumId, @RequestParam String modifiedAlbumName) {
        try {
            // 在 MusicService 中实现修改专辑名的方法
            musicService.modifyAlbumName(albumId, modifiedAlbumName);
            return Result.success("专辑名修改成功");
        } catch (Exception e) {
            return Result.error("专辑名修改失败: " + e.getMessage());
        }
    }

    //    搜索音乐
    @GetMapping("/search")
    public ResponseEntity<List<MusicResponse>> searchMusicByName(@RequestParam String songname) {
        try {
            // 调用服务搜索音乐
            List<MusicResponse> searchResults = musicService.searchMusicByName(songname);

            if (!searchResults.isEmpty()) {
                return new ResponseEntity<>(searchResults, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
    根据ID查询音乐详细信息              http://localhost:80/music/19
     */
    @GetMapping("/{id}")
    public Result getById(@PathVariable Integer id){
        log.info("根据ID查询音乐信息, id: {}",id);
        MusicResponse musicResponses = musicService.getById(id);
        return Result.success(musicResponses);
    }

    @PostMapping("/addMusicWithFiles")
    public Result addMusicWithFiles(@RequestParam("songName") String songName,
                                    @RequestParam("artist") String artist,
                                    @RequestParam("releaseDate") String releaseDate,
                                    @RequestParam("introduction") String introduction,
                                    @RequestParam("album") String album,
                                    @RequestParam("classify") String classify,
                                    @RequestParam("language") String language,
                                    @RequestParam("mp3File") MultipartFile mp3File,
                                    @RequestParam("lrcFile") MultipartFile lrcFile,
                                    @RequestParam("imageFile") MultipartFile imageFile) {


        String uploadDirectory = "src/main/resources/static/";

        try {
            Path path = Paths.get(uploadDirectory);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
            // 保存MP3文件
            String mp3FilePath = uploadDirectory + "MP3/" + songName + "-" + artist + ".mp3";
            System.out.println(mp3FilePath);
            Files.write(Paths.get(mp3FilePath), mp3File.getBytes());

            // 保存LRC文件
            String lrcFilePath = uploadDirectory+ "lrc/" + songName + "-" + artist + ".lrc";
            System.out.println(lrcFilePath);
            Files.write(Paths.get(lrcFilePath), lrcFile.getBytes());

            // 保存图片文件
            String imageFilePath = uploadDirectory+ "img/" + album + ".png";
            System.out.println(imageFilePath);
            Files.write(Paths.get(imageFilePath), imageFile.getBytes());

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date parsedDate = dateFormat.parse(releaseDate);
            java.sql.Date sqlDate = new java.sql.Date(parsedDate.getTime());

            // 在这里执行保存音乐信息到数据库的逻辑
            Music music = new Music();
            music.setSongName(songName);
            music.setArtist(artist);
            music.setReleaseDate(sqlDate);
            music.setIntroduction(introduction);
            music.setAlbum(album);
            music.setClassify(classify);
            music.setLanguage(language);

            musicService.save(music);

            return Result.success("音乐信息及文件上传成功");
        } catch (Exception e) {
            return Result.error("文件上传失败: " + e.getMessage());
        }
    }

/*
根据id更新音乐介绍信息   http://localhost:80/music/1?introduction=test  put请求
 */
    @PutMapping("/{id}")
    public Result update(@PathVariable Integer id,@RequestParam String introduction){
        log.info("更新音乐介绍信息 : {}", id);
        musicService.update(id,introduction);
        return Result.success();
    }
/*
批量删除        http://localhost:80/music/20,21  DELETE方式请求
 */
    @DeleteMapping("/{ids}")
    public Result delete(@PathVariable List<Integer> ids){
        log.info("批量删除操作, ids:{}",ids);
        musicService.delete(ids);
        return Result.success();
    }

    @PostMapping("/addLove")
    public Result addLove(@RequestHeader("Authorization") String token, @RequestParam("music_id") Integer musicId) {
        try {
            // 解析token获取用户邮箱
            String userEmail = jwtTokenProvider.getEmailFromToken(token);

            // 调用服务添加喜欢
            if (musicService.addLove(userEmail, musicId)){
                return Result.success("添加喜欢成功");
            }
            else{
                return Result.success("已经存在");
            }
        } catch (Exception e) {
            return Result.error("添加喜欢失败: " + e.getMessage());
        }
    }

    @DeleteMapping("/removeLove")
    public Result removeLove(@RequestHeader("Authorization") String token, @RequestParam("music_id") Integer musicId) {
        try {
            // 解析token获取用户邮箱
            String userEmail = jwtTokenProvider.getEmailFromToken(token);

            // 调用服务取消喜欢
            musicService.removeLove(userEmail, musicId);

            return Result.success("取消喜欢成功");
        } catch (Exception e) {
            return Result.error("取消喜欢失败: " + e.getMessage());
        }
    }

    @GetMapping("/favoriteMusicList")
    public ResponseEntity<List<MusicResponse>> getFavoriteMusicList(@RequestHeader("Authorization") String token) {
        try {
            // 解析token获取用户邮箱
            String userEmail = jwtTokenProvider.getEmailFromToken(token);

            // 调用服务获取用户喜欢的音乐列表
            List<MusicResponse> favoriteMusicList = musicService.getFavoriteMusicList(userEmail);

            if (!favoriteMusicList.isEmpty()) {
                return new ResponseEntity<>(favoriteMusicList, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
