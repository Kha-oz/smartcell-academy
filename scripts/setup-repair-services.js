const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "smartcell_academy",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
};

async function setupRepairServices() {
  console.log('🔧 Setting up repair services tables...');
  
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');

    // Crear tabla de servicios de reparación
    await connection.execute(`
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
      )
    `);
    console.log('✅ Created repair_services table');

    // Crear tabla de características
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS service_features (
        id INT PRIMARY KEY AUTO_INCREMENT,
        service_id INT NOT NULL,
        feature_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (service_id) REFERENCES repair_services(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Created service_features table');

    // Verificar si ya existen datos
    const [existingServices] = await connection.execute('SELECT COUNT(*) as count FROM repair_services');
    
    if (existingServices[0].count === 0) {
      // Insertar servicios de reparación
      await connection.execute(`
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
        )
      `);
      console.log('✅ Inserted repair services');

      // Insertar características para cada servicio
      // Servicio 1: Reparación de Celulares
      await connection.execute(`
        INSERT INTO service_features (service_id, feature_name) VALUES
        (1, 'Pantallas'),
        (1, 'Baterías'),
        (1, 'Cámaras'),
        (1, 'Software'),
        (1, 'Puertos')
      `);

      // Servicio 2: Reparación de Laptops
      await connection.execute(`
        INSERT INTO service_features (service_id, feature_name) VALUES
        (2, 'Pantallas'),
        (2, 'Teclados'),
        (2, 'Motherboard'),
        (2, 'RAM'),
        (2, 'Disco Duro')
      `);

      // Servicio 3: Reparación de PCs
      await connection.execute(`
        INSERT INTO service_features (service_id, feature_name) VALUES
        (3, 'Hardware'),
        (3, 'Software'),
        (3, 'Limpieza'),
        (3, 'Actualización'),
        (3, 'Optimización')
      `);
      console.log('✅ Inserted service features');
    } else {
      console.log('ℹ️ Services already exist, skipping insertion');
    }

    // Verificar los datos insertados
    const [services] = await connection.execute(`
      SELECT 
        rs.id,
        rs.title,
        rs.description,
        rs.time_estimate,
        rs.base_price,
        rs.price_display,
        rs.icon_name,
        GROUP_CONCAT(sf.feature_name ORDER BY sf.feature_name SEPARATOR ',') as features
      FROM repair_services rs
      LEFT JOIN service_features sf ON rs.id = sf.service_id
      GROUP BY rs.id
      ORDER BY rs.created_at ASC
    `);

    console.log('📊 Services in database:');
    services.forEach(service => {
      console.log(`  - ${service.title} (${service.features})`);
    });

    await connection.end();
    console.log('✅ Setup completed successfully');

  } catch (error) {
    console.error('❌ Error setting up repair services:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Check your database credentials in .env.local');
    }
  }
}

setupRepairServices(); 