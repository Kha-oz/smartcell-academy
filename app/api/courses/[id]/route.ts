import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/database";
import { z } from "zod";

const courseSchema = z.object({
  name: z.string().min(3, "Nombre debe tener al menos 3 caracteres"),
  description: z.string().min(10, "Descripción debe tener al menos 10 caracteres"),
  price: z.number().positive("Precio debe ser positivo"),
  duration: z.string().min(3, "Duración requerida"),
  level: z.enum(["Básico", "Intermedio", "Avanzado"]),
  modality: z.enum(["Presencial", "Virtual", "Presencial/Virtual"]),
});

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const validatedData = courseSchema.parse(body);

    const updateQuery = `
      UPDATE courses
      SET name = ?, description = ?, price = ?, duration = ?, level = ?, modality = ?
      WHERE id = ?
    `;
    await executeQuery(updateQuery, [
      validatedData.name,
      validatedData.description,
      validatedData.price,
      validatedData.duration,
      validatedData.level,
      validatedData.modality,
      id,
    ]);
    console.log(executeQuery);
    return NextResponse.json({ message: "Curso actualizado correctamente" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos", details: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}