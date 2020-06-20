-- -------------------------------------------------------------
-- TablePlus 3.6.1(320)
--
-- https://tableplus.com/
--
-- Database: raidboss
-- Generation Time: 2020-06-20 18:20:44.7180
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `active_boss_parameters`;
CREATE TABLE `active_boss_parameters` (
  `doc` json DEFAULT NULL,
  `_id` varbinary(32) GENERATED ALWAYS AS (json_unquote(json_extract(`doc`,_utf8mb4'$._id'))) STORED NOT NULL,
  `_json_schema` json GENERATED ALWAYS AS (_utf8mb4'{"type":"object"}') VIRTUAL,
  PRIMARY KEY (`_id`),
  CONSTRAINT `active_boss_parameters_chk_1` CHECK (json_schema_valid(`_json_schema`,`doc`)) /*!80016 NOT ENFORCED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `boss_parameters`;
CREATE TABLE `boss_parameters` (
  `doc` json DEFAULT NULL,
  `_id` varbinary(32) GENERATED ALWAYS AS (json_unquote(json_extract(`doc`,_utf8mb4'$._id'))) STORED NOT NULL,
  `_json_schema` json GENERATED ALWAYS AS (_utf8mb4'{"type":"object"}') VIRTUAL,
  PRIMARY KEY (`_id`),
  CONSTRAINT `boss_parameters_chk_1` CHECK (json_schema_valid(`_json_schema`,`doc`)) /*!80016 NOT ENFORCED */
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `bosses`;
CREATE TABLE `bosses` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `damage_logs`;
CREATE TABLE `damage_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `player_id` bigint unsigned NOT NULL,
  `play_log_id` bigint unsigned NOT NULL,
  `boss_id` bigint unsigned NOT NULL,
  `damage` bigint unsigned NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `play_log_id` (`play_log_id`),
  KEY `boss_id` (`boss_id`),
  KEY `player_id` (`player_id`),
  CONSTRAINT `damage_logs_ibfk_1` FOREIGN KEY (`play_log_id`) REFERENCES `play_logs` (`id`),
  CONSTRAINT `damage_logs_ibfk_2` FOREIGN KEY (`boss_id`) REFERENCES `bosses` (`id`),
  CONSTRAINT `damage_logs_ibfk_3` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `partner_skill_types`;
CREATE TABLE `partner_skill_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `partner_types`;
CREATE TABLE `partner_types` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `partners`;
CREATE TABLE `partners` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `en_name` varchar(255) NOT NULL,
  `type` bigint unsigned NOT NULL,
  `skill_type` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `type` (`type`),
  KEY `skill_type` (`skill_type`),
  CONSTRAINT `partners_ibfk_1` FOREIGN KEY (`type`) REFERENCES `partner_types` (`id`),
  CONSTRAINT `partners_ibfk_2` FOREIGN KEY (`skill_type`) REFERENCES `partner_skill_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP VIEW IF EXISTS `partners_metadata`;


DROP TABLE IF EXISTS `play_logs`;
CREATE TABLE `play_logs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `player_id` bigint unsigned NOT NULL,
  `boss_id` bigint unsigned NOT NULL,
  `partner_id` bigint unsigned NOT NULL,
  `score` bigint unsigned NOT NULL,
  `health` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `player_id` (`player_id`),
  KEY `boss_id` (`boss_id`),
  CONSTRAINT `play_logs_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`),
  CONSTRAINT `play_logs_ibfk_2` FOREIGN KEY (`boss_id`) REFERENCES `bosses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `players`;
CREATE TABLE `players` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `_id` varbinary(32) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `song_packs`;
CREATE TABLE `song_packs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `en_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `song_sides`;
CREATE TABLE `song_sides` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `en_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `en_name` varchar(255) NOT NULL,
  `side` bigint unsigned NOT NULL,
  `pack` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `side` (`side`),
  KEY `pack` (`pack`),
  CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`side`) REFERENCES `song_sides` (`id`),
  CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`pack`) REFERENCES `song_packs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP VIEW IF EXISTS `songs_metadata`;


INSERT INTO `active_boss_parameters` (`doc`, `_id`) VALUES
('{\"_id\": \"00005edcd1980000000000000004\", \"name\": \"simpleboss\", \"health\": 10000, \"shield\": 9200000, \"weakness\": [], \"resistance\": [], \"greater_weakness\": [], \"greater_resistance\": []}', '00005edcd1980000000000000004');

INSERT INTO `boss_parameters` (`doc`, `_id`) VALUES
('{\"_id\": \"00005edcd1980000000000000004\", \"name\": \"simpleboss\", \"health\": 10000, \"shield\": 9200000, \"weakness\": [], \"resistance\": [], \"greater_weakness\": [], \"greater_resistance\": []}', '00005edcd1980000000000000004');

INSERT INTO `bosses` (`id`, `_id`, `name`, `is_active`) VALUES
('1', '00005edcd1980000000000000004', 'simpleboss', '1');

INSERT INTO `partner_skill_types` (`id`, `name`) VALUES
('1', 'Support'),
('2', 'High Support'),
('3', 'Attack'),
('4', 'High Attack'),
('5', 'Hybrid');

INSERT INTO `partner_types` (`id`, `name`) VALUES
('1', 'Support'),
('2', 'Balance'),
('3', 'Challenge'),
('4', '???');

INSERT INTO `partners` (`id`, `name`, `en_name`, `type`, `skill_type`) VALUES
('1', 'hikari', 'Hikari', '1', '1'),
('2', 'tairitsu', 'Tairitsu', '2', '3'),
('3', 'kou', 'Kou', '2', '3'),
('4', 'sapphire', 'Sapphire', '2', '3'),
('5', 'lethe', 'Lethe', '2', '5'),
('6', 'axium_tairitsu', 'Axium Tairitsu', '2', '3'),
('7', 'gl_tairitsu', 'Grievous Lady Tairitsu', '3', '4'),
('8', 'stella', 'Stella', '1', '1'),
('9', 'hikari_fisica', 'Hikari & Fisica', '1', '5'),
('10', 'lilith', 'Lilith', '3', '4'),
('11', 'eto', 'Eto', '2', '1'),
('12', 'luna', 'Luna', '2', '3'),
('13', 'shirabe', 'Shirabe', '3', '1'),
('14', 'zero_hikari', 'Zero Hikari', '3', '4'),
('15', 'fracture_hikari', 'Fracture Hikari', '4', '2'),
('16', 'summer_hikari', 'Summer Hikari', '1', '3'),
('17', 'summer_tairitsu', 'Summer Tairitsu', '2', '3'),
('18', 'tairitsu_trin', 'Tairitsu & Trin', '2', '3'),
('19', 'ayu', 'Ayu', '2', '4'),
('20', 'eto_luna', 'Eto & Luna', '1', '1'),
('21', 'hikary_seine', 'Hikari & Seine', '2', '1'),
('22', 'yume', 'Yume', '2', '1'),
('23', 'saya', 'Saya', '2', '3'),
('24', 'gl_tairitsu_chuni_penguin', 'Grievous Lady Tairistu & Chuni Penguin', '2', '3'),
('25', 'chuni_penguin', 'Chuni Penguin', '2', '1'),
('26', 'haruna', 'Haruna Mishima', '2', '1'),
('27', 'nono', 'Nono Shibusawa', '2', '2'),
('28', 'pandora', 'MTA-XXX Pandora Nemesis', '3', '3'),
('29', 'regulus', 'MDA-21 Regulus', '3', '3'),
('30', 'kanae', 'Kanae', '2', '3'),
('31', 'fantasia_hikari', 'Fantasia Hikari', '2', '1'),
('32', 'sonata_hikari', 'Sonata Tairitsu', '2', '3'),
('33', 'sia', 'Sia', '2', '5'),
('34', 'doroc', 'DORO*C', '2', '1'),
('35', 'tempest_tairitsu', 'Tempest Tairitsu', '3', '5');

INSERT INTO `song_packs` (`id`, `name`, `en_name`) VALUES
('1', 'memory_archive', 'Memory Archive'),
('2', 'arcaea', 'Arcaea'),
('3', 'eternal_core', 'Eternal Core'),
('4', 'vicious_labyrinth', 'Vicious Labyrinth'),
('5', 'luminous_sky', 'Luminous Sky'),
('6', 'adverse_prelude', 'Adverse Prelude'),
('7', 'black_fate', 'Black Fate'),
('8', 'crimson_solace', 'Crimson Solace'),
('9', 'ambivalen_vision', 'Ambivalent Vision'),
('10', 'binary_enfold', 'Binary Enfold'),
('11', 'absolute_reason', 'Absolute Reason'),
('12', 'sunset_radiance', 'Sunset Radiance'),
('13', 'dynamix', 'Dynamix Collaboration'),
('14', 'lanota', 'Lanota Collaboration'),
('15', 'tone_sphere', 'Tone Sphere Collaboration'),
('16', 'groove_coaster', 'Groove Coaster Collaboration'),
('17', 'chunithm', 'CHUNITHM Collaboration'),
('18', 'world_extend', 'World Extend');

INSERT INTO `song_sides` (`id`, `name`, `en_name`) VALUES
('1', 'light', 'Light'),
('2', 'conflict', 'Conflict');

INSERT INTO `songs` (`id`, `name`, `en_name`, `side`, `pack`) VALUES
('1', 'sayonarahatsukoi', 'Sayonara Hatsukoi', '1', '2'),
('2', 'lostcivilization', 'Lost Civilization', '2', '2'),
('3', 'goodtek', 'GOODTEK (Arcaea Edit)', '1', '2'),
('4', 'viyella', 'cry of viyella', '2', '3'),
('5', 'rise', 'Rise', '1', '2'),
('6', 'lucifer', 'Lucifer', '2', '2'),
('7', 'fairytale', 'Fairytale', '1', '2'),
('8', 'hearditsaid', 'I\'ve heard it said', '1', '3'),
('9', 'babaroque', 'Babaroque', '1', '2'),
('10', 'memoryfactory', 'memoryfactory.lzh', '1', '3'),
('11', 'snowwhite', 'Snow White', '1', '2'),
('12', 'relentless', 'Relentless', '2', '3'),
('13', 'shadesoflight', 'Shades of Light in a Transcendent Realm', '1', '2'),
('14', 'vexaria', 'Vexaria', '1', '2'),
('15', 'essenceoftwilight', 'Essence of Twilight', '2', '2'),
('16', 'qualia', 'qualia -ideaesthesia-', '2', '2'),
('17', 'pragmatism', 'PRAGMATISM', '1', '3'),
('18', 'sheriruth', 'Sheriruth', '2', '3'),
('19', 'lumia', 'Lumia', '1', '3'),
('20', 'dement', 'Dement ~after legend~', '2', '2'),
('21', 'dandelion', 'Dandelion', '1', '2'),
('22', 'anokumene', 'Anökumene', '2', '2'),
('23', 'infinityheaven', 'Infinity Heaven', '1', '2'),
('24', 'partyvinyl', 'Party Vinyl', '1', '8'),
('25', 'flashback', 'Flashback', '1', '8'),
('26', 'flyburg', 'Flyburg and Endroll', '1', '8'),
('27', 'nirvluce', 'Nirv lucE', '1', '8'),
('28', 'paradise', 'Paradise', '1', '8'),
('29', 'brandnewworld', 'Brand new world', '1', '2'),
('30', 'dataerror', 'DataErr0r', '2', '1'),
('31', 'crosssoul', 'CROSS†SOUL', '2', '1'),
('32', 'yourvoiceso', 'Your voice so... feat. Such', '1', '1'),
('33', 'chronostasis', 'Chronostasis', '2', '2'),
('34', 'kanagawa', 'Kanagawa Cyber Culvert', '1', '2'),
('35', 'moonlightofsandcastle', 'Moonlight of Sand Castle', '1', '13'),
('36', 'reconstruction', 'REconstruction', '1', '13'),
('37', 'evoltex', 'Evoltex (poppi\'n mix)', '1', '13'),
('38', 'oracle', 'Oracle', '2', '13'),
('39', 'aterlbus', 'αterlβus', '2', '13'),
('40', 'clotho', 'Clotho and the stargazer', '1', '2'),
('41', 'impurebird', 'Impure Bird', '1', '1'),
('42', 'ignotus', 'Ignotus', '2', '2'),
('43', 'lethaeus', 'Lethaeus', '2', '9'),
('44', 'romancewars', 'Romance Wars', '1', '9'),
('45', 'blossoms', 'Blossoms', '1', '9'),
('46', 'moonheart', 'Moonheart', '1', '9'),
('47', 'genesis', 'Genesis', '2', '9'),
('48', 'harutopia', 'Harutopia ~Utopia of Spring~', '1', '2'),
('49', 'auxesia', 'Auxesia', '1', '1'),
('50', 'rabbitintheblackroom', 'Rabbit In The Black Room', '2', '2'),
('51', 'modelista', 'Modelista', '1', '1'),
('52', 'soundwitch', 'SOUNDWiTCH', '2', '4'),
('53', 'trappola', 'trappola bewitching', '2', '4'),
('54', 'iconoclast', 'Iconoclast', '2', '4'),
('55', 'conflict', 'conflict', '2', '4'),
('56', 'axiumcrisis', 'Axium Crisis', '2', '4'),
('57', 'grievouslady', 'Grievous Lady', '2', '4'),
('58', 'dreaminattraction', 'Dreamin\' Attraction!!', '1', '2'),
('59', 'redandblue', 'Red and Blue', '2', '2'),
('60', 'onelastdrive', 'One Last Drive', '1', '2'),
('61', 'surrender', 'Surrender', '1', '1'),
('62', 'yozakurafubuki', 'Yosakura Fubuki', '1', '1'),
('63', 'cyanine', 'cyanine', '2', '14'),
('64', 'dreamgoeson', 'Dream goes on', '1', '14'),
('65', 'journey', 'Journey', '1', '14'),
('66', 'specta', 'Specta', '1', '14'),
('67', 'quon', 'Quon', '1', '14'),
('68', 'syro', 'Syro', '1', '2'),
('69', 'reinvent', 'Reinvent', '1', '2'),
('70', 'silentrush', 'Silent Rush', '2', '10'),
('71', 'singularity', 'Singularity', '2', '10'),
('72', 'memoryforest', 'Memory Forest', '1', '10'),
('73', 'strongholds', 'Strongholds', '2', '10'),
('74', 'nexttoyou', 'next to you', '1', '10'),
('75', 'metallicpunisher', 'Metallic Punisher', '2', '1'),
('76', 'blaster', 'Blaster', '2', '2'),
('77', 'guardina', 'γuarδina', '1', '1'),
('78', 'carminescythe', 'carmine:scythe', '2', '1'),
('79', 'bethere', 'Be There', '1', '1'),
('80', 'cyberneciacatharsis', 'Cybernecia Catharsis', '2', '2'),
('81', 'callmyname', 'Call My Name feat. Yukacco', '1', '1'),
('82', 'inkarusi', 'inkar-usi', '1', '2'),
('83', 'mazenine', 'Maze No.9', '1', '5'),
('84', 'themessage', 'The Message', '1', '5'),
('85', 'sulfur', 'Sulfur', '1', '5'),
('86', 'halcyon', 'Halcyon', '1', '5'),
('87', 'etherstrike', 'Ether Strike', '1', '5'),
('88', 'fractureray', 'Fracture Ray', '1', '5'),
('89', 'suomi', 'Suomi', '1', '2'),
('90', 'bookmaker', 'Bookmaker (2D Version)', '2', '2'),
('91', 'darakunosono', 'Illegal Paradise', '2', '2'),
('92', 'dropdead', 'dropdead', '2', '1'),
('93', 'fallensquare', 'Fallensquare', '2', '1'),
('94', 'nhelv', 'Nhelv', '2', '2'),
('95', 'espebranch', 'LunarOrbit -believe in the Espebranch road-', '2', '2'),
('96', 'purgatorium', 'Purgatorium', '2', '2'),
('97', 'hikari', 'Hikari', '2', '15'),
('98', 'stager', 'STAGER (ALL STAGE CLEAR)', '1', '15'),
('99', 'hallofmirrors', 'Hall of Mirrors', '2', '15'),
('100', 'linearaccelerator', 'Linear Accelerator', '1', '15'),
('101', 'tiferet', 'Tiferet', '2', '15'),
('102', 'alexandrite', 'Alexandrite', '2', '1'),
('103', 'rugie', 'Rugie', '2', '2'),
('104', 'astraltale', 'Astral tale', '2', '1'),
('105', 'phantasia', 'Phantasia', '1', '1'),
('106', 'empireofwinter', 'Empire of Winter', '1', '1'),
('107', 'merlin', 'MERLIN', '1', '16'),
('108', 'dxfullmetal', 'DX Choseinou Full Metal Shojo', '1', '16'),
('109', 'omakeno', 'OMAKENO Stroke', '2', '16'),
('110', 'scarletlance', 'Scarlet Lance', '1', '16'),
('111', 'ouroboros', 'ouroboros -twin stroke of the end-', '2', '16'),
('112', 'libertas', 'Libertas', '1', '1'),
('113', 'solitarydream', 'Solitary Dream', '1', '3'),
('114', 'antithese', 'Antithese', '2', '11'),
('115', 'corruption', 'Corruption', '2', '11'),
('116', 'blackterritory', 'Black Territory', '2', '11'),
('117', 'viciousheroism', 'Vicious Heroism', '2', '11'),
('118', 'cyaegha', 'Cyaegha', '2', '11'),
('119', 'revixy', 'ReviXy', '2', '2'),
('120', 'grimheart', 'Grimheart', '1', '2'),
('121', 'vector', 'VECTOЯ', '2', '2'),
('122', 'supernova', 'SUPERNOVA', '2', '2'),
('123', 'dottodot', 'Dot to Dot feat. shully', '1', '1'),
('124', 'garakuta', 'Garakuta Doll Play', '2', '17'),
('125', 'ikazuchi', 'Ikazuchi', '2', '17'),
('126', 'worldvanquisher', 'World Vanquisher', '1', '17'),
('127', 'dreadnought', 'Dreadnought', '2', '1'),
('128', 'particlearts', 'Particle Arts', '2', '6'),
('129', 'vindication', 'Vindication', '1', '6'),
('130', 'heavensdoor', 'Heavensdoor', '2', '6'),
('131', 'ringedgenesis', 'Ringed Genesis', '1', '6'),
('132', 'chelsea', 'Chelsea', '1', '12'),
('133', 'aiueoon', 'AI[UE]OON', '1', '12'),
('134', 'melodyoflove', 'A Wandering Melody of Love', '1', '12'),
('135', 'tiemedowngently', 'Tie me down gently', '2', '12'),
('136', 'valhallazero', 'Valhalla:0', '2', '12'),
('137', 'mirzam', 'Mirzam', '2', '1'),
('138', 'diode', 'Diode', '1', '2'),
('139', 'freefall', 'FREEF4LL', '2', '2'),
('140', 'gloryroad', 'GLORY : ROAD', '1', '8'),
('141', 'monochromeprincess', 'Monochrome Princess', '2', '2'),
('142', 'heavenlycaress', 'Heavenly caress', '1', '1'),
('143', 'senkyou', 'Senkyou', '1', '2'),
('144', 'filament', 'Filament', '1', '1'),
('145', 'avantraze', 'Avant Raze', '2', '1'),
('146', 'battlenoone', 'BATTLE NO.1', '2', '1'),
('147', 'laqryma', 'La\'qryma of the Wasteland', '2', '1'),
('148', 'einherjar', 'Einherjar Joker', '2', '1'),
('149', 'izana', 'IZANA', '1', '1'),
('150', 'saikyostronger', 'SAIKYO STRONGER', '2', '1'),
('151', 'worldexecuteme', 'world.execute(me);', '1', '2'),
('152', 'blrink', 'BLRINK', '2', '6'),
('153', 'oblivia', 'Oblivia', '1', '2'),
('154', 'amygdata', 'amygdata', '2', '1'),
('155', 'corpssansorganes', 'corps-sans-organes', '2', '9'),
('156', 'equilibrium', 'Equilibrium', '1', '7'),
('157', 'antagonism', 'Antagonism', '2', '7'),
('158', 'lostdesire', 'Lost Desire', '2', '7'),
('159', 'dantalion', 'Dantalion', '2', '7'),
('160', 'ifi', '#1f1e33', '2', '7'),
('161', 'tempestissimo', 'Tempestissimo', '2', '7'),
('162', 'arcahv', 'Arcahv', '1', '7'),
('163', 'altale', 'Altale', '1', '1'),
('164', 'givemeanightmare', 'Give Me a Nightmare', '2', '18'),
('165', 'blacklotus', 'Black Lotus', '2', '18'),
('166', 'gekka', 'Gekka (Short Version)', '1', '18'),
('167', 'vividtheory', 'Vivid Theory', '1', '18'),
('168', 'onefr', '1F√', '1', '18');

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `partners_metadata` AS select `p`.`id` AS `id`,`p`.`name` AS `name`,`p`.`en_name` AS `en_name`,`pt`.`name` AS `type`,`pst`.`name` AS `skill_type` from ((`partners` `p` join `partner_types` `pt` on((`p`.`type` = `pt`.`id`))) join `partner_skill_types` `pst` on((`p`.`skill_type` = `pst`.`id`)));
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `songs_metadata` AS select `s`.`id` AS `id`,`s`.`name` AS `name`,`ss`.`name` AS `side`,`sp`.`name` AS `pack`,`s`.`en_name` AS `en_name`,`ss`.`en_name` AS `en_side`,`sp`.`en_name` AS `en_pack` from ((`songs` `s` join `song_sides` `ss` on((`s`.`side` = `ss`.`id`))) join `song_packs` `sp` on((`s`.`pack` = `sp`.`id`)));


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;