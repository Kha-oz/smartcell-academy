-- Crear usuario específico para la aplicación
CREATE USER IF NOT EXISTS 'smartcell_user'@'localhost' IDENTIFIED BY 'smartcell_password_2024';

-- Dar permisos al usuario
GRANT ALL PRIVILEGES ON smartcell_academy.* TO 'smartcell_user'@'localhost';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Verificar que el usuario fue creado
SELECT User, Host FROM mysql.user WHERE User = 'smartcell_user'; 