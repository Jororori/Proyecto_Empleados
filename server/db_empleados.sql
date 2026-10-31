CREATE DATABASE IF NOT EXISTS `empleados` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `empleados`;

CREATE TABLE IF NOT EXISTS `empleado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `edad` int(11) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `correo` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_proyecto` varchar(100) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `empleado_proyecto` (
  `empleado_id` int(11) NOT NULL,
  `proyecto_id` int(11) NOT NULL,
  PRIMARY KEY (`empleado_id`, `proyecto_id`),
  CONSTRAINT `fk_ep_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ep_proyecto` FOREIGN KEY (`proyecto_id`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `salario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empleado_id` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_actualizacion` date NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_salario_empleado` FOREIGN KEY (`empleado_id`) REFERENCES `empleado` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
