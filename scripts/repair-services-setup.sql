-- Tabla de servicios de reparación
CREATE TABLE IF NOT EXISTS repair_services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    time_estimate VARCHAR(100) NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    price_display VARCHAR(50) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla para las características de cada servicio
CREATE TABLE IF NOT EXISTS service_features (
    id INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT NOT NULL,
    feature_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (service_id) REFERENCES repair_services(id) ON DELETE CASCADE
);

-- Insertar servicios de reparación
INSERT INTO repair_services (title, description, time_estimate, base_price, price_display, icon_name) VALUES
(
    'Reparación de Celulares',
    'Reparamos pantallas, baterías, cámaras, puertos de carga y problemas de software.',
    '1-3 días',
    25.00,
    'Desde $25',
    'Smartphone'
),
(
    'Reparación de Laptops',
    'Diagnóstico y reparación de laptops, cambio de componentes y optimización.',
    '2-5 días',
    50.00,
    'Desde $50',
    'Laptop'
),
(
    'Reparación de PCs',
    'Mantenimiento, actualización y reparación de computadoras de escritorio.',
    '1-3 días',
    30.00,
    'Desde $30',
    'Monitor'
);

-- Insertar características para cada servicio
-- Servicio 1: Reparación de Celulares
INSERT INTO service_features (service_id, feature_name) VALUES
(1, 'Pantallas'),
(1, 'Baterías'),
(1, 'Cámaras'),
(1, 'Software'),
(1, 'Puertos');

-- Servicio 2: Reparación de Laptops
INSERT INTO service_features (service_id, feature_name) VALUES
(2, 'Pantallas'),
(2, 'Teclados'),
(2, 'Motherboard'),
(2, 'RAM'),
(2, 'Disco Duro');

-- Servicio 3: Reparación de PCs
INSERT INTO service_features (service_id, feature_name) VALUES
(3, 'Hardware'),
(3, 'Software'),
(3, 'Limpieza'),
(3, 'Actualización'),
(3, 'Optimización'); 