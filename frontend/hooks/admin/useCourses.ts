import { useState, useEffect } from "react"

export interface Course {
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

export interface CourseFormData {
  name: string
  description: string
  price: string
  duration: string
  level: string
  modality: string
  max_students: string
}

const initialFormData: CourseFormData = {
  name: "",
  description: "",
  price: "",
  duration: "",
  level: "Básico",
  modality: "Presencial",
  max_students: "10",
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState<CourseFormData>(initialFormData)

  useEffect(() => {
    loadMockCourses()
  }, [])

  const loadMockCourses = () => {
    const mockCourses: Course[] = [
      {
        id: 1,
        name: "Robótica Avanzada",
        description: "Aprende a diseñar, programar y construir robots desde cero. Incluye Arduino, sensores y actuadores.",
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
        description: "Domina los fundamentos de la electrónica digital, circuitos integrados y microcontroladores.",
        price: 249,
        duration: "2 meses",
        level: "Básico",
        modality: "Presencial/Virtual",
        max_students: 15,
        is_active: true,
      },
      {
        id: 3,
        name: "Reparación de Laptops",
        description: "Técnicas profesionales para diagnóstico y reparación de laptops. Incluye soldadura SMD.",
        price: 199,
        duration: "6 semanas",
        level: "Intermedio",
        modality: "Presencial",
        max_students: 8,
        is_active: true,
      },
      {
        id: 4,
        name: "Reparación de PCs",
        description: "Mantenimiento, diagnóstico y reparación de computadoras de escritorio y servidores.",
        price: 149,
        duration: "4 semanas",
        level: "Básico",
        modality: "Presencial/Virtual",
        max_students: 12,
        is_active: true,
      },
    ]
    setCourses(mockCourses)
  }

  const createCourse = (courseData: Omit<Course, "id" | "is_active">) => {
    const newCourse: Course = {
      id: Math.max(...courses.map(c => c.id)) + 1,
      ...courseData,
      is_active: true,
    }
    setCourses(prev => [...prev, newCourse])
    return newCourse
  }

  const updateCourse = (id: number, courseData: Partial<Course>) => {
    setCourses(prev => 
      prev.map(course => 
        course.id === id ? { ...course, ...courseData, id: course.id } : course
      )
    )
  }

  const deleteCourse = (id: number) => {
    setCourses(prev => prev.filter(course => course.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const courseData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      max_students: Number.parseInt(formData.max_students),
    }

    if (editingCourse) {
      updateCourse(editingCourse.id, courseData)
    } else {
      createCourse(courseData)
    }

    resetForm()
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

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este curso?")) {
      deleteCourse(id)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingCourse(null)
    setIsEditing(false)
  }

  const openCreateForm = () => {
    setIsEditing(true)
    setEditingCourse(null)
    setFormData(initialFormData)
  }

  return {
    // State
    courses,
    isEditing,
    editingCourse,
    formData,
    
    // Actions
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateForm,
  }
} 