/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : localhost:3306
 Source Schema         : music

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 22/02/2024 19:25:46
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'admin');
INSERT INTO `admin` VALUES (2, 'admin1', 'admin1');

-- ----------------------------
-- Table structure for indexalbum
-- ----------------------------
DROP TABLE IF EXISTS `indexalbum`;
CREATE TABLE `indexalbum`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `albumName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of indexalbum
-- ----------------------------
INSERT INTO `indexalbum` VALUES (1, '我很忙');
INSERT INTO `indexalbum` VALUES (2, '魔杰座');
INSERT INTO `indexalbum` VALUES (3, '叶惠美');
INSERT INTO `indexalbum` VALUES (4, '范特西');

-- ----------------------------
-- Table structure for lovelist
-- ----------------------------
DROP TABLE IF EXISTS `lovelist`;
CREATE TABLE `lovelist`  (
  `love_id` int NOT NULL AUTO_INCREMENT,
  `music_id` int NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`love_id`) USING BTREE,
  INDEX `music_id`(`music_id` ASC) USING BTREE,
  CONSTRAINT `lovelist_ibfk_1` FOREIGN KEY (`music_id`) REFERENCES `musiclist` (`music_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lovelist
-- ----------------------------
INSERT INTO `lovelist` VALUES (1, 2, '1418089946@qq.com');
INSERT INTO `lovelist` VALUES (2, 1, '1418089946@qq.com');
INSERT INTO `lovelist` VALUES (3, 3, '1418089946@qq.com');
INSERT INTO `lovelist` VALUES (5, 4, '1418089946@qq.com');
INSERT INTO `lovelist` VALUES (6, 7, '1418089946@qq.com');
INSERT INTO `lovelist` VALUES (7, 9, '1418089946@qq.com');
INSERT INTO `lovelist` VALUES (8, 14, '1418089946@qq.com');
INSERT INTO `lovelist` VALUES (9, 15, '1418089946@qq.com');

-- ----------------------------
-- Table structure for messages
-- ----------------------------
DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `message_date` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of messages
-- ----------------------------
INSERT INTO `messages` VALUES (1, '1621661524@qq.com', '这是一条测试留言', '2024-02-21 18:51:29');
INSERT INTO `messages` VALUES (2, '1418089946@qq.com', '222', '2024-02-21 23:34:15');
INSERT INTO `messages` VALUES (3, '1418089946@qq.com', '测试！！！', '2024-02-22 02:39:45');
INSERT INTO `messages` VALUES (4, '1418089946@qq.com', '测试！！！', '2024-02-22 02:39:46');
INSERT INTO `messages` VALUES (5, '1418089946@qq.com', '测试！！！', '2024-02-22 02:39:48');

