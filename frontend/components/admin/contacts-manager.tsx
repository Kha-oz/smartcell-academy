"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Phone, Mail, Calendar, Search, Filter, RefreshCw, Loader2 } from "lucide-react"
import { useContacts } from "@/hooks/admin/useContacts"

export default function ContactsManager() {
  const {
    contacts,
    loading,
    error,
    updateContactStatus,
    loadContacts,
  } = useContacts()

  const [filteredContacts, setFilteredContacts] = useState(contacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  useEffect(() => {
    filterContacts()
  }, [contacts, searchTerm, statusFilter])

  const filterContacts = () => {
    let filtered = contacts

    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "todos") {
      filtered = filtered.filter((contact) => contact.status === statusFilter)
    }

    setFilteredContacts(filtered)
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateContactStatus(id, newStatus)
    } catch (err) {
      console.error('Error updating contact status:', err)
    }
  }

  const openWhatsApp = (phone: string, name: string) => {
    const message = `Hola ${name}, te contactamos desde SMARTCELL ACADEMY en respuesta a tu consulta.`
    const url = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "default"
      case "contacted":
        return "secondary"
      case "resolved":
        return "outline"
      default:
        return "default"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Nuevo"
      case "contacted":
        return "Contactado"
      case "resolved":
        return "Resuelto"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Gestión de Contactos</h2>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={loadContacts} 
            variant="outline" 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Recargar
          </Button>
          <Badge variant="default">{contacts.filter((c) => c.status === "pending").length} Nuevos</Badge>
          <Badge variant="secondary">{contacts.filter((c) => c.status === "contacted").length} En proceso</Badge>
          <Badge variant="outline">{contacts.filter((c) => c.status === "resolved").length} Resueltos</Badge>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre, email o asunto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pending">Nuevos</SelectItem>
                  <SelectItem value="contacted">Contactados</SelectItem>
                  <SelectItem value="resolved">Resueltos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contactos */}
      <div className="space-y-4">
        {loading && contacts.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Cargando contactos...</span>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay contactos que coincidan con los filtros
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <Card key={contact._id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">{contact.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black">{contact.name}</h3>
                      <p className="text-sm text-gray-500">{contact.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(contact.status) as any}>
                      {getStatusText(contact.status)}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(contact.created_at)}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600">{contact.message}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {contact.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {contact.phone}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openWhatsApp(contact.phone, contact.name)}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Contactar
                    </Button>

                    <Select
                      value={contact.status}
                      onValueChange={(value) => updateStatus(contact._id!, value)}
                      disabled={loading}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Nuevo</SelectItem>
                        <SelectItem value="contacted">Contactado</SelectItem>
                        <SelectItem value="resolved">Resuelto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}


