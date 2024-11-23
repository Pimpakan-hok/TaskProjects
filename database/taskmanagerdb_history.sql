-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: taskmanagerdb
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `h_name` varchar(150) NOT NULL,
  `h_date` date NOT NULL,
  `h_priority` varchar(45) NOT NULL,
  `h_des` varchar(250) NOT NULL,
  `h_stage` varchar(45) NOT NULL,
  `task_id` int NOT NULL,
  `h_due_date` date NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `fk_his_id_idx` (`user_id`),
  CONSTRAINT `fk_his_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (49,1,'ดฟฟฟ','2024-05-07','Low','ฟฟหกหฟก','Completed',68,'2024-05-29'),(50,1,'6','2024-05-07','Low','6','Completed',76,'2024-05-29'),(51,1,'bbbb','2024-05-08','Low','เเ','Completed',79,'2024-05-23'),(52,1,'ฟฟ','2024-05-08','Low','ฟฟ','Completed',81,'2024-04-29'),(53,1,'1','2024-05-08','High','1','Completed',71,'2024-05-07'),(54,1,'กกก','2024-05-08','High','กกกก','Completed',80,'2024-05-07'),(55,1,'ฟฟ','2024-05-08','Low','ฟฟฟ','Completed',78,'2024-05-09'),(56,1,'3','2024-05-08','Low','34','Completed',73,'2024-05-07'),(57,1,'a','2024-05-08','Medium','asasa','Completed',86,'2024-05-07'),(58,1,'4','2024-05-08','Medium','4','Completed',74,'2024-05-30'),(59,1,'a','2024-05-08','Medium','ฟฟฟ','Completed',69,'2024-05-23'),(60,1,'a','2024-05-09','Low','ssaฟ','Completed',84,'2024-05-22'),(61,1,'d','2024-05-09','Medium','d','Completed',82,'2024-05-08'),(62,1,'aa','2024-05-09','Medium','a','Completed',83,'2024-05-22'),(63,1,'fau','2024-05-09','Low','bbbb','Completed',85,'2024-05-08'),(64,1,'hh','2024-05-09','Low','hhh','Completed',87,'2024-05-24'),(65,1,'6','2024-05-09','Medium','6','Completed',77,'2024-05-22'),(66,1,'5','2024-05-09','Low','5','Completed',75,'2024-05-21'),(67,1,'gggggggggg','2024-05-09','High','gggg','Completed',88,'2024-05-09'),(68,1,'2','2024-05-09','Medium','2','Completed',72,'2024-05-14'),(69,1,'ggg','2024-05-09','Low','gggggggฟฟ','Completed',89,'2024-05-07'),(70,1,'หหหหหหหหหหหหหหหหหหห','2024-05-09','Medium','หหหหหหห','Completed',90,'2024-05-09'),(71,1,'bbbbbbbbbbbbbbbbbbb','2024-05-09','Medium','b','Completed',91,'2024-06-06'),(72,1,'fffffff','2024-05-09','Medium','ffffffffff','Completed',92,'2024-05-09'),(73,1,'bbbbbbbbbbbbbbddddddddddddd','2024-05-09','Medium','bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbd','Completed',95,'2024-06-05'),(74,1,'กดก','2024-05-09','Medium','กดเกดเกด','Completed',93,'2024-05-25'),(75,1,'กกกกกกกกกก','2024-05-09','Low','กกกกกกกกกกกกกกกกกกก','Completed',94,'2024-05-22'),(76,1,'vv','2024-05-09','Low','vvv','Completed',96,'2024-05-24'),(77,1,'ssssssss','2024-05-09','Low','ssssssssss','Completed',98,'2024-06-06'),(78,1,'dddddddddddddddddd','2024-05-09','Low','saaaaaaaaaaaaaa','Completed',100,'2024-05-22'),(79,1,'dddd','2024-05-09','Low','vvvvvvv','Completed',97,'2024-05-24'),(80,1,'lllkk','2024-05-09','Medium','kkkkk','Completed',102,'2024-06-06'),(81,1,'ฟฟฟหก','2024-05-09','Low','หฟกหฟกหฟกฟหก','Completed',103,'2024-05-31'),(82,1,'aaa','2024-05-09','Medium','bbb','Completed',101,'2024-05-30'),(83,1,'ิืะั่ะั้ะ้','2024-05-09','Medium','ดเ้ดเ้ด','Completed',105,'2024-05-19'),(84,1,'ssssssssss','2024-05-09','Medium','ssssssssssssssss','Completed',99,'2024-05-30'),(85,1,'หกหก','2024-05-09','Low','ฟหกหฟฟหก','Completed',104,'2024-05-24'),(86,1,'dasdsadsa','2024-05-09','Medium','sadsadsa','Completed',106,'2024-05-29'),(87,1,'เเเเเเเ','2024-05-09','Low','เกพเกเก','Completed',108,'2024-05-30'),(88,1,'ฟกฟหก','2024-05-09','Low','ฟหกฟหกฟหก','Completed',107,'2024-05-30'),(89,1,'safsafsaf','2024-05-09','Medium','asfasfsafas','Completed',109,'2024-05-31'),(90,1,'safasfas','2024-05-09','Low','afsafasfsafas','Completed',110,'2024-06-07'),(91,1,'asfasfasf','2024-05-09','Medium','asfsafasas','Completed',111,'2024-05-31'),(92,1,'hhytttttttttttt','2024-05-12','Low','adasg','Completed',112,'2024-05-09');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-23 16:36:43
