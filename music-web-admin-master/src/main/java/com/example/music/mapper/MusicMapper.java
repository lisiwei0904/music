package com.example.music.mapper;

import com.example.music.domain.Music;
import com.example.music.domain.MusicResponse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MusicMapper {

//    @Select("SELECT * FROM music")
//    List<Music> getAllMusicList();

    @Select("SELECT COUNT(*) FROM musiclist")
    int countTotalSongs();

    @Select("SELECT COUNT(*) FROM musiclist WHERE classify = #{classify}")
    int countTotalInClassify(@Param("classify") String classify);

    @Select("SELECT * FROM musiclist WHERE classify = #{classify} LIMIT #{startIndex}, #{pageSize}")
    List<Music> getMusicListByclassify(@Param("classify") String classify,
                                       @Param("startIndex") int startIndex,
                                       @Param("pageSize") int pageSize);

    @Select("select * from musiclist where  music_id = #{musicId}")
    Music getById(Integer id);

    @Update("UPDATE musiclist SET introduction = #{introduction} WHERE music_id = #{musicId}")
    int updateIntroductionById(@Param("musicId") int musicId, @Param("introduction") String introduction);

    @Delete({
            "<script>",
            "DELETE FROM musiclist WHERE music_id IN",
            "<foreach item='id' collection='ids' open='(' separator=',' close=')'>",
            "#{id}",
            "</foreach>",
            "</script>"
    })
    int deleteByMusicIds(@Param("ids") List<Integer> ids);

    @Select("SELECT albumName FROM indexalbum WHERE id = #{id}")
    String getAlbumNameById(@Param("id") Integer id);

    @Select("SELECT * FROM musiclist WHERE album = #{albumName}")
    List<Music> getMusicListByAlbumName(@Param("albumName") String albumName);

    @Update("UPDATE indexalbum SET albumName = #{modifiedAlbumName} WHERE id = #{albumId}")
    void modifyAlbumName(@Param("albumId") Integer albumId, @Param("modifiedAlbumName") String modifiedAlbumName);

    @Insert("INSERT INTO lovelist (music_id, email) VALUES (#{musicId}, #{userEmail})")
    void insertLove(@Param("musicId") Integer musicId, @Param("userEmail") String userEmail);

    @Delete("DELETE FROM lovelist WHERE music_id = #{musicId} AND email = #{userEmail}")
    void deleteLove(@Param("musicId") Integer musicId, @Param("userEmail") String userEmail);

    @Select("SELECT COUNT(*) FROM lovelist where email = #{userEmail} and music_id = #{musicId}")
    int findLove(String userEmail, Integer musicId);

    @Select("SELECT music_id FROM lovelist WHERE email = #{userEmail}")
    List<Integer> getFavoriteMusicIds(@Param("userEmail") String userEmail);

    @Select({
            "<script>",
            "SELECT * FROM musiclist WHERE music_id IN",
            "<foreach item='id' collection='ids' open='(' separator=',' close=')'>",
            "#{id}",
            "</foreach>",
            "</script>"
    })
    List<MusicResponse> getMusicListByIds(@Param("ids") List<Integer> ids);

    @Select("SELECT * FROM musiclist WHERE songname = #{songName}")
    List<Music> getMusicListBySongName(@Param("songName") String songName);

    @Insert("INSERT INTO musiclist(songname, artist, release_date, introduction, album, classify, language) " +
            "VALUES(#{songName}, #{artist}, #{releaseDate}, #{introduction}, #{album}, #{classify}, #{language})")
    void insertMusic(Music music);

}
