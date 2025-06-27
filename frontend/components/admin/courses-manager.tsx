"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useCourses } from "@/hooks/admin/useCourses"

export default function CoursesManager() {
  const {
    courses,
    isEditing,
    editingCourse,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateForm,
  } = useCourses()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Gestión de Cursos</h2>
        <Button onClick={openCreateForm} className="bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Curso
        </Button>
      </div>

      {/* TODO: Crear componentes separados CourseForm y CourseList */}
      <div className="text-center text-gray-500">
        Componente en refactorización - Usando hook personalizado
      </div>
    </div>
  )
}
