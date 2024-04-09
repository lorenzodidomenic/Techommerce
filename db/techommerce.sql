-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2024 at 06:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `techommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--
CREATE SCHEMA techommerce;

USE techommerce;

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Informatica'),
(2, 'Telefonia'),
(3, 'TV'),
(4, 'Audio'),
(5, 'Fotografia'),
(6, 'Console e Videogiochi');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `quantity`, `description`, `img`, `category_id`) VALUES
(1, 'Lenovo V 15 G2 IJL', 299, 5, "Progettato per l'ambiente di lavoro moderno, il notebook Lenovo V15 di seconda generazione (15,6 Intel) è il compagno di lavoro perfetto. Adatto per produttività e mobilità, assicura ottime prestazioni in ufficio o a casa." , 'lenovoV15G2IJL.jpg', 1),
(2, 'Samsung Galaxy A54 5G', 369.9, 5, 'Display FHD+ Super AMOLED 6.4”, Android 13, 8GB RAM, 256GB, Doppia SIM, Batteria 5.000 mAh, Awesome Graphite.', 'samsungGalaxyA54.jpg', 2),
(3, 'Cuffie Wireess Ijev', 59, 3, " Le nostre ultime cuffie wireless iJoy Ultra sono state progettate per offrire un comfort senza pari, con morbida imbottitura sia sui cuscinetti auricolari e fantastica esperienza musicale" , 'CuffieWirelessBluetooth.jpeg', 4),
(4, 'Playstation5', 569.9, 3, 'Immersione mozzafiato: scopri un esperienza di gioco più profonda con il supporto del feedback tattile, dei trigger adattivi e della tecnologia audio 3D.', 'Play5.jpeg', 6),
(5, 'SmartTvBolva', 159.99, 4, "Risoluzione 1080p Guarda i tuoi film, programmi e giochi preferiti in alta definizione." , 'SmartTvBolva.jpeg', 3),
(6, 'SmartTvSony', 364.9, 2, 'Immagini luminose: goditi film, programmi e giochi con una qualità delle immagini nitida, una chiarezza eccezionale e una luminosità straordinaria.', 'SmartTvSony.jpeg', 3),
(7, 'VideoCameraSony', 464.9, 3, 'La videocamera è utile per scattare bellissime foto e condividerle sul tuo Youtube.', 'VideoCameraSony.jpeg', 5),
(8, 'CellulareOppo', 264.9, 3, 'Uno dei piu economici cellulari che riesce a soddisfare tutte le tue richieste', 'CellulareOppo.jpeg', 2);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
