package com.example.music.service.impl;

import com.example.music.domain.IndexAlbum;
import com.example.music.domain.Music;
import com.example.music.domain.MusicResponse;
import com.example.music.mapper.MusicMapper;
import com.example.music.service.MusicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MusicServiceImpl implements MusicService {

    @Autowired
    private MusicMapper musicMapper;

    @Override
    public List<MusicResponse> getMusicListByclassify(String classify, int page, int pageSize) {
        int startIndex = (page - 1) * pageSize;
        List<Music> musicList = musicMapper.getMusicListByclassify(classify, startIndex, pageSize);
        return convertToMusicResponseList(musicList);
    }

//    @Override
//    public List<MusicResponse> getAllMusicList() {
//        List<Music> musicList = musicMapper.getAllMusicList();
//        return convertToMusicResponseList(musicList);
//    }

    @Override
    public int countTotalSongs() {
        return musicMapper.countTotalSongs();
    }

    @Override
    public int countTotalInClassify(String classify) {
        return musicMapper.countTotalInClassify(classify);
    }

    @Override
    public MusicResponse getById(Integer id) {
        return convertToMusicResponse(musicMapper.getById(id));
    }

    @Override
    public void update(Integer id,String introduction) {
        musicMapper.updateIntroductionById(id,introduction);
    }

    @Override
    public void delete(List<Integer> ids) {
        musicMapper.deleteByMusicIds(ids);
    }

    private List<MusicResponse> convertToMusicResponseList(List<Music> musicList) {
        return musicList.stream()
                .map(this::convertToMusicResponse)
                .collect(Collectors.toList());
    }

    private MusicResponse convertToMusicResponse(Music music) {
        MusicResponse musicResponse = new MusicResponse();
        musicResponse.setMusicId(music.getMusicId());
        musicResponse.setSongName(music.getSongName());
        musicResponse.setArtist(music.getArtist());
        musicResponse.setReleaseDate(music.getReleaseDate());
        musicResponse.setIntroduction(music.getIntroduction());
        musicResponse.setAlbum(music.getAlbum());
        musicResponse.setClassify(music.getClassify());
        musicResponse.setLanguage(music.getLanguage());

        String mp3Url = "http://localhost/MP3/" + music.getSongName() + "-" + music.getArtist() + ".mp3";
        String lrcUrl = "http://localhost/lrc/" + music.getSongName() + "-" + music.getArtist() + ".lrc";
        String imgUrl = "http://localhost/img/" + music.getAlbum() + ".png";

        musicResponse.setTotalSongs(countTotalSongs());
        musicResponse.setTotalInClassify(countTotalInClassify(music.getClassify()));

        musicResponse.setMp3Url(mp3Url);
        musicResponse.setLrcUrl(lrcUrl);
        musicResponse.setImgUrl(imgUrl);

        return musicResponse;
    }


    @Override
    public String getAlbumNameById(Integer albumId) {
        return musicMapper.getAlbumNameById(albumId);
    }


    @Override
    public List<MusicResponse> getMusicListByAlbum(String albumName, int page, int pageSize) {
        int startIndex = (page - 1) * pageSize;
        List<Music> musicList = musicMapper.getMusicListByAlbumName(albumName);
        return convertToMusicResponseList(musicList);
    }

    @Override
    public void modifyAlbumName(Integer albumId, String modifiedAlbumName) {
        // 在 MusicMapper 中实现修改专辑名的数据库操作
        musicMapper.modifyAlbumName(albumId, modifiedAlbumName);
    }


    @Override
    public boolean addLove(String userEmail, Integer musicId) {
        if (checkLoveExistence(userEmail, musicId)) {
            return false;
        } else {
            // 如果不存在，则执行添加喜欢的逻辑
            musicMapper.insertLove(musicId, userEmail);
            return true;
        }
    }

    private boolean checkLoveExistence(String userEmail, Integer musicId) {
        // 查询用户对某首音乐的喜欢记录
        int loveCount = musicMapper.findLove(userEmail, musicId);

        // 如果记录存在（count 大于 0），则返回 true，表示已经存在
        return loveCount > 0;
    }


    @Override
    public void removeLove(String userEmail, Integer musicId) {
        musicMapper.deleteLove(musicId, userEmail);
    }

    @Override
    public List<MusicResponse> getFavoriteMusicList(String userEmail) {
        List<Integer> musicIds = musicMapper.getFavoriteMusicIds(userEmail);
        return musicMapper.getMusicListByIds(musicIds);
    }

    @Override
    public List<MusicResponse> searchMusicByName(String songname) {
        // 在数据库中根据音乐名称执行精确匹配搜索逻辑，返回匹配的音乐列表
        List<Music> matchingMusicList = musicMapper.getMusicListBySongName(songname);

        return convertToMusicResponseList(matchingMusicList);
    }

    @Override
    public void save(Music music) {
        // 在这里执行保存音乐信息到数据库的逻辑
        musicMapper.insertMusic(music);
    }

}
