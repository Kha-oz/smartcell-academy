-- Crear base de datos
CREATE DATABASE IF NOT EXISTS smartcell_academy;
USE smartcell_academy;

-- Tabla de contactos
CREATE TABLE IF NOT EXISTS contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('nuevo', 'contactado', 'resuelto') DEFAULT 'nuevo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de cursos
CREATE TABLE IF NOT EXISTS courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    level ENUM('Básico', 'Intermedio', 'Avanzado') NOT NULL,
    modality ENUM('Presencial', 'Virtual', 'Presencial/Virtual') NOT NULL,
    max_students INT DEFAULT 10,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de inscripciones
CREATE TABLE IF NOT EXISTS enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_phone VARCHAR(50) NOT NULL,
    status ENUM('pendiente', 'confirmado', 'completado', 'cancelado') DEFAULT 'pendiente',
    payment_status ENUM('pendiente', 'pagado', 'reembolsado') DEFAULT 'pendiente',
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Tabla de reparaciones
CREATE TABLE IF NOT EXISTS repairs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    device_type ENUM('celular', 'laptop', 'pc', 'otro') NOT NULL,
    device_brand VARCHAR(100),
    device_model VARCHAR(100),
    problem_description TEXT NOT NULL,
    estimated_cost DECIMAL(10,2),
    status ENUM('recibido', 'diagnostico', 'reparando', 'completado', 'entregado') DEFAULT 'recibido',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de productos/herramientas
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    category VARCHAR(100) NOT NULL,
    stock_quantity INT DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    rating DECIMAL(2,1) DEFAULT 0,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de items de pedidos
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo para cursos
INSERT INTO courses (name, description, price, duration, level, modality) VALUES
('Robótica Avanzada', 'Aprende a diseñar, programar y construir robots desde cero. Incluye Arduino, sensores y actuadores.', 299.00, '3 meses', 'Intermedio', 'Presencial/Virtual'),
('Electrónica Digital', 'Domina los fundamentos de la electrónica digital, circuitos integrados y microcontroladores.', 249.00, '2 meses', 'Básico', 'Presencial/Virtual'),
('Reparación de Laptops', 'Técnicas profesionales para diagnóstico y reparación de laptops. Incluye soldadura SMD.', 199.00, '6 semanas', 'Intermedio', 'Presencial'),
('Reparación de PCs', 'Mantenimiento, diagnóstico y reparación de computadoras de escritorio y servidores.', 149.00, '4 semanas', 'Básico', 'Presencial/Virtual');

-- Insertar datos de ejemplo para productos
INSERT INTO products (name, description, price, original_price, category, stock_quantity, rating) VALUES
('Kit de Soldadura Profesional', 'Estación de soldadura con temperatura regulable, incluye puntas intercambiables y accesorios.', 89.00, 120.00, 'Soldadura', 15, 4.8),
('Set de Herramientas Precisión', 'Kit completo con destornilladores de precisión, pinzas y herramientas para electrónica.', 45.00, 65.00, 'Herramientas', 25, 4.9),
('Multímetro Digital Avanzado', 'Multímetro profesional con pantalla LCD, medición de capacitancia y frecuencia.', 75.00, 95.00, 'Medición', 8, 4.7),
('Kit Arduino Starter', 'Kit completo para iniciarse en Arduino con sensores, LEDs, resistencias y breadboard.', 55.00, 70.00, 'Electrónica', 20, 4.9),
('Pasta Térmica Premium', 'Pasta térmica de alta conductividad para procesadores y componentes electrónicos.', 15.00, 20.00, 'Accesorios', 50, 4.6),
('Pistola de Calor Industrial', 'Pistola de calor con control de temperatura para trabajos de soldadura y reparación.', 125.00, 150.00, 'Soldadura', 10, 4.8);
