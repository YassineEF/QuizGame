-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 22 mars 2022 à 10:58
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `quizzo`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `questions`
--

DROP TABLE IF EXISTS `questions`;
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `id_quiz` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `questions`
--

INSERT INTO `questions` (`id`, `question`, `id_quiz`) VALUES
(1, 'Qu\'appelle-t-on le Paris-Brest ?', 1),
(2, 'Stockholm elle la capitale ?', 1),
(3, 'Quel arbre produit le liège ?', 1),
(4, 'Quel est le terme français pour email ?', 1),
(5, ' Dans quel état américain, l’Ouragan Katrina a-t-il fait un ravage en 2005 ?', 1),
(6, 'Dans le langage familier, comment appelle-t-on la dent du petit enfant ?', 2),
(7, 'Quel peintre, né en 1844, est également appelé « le Douanier » ?', 2),
(8, 'Comment appelle-t-on le versant de la montagne non situé au soleil ?', 2),
(9, 'Quelle est la seule valeur à la roulette à porter la couleur verte ?', 2),
(10, 'Quelle est la plus petite unité de mémoire utilisable sur un ordinateur ?', 2),
(11, 'Quand a eu lieu la première Coupe du monde ?', 3),
(12, 'Quelle équipe de football a remporté le plus grand nombre de Coupes du monde ?', 3),
(13, 'Dans quelle ville se trouve le stade populairement connu sous le nom de La Bombonera ?', 3),
(14, 'Qui a gagné la Coupe du monde 2010 ? ', 3),
(15, 'Dans quel pays l\'Allemagne a-t-elle remporté sa première Coupe du monde ?', 3),
(16, 'L’eau peut parfois bouillir à 85°C.', 4),
(17, 'Un réfrigérateur produit plus de chaud que de froid.', 4),
(18, 'Il est moins dangereux de mettre les doigts dans une prise que de toucher une clôture électrique.', 4),
(19, 'Le ciel est bleu car il reflète la couleur des océans', 4),
(20, 'On peut commander un écran tactile avec un cornichon.', 4),
(21, 'Rien ne va plus vite que la lumière.', 4),
(22, 'Si la Terre n\'était pas légèrement penchée, il n\'y aurait ni été ni hiver.', 4);

-- --------------------------------------------------------

--
-- Structure de la table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
CREATE TABLE IF NOT EXISTS `quiz` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `id_admin` int(11) NOT NULL,
  `id_thématique` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `quiz`
--

INSERT INTO `quiz` (`id`, `name`, `photo`, `id_admin`, `id_thématique`) VALUES
(1, 'Quiz Débutant numéro 1', 'nope', 1, 1),
(2, 'Quiz Débutant numéro 2', 'nope', 1, 1),
(3, 'Quiz foot numéro 1', 'nope', 1, 4),
(4, 'Quiz Sciences débutant numéro 1', 'nope', 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `reponses`
--

DROP TABLE IF EXISTS `reponses`;
CREATE TABLE IF NOT EXISTS `reponses` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `reponse` varchar(255) NOT NULL,
  `boolean` int(11) NOT NULL,
  `id_question` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=75 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `reponses`
--

INSERT INTO `reponses` (`id`, `reponse`, `boolean`, `id_question`) VALUES
(1, 'Une dépression météorologique', 0, 1),
(2, 'Une course cycliste', 0, 1),
(3, 'Une pâtisserie', 1, 1),
(4, 'Un poisson de l\'Atlantique', 0, 1),
(5, 'De la Suède', 1, 2),
(6, 'De la Finlande', 0, 2),
(7, 'De la Norvège', 0, 2),
(8, 'Du Danemark ', 0, 2),
(9, 'Le chêne', 1, 3),
(10, 'Le cèdre', 0, 3),
(11, 'L\'eucalyptus', 0, 3),
(12, 'Le charme', 0, 3),
(13, 'E-Envoi', 0, 4),
(14, 'Net Courrier', 0, 4),
(15, 'Post', 0, 4),
(16, 'Courriel', 1, 4),
(17, 'Alabama', 0, 5),
(18, 'Oregon', 0, 5),
(19, 'Pennsylvanie', 0, 5),
(20, 'Louisiane', 1, 5),
(21, 'Marmotte', 0, 6),
(22, 'Menotte ', 0, 6),
(23, 'Quenotte', 1, 6),
(24, 'Bouillotte', 0, 6),
(25, 'Pablo Picasso', 0, 7),
(26, 'Henri Rousseau', 1, 7),
(27, 'Edgar Degas', 0, 7),
(28, 'Salvador Dali', 0, 7),
(29, 'Adret', 0, 8),
(30, 'Ubac', 1, 8),
(31, 'Étant', 0, 8),
(32, 'Ressac', 0, 8),
(33, 'Le zéro', 1, 9),
(34, 'Le cinquante', 0, 9),
(35, 'Le quarante', 0, 9),
(36, 'Le treize', 0, 9),
(37, 'Le byte', 0, 10),
(38, 'Le mega', 0, 10),
(39, 'Le bit', 1, 10),
(40, 'Le giga', 0, 10),
(41, 'En 1925', 0, 11),
(42, 'En 1930', 1, 11),
(43, 'En 1932', 0, 11),
(44, 'En 1936', 0, 11),
(45, 'L\'Allemagne ', 0, 12),
(46, 'L\'Argentine', 0, 12),
(47, 'Le Brésil ', 1, 12),
(48, 'L\'Italie', 0, 12),
(49, 'Mexico', 0, 13),
(50, 'Buenos Aires ', 1, 13),
(51, 'Rio de Janeiro', 0, 13),
(52, 'Madrid', 0, 13),
(53, 'L\'Allemagne ', 0, 14),
(54, 'Le Brésil', 0, 14),
(55, 'L\'Espagne', 1, 14),
(56, 'L\'Italie', 0, 14),
(57, 'En Italie 1934 ', 0, 15),
(58, 'En France en 1938', 0, 15),
(59, 'Au Brésil en 1950', 0, 15),
(60, 'En Suisse 1954', 1, 15),
(61, 'Vrai', 1, 16),
(62, 'Faux', 0, 16),
(63, 'Vrai', 1, 17),
(64, 'Faux', 0, 17),
(65, 'Vrai', 0, 18),
(66, 'Faux', 1, 18),
(67, 'Vrai', 0, 19),
(68, 'Faux', 1, 19),
(69, 'Vrai', 1, 20),
(70, 'Faux', 0, 20),
(71, 'Vrai', 1, 21),
(72, 'Faux', 0, 21),
(73, 'Vrai', 1, 22),
(74, 'Faux', 0, 22);

-- --------------------------------------------------------

--
-- Structure de la table `score`
--

DROP TABLE IF EXISTS `score`;
CREATE TABLE IF NOT EXISTS `score` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `score` int(255) NOT NULL,
  `timer` time NOT NULL,
  `date` date NOT NULL,
  `id_admin` int(11) NOT NULL,
  `id_quiz` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `thématiques`
--

DROP TABLE IF EXISTS `thématiques`;
CREATE TABLE IF NOT EXISTS `thématiques` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `thématique` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `thématiques`
--

INSERT INTO `thématiques` (`id`, `thématique`) VALUES
(1, 'Culture Générale'),
(2, 'Arts'),
(3, 'Sciences'),
(4, 'Sports'),
(5, 'Géographie'),
(6, 'Histoire');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
