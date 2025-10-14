-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: micodat
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'admin','$2y$10$MjigUJYDcCkfn0Sb33MDueC6X4GIzxF/fXmzru56iXk31mULEPOpO'),(6,'editor','$2y$10$AzZVqHHrD2Tjmyxc/l0g6.GOwBhLbaqQvzhIu4CbDiG/L14poRY7S');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial`
--

DROP TABLE IF EXISTS `historial`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial` (
  `id_historial` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_hongo` int(10) unsigned NOT NULL,
  `id_usuario` int(10) unsigned DEFAULT NULL,
  `accion` enum('crear','editar','eliminar') NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_historial`),
  KEY `id_hongo` (`id_hongo`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_hongo`) REFERENCES `hongos` (`id_hongo`) ON DELETE CASCADE,
  CONSTRAINT `historial_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial`
--

LOCK TABLES `historial` WRITE;
/*!40000 ALTER TABLE `historial` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hongos`
--

DROP TABLE IF EXISTS `hongos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hongos` (
  `id_hongo` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre_es` varchar(255) NOT NULL,
  `nombre_nah` varchar(255) DEFAULT NULL,
  `descripcion_es` text DEFAULT NULL,
  `descripcion_nah` text DEFAULT NULL,
  `usos` text DEFAULT NULL,
  `tecnicas_recoleccion` text DEFAULT NULL,
  `cultivo` text DEFAULT NULL,
  `conservacion` text DEFAULT NULL,
  `ritualidad` text DEFAULT NULL,
  `significado_local` text DEFAULT NULL,
  `comestible` varchar(3) NOT NULL DEFAULT 'No',
  `imagen` longblob DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo` varchar(1) NOT NULL DEFAULT '0',
  `actualizado_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_hongo`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hongos`
--

LOCK TABLES `hongos` WRITE;
/*!40000 ALTER TABLE `hongos` DISABLE KEYS */;
INSERT INTO `hongos` VALUES (1,'Volvariella bombycina (Volvaria sedosa)',NULL,'Hongo con sombrero convexo a plano al madurar, de color blanco sedoso a crema, con una textura lanosa o sedosa que le da su nombre común. Las láminas son libres, inicialmente blancas y luego rosadas. El pie es blanco, largo y presenta una volva en la base. Puede alcanzar hasta 15 cm de diámetro en el sombrero.',NULL,'Comestible, aunque no tan común como otras especies. Es consumido localmente en algunas regiones, principalmente cuando es joven. Tiene sabor suave y buena textura, pero debe ser correctamente identificado, ya que puede confundirse con especies tóxicas como algunas Amanitas.','Recolectar con cuchillo limpio, asegurándose de extraer también la base para observar la volva, útil en su identificación. Solo consumir si se tiene experiencia o certeza de la especie.','Se puede cultivar, aunque no es tan popular como otras especies comerciales como Pleurotus. Prefiere madera muerta o troncos en descomposición. Su cultivo requiere condiciones de humedad y temperatura adecuadas.','Debe consumirse fresco poco tiempo después de la recolección. Puede deshidratarse, pero pierde parte de su textura. Refrigerar si no se consume de inmediato.','No se le atribuyen usos rituales conocidos en las tradiciones mesoamericanas.','Conocido y recolectado ocasionalmente en algunas zonas rurales. Su apariencia vistosa lo hace llamativo, pero su recolección suele ser limitada por el riesgo de confusión con especies peligrosas.','Sí',NULL,'2025-09-29 04:53:30','1','2025-09-29 05:23:17'),(2,'Pleurotus ostreatus',NULL,'Sombrero en forma de ostra o abanico, color blanco, gris o marrón claro. Láminas decurrentes (bajan por el tallo), blancas. Suele crecer en grupos sobre madera muerta o en descomposición. El tallo es corto o casi inexistente. El sombrero puede medir entre 5 y 25 cm de diámetro.',NULL,'Hongo comestible muy valorado por su sabor y textura. Se utiliza ampliamente en la gastronomía. Rico en proteínas, vitaminas B, minerales y fibra. Además, se estudian sus propiedades medicinales como antioxidante, inmunoestimulante y reductor del colesterol.','Recolectar con cuchillo limpio cortando en la base. Es preferible recolectar ejemplares jóvenes, ya que los maduros pueden volverse fibrosos o amargos.','Es un hongo fácil de cultivar. Se desarrolla bien en sustratos como paja, aserrín o residuos agrícolas. Requiere condiciones controladas de humedad, buena ventilación y temperatura moderada. Produce varias cosechas (oleadas).','Puede conservarse fresco en refrigeración durante varios días. También se puede deshidratar o congelar para almacenarlo por más tiempo.','No se asocia comúnmente con usos rituales o ceremoniales.','En muchas comunidades es considerado un alimento tradicional y accesible. Su cultivo representa una fuente de ingreso sustentable.','Sí',NULL,'2025-09-29 04:53:30','0','2025-09-29 05:30:22'),(3,'Russula virescens (Gorro Verde)',NULL,'La Russula virescens o Gorro Verde es un hongo silvestre de sombrero verde agrietado. Sus láminas son blancas y firmes, y el pie cilíndrico y compacto. Se recolecta en bosques de encino y mixtos, es comestible y apreciado fresco, deshidratado o tatemado. Crece naturalmente con los árboles y no se cultiva comercialmente.',NULL,'Culinarios: muy apreciado en la gastronomía local, se consume fresco en guisos, sopas o salteados. Medicinales: no posee un uso medicinal tradicional significativo, aunque aporta nutrientes y antioxidantes naturales.','Recolección manual evitando dañar el micelio subterráneo. Se encuentra principalmente durante la temporada lluviosa en bosques húmedos.','Difícil de cultivar debido a su relación micorrícica con los árboles. Generalmente se obtiene mediante recolección silvestre en su hábitat natural.','Puede consumirse fresco o deshidratarse para almacenamiento prolongado. Mantener en lugares frescos, secos y oscuros para preservar sabor y textura.','No se conocen usos rituales específicos, aunque se considera un hongo valioso en la tradición culinaria local.','Su presencia indica la salud del bosque y la biodiversidad del ecosistema. Muy apreciado en mercados locales y en la gastronomía tradicional de la región.','No',NULL,'2025-09-29 04:53:30','0','2025-09-29 05:55:13'),(4,'Dacryopinax spathularia',NULL,'Hongo silvestre con forma de abanico o espátula, de color amarillo brillante a naranja. Su textura es gelatinosa y crece sobre madera en descomposición.',NULL,'No se consume comúnmente debido a su textura gelatinosa y sabor neutro; en algunas regiones se incluye cocido en sopas. Posee compuestos bioactivos con potencial antioxidante y antiinflamatorio, de interés en estudios farmacológicos y biotecnológicos.','Se recolecta manualmente sobre madera muerta o troncos en descomposición, evitando dañar el micelio. La recolección se realiza principalmente en temporadas húmedas, cuando los basidiocarpos están en pleno desarrollo.','Cultivo poco frecuente; requiere condiciones específicas de humedad y madera descompuesta. Puede intentarse en madera esterilizada y húmeda en ambientes controlados, pero generalmente se recolecta en su hábitat natural.','Se conserva mediante deshidratación a baja temperatura y almacenamiento en recipientes herméticos, protegidos de luz y humedad. Para investigación, también puede conservarse en soluciones de glicerol o refrigerada para estudios micológicos.','No existen registros extensos de ritualidad específica; en algunas culturas los hongos gelatinosos se asocian a la fertilidad de la tierra o a la purificación de espacios naturales.','Se considera un indicador ecológico de bosques saludables y madera en descomposición, aportando conocimiento tradicional sobre la naturaleza y los ciclos ecológicos de la región.','No',NULL,'2025-09-29 04:53:30','0','2025-09-29 06:15:09');
/*!40000 ALTER TABLE `hongos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hongos_imagenes`
--

DROP TABLE IF EXISTS `hongos_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hongos_imagenes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_hongo` int(10) unsigned NOT NULL,
  `imagen` longblob NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_hongo` (`id_hongo`),
  CONSTRAINT `hongos_imagenes_ibfk_1` FOREIGN KEY (`id_hongo`) REFERENCES `hongos` (`id_hongo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hongos_imagenes`
--

LOCK TABLES `hongos_imagenes` WRITE;
/*!40000 ALTER TABLE `hongos_imagenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `hongos_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hongos_traducciones`
--

DROP TABLE IF EXISTS `hongos_traducciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hongos_traducciones` (
  `id_traduccion` int(11) NOT NULL AUTO_INCREMENT,
  `hongo_id` int(10) unsigned NOT NULL,
  `lang` varchar(10) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `usos` text DEFAULT NULL,
  `tecnicas_recoleccion` text DEFAULT NULL,
  `cultivo` text DEFAULT NULL,
  `conservacion` text DEFAULT NULL,
  `ritualidad` text DEFAULT NULL,
  `significado_local` text DEFAULT NULL,
  `comestible` varchar(3) DEFAULT NULL,
  `tipo` varchar(1) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `actualizado_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id_traduccion`),
  KEY `hongos_traducciones_ibfk_1` (`hongo_id`),
  CONSTRAINT `hongos_traducciones_ibfk_1` FOREIGN KEY (`hongo_id`) REFERENCES `hongos` (`id_hongo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hongos_traducciones`
--

LOCK TABLES `hongos_traducciones` WRITE;
/*!40000 ALTER TABLE `hongos_traducciones` DISABLE KEYS */;
INSERT INTO `hongos_traducciones` VALUES (13,1,'es','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-09-29 04:53:30','2025-09-29 04:53:30'),(14,1,'nah','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-09-29 04:53:30','2025-09-29 04:53:30'),(15,2,'es','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-09-29 04:53:30','2025-09-29 04:53:30'),(16,2,'nah','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-09-29 04:53:30','2025-09-29 04:53:30'),(17,3,'es','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-09-29 04:53:30','2025-09-29 04:53:30'),(18,3,'nah','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-09-29 04:53:30','2025-09-29 04:53:30'),(19,4,'es','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-09-29 04:53:30','2025-09-29 04:53:30'),(20,4,'nah','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-09-29 04:53:30','2025-09-29 04:53:30');
/*!40000 ALTER TABLE `hongos_traducciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `textos_completos`
--

DROP TABLE IF EXISTS `textos_completos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `textos_completos` (
  `id_traduccion` int(11) NOT NULL AUTO_INCREMENT,
  `idioma` varchar(10) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `valor` text NOT NULL,
  PRIMARY KEY (`id_traduccion`),
  UNIQUE KEY `idioma` (`idioma`,`clave`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `textos_completos`
--

LOCK TABLES `textos_completos` WRITE;
/*!40000 ALTER TABLE `textos_completos` DISABLE KEYS */;
INSERT INTO `textos_completos` VALUES (1,'es','hongo_1_descripcion','Sombrero en forma de ostra o abanico, color blanco, gris o marrón claro. Láminas decurrentes (bajan por el tallo), blancas. Suele crecer en grupos sobre madera muerta o en descomposición. El tallo es corto o casi inexistente. El sombrero puede medir entre 5 y 25 cm de diámetro.'),(2,'nah','hongo_1_descripcion','Nanacatl yōk ostra huan abanico; iztac huan chichi (blanco huan gris o cafētzintli). Láminas decurrentes, iztac. Mochīhua in grupomeh ipan madera miquiztli. Ixtok cēhuia o amo īxkā. Sombrero motēmiti 5–25 cm.'),(3,'es','hongo_1_usos','Comestible en sopas, guisos y salteados. Sustituto de carne por su textura.'),(4,'nah','hongo_1_usos','Tlamachiliztli: quiza tlacualli ipan atolli, nacazcayotl huan tlacualnextli. Teixnextia nacatl pampa itlacualiztli.'),(5,'es','hongo_1_tecnicas','Buscar grupos sobre madera muerta. Cortar en la base sin dañar el micelio para que vuelva a crecer.'),(6,'nah','hongo_1_tecnicas','Pixquitl: xictemoa nanacatl ipan madera miquiztli. Xictepachoa ik xixtli amo xixipe micelio.'),(7,'es','hongo_1_cultivo','Se cultiva en paja, aserrín o troncos inoculados con micelio.'),(8,'nah','hongo_1_cultivo','Kultivo: mochīhua ipan paja, tzopilotl, o kuahuitl inoculado ika micelio.'),(9,'es','hongo_1_conservacion','Secado, refrigeración o envasado al vacío para prolongar su vida útil.'),(10,'nah','hongo_1_conservacion','Mocahuaz: xixipehua, mocelili ika itstok o motlapachoa ika vacío para huehueyoc mocahuaz.'),(11,'es','hongo_1_ritualidad','No se reportan usos rituales para esta especie.'),(12,'nah','hongo_1_ritualidad','Amo quipia teonanacatl tlamachiliztli ipan inin nanacatl.'),(13,'es','hongo_1_significado_local','Apreciado por su sabor y facilidad de cultivo.'),(14,'nah','hongo_1_significado_local','Nimā quimati pampa cualli ixtlacualiztli huan amo tlen chicahuaz kultivo.'),(15,'es','tab_descripcion','Descripción'),(16,'es','tab_usos','Usos'),(17,'es','tab_tecnicas','Técnicas de recolección'),(18,'es','tab_cultivo','Cultivo'),(19,'es','tab_conservacion','Conservación'),(20,'es','tab_ritualidad','Ritualidad'),(21,'es','tab_significado','Significado Local'),(22,'nah','tab_descripcion','Nanakatl'),(23,'nah','tab_usos','Tlamachiliztli'),(24,'nah','tab_tecnicas','Tlamachiliztli de Tlachia'),(25,'nah','tab_cultivo','Tlamachiliztli de Chichihua'),(26,'nah','tab_conservacion','Tlamachiliztli de Teixpatli'),(27,'nah','tab_ritualidad','Tlamachiliztli de Teotl'),(28,'nah','tab_significado','Tlamantli');
/*!40000 ALTER TABLE `textos_completos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `traducciones`
--

DROP TABLE IF EXISTS `traducciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `traducciones` (
  `id_traduccion` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `idioma` varchar(10) NOT NULL,
  `clave` varchar(50) NOT NULL,
  `valor` text NOT NULL,
  PRIMARY KEY (`id_traduccion`),
  UNIQUE KEY `idioma` (`idioma`,`clave`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `traducciones`
--

LOCK TABLES `traducciones` WRITE;
/*!40000 ALTER TABLE `traducciones` DISABLE KEYS */;
INSERT INTO `traducciones` VALUES (1,'es','buscar','Buscar hongo...'),(2,'es','agregar','➕ Agregar Hongo'),(3,'es','ver','? Ver'),(4,'es','editar','✏ Editar'),(5,'es','eliminar','Eliminar'),(6,'es','no_resultados','⚠️ No se encontraron hongos.'),(7,'es','comestible','Comestible'),(8,'es','si','✅ Sí'),(9,'es','no','❌ No'),(10,'nah','buscar','Tlatemolti nanakatl...'),(11,'nah','agregar','➕ Tlatemolti Nanakatl'),(12,'nah','ver','? Tlachia'),(13,'nah','editar','✏ Tlapohua'),(14,'nah','eliminar','Tlamilol'),(15,'nah','no_resultados','⚠️ Amo tlatemolti nanakatl.'),(16,'nah','comestible','Tlen itlacualis'),(17,'nah','si','✅ Quena'),(18,'nah','no','❌ Amo');
/*!40000 ALTER TABLE `traducciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','editor') DEFAULT 'editor',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','admin@micodat.local','12345','admin','2025-08-28 15:34:49');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-04 12:53:04