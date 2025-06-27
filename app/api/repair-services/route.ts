import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { z } from "zod"

const serviceSchema = z.object({
  title: z.string().min(3, "Título debe tener al menos 3 caracteres"),
  description: z.string().min(10, "Descripción debe tener al menos 10 caracteres"),
  time_estimate: z.string().min(1, "Tiempo estimado requerido"),
  base_price: z.number().positive("Precio base debe ser positivo"),
  price_display: z.string().min(1, "Precio de visualización requerido"),
  icon_name: z.string().min(1, "Nombre del icono requerido"),
})

export async function GET() {
  try {
    // Obtener servicios con sus características
    const query = `
      SELECT 
        rs.id,
        rs.title,
        rs.description,
        rs.time_estimate,
        rs.base_price,
        rs.price_display,
        rs.icon_name,
        rs.is_active,
        rs.created_at,
        rs.updated_at,
        GROUP_CONCAT(sf.feature_name ORDER BY sf.feature_name SEPARATOR ',') as features
      FROM repair_services rs
      LEFT JOIN service_features sf ON rs.id = sf.service_id
      WHERE rs.is_active = TRUE
      GROUP BY rs.id
      ORDER BY rs.created_at ASC
    `
    
    const services = await executeQuery(query)

    // Procesar los resultados para convertir features de string a array
    const processedServices = services.map((service: any) => ({
      ...service,
      features: service.features ? service.features.split(',') : []
    }))

    return NextResponse.json(processedServices)
  } catch (error) {
    console.error("Error fetching repair services:", error)
    return NextResponse.json({ error: "Error al obtener servicios de reparación" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos
    const validatedData = serviceSchema.parse(body)

    // Insertar servicio en base de datos
    const query = `
      INSERT INTO repair_services (title, description, time_estimate, base_price, price_display, icon_name, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `

    const result = (await executeQuery(query, [
      validatedData.title,
      validatedData.description,
      validatedData.time_estimate,
      validatedData.base_price,
      validatedData.price_display,
      validatedData.icon_name,
    ])) as { insertId: number }

    return NextResponse.json({ 
      message: "Servicio de reparación creado exitosamente", 
      id: result.insertId 
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating repair service:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
} 