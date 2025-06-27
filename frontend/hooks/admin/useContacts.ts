import { useState, useEffect } from "react"
import { apiService } from "../../lib/api"

export interface Contact {
  _id?: string
  id?: number
  name: string
  email: string
  phone: string
  message: string
  subject: string
  status: string
  created_at: string
  is_read: boolean
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  subject: string
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  subject: "",
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [formData, setFormData] = useState<ContactFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadContacts()
  }, [])

  const loadContacts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiService.getContacts()
      // Transformar los datos para mantener compatibilidad con el frontend
      const transformedContacts = data.map((contact: any) => ({
        id: contact._id, // Usar _id como id para compatibilidad
        _id: contact._id,
        name: contact.name || 'Sin nombre',
        email: contact.email || 'sin@email.com',
        phone: contact.phone || 'Sin teléfono',
        message: contact.message || 'Sin mensaje',
        subject: contact.subject || 'Sin asunto',
        status: contact.status || 'pending',
        created_at: contact.created_at || new Date().toISOString(),
      }))
      setContacts(transformedContacts)
    } catch (err) {
      setError('Error al cargar contactos')
      console.error('Error loading contacts:', err)
    } finally {
      setLoading(false)
    }
  }

  const createContact = async (contactData: Omit<Contact, "id" | "created_at" | "is_read">) => {
    setLoading(true)
    setError(null)
    try {
      const newContact = await apiService.createContact({
        ...contactData,
        created_at: new Date(),
        is_read: false,
      })
      
      // Agregar el nuevo contacto a la lista
      const transformedContact = {
        id: newContact._id,
        _id: newContact._id,
        ...contactData,
        created_at: new Date(),
        is_read: false,
      }
      setContacts(prev => [...prev, transformedContact])
      return transformedContact
    } catch (err) {
      setError('Error al crear contacto')
      console.error('Error creating contact:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateContact = async (id: string, contactData: Partial<Contact>) => {
    setLoading(true)
    setError(null)
    try {
      const updatedContact = await apiService.updateContact(id, contactData)
      
      // Actualizar el contacto en la lista
      setContacts(prev => 
        prev.map(contact => 
          contact._id === id ? { ...contact, ...contactData } : contact
        )
      )
      return updatedContact
    } catch (err) {
      setError('Error al actualizar contacto')
      console.error('Error updating contact:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteContact = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await apiService.deleteContact(id)
      setContacts(prev => prev.filter(contact => contact._id !== id))
    } catch (err) {
      setError('Error al eliminar contacto')
      console.error('Error deleting contact:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      await updateContact(id, { is_read: true })
    } catch (err) {
      console.error('Error marking contact as read:', err)
    }
  }

  const updateContactStatus = async (id: string, status: string) => {
    try {
      await updateContact(id, { status })
    } catch (err) {
      console.error('Error updating contact status:', err)
      throw err
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingContact) {
        await updateContact(editingContact._id!, formData)
      } else {
        await createContact(formData)
      }
      resetForm()
    } catch (err) {
      // Error ya manejado en las funciones individuales
    }
  }

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact)
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      subject: contact.subject,
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
      try {
        await deleteContact(id)
      } catch (err) {
        // Error ya manejado en deleteContact
      }
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingContact(null)
    setIsEditing(false)
    setError(null)
  }

  const openCreateForm = () => {
    setIsEditing(true)
    setEditingContact(null)
    setFormData(initialFormData)
    setError(null)
  }

  return {
    // State
    contacts,
    isEditing,
    editingContact,
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
    markAsRead,
    updateContactStatus,
    loadContacts,
  }
} 