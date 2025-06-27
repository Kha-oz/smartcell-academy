"use client"

import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"
import { useCourses } from "@/hooks/admin/useCourses"
import { CourseForm } from "./CourseForm"
import { CourseList } from "./CourseList"

export default function CoursesManager() {
  const {
    courses,
    isEditing,
    editingCourse,
    formData,
    loading,
    error,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateForm,
    toggleCourseAvailability,
    loadCourses,
  } = useCourses()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Gestión de Cursos</h2>
        <div className="flex gap-2">
          <Button 
            onClick={loadCourses} 
            variant="outline" 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Recargar
          </Button>
          <Button onClick={openCreateForm} className="bg-green-500 hover:bg-green-600">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Curso
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <CourseForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        isEditing={isEditing}
        editingCourse={editingCourse}
        loading={loading}
      />

      <CourseList
        courses={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleAvailability={toggleCourseAvailability}
        loading={loading}
      />
    </div>
  )
}
