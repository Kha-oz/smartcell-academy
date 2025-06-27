import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { z } from "zod"

const repairSchema = z.object({
  client_name: z.string().min(2, "El nombre es requerido"),
  client_email: z.string().email("Email inválido"),
  client_phone: z.string().min(7, "Teléfono requerido"),
  device_type: z.enum(["celular", "laptop", "pc", "otro"]),
  device_brand: z.string().optional(),
  device_model: z.string().optional(),
  problem_description: z.string().min(5, "Describe el problema"),
  estimated_cost: z.number().optional(),
  status: z.enum(["recibido", "diagnostico", "reparando", "completado", "entregado"]).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = repairSchema.parse(body)

    const query = `
      INSERT INTO repairs 
      (client_name, client_email, client_phone, device_type, device_brand, device_model, problem_description, estimated_cost, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `
    await executeQuery(query, [
      data.client_name,
      data.client_email,
      data.client_phone,
      data.device_type,
      data.device_brand || null,
      data.device_model || null,
      data.problem_description,
      data.estimated_cost ?? null,
      data.status || "recibido"
    ])

    return NextResponse.json({ message: "Reparación registrada correctamente" }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const query = "SELECT * FROM repairs ORDER BY created_at DESC LIMIT 100"
    const repairs = await executeQuery(query)
    return NextResponse.json(repairs)
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener reparaciones" }, { status: 500 })
  }
} 