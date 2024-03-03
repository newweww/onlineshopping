/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 8.0.36 : Database - skdb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`skdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `skdb`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `admin` */

insert  into `admin`(`emp_id`,`email`,`password`) values 
(1,'admin@gmail.com','admin'),
(7,'admin2@gmail.com','admin');

/*Table structure for table `cart` */

DROP TABLE IF EXISTS `cart`;

CREATE TABLE `cart` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  KEY `product_id` (`product_id`),
  KEY `cart_FK` (`customer_id`),
  CONSTRAINT `cart_FK` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=163 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `cart` */

insert  into `cart`(`item_id`,`name`,`price`,`quantity`,`total_price`,`image`,`product_id`,`customer_id`) values 
(161,'the iliad',800,1,800,'image_1709315737063.jpg',17,17),
(162,'Autumn',700,1,700,'image_1709316019720.jpg',21,17);

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `category` */

insert  into `category`(`category_id`,`category_name`) values 
(1,'Novel'),
(2,'Cartoon'),
(3,'Cooking'),
(4,'Programming');

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `customer` */

insert  into `customer`(`customer_id`,`name`,`lastname`,`phone`,`address`,`email`,`password`,`image`) values 
(17,'Nattanan','Saingthong','+66822989911','567 หมู่ 3 ตำบล สระยายโสม','user@gmail.com','user','image_1709209649134.jpg'),
(18,'Nattanan','Saingthong','+66822989911','567 หมู่ 3 ตำบล สระยายโสม','user2@gmail.com','user','image_1709211109577.jpg');

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `employee` */

insert  into `employee`(`emp_id`,`name`,`lastname`,`email`,`password`,`salary`,`image`) values 
(1,'Nattanan','Saingthon','admin@gmail.com','admin',85000,'image_1709356306332.jpg'),
(8,'Scooby','doo','admin2@gmail.com','admin',25000,'image_1709357069056.png');

/*Table structure for table `login` */

DROP TABLE IF EXISTS `login`;

CREATE TABLE `login` (
  `login_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`login_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `login` */

insert  into `login`(`login_id`,`email`,`password`) values 
(10,'user@gmail.com','user'),
(11,'user2@gmail.com','user');

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `dates` date DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `orders` */

insert  into `orders`(`order_id`,`customer_id`,`total_price`,`dates`) values 
(39,17,3150,'2024-03-01'),
(40,18,2772,'2024-03-02');

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `image` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `product` */

insert  into `product`(`product_id`,`name`,`price`,`stock`,`category_id`,`image`) values 
(17,'the iliad',800,20,1,'image_1709315737063.jpg'),
(18,'Little Man',400,100,1,'image_1709315926687.jpg'),
(19,'ON THE ROAD',850,50,1,'image_1709315966259.jpg'),
(20,'มหาศึกแห่งดูน',450,95,1,'image_1709316007574.jpeg'),
(21,'Autumn',700,95,1,'image_1709316019720.jpg'),
(22,'THE SPANISH BRIDEGROOM',700,50,1,'image_1709316126130.jpg'),
(23,'THE MICHELIN GUIDE THAILAND 2023',650,200,3,'image_1709316398665.jpg'),
(24,'MY CHEFS ',300,200,3,'image_1709316463582.jpg'),
(25,'MY LITTLE KITCHEN',210,210,3,'image_1709316492470.jpg'),
(26,'ชาไข่มุก เครื่องดื่มยอดฮิต',129,400,3,'image_1709316521511.jpg'),
(27,'ไก่ทอดเกาหลี',250,230,3,'image_1709316559566.jpg'),
(28,'ตำรับอาหารไทย',420,150,3,'image_1709316610901.jpg'),
(29,'การเขียนโปรแกรมด้วย Golang',229,115,4,'image_1709317054699.jpg'),
(30,' การเขียนโปรแกรม Java และ Android',340,0,4,'image_1709317146763.jpg'),
(31,'คัมภีร์ภาษา C ฉบับสมบูรณ์',365,124,4,'image_1709317168963.jpg'),
(32,'จัดการและวิเคราะห์ข้อมูลด้วย Python Data Science',320,49,4,'image_1709317193797.jpg'),
(33,'ออกแบบ และสร้าง Website ฉบับสมบูรณ์',259,214,4,'image_1709317224958.png'),
(34,'พัฒนา Web Application ด้วย PHP และ MariaDB',380,250,4,'image_1709317255941.jpg'),
(35,'STAYGOLD',108,300,2,'image_1709317599941.jpg'),
(36,'Color Recipe',166,415,2,'image_1709317630928.jpg'),
(37,'WIND BREAKER',148,270,2,'image_1709317655016.jpg'),
(38,'จาง!! สายเลือดกระทะเหล็ก ',130,268,2,'image_1709317679723.jpg'),
(39,'มหาศึกคนชนเทพ',130,410,2,'image_1709317700578.jpg'),
(40,'ยอดไก่นักสู้กู้โลก',130,223,2,'image_1709317727729.jpg');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
