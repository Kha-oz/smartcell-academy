import { useState, useEffect } from "react"
import { apiService } from "../../lib/api"

export interface Course {
  _id?: string
  id?: number
  title: string
  description: string
  duration: string
  price: number
  instructor: string
  level: string
  is_available: boolean
  rating: number
}

export interface CourseFormData {
  title: string
  description: string
  duration: string
  price: string
  instructor: string
  level: string
}

const initialFormData: CourseFormData = {
  title: "",
  description: "",
  duration: "",
  price: "",
  instructor: "",
  level: "",
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [formData, setFormData] = useState<CourseFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiService.getCourses()
      // Transformar los datos para mantener compatibilidad con el frontend
      const transformedCourses = data.map((course: any) => ({
        id: course._id, // Usar _id como id para compatibilidad
        _id: course._id,
        title: course.title || 'Curso sin título',
        description: course.description || 'Sin descripción',
        duration: course.duration || 'No especificado',
        price: course.price || 0,
        instructor: course.instructor || 'Instructor por asignar',
        level: course.level || 'Básico',
        is_available: course.is_available || true,
        rating: course.rating || 0,
      }))
      setCourses(transformedCourses)
    } catch (err) {
      setError('Error al cargar cursos')
      console.error('Error loading courses:', err)
    } finally {
      setLoading(false)
    }
  }

  const createCourse = async (courseData: Omit<Course, "id" | "is_available" | "rating">) => {
    setLoading(true)
    setError(null)
    try {
      const newCourse = await apiService.createCourse({
        ...courseData,
        is_available: true,
        rating: 0,
      })
      
      // Agregar el nuevo curso a la lista
      const transformedCourse = {
        id: newCourse._id,
        _id: newCourse._id,
        ...courseData,
        is_available: true,
        rating: 0,
      }
      setCourses(prev => [...prev, transformedCourse])
      return transformedCourse
    } catch (err) {
      setError('Error al crear curso')
      console.error('Error creating course:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCourse = async (id: string, courseData: Partial<Course>) => {
    setLoading(true)
    setError(null)
    try {
      const updatedCourse = await apiService.updateCourse(id, courseData)
      
      // Actualizar el curso en la lista
      setCourses(prev => 
        prev.map(course => 
          course._id === id ? { ...course, ...courseData } : course
        )
      )
      return updatedCourse
    } catch (err) {
      setError('Error al actualizar curso')
      console.error('Error updating course:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteCourse = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await apiService.deleteCourse(id)
      setCourses(prev => prev.filter(course => course._id !== id))
    } catch (err) {
      setError('Error al eliminar curso')
      console.error('Error deleting course:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const toggleCourseAvailability = async (id: string) => {
    const course = courses.find(c => c._id === id)
    if (!course) return

    try {
      await updateCourse(id, { is_available: !course.is_available })
    } catch (err) {
      console.error('Error toggling course availability:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const courseData = {
      ...formData,
      price: Number.parseFloat(formData.price),
    }

    try {
      if (editingCourse) {
        await updateCourse(editingCourse._id!, courseData)
      } else {
        await createCourse(courseData)
      }
      resetForm()
    } catch (err) {
      // Error ya manejado en las funciones individuales
    }
  }

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      price: course.price.toString(),
      instructor: course.instructor,
      level: course.level,
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este curso?")) {
      try {
        await deleteCourse(id)
      } catch (err) {
        // Error ya manejado en deleteCourse
      }
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingCourse(null)
    setIsEditing(false)
    setError(null)
  }

  const openCreateForm = () => {
    setIsEditing(true)
    setEditingCourse(null)
    setFormData(initialFormData)
    setError(null)
  }

  return {
    // State
    courses,
    isEditing,
    editingCourse,
    formData,
    loading,
    error,
    
    // Actions
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateForm,
    toggleCourseAvailability,
    loadCourses,
  }
} 