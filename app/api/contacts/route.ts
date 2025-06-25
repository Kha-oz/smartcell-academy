import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Teléfono debe tener al menos 10 dígitos"),
  subject: z.string().min(5, "Asunto debe tener al menos 5 caracteres"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos
    const validatedData = contactSchema.parse(body)

    // Insertar en base de datos
    const query = `
      INSERT INTO contacts (name, email, phone, subject, message, created_at)
      VALUES (?, ?, ?, ?, ?, NOW())
    `

    await executeQuery(query, [
      validatedData.name,
      validatedData.email,
      validatedData.phone,
      validatedData.subject,
      validatedData.message,
    ])

    return NextResponse.json({ message: "Contacto guardado exitosamente" }, { status: 201 })
  } catch (error) {
    console.error("Error saving contact:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const query = "SELECT * FROM contacts ORDER BY created_at DESC LIMIT 50"
    const contacts = await executeQuery(query)

    return NextResponse.json(contacts)
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ error: "Error al obtener contactos" }, { status: 500 })
  }
}
