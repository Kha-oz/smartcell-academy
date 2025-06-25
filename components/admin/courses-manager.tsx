"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"

interface Course {
  id: number
  name: string
  description: string
  price: number
  duration: string
  level: string
  modality: string
  max_students: number
  is_active: boolean
}

export default function CoursesManager() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    level: "Básico",
    modality: "Presencial",
    max_students: "10",
  })

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const response = await fetch("/api/courses")
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error("Error loading courses:", error)
      // Fallback a datos mock si falla la API
      loadMockCourses()
    }
  }

  const loadMockCourses = () => {
    const mockCourses: Course[] = [
      {
        id: 1,
        name: "Robótica Avanzada",
        description: "Aprende a diseñar, programar y construir robots desde cero.",
        price: 299,
        duration: "3 meses",
        level: "Intermedio",
        modality: "Presencial/Virtual",
        max_students: 10,
        is_active: true,
      },
      {
        id: 2,
        name: "Electrónica Digital",
        description: "Domina los fundamentos de la electrónica digital.",
        price: 249,
        duration: "2 meses",
        level: "Básico",
        modality: "Presencial/Virtual",
        max_students: 15,
        is_active: true,
      },
    ]
    setCourses(mockCourses)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const courseData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      max_students: Number.parseInt(formData.max_students),
    }

    try {
      const method = editingCourse ? "PUT" : "POST"
      const url = editingCourse ? `/api/courses/${editingCourse.id}` : "/api/courses"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      })

      if (response.ok) {
        loadCourses() // Recargar cursos
        resetForm()
        alert(editingCourse ? "Curso actualizado" : "Curso creado exitosamente")
      } else {
        alert("Error al guardar el curso")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error de conexión")
    }
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      name: course.name,
      description: course.description,
      price: course.price.toString(),
      duration: course.duration,
      level: course.level,
      modality: course.modality,
      max_students: course.max_students.toString(),
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este curso?")) {
      try {
        const response = await fetch(`/api/courses/${id}`, {
          method: "DELETE",
        })

        if (response.ok) {
          loadCourses()
          alert("Curso eliminado exitosamente")
        } else {
          alert("Error al eliminar el curso")
        }
      } catch (error) {
        console.error("Error:", error)
        alert("Error de conexión")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      duration: "",
      level: "Básico",
      modality: "Presencial",
      max_students: "10",
    })
    setEditingCourse(null)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Gestión de Cursos</h2>
        <Button onClick={() => setIsEditing(true)} className="bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Curso
        </Button>
      </div>

      {/* Formulario */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingCourse ? "Editar Curso" : "Nuevo Curso"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre del Curso</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Precio ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="duration">Duración</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="ej: 3 meses"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="level">Nivel</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Básico">Básico</SelectItem>
                      <SelectItem value="Intermedio">Intermedio</SelectItem>
                      <SelectItem value="Avanzado">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="modality">Modalidad</Label>
                  <Select
                    value={formData.modality}
                    onValueChange={(value) => setFormData({ ...formData, modality: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Presencial">Presencial</SelectItem>
                      <SelectItem value="Virtual">Virtual</SelectItem>
                      <SelectItem value="Presencial/Virtual">Presencial/Virtual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="max_students">Máx. Estudiantes</Label>
                  <Input
                    id="max_students"
                    type="number"
                    value={formData.max_students}
                    onChange={(e) => setFormData({ ...formData, max_students: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  <Save className="h-4 w-4 mr-2" />
                  {editingCourse ? "Actualizar" : "Crear"} Curso
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Cursos */}
      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} className={!course.is_active ? "opacity-60" : ""}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-black">{course.name}</h3>
                    <Badge
                      variant={
                        course.level === "Básico"
                          ? "default"
                          : course.level === "Intermedio"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {course.level}
                    </Badge>
                    <Badge variant="outline">{course.modality}</Badge>
                    {!course.is_active && <Badge variant="destructive">Inactivo</Badge>}
                  </div>
                  <p className="text-gray-600 mb-3">{course.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Duración: {course.duration}</span>
                    <span>Precio: ${course.price}</span>
                    <span>Máx. estudiantes: {course.max_students}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(course.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
