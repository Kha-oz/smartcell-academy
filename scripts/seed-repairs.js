const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

function toMySQLDatetime(dateString) {
  const d = new Date(dateString)
  return d.toISOString().slice(0, 19).replace('T', ' ')
}

const repairs = [
  {
    client_name: "Ana Herrera",
    client_email: "ana@email.com",
    client_phone: "+1234567893",
    device_type: "laptop",
    device_brand: "HP",
    device_model: "Pavilion 15",
    problem_description: "No enciende, posible problema con la fuente de poder",
    estimated_cost: 85,
    status: "diagnostico",
    created_at: toMySQLDatetime("2024-01-15T08:30:00Z"),
  },
  {
    client_name: "Roberto Silva",
    client_email: "roberto@email.com",
    client_phone: "+1234567894",
    device_type: "celular",
    device_brand: "Samsung",
    device_model: "Galaxy S21",
    problem_description: "Pantalla rota, táctil no responde",
    estimated_cost: 120,
    status: "reparando",
    created_at: toMySQLDatetime("2024-01-14T14:20:00Z"),
  },
  {
    client_name: "Patricia López",
    client_email: "patricia@email.com",
    client_phone: "+1234567895",
    device_type: "pc",
    device_brand: "Dell",
    device_model: "OptiPlex 7090",
    problem_description: "Lentitud extrema, posible virus",
    estimated_cost: 45,
    status: "completado",
    created_at: toMySQLDatetime("2024-01-13T11:15:00Z"),
  },
];

async function seedRepairs() {
  const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "smartcell_academy",
    port: Number.parseInt(process.env.DB_PORT || "3306"),
  };

  const connection = await mysql.createConnection(dbConfig);
  for (const repair of repairs) {
    await connection.execute(
      `INSERT INTO repairs (client_name, client_email, client_phone, device_type, device_brand, device_model, problem_description, estimated_cost, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        repair.client_name,
        repair.client_email,
        repair.client_phone,
        repair.device_type,
        repair.device_brand,
        repair.device_model,
        repair.problem_description,
        repair.estimated_cost,
        repair.status,
        repair.created_at,
      ]
    );
  }
  await connection.end();
  console.log('Seed de repairs completado.');
}

seedRepairs(); 