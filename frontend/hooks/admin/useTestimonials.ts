import { useState, useEffect } from "react"
import { apiService } from "../../lib/api"

export interface Testimonial {
  _id?: string
  id?: number
  name: string
  role: string
  content: string
  rating: number
  is_visible: boolean
  avatar?: string
}

export interface TestimonialFormData {
  name: string
  role: string
  content: string
  rating: string
}

const initialFormData: TestimonialFormData = {
  name: "",
  role: "",
  content: "",
  rating: "",
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState<TestimonialFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiService.getTestimonials()
      // Transformar los datos para mantener compatibilidad con el frontend
      const transformedTestimonials = data.map((testimonial: any) => ({
        id: testimonial._id, // Usar _id como id para compatibilidad
        _id: testimonial._id,
        name: testimonial.name || 'Anónimo',
        role: testimonial.role || 'Cliente',
        content: testimonial.content || 'Sin contenido',
        rating: testimonial.rating || 5,
        is_visible: testimonial.is_visible || true,
        avatar: testimonial.avatar,
      }))
      setTestimonials(transformedTestimonials)
    } catch (err) {
      setError('Error al cargar testimonios')
      console.error('Error loading testimonials:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTestimonial = async (testimonialData: Omit<Testimonial, "id" | "is_visible">) => {
    setLoading(true)
    setError(null)
    try {
      const newTestimonial = await apiService.createTestimonial({
        ...testimonialData,
        is_visible: true,
      })
      
      // Agregar el nuevo testimonio a la lista
      const transformedTestimonial = {
        id: newTestimonial._id,
        _id: newTestimonial._id,
        ...testimonialData,
        is_visible: true,
      }
      setTestimonials(prev => [...prev, transformedTestimonial])
      return transformedTestimonial
    } catch (err) {
      setError('Error al crear testimonio')
      console.error('Error creating testimonial:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateTestimonial = async (id: string, testimonialData: Partial<Testimonial>) => {
    setLoading(true)
    setError(null)
    try {
      const updatedTestimonial = await apiService.updateTestimonial(id, testimonialData)
      
      // Actualizar el testimonio en la lista
      setTestimonials(prev => 
        prev.map(testimonial => 
          testimonial._id === id ? { ...testimonial, ...testimonialData } : testimonial
        )
      )
      return updatedTestimonial
    } catch (err) {
      setError('Error al actualizar testimonio')
      console.error('Error updating testimonial:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteTestimonial = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await apiService.deleteTestimonial(id)
      setTestimonials(prev => prev.filter(testimonial => testimonial._id !== id))
    } catch (err) {
      setError('Error al eliminar testimonio')
      console.error('Error deleting testimonial:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const toggleTestimonialVisibility = async (id: string) => {
    const testimonial = testimonials.find(t => t._id === id)
    if (!testimonial) return

    try {
      await updateTestimonial(id, { is_visible: !testimonial.is_visible })
    } catch (err) {
      console.error('Error toggling testimonial visibility:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const testimonialData = {
      ...formData,
      rating: Number.parseFloat(formData.rating),
    }

    try {
      if (editingTestimonial) {
        await updateTestimonial(editingTestimonial._id!, testimonialData)
      } else {
        await createTestimonial(testimonialData)
      }
      resetForm()
    } catch (err) {
      // Error ya manejado en las funciones individuales
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating.toString(),
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este testimonio?")) {
      try {
        await deleteTestimonial(id)
      } catch (err) {
        // Error ya manejado en deleteTestimonial
      }
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingTestimonial(null)
    setIsEditing(false)
    setError(null)
  }

  const openCreateForm = () => {
    setIsEditing(true)
    setEditingTestimonial(null)
    setFormData(initialFormData)
    setError(null)
  }

  return {
    // State
    testimonials,
    isEditing,
    editingTestimonial,
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
    toggleTestimonialVisibility,
    loadTestimonials,
  }
} 