-- ----------------------------
-- Table structure for musiclist
-- ----------------------------
DROP TABLE IF EXISTS `musiclist`;
CREATE TABLE `musiclist`  (
  `music_id` int NOT NULL AUTO_INCREMENT,
  `songname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `artist` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `release_date` date NULL DEFAULT NULL,
  `introduction` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `album` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `classify` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `language` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`music_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 86 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of musiclist
-- ----------------------------
INSERT INTO `musiclist` VALUES (1, '稻香', '周杰伦', '2008-11-05', '111', '魔杰座', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (2, '青花瓷', '周杰伦', '2008-11-05', '倾注深情，久久不能忘怀。', '七里香', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (3, '晴天', '周杰伦', '2003-09-23', '阳光明媚，心情愉悦。', '叶惠美', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (4, '告白气球', '周杰伦', '2016-01-14', '表达爱意的动人旋律。', '周杰伦的床边故事', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (5, '夜曲', '周杰伦', '2005-08-03', '深沉的夜晚，悠扬的旋律。', '十一月的萧邦', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (6, '以父之名', '周杰伦', '2004-07-19', '表达对父亲的感激之情。', '七里香', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (7, '简单爱', '周杰伦', '2008-11-05', '淡淡的思念，深深的爱意。', '七里香', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (8, '东风破', '周杰伦', '2004-07-19', '东风带着思念的味道。', '七里香', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (9, '千里之外', '周杰伦', '2005-08-03', '情侣间的远距离爱情。', '十一月的萧邦', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (10, '蒲公英的约定', '周杰伦', '2003-11-07', '童心未泯的美好回忆。', '叶惠美', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (11, '青春修炼手册', '周杰伦', '2016-01-14', '记录青涩岁月的成长之路。', '周杰伦的床边故事', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (12, '枫', '周杰伦', '2004-07-19', '枫叶飘落的季节，思念涌上心头。', '七里香', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (13, '爱情转移', '周杰伦', '2008-11-05', '感受爱情的微妙变化。', '七里香', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (14, '算什么男人', '周杰伦', '2011-05-18', '自嘲的幽默，自信的态度。', '跨时代', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (15, '给我一首歌的时间', '周杰伦', '2003-09-23', '表达对音乐的热爱。', '叶惠美', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (16, '不该', '周杰伦', '2005-08-03', '回首过去的错爱。', '十一月的萧邦', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (17, '心雨', '周杰伦', '2012-12-28', '内心深处的思念如雨般绵绵。', '十二新作', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (18, '不能说的秘密', '周杰伦', '2007-08-03', '情感交织的禁忌之恋。', '不能说的秘密', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (20, '听妈妈的话', '周杰伦', '2007-08-03', '关于家庭的温馨回忆。', '依然范特西', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (21, '青藏高原', '周杰伦', '2002-07-30', '高远的青藏高原，深沉的心情。', '范特西', 'Instrumental', '中文');
INSERT INTO `musiclist` VALUES (23, '彩虹', '周杰伦', '2002-07-30', '梦幻的彩虹，带来美好的期许。', '范特西', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (26, '烟花易冷', '周杰伦', '2006-11-03', '烟花的美丽瞬间，易冷的心情。', '十二新作', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (27, '大笨钟', '周杰伦', '2002-07-30', '大笨钟敲响，回忆的时光流逝。', '范特西', 'Rock', '中文');
INSERT INTO `musiclist` VALUES (28, '世界末日', '周杰伦', '2011-05-18', '探讨世界的末日，思考生命的意义。', '跨时代', 'Rock', '中文');
INSERT INTO `musiclist` VALUES (29, '东京爱情故事', '周杰伦', '2001-11-01', '远赴东京，谱写的爱情故事。', 'Jay', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (31, '七里香', '周杰伦', '2004-07-19', '七里香的淡淡幽香，勾起回忆。', '七里香', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (32, '听见下雨的声音', '周杰伦', '2013-12-27', '雨中的思念，静听雨滴声。', '哎呦，不错哦', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (33, '一路向北', '周杰伦', '2003-09-23', '漫长的一路向北，追逐梦想。', '叶惠美', 'Rock', '中文');
INSERT INTO `musiclist` VALUES (34, '爱在西元前', '周杰伦', '2001-11-01', '穿越时光，寻找爱的痕迹。', 'Jay', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (35, '东风破', '周杰伦', '2000-11-07', '东风带着思念的味道。', 'Jay', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (36, '阳光宅男', '周杰伦', '2018-06-29', '阳光下的宅男生活，悠闲自在。', '等你下课', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (37, '龙卷风', '周杰伦', '2000-11-07', '犹如龙卷风般的爱情来袭。', 'Jay', 'Rock', '中文');
INSERT INTO `musiclist` VALUES (38, '手语', '周杰伦', '2015-12-26', '用手语表达深情，沟通无声的爱。', '周杰伦的床边故事', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (39, '忍者', '周杰伦', '2006-11-03', '忍者的冷静与机智，化解危机。', '十二新作', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (40, '发如雪', '周杰伦', '2004-07-19', '发如雪般的柔情，飘散在夜空。', '七里香', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (41, '黑色毛衣', '周杰伦', '2008-11-05', '黑色毛衣下的思念，凝结成永恒。', '魔杰座', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (42, '稻香', '周杰伦', '2014-11-21', '稻香飘香，丰收的季节。', '周杰伦的床边故事', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (43, '晴天', '周杰伦', '2019-04-12', '晴朗的天空，心情愉悦。', '跨时代', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (44, '一点点', '周杰伦', '2003-09-23', '一点点的温柔，点燃心中的爱。', '叶惠美', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (45, '轨迹', '周杰伦', '2011-05-18', '心之所向，留下独特的轨迹。', '跨时代', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (46, '可爱女人', '周杰伦', '2000-11-07', '灵动可爱的女人，迷人的笑容。', 'Jay', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (47, '阳明山', '周杰伦', '2002-07-30', '阳明山下，静享宁静时光。', '范特西', 'Instrumental', '中文');
INSERT INTO `musiclist` VALUES (48, '斗牛', '周杰伦', '2006-11-03', '勇敢面对人生的斗牛。', '十二新作', 'Rock', '中文');
INSERT INTO `musiclist` VALUES (49, '发如雪', '周杰伦', '2018-06-29', '发如雪般的浪漫，飘洒在爱的世界。', '等你下课', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (50, '梦想启动', '周杰伦', '2011-05-18', '梦想启动，追逐未来的光芒。', '跨时代', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (51, '安静', '周杰伦', '2009-05-15', '安静时光，感受心灵的宁静。', '我很忙', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (52, '迷迭香', '周杰伦', '2004-07-19', '迷迭香的芬芳，回忆中的味道。', '七里香', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (53, '给我一首歌的时间', '周杰伦', '2012-12-28', '给我一首歌的时间，表达心中情感。', '十二新作', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (54, '火车叨位去', '周杰伦', '2009-05-15', '坐上火车，远离城市的喧嚣。', '我很忙', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (55, '大灌篮', '周杰伦', '2002-07-30', '大灌篮的激情，追逐梦想的旋律。', '范特西', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (56, '算什么男人', '周杰伦', '2007-08-03', '自嘲的幽默，自信的态度。', '依然范特西', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (57, '千里之外', '周杰伦', '2010-05-18', '千里之外，思念的距离。', '魔杰座', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (58, '甜甜的', '周杰伦', '2000-11-07', '甜蜜的爱情，如同糖果般美好。', 'Jay', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (59, '超人不会飞', '周杰伦', '2008-11-05', '超越困境，超人的力量。', '魔杰座', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (60, '不得了', '周杰伦', '2013-12-27', '不得了的音乐魅力，震撼心灵。', '哎呦，不错哦', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (61, '东风破', '周杰伦', '2016-01-14', '东风带着思念的味道。', '周杰伦的床边故事', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (62, '听妈妈的话', '周杰伦', '2003-09-23', '关于家庭的温馨回忆。', '叶惠美', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (63, '双节棍', '周杰伦', '2003-09-23', '双节棍的力量，努力拼搏。', '叶惠美', 'Rock', '中文');
INSERT INTO `musiclist` VALUES (64, '青春株式会社', '周杰伦', '2018-06-29', '青春的激情，一起加入株式会社。', '等你下课', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (65, '龙拳', '周杰伦', '2008-11-05', '龙拳的力量，挥洒热血。', '魔杰座', 'Hiphop', '中文');
INSERT INTO `musiclist` VALUES (66, '威廉古堡', '周杰伦', '2004-07-19', '威廉古堡的神秘，藏匿爱的宝藏。', '七里香', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (67, '逆鳞', '周杰伦', '2011-05-18', '逆鳞的坚持，追寻真爱。', '跨时代', 'Rock', '中文');
INSERT INTO `musiclist` VALUES (68, '给我一首歌的时间', '周杰伦', '2006-11-03', '给我一首歌的时间，表达心声。', '十二新作', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (69, '说好的幸福呢', '周杰伦', '2008-11-05', '说好的幸福呢，是否还在。', '魔杰座', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (70, '星晴', '周杰伦', '2000-11-07', '星晴的浪漫，追求爱情的勇气。', 'Jay', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (71, '悲伤橙', '周杰伦', '2011-05-18', '悲伤橙的色彩，表达心底的哀伤。', '跨时代', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (72, '傻笑', '周杰伦', '2006-11-03', '傻笑的幸福，简单而美好。', '十二新作', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (73, '听妈妈的话', '周杰伦', '2014-11-21', '听妈妈的话，踏上人生的道路。', '周杰伦的床边故事', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (74, '借口', '周杰伦', '2002-07-30', '借口的辩解，情感的交锋。', '范特西', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (75, '时光机', '周杰伦', '2018-06-29', '时光机的魔法，穿越回美好的瞬间。', '等你下课', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (76, '超时空要爱', '周杰伦', '2011-05-18', '超越时空的爱情，永不止息。', '跨时代', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (77, '黑色幽默', '周杰伦', '2002-07-30', '黑色幽默，感受生活的荒诞。', '范特西', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (78, '手写的从前', '周杰伦', '2003-09-23', '手写的从前，沉淀美好回忆。', '叶惠美', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (79, '浪漫手机', '周杰伦', '2006-11-03', '浪漫手机，传递心中的情感。', '十二新作', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (80, '听见下雨的声音', '周杰伦', '2011-05-18', '听见下雨的声音，感悟人生的沧桑。', '跨时代', 'Ballad', '中文');
INSERT INTO `musiclist` VALUES (83, '兰亭序', '周杰伦', '2024-02-22', '我测试一下', '魔杰座', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (84, '兰亭序', '周杰伦', '2024-02-22', '我在测试上传功能', '魔杰座', 'Pop', '中文');
INSERT INTO `musiclist` VALUES (85, '兰亭序', '周杰伦', '2024-02-22', '测试', '魔杰座', 'Pop', '中文');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `imgname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (9, '123456', '1418089946@qq.com', '123456', '80f89b9a-db34-4ca4-9900-06ac4c253631-Jay.png');

SET FOREIGN_KEY_CHECKS = 1;
