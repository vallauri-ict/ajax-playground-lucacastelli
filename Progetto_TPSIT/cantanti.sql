-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 02, 2020 alle 21:48
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.2.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cantanti`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `cantanti`
--

CREATE TABLE `cantanti` (
  `CodCantanti` int(255) NOT NULL,
  `username` text NOT NULL,
  `Password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `cantanti`
--

INSERT INTO `cantanti` (`CodCantanti`, `username`, `Password`) VALUES
(1, 'Guest', '5f4dcc3b5aa765d61d8327deb882cf99'),
(2, 'Izi', '5f4dcc3b5aa765d61d8327deb882cf99'),
(3, 'Rkomi', '5f4dcc3b5aa765d61d8327deb882cf99'),
(4, 'Jamil', '5f4dcc3b5aa765d61d8327deb882cf99'),
(5, 'Lazza', '5f4dcc3b5aa765d61d8327deb882cf99'),
(6, 'Dani Faiv', '5f4dcc3b5aa765d61d8327deb882cf99'),
(7, 'Tha Supreme', '5f4dcc3b5aa765d61d8327deb882cf99'),
(8, 'Shiva', '5f4dcc3b5aa765d61d8327deb882cf99'),
(9, 'Tedua', '5f4dcc3b5aa765d61d8327deb882cf99'),
(10, 'Giaime', '5f4dcc3b5aa765d61d8327deb882cf99'),
(11, 'Marracash', '5f4dcc3b5aa765d61d8327deb882cf99'),
(12, 'Massimo Pericolo', '5f4dcc3b5aa765d61d8327deb882cf99'),
(13, 'Madman', '5f4dcc3b5aa765d61d8327deb882cf99'),
(14, 'Nayt', '5f4dcc3b5aa765d61d8327deb882cf99'),
(15, 'Salmo', '5f4dcc3b5aa765d61d8327deb882cf99'),
(16, 'Tredici Pietro', '5f4dcc3b5aa765d61d8327deb882cf99'),
(17, 'Ketama', '5f4dcc3b5aa765d61d8327deb882cf99'),
(18, 'Nitro', '5f4dcc3b5aa765d61d8327deb882cf99'),
(19, 'Capo Plaza', '5f4dcc3b5aa765d61d8327deb882cf99'),
(20, 'Il tre', '5f4dcc3b5aa765d61d8327deb882cf99'),
(21, 'Mambolosco', '5f4dcc3b5aa765d61d8327deb882cf99'),
(22, 'Gemitaiz', '5f4dcc3b5aa765d61d8327deb882cf99');

-- --------------------------------------------------------

--
-- Struttura della tabella `canzoni`
--

CREATE TABLE `canzoni` (
  `CodCanzoni` int(255) NOT NULL,
  `Nome` text NOT NULL,
  `Feat` text NOT NULL,
  `CodCantanti` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `canzoni`
--

INSERT INTO `canzoni` (`CodCanzoni`, `Nome`, `Feat`, `CodCantanti`) VALUES
(2, 'Chic', '', '2'),
(3, 'Apnea', '', '3'),
(4, 'Trap Baida', '', '4'),
(5, 'Catrame', 'Tedua', '5'),
(6, 'Gameboy color', '', '6'),
(7, 'Spigoli', 'Carl Brave, Mara sattei', '7'),
(8, 'Come no', '', '8'),
(9, 'Wasabi 2.0', 'Chris nolan', '9'),
(10, 'Finchè fa giorno', 'Andry the Hitmaker', '10'),
(11, 'Appartengo', 'Massimo Pericolo', '11'),
(12, 'Amici', '', '12'),
(13, 'R8', '', '13'),
(14, 'Gli occhi della tigre', '', '14'),
(15, '1984', '', '15'),
(16, 'Assurdo', '', '16'),
(17, 'jeans Strappati', 'Fabri Fibra', '17'),
(18, 'Okay', 'Lazza', '18'),
(19, 'Twerk', 'Boro Boro', '21'),
(20, 'Zero Rimorsi', '', '20'),
(22, 'Davide', 'Coez', '22'),
(24, 'Fumo da solo', '', '2'),
(25, 'Solletico', 'Tedua', '3'),
(26, 'Quartiere', 'Emis Killa', '4'),
(27, 'Porto cervo', '', '5'),
(28, 'Spaccato', '', '6'),
(29, 'blun7 a swishland', '', '7'),
(30, 'Milano ovest', 'Marracash', '8'),
(31, 'Parola', 'Emis Killa, Lazza', '10'),
(32, 'Bravi a cadere', '', '11'),
(33, 'Vertigini', '', '9'),
(34, '7 miliardi', '', '12'),
(35, 'Niente proprio', '', '13'),
(36, 'Piove', '', '14'),
(37, 'S.A.L.M.O.', '', '15'),
(38, 'Pizza e fichi', '', '16'),
(39, 'Love bandana', 'Tedua', '17'),
(40, 'Pleasentville', '', '18'),
(41, 'Forte e Chiaro', '', '19'),
(42, 'Cracovia pt.3', '', '20'),
(43, 'Il passo', 'Samurai Jay', '21'),
(44, 'Il primo', '', '22'),
(45, 'Nisida', '', '19');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `cantanti`
--
ALTER TABLE `cantanti`
  ADD PRIMARY KEY (`CodCantanti`);

--
-- Indici per le tabelle `canzoni`
--
ALTER TABLE `canzoni`
  ADD PRIMARY KEY (`CodCanzoni`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `cantanti`
--
ALTER TABLE `cantanti`
  MODIFY `CodCantanti` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT per la tabella `canzoni`
--
ALTER TABLE `canzoni`
  MODIFY `CodCanzoni` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
