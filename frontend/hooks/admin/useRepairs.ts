import { useState, useEffect } from "react"
import { apiService } from "../../lib/api"

export interface Repair {
  _id?: string
  id?: number
  service_name: string
  description: string
  price: number
  duration: string
  category: string
  is_available: boolean
  features: string[]
}

export interface RepairFormData {
  service_name: string
  description: string
  price: string
  duration: string
  category: string
  features: string
}

const initialFormData: RepairFormData = {
  service_name: "",
  description: "",
  price: "",
  duration: "",
  category: "",
  features: "",
}

export function useRepairs() {
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingRepair, setEditingRepair] = useState<Repair | null>(null)
  const [formData, setFormData] = useState<RepairFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadRepairs()
  }, [])

  const loadRepairs = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiService.getRepairs()
      // Transformar los datos para mantener compatibilidad con el frontend
      const transformedRepairs = data.map((repair: any) => ({
        id: repair._id, // Usar _id como id para compatibilidad
        _id: repair._id,
        service_name: repair.title || 'Servicio sin nombre',
        description: repair.description || 'Sin descripción',
        price: repair.price || 0,
        duration: repair.time || 'No especificado',
        category: repair.category || 'General',
        is_available: repair.is_available || true,
        features: repair.features || [],
      }))
      setRepairs(transformedRepairs)
    } catch (err) {
      setError('Error al cargar reparaciones')
      console.error('Error loading repairs:', err)
    } finally {
      setLoading(false)
    }
  }

  const createRepair = async (repairData: Omit<Repair, "id" | "is_available">) => {
    setLoading(true)
    setError(null)
    try {
      const newRepair = await apiService.createRepair({
        ...repairData,
        is_available: true,
      })
      
      // Agregar la nueva reparación a la lista
      const transformedRepair = {
        id: newRepair._id,
        _id: newRepair._id,
        ...repairData,
        is_available: true,
      }
      setRepairs(prev => [...prev, transformedRepair])
      return transformedRepair
    } catch (err) {
      setError('Error al crear reparación')
      console.error('Error creating repair:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateRepair = async (id: string, repairData: Partial<Repair>) => {
    setLoading(true)
    setError(null)
    try {
      const updatedRepair = await apiService.updateRepair(id, repairData)
      
      // Actualizar la reparación en la lista
      setRepairs(prev => 
        prev.map(repair => 
          repair._id === id ? { ...repair, ...repairData } : repair
        )
      )
      return updatedRepair
    } catch (err) {
      setError('Error al actualizar reparación')
      console.error('Error updating repair:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteRepair = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await apiService.deleteRepair(id)
      setRepairs(prev => prev.filter(repair => repair._id !== id))
    } catch (err) {
      setError('Error al eliminar reparación')
      console.error('Error deleting repair:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const toggleRepairAvailability = async (id: string) => {
    const repair = repairs.find(r => r._id === id)
    if (!repair) return

    try {
      await updateRepair(id, { is_available: !repair.is_available })
    } catch (err) {
      console.error('Error toggling repair availability:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const repairData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
    }

    try {
      if (editingRepair) {
        await updateRepair(editingRepair._id!, repairData)
      } else {
        await createRepair(repairData)
      }
      resetForm()
    } catch (err) {
      // Error ya manejado en las funciones individuales
    }
  }

  const handleEdit = (repair: Repair) => {
    setEditingRepair(repair)
    setFormData({
      service_name: repair.service_name,
      description: repair.description,
      price: repair.price.toString(),
      duration: repair.duration,
      category: repair.category,
      features: repair.features.join(', '),
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta reparación?")) {
      try {
        await deleteRepair(id)
      } catch (err) {
        // Error ya manejado en deleteRepair
      }
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingRepair(null)
    setIsEditing(false)
    setError(null)
  }

  const openCreateForm = () => {
    setIsEditing(true)
    setEditingRepair(null)
    setFormData(initialFormData)
    setError(null)
  }

  return {
    // State
    repairs,
    isEditing,
    editingRepair,
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
    toggleRepairAvailability,
    loadRepairs,
  }
}

export interface DateUser {
  _id?: string
  service_name: string
  description: string
  price: number
  duration: string
  category: string
  features: string[]
}

export interface DateUserFormData {
  service_name: string
  description: string
  price: string
  duration: string
  category: string
  features: string
}

const initialDateUserFormData: DateUserFormData = {
  service_name: "",
  description: "",
  price: "",
  duration: "",
  category: "",
  features: "",
}

export function useDateUser() {
  const [dateUsers, setDateUsers] = useState<DateUser[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingDateUser, setEditingDateUser] = useState<DateUser | null>(null)
  const [formData, setFormData] = useState<DateUserFormData>(initialDateUserFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadDateUsers()
  }, [])

  const loadDateUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiService.getDateUsers()
      setDateUsers(data)
    } catch (err) {
      setError('Error al cargar registros')
      console.error('Error loading date users:', err)
    } finally {
      setLoading(false)
    }
  }

  const createDateUser = async (dateUserData: Omit<DateUser, "_id">) => {
    setLoading(true)
    setError(null)
    try {
      const newDateUser = await apiService.createDateUser(dateUserData)
      setDateUsers(prev => [...prev, newDateUser])
      return newDateUser
    } catch (err) {
      setError('Error al crear registro')
      console.error('Error creating date user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateDateUser = async (id: string, dateUserData: Partial<DateUser>) => {
    setLoading(true)
    setError(null)
    try {
      const updatedDateUser = await apiService.updateDateUser(id, dateUserData)
      setDateUsers(prev => prev.map(user => user._id === id ? { ...user, ...dateUserData } : user))
      return updatedDateUser
    } catch (err) {
      setError('Error al actualizar registro')
      console.error('Error updating date user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteDateUser = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await apiService.deleteDateUser(id)
      setDateUsers(prev => prev.filter(user => user._id !== id))
    } catch (err) {
      setError('Error al eliminar registro')
      console.error('Error deleting date user:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const dateUserData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      features: formData.features.split(',').map(f => f.trim()).filter(f => f),
    }
    try {
      if (editingDateUser) {
        await updateDateUser(editingDateUser._id!, dateUserData)
      } else {
        await createDateUser(dateUserData)
      }
      resetForm()
    } catch (err) {
      // Error ya manejado
    }
  }

  const handleEdit = (dateUser: DateUser) => {
    setEditingDateUser(dateUser)
    setFormData({
      service_name: dateUser.service_name,
      description: dateUser.description,
      price: dateUser.price.toString(),
      duration: dateUser.duration,
      category: dateUser.category,
      features: dateUser.features.join(', '),
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setFormData(initialDateUserFormData)
    setEditingDateUser(null)
    setIsEditing(false)
    setError(null)
  }

  const openCreateForm = () => {
    setIsEditing(true)
    setEditingDateUser(null)
    setFormData(initialDateUserFormData)
    setError(null)
  }

  return {
    dateUsers,
    isEditing,
    editingDateUser,
    formData,
    loading,
    error,
    setFormData,
    handleSubmit,
    handleEdit,
    deleteDateUser,
    resetForm,
    openCreateForm,
    loadDateUsers,
  }
} 