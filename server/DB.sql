-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ims
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `sr_no` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`sr_no`),
  UNIQUE KEY `Sr_no_UNIQUE` (`sr_no`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (4,'dummy user','dummy.user@mitwpu.edu.in','dummy@123');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Google','on'),(2,'Microsoft','off'),(3,'Amazon','on'),(4,'Facebook','off'),(5,'Tesla','on'),(6,'Wipro','off'),(7,'Capgemini','on'),(8,'Oracle','off'),(9,'IBM','on'),(10,'TCS','off');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_participation`
--

DROP TABLE IF EXISTS `company_participation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_participation` (
  `participation_id` int NOT NULL AUTO_INCREMENT,
  `company_id` varchar(45) NOT NULL,
  `year` varchar(45) NOT NULL,
  `semester` varchar(45) NOT NULL,
  PRIMARY KEY (`participation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_participation`
--

LOCK TABLES `company_participation` WRITE;
/*!40000 ALTER TABLE `company_participation` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_participation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_supervisor`
--

DROP TABLE IF EXISTS `company_supervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_supervisor` (
  `sup_id` int NOT NULL AUTO_INCREMENT,
  `sup_name` varchar(100) DEFAULT NULL,
  `sup_contact` varchar(45) DEFAULT NULL,
  `sup_email` varchar(100) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sup_id`),
  UNIQUE KEY `sup_contact_UNIQUE` (`sup_contact`),
  UNIQUE KEY `sup_email_UNIQUE` (`sup_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_supervisor`
--

LOCK TABLES `company_supervisor` WRITE;
/*!40000 ALTER TABLE `company_supervisor` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_supervisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dept_id` int NOT NULL AUTO_INCREMENT,
  `department` varchar(100) NOT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'CSE'),(2,'CSBS'),(3,'AIDS'),(4,'CSF');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_supervisor`
--

DROP TABLE IF EXISTS `school_supervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_supervisor` (
  `sup_id` int NOT NULL,
  `sup_name` varchar(100) DEFAULT NULL,
  `sup_contact` varchar(45) DEFAULT NULL,
  `sup_email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`sup_id`),
  UNIQUE KEY `sup_email_UNIQUE` (`sup_email`),
  UNIQUE KEY `sup_contact_UNIQUE` (`sup_contact`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_supervisor`
--

LOCK TABLES `school_supervisor` WRITE;
/*!40000 ALTER TABLE `school_supervisor` DISABLE KEYS */;
/*!40000 ALTER TABLE `school_supervisor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `PRN` int NOT NULL,
  `First_name` varchar(100) NOT NULL,
  `Middle_name` varchar(100) NOT NULL,
  `Last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `year` varchar(45) NOT NULL,
  `semester` varchar(45) NOT NULL,
  `dept_id` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `stipend` varchar(45) DEFAULT NULL,
  `company_sup` varchar(45) DEFAULT NULL,
  `school_sup` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`PRN`),
  UNIQUE KEY `PRN_UNIQUE` (`PRN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1001,'Aarav','Rajesh','Sharma','aarav.sharma@example.com','9876543210','2024','6','1','on','Google','50000','Mr. Verma','Dr. Kapoor'),(1002,'Ishita','Amit','Gupta','ishita.gupta@example.com','9876543211','2023','6','1','off','Microsoft','60000','Ms. Nair','Dr. Mehta'),(1003,'Kunal','Suresh','Patil','kunal.patil@example.com','9876543212','2024','7','2','on','Google','55000','Mr. Verma','Dr. Kapoor'),(1004,'Neha','Manoj','Reddy','neha.reddy@example.com','9876543213','2023','6','2','off','Microsoft','58000','Ms. Nair','Dr. Mehta'),(1005,'Rohan','Kumar','Singh','rohan.singh@example.com','9876543214','2024','6','3','on','Amazon','60000','Mr. Das','Dr. Sharma'),(1006,'Pooja','Sunil','Yadav','pooja.yadav@example.com','9876543215','2023','7','3','off','Facebook','40000','Ms. Iyer','Dr. Banerjee'),(1007,'Siddharth','Raj','Choudhary','siddharth.choudhary@example.com','9876543216','2024','6','4','on','Tesla','45000','Mr. Rao','Dr. Joshi'),(1008,'Meera','Ashok','Bhat','meera.bhat@example.com','9876543217','2023','6','4','off','Wipro','42000','Ms. Menon','Dr. Ghosh'),(1009,'Arjun','Ramesh','Naik','arjun.naik@example.com','9876543218','2024','6','1','on','Amazon','51000','Mr. Das','Dr. Sharma'),(1010,'Sanya','Vinod','Malhotra','sanya.malhotra@example.com','9876543219','2023','7','2','off','Facebook','0','Ms. Iyer','Dr. Banerjee'),(1011,'Raj','Deepak','Tiwari','raj.tiwari@example.com','9876543220','2024','6','3','on','Google','52000','Mr. Verma','Dr. Kapoor'),(1012,'Anjali','Nitin','Shukla','anjali.shukla@example.com','9876543221','2023','7','4','off','Microsoft','61000','Ms. Nair','Dr. Mehta'),(1013,'Prateek','Kumar','Jain','prateek.jain@example.com','9876543222','2024','6','1','on','Amazon','54000','Mr. Das','Dr. Sharma'),(1014,'Simran','Ravi','Verma','simran.verma@example.com','9876543223','2023','7','2','off','Facebook','60000','Ms. Iyer','Dr. Banerjee'),(1015,'Manish','Dinesh','Joshi','manish.joshi@example.com','9876543224','2024','6','3','on','Tesla','49000','Mr. Rao','Dr. Joshi'),(1016,'Divya','Sunil','Desai','divya.desai@example.com','9876543225','2023','7','4','off','Wipro','47000','Ms. Menon','Dr. Ghosh'),(1017,'Rahul','Amit','Mishra','rahul.mishra@example.com','9876543226','2024','6','1','on','Capgemini','48000','Mr. Rathi','Dr. Nanda'),(1018,'Ananya','Sanjay','Mishra','ananya.mishra@example.com','9876543227','2023','7','2','off','Oracle','55000','Ms. Chandra','Dr. Desai'),(1019,'Vivek','Nitin','Kumar','vivek.kumar@example.com','9876543228','2024','6','3','on','Capgemini','42000','Mr. Rathi','Dr. Nanda'),(1020,'Aisha','Rajesh','Deshmukh','aisha.deshmukh@example.com','9876543229','2023','7','4','off','Oracle','53000','Ms. Chandra','Dr. Desai');
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-17  2:25:23
