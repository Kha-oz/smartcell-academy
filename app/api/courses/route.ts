import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/database"
import { z } from "zod"

const courseSchema = z.object({
  name: z.string().min(3, "Nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "Descripción debe tener al menos 10 caracteres"),
  price: z.number().positive("Precio debe ser positivo"),
  duration: z.string().min(3, "Duración requerida"),
  level: z.enum(["Básico", "Intermedio", "Avanzado"]),
  modality: z.enum(["Presencial", "Virtual", "Presencial/Virtual"]),
})

export async function GET() {
  try {
    const query = "SELECT * FROM courses ORDER BY created_at DESC"
    const courses = await executeQuery(query)

    return NextResponse.json(courses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Error al obtener cursos" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos
    const validatedData = courseSchema.parse(body)

    // Insertar en base de datos
    const query = `
      INSERT INTO courses (name, description, price, duration, level, modality, created_at)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `

    const result = (await executeQuery(query, [
      validatedData.name,
      validatedData.description,
      validatedData.price,
      validatedData.duration,
      validatedData.level,
      validatedData.modality,
    ])) as { insertId: number }

    return NextResponse.json({ message: "Curso creado exitosamente", id: result.insertId }, { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
