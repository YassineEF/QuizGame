-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 31 mars 2022 à 06:58
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
  `password` varchar(1000) NOT NULL,
  `status` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`, `status`) VALUES
(1, 'Yasso', 'karo@kil.com', '$2b$08$5bLnKTqk70uLUaUYZTBU5O.jnSA5zBixzsaUQcC77bSLvhU8QHBlG', 1),
(2, 'Pippo', 'ftf@limbo.it', '$2b$08$OV2ObpT5d9TVARw.nQfh1OPmI7cKCZC0BJxoGC9xbN1gBH4NnBS06', 1),
(3, 'Robert', 'rober@plomo.it', '$2b$08$9wHRPfGY5A8Ro8R8kXftQuBXMUXiNhkWNfS/dy0xER0lumrNm1VSy', 1),
(4, 'Luigi', 'luigi@super.com', '$2b$08$YBLvtV4O67vc5vaYkk/xrupm0bARwk74TL83kgScLoW8S5zfWIwHy', 1),
(5, 'AldoF', 'aldo@aldo.com', '$2b$08$b1TcE1BItt4fvpudr.emLOQfGsFO3XnOh7qh2EQPFgW1hb9LGP3TK', 0),
(6, 'Ahmed', 'ahmed@lol.lol', '$2b$08$2m5RtD677uDmGAHWi4hkPuZiiY.7knsFKsUsIN4WEOvQh.3nQ1a5O', 0);

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
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

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
(22, 'Si la Terre n\'était pas légèrement penchée, il n\'y aurait ni été ni hiver.', 4),
(23, 'Quel architecte a construit la pyramide du Louvre ?', 5),
(24, ' Dans quel pays est né le sculpteur Constantin Brancusi ?', 5),
(25, ' À quel peintre doit-on « L\'autoportrait au chapeau gris » ?', 5),
(26, 'À quel peintre doit-on « Coucher de soleil à Venise » ?', 5),
(27, 'Qui a peint le tableau « Claude et Paloma » ?', 5),
(28, 'Outre New York et Bilbao, dans quelle ville doit se construire un nouveau musée Guggenheim en 2013 ?', 5),
(29, 'À quel peintre doit-on le fameux tableau « La Cène » ?', 5),
(30, 'Qui a peint « La Jeune Fille à la Perle » ?', 5),
(31, 'Qui a peint le tableau « La Rade de Cardiff » ?', 5),
(32, 'Qui a peint « L\'Angélus » ?', 5),
(33, 'Qui était contrôleur général des finances sous Louis XIV ?', 6),
(34, 'Quel écrivain français du XIXe siècle, farouche opposant à la peine de mort, a écrit « Le Dernier jour d’un Condamné » ?', 6),
(35, 'Qui a formulé la célèbre équation E=mc² ?', 6),
(36, ' Qui est l’apôtre de la non-violence et de la désobéissance civile de masse ?', 6),
(37, 'Quelle femme française a été la première à arborer le drapeau noir des anarchistes ?', 6),
(38, 'Quel homme politique a obtenu le prix Nobel de Littérature ?', 6),
(39, 'Quelle personnalité a été assassinée à New York le 21 février 1965 ?', 6),
(40, 'Lequel de ces pays est le moins densément peuplé au monde ?', 7),
(41, 'Dans quelle région du monde peut-on trouver la Terre-Adélie ?', 7),
(42, 'Dans quelle mer se jette le fleuve Méandre ?', 7),
(43, 'Quel est le plus grand lac d’Amérique du Nord ?', 7),
(44, 'Quelles sont les langues officielles de l’Afghanistan ?', 7),
(45, 'Dans quelle ville peut-on admirer le Kinkaku-ji ?', 7),
(46, 'Quelle ville compte la plus haute densité de population au monde ?', 7),
(47, 'Parmi les États suivants, lequel n’est pas membre du Commonwealth ?', 7),
(48, 'Quelle est la capitale du Maroc ?', 7),
(49, 'La cuisine algérienne se rapproche plus de celle...?', 7),
(50, 'le diaphragme est un tendon', 4),
(51, 'Il y a que 2 satellites naturels qui  gravitent autour de la Terre', 4),
(52, 'La somme des angles d\'un triangle est 180° ', 4),
(53, 'Quelle est la capitale du Brésil ?', 1),
(54, 'Quel était le nom de la mission au cours de laquelle Neil Armstrong a effectué les premiers pas sur la Lune en 1969 ?', 1),
(55, 'Quelle est la distance parcourue par un sportif lors d’un marathon (en kilomètres) ?', 1),
(56, 'Que fête-t-on le 1er mai ?', 1),
(57, 'Qui est l’inséparable compagnon de Titi ?', 1);

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
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `quiz`
--

INSERT INTO `quiz` (`id`, `name`, `photo`, `id_admin`, `id_thématique`) VALUES
(1, 'Quiz Débutant numéro 1', 'nope', 1, 1),
(2, 'Quiz Débutant numéro 2', 'nope', 1, 1),
(3, 'Quiz foot numéro 1', 'nope', 1, 4),
(4, 'Quiz Sciences débutant numéro 1', 'nope', 1, 3),
(5, 'Quiz débutant Arts', 'nope', 1, 2),
(6, 'Quiz Histoire - niveau intermédiaire', 'nope', 1, 6),
(7, 'quiz geographie - niveau intermédiaire', 'nope', 1, 5);

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
) ENGINE=MyISAM AUTO_INCREMENT=209 DEFAULT CHARSET=utf8;

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
(74, 'Faux', 0, 22),
(75, 'Philippe Starck', 0, 23),
(76, 'Ieoh Ming Pei', 1, 23),
(77, 'Jean-Michel Wilmotte', 0, 23),
(78, 'Oscar Niemeyer', 0, 23),
(79, 'Italienne', 0, 24),
(80, 'Autrichienne', 0, 24),
(81, 'Roumaine  ', 1, 24),
(82, 'Française', 0, 24),
(83, 'Paul Cézanne', 0, 25),
(84, 'Vincent Van Gogh', 1, 25),
(85, 'Claude Monet', 0, 25),
(86, 'Gustave Courbet', 0, 25),
(87, 'Le Tintoret', 0, 26),
(88, 'Jacques-Louis David', 0, 26),
(89, 'Titien', 0, 26),
(90, 'Claude Monet ', 1, 26),
(91, 'Pablo Picasso', 1, 27),
(92, 'Joan Miro', 0, 27),
(93, 'Léonard de Vinci', 0, 27),
(94, 'Pierre-Auguste Renoir', 0, 27),
(95, 'Taïwan', 0, 28),
(96, 'Abou Dhabi ', 1, 28),
(97, 'Doha', 0, 28),
(98, 'Oslo', 0, 28),
(99, 'De Vinci', 1, 29),
(100, 'Bruegel l\'Ancien', 0, 29),
(101, 'Titien', 0, 29),
(102, 'Goya', 0, 29),
(103, 'Rembrandt', 0, 30),
(104, 'Vermeer', 1, 30),
(105, 'De Staël', 0, 30),
(106, 'Picabia', 0, 30),
(107, 'Sisley', 1, 31),
(108, 'Bacon', 0, 31),
(109, 'Turner', 0, 31),
(110, 'Munch', 0, 31),
(111, 'Pierre Soulages', 0, 32),
(112, 'Max Ernst', 0, 32),
(113, 'Gustave Courbet', 0, 32),
(114, 'Jean-François Millet', 1, 32),
(115, 'Colbert', 1, 33),
(116, 'Vauban', 0, 33),
(117, 'Le Nôtre', 0, 33),
(118, 'Sully', 0, 33),
(119, 'Lamartine', 0, 34),
(120, 'Hugo', 1, 34),
(121, 'Balzac', 0, 34),
(122, 'Flaubert', 0, 34),
(123, 'Archimède', 0, 35),
(124, 'Nicolas Copernic', 0, 35),
(125, 'Albert Einstein', 1, 35),
(126, 'Charles Darwin', 0, 35),
(127, 'Tito', 0, 36),
(128, 'Malcolm X', 0, 36),
(129, 'Gandhi ', 1, 36),
(130, 'Ben Gourion', 0, 36),
(131, 'Olympe de Gouge', 1, 37),
(132, 'Marie Curie', 0, 37),
(133, 'Charlotte Corday ', 0, 37),
(134, 'Louise Michel', 0, 37),
(135, 'Le général de Gaulle', 0, 38),
(136, 'Winston Churchill', 1, 38),
(137, 'Konrad Adenauer', 0, 38),
(138, 'Thomas Jefferson', 0, 38),
(139, 'Martin Luther King', 0, 39),
(140, 'JFK', 0, 39),
(141, 'Malcolm X ', 1, 39),
(142, 'John Lennon', 0, 39),
(143, 'L\'Arabie Saoudite', 0, 40),
(144, 'La Mongolie', 1, 40),
(145, 'L\'Australie', 0, 40),
(146, 'Le Belarus', 0, 40),
(147, 'En Océanie', 0, 41),
(148, 'En Antarctique', 1, 41),
(149, 'Dans la Toundra', 0, 41),
(150, 'En Amazonie', 0, 41),
(151, 'La mer Égée', 1, 42),
(152, 'La mer Adriatique', 0, 42),
(153, 'La mer Caspienne', 0, 42),
(154, 'La mer Noire', 0, 42),
(155, 'Le lac Majeur', 0, 43),
(156, 'Le lac Ontario', 0, 43),
(157, 'Le lac Huron', 0, 43),
(158, 'Le lac Supérieur', 1, 43),
(159, 'Afghan et Anglais', 0, 44),
(160, 'Arabe et Turc', 0, 44),
(161, 'Persan et Pashtou', 1, 44),
(162, 'Hindi et Persan', 0, 44),
(163, 'Kyoto ', 1, 45),
(164, 'Nara', 0, 45),
(165, 'Tokyo', 0, 45),
(166, 'Osaka', 0, 45),
(167, 'Le Caire', 0, 46),
(168, 'Le Pré-Saint-Gervais', 0, 46),
(169, 'Delhi', 0, 46),
(170, 'Manille', 1, 46),
(171, 'Les Etats-Unis', 1, 47),
(172, 'L\'Australie', 0, 47),
(173, 'Le Ghana', 0, 47),
(174, 'L\'Inde', 0, 47),
(175, 'Casablanca', 0, 48),
(176, 'Agadir', 0, 48),
(177, 'Rabat', 1, 48),
(178, 'Marrakech', 0, 48),
(179, 'De la France', 0, 49),
(180, 'Du Maroc', 1, 49),
(181, 'De la Mauritanie', 0, 49),
(182, 'De l\'Italie', 0, 49),
(183, 'Vrai', 0, 50),
(184, 'Faux', 1, 50),
(185, 'Vrai', 0, 51),
(186, 'Faux', 1, 51),
(187, 'Vrai', 1, 52),
(188, 'Faux', 0, 52),
(189, 'Rio de Janeiro', 0, 53),
(190, 'Brasilia ', 1, 53),
(191, 'São Paulo', 0, 53),
(192, 'Salvador', 0, 53),
(193, 'Apollo 6', 0, 54),
(194, 'Apollo 9', 0, 54),
(195, 'Apollo 11', 1, 54),
(196, 'Apollo 13', 0, 54),
(197, '38,195 km', 0, 55),
(198, '48,350 km', 0, 55),
(199, '44 km', 0, 55),
(200, '42,195 km ', 1, 55),
(201, 'Le travail', 1, 56),
(202, 'Le printemps', 0, 56),
(203, 'Les mamans', 0, 56),
(204, 'Le Beaujolais', 0, 56),
(205, 'Toto', 0, 57),
(206, 'Grosminet', 1, 57),
(207, 'Tac', 0, 57),
(208, 'Tom', 0, 57);

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
