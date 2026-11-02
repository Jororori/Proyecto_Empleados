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

INSERT INTO `empleado` (`id`, `nombre`, `edad`, `pais`, `cargo`, `correo`) VALUES
(1, 'fgd', 20, 'dfg', 'dfg', 'dfg@gmail.com'),
(2, 'Luis', 23, 'Peru', 'Docente', 'luis@gmail.com'),
(3, 'joel', 25, 'peru', 'programador', 'progrmado@hotmail.com'),
(4, 'juan', 23, 'peru', 'analista', 'juan@gmail.com'),
(5, 'Alberto', 30, 'Peru', 'Gerente', 'gerente@peru.com');

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

INSERT INTO `proyectos` (`id`, `nombre_proyecto`, `descripcion`) VALUES
(1, 'Sistema de Facturación', 'Desarrollo del módulo de facturación electrónica'),
(2, 'App Móvil SENATI', 'Aplicación móvil para estudiantes de SENATI');

INSERT INTO `empleado_proyecto` (`empleado_id`, `proyecto_id`) VALUES
(2, 1),
(3, 1),
(3, 2),
(5, 2);

INSERT INTO `salario` (`id`, `empleado_id`, `monto`, `fecha_actualizacion`) VALUES
(1, 1, 1500.00, '2026-01-15'),
(2, 2, 2800.00, '2026-02-01'),
(3, 3, 3500.00, '2026-02-15'),
(4, 4, 2600.00, '2026-03-01'),
(5, 5, 5000.00, '2026-03-10');
