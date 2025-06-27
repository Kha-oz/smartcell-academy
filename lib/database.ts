import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "smartcell_academy",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
}

console.log("Database configuration:", {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
  port: dbConfig.port,
  // No mostrar la contraseña por seguridad
})

export async function getConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    console.log("✅ Database connection established successfully")
    return connection
  } catch (error) {
    console.error("❌ Error connecting to database:", error)
    throw error
  }
}

export async function executeQuery(query: string, params: (string | number | boolean | null)[] = []) {
  const connection = await getConnection()
  try {
    const [results] = await connection.execute(query, params)
    console.log("✅ Query executed successfully:", query.substring(0, 50) + "...")
    return results
  } catch (error) {
    console.error("❌ Error executing query:", error)
    console.error("Query:", query)
    console.error("Params:", params)
    throw error
  } finally {
    await connection.end()
  }
}

// Función para probar la conexión
export async function testConnection() {
  try {
    const connection = await getConnection()
    await connection.ping()
    console.log("✅ Database connection test successful")
    await connection.end()
    return true
  } catch (error) {
    console.error("❌ Database connection test failed:", error)
    return false
  }
}
