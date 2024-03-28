package com.example.music.service;

import com.example.music.domain.Music;
import com.example.music.domain.MusicResponse;

import java.util.List;

public interface MusicService {

    List<MusicResponse> getMusicListByclassify(String classify, int page, int pageSize);

//    List<MusicResponse> getAllMusicList();

    int countTotalSongs();

    int countTotalInClassify(String classify);

    MusicResponse getById(Integer id);

    void update(Integer id,String introduction);

    void delete(List<Integer> ids);

    String getAlbumNameById(Integer albumId);

    List<MusicResponse> getMusicListByAlbum(String albumName, int page, int pageSize);

    void modifyAlbumName(Integer albumId, String modifiedAlbumName);

    boolean addLove(String userEmail, Integer musicId);

    void removeLove(String userEmail, Integer musicId);

    // 获取用户喜欢的音乐列表
    List<MusicResponse> getFavoriteMusicList(String userEmail);

    List<MusicResponse> searchMusicByName(String songname);

    //新增音乐
    void save(Music music);
}
