const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "smartcell_academy",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
};

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  console.log('Configuration:', {
    host: dbConfig.host,
    user: dbConfig.user,
    database: dbConfig.database,
    port: dbConfig.port
  });

  try {
    // Probar conexión sin base de datos específica
    const connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      port: dbConfig.port
    });

    console.log('✅ Connected to MySQL server successfully');

    // Verificar si la base de datos existe
    const [databases] = await connection.execute('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === dbConfig.database);

    if (dbExists) {
      console.log(`✅ Database '${dbConfig.database}' exists`);
      
      // Conectar a la base de datos específica
      await connection.end();
      const dbConnection = await mysql.createConnection(dbConfig);
      
      // Verificar tablas
      const [tables] = await dbConnection.execute('SHOW TABLES');
      console.log(`✅ Found ${tables.length} tables in database`);
      
      if (tables.length > 0) {
        console.log('Tables found:');
        tables.forEach(table => {
          console.log(`  - ${Object.values(table)[0]}`);
        });
      }
      
      await dbConnection.end();
    } else {
      console.log(`❌ Database '${dbConfig.database}' does not exist`);
      console.log('Available databases:');
      databases.forEach(db => {
        console.log(`  - ${db.Database}`);
      });
    }

  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Possible solutions:');
      console.log('1. Check your DB_USER and DB_PASSWORD in .env.local');
      console.log('2. Make sure MySQL is running');
      console.log('3. Try connecting with MySQL Workbench first');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('💡 MySQL server is not running. Start it with:');
      console.log('   net start MySQL80');
    }
  }
}

testDatabaseConnection(); 