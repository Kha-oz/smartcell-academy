"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageCircle, Phone, Mail, Calendar, Search, Filter } from "lucide-react"

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string
  status: "nuevo" | "contactado" | "resuelto"
  created_at: string
}

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("todos")

  useEffect(() => {
    loadContacts()
  }, [])

  useEffect(() => {
    filterContacts()
  }, [contacts, searchTerm, statusFilter])

  const loadContacts = () => {
    // Datos de ejemplo (reemplazar con API real)
    const mockContacts: Contact[] = [
      {
        id: 1,
        name: "Carlos Mendoza",
        email: "carlos@email.com",
        phone: "+1234567890",
        subject: "Consulta sobre curso de robótica",
        message: "Hola, me interesa el curso de robótica avanzada. ¿Podrían darme más información sobre horarios?",
        status: "nuevo",
        created_at: "2024-01-15T10:30:00Z",
      },
      {
        id: 2,
        name: "María González",
        email: "maria@email.com",
        phone: "+1234567891",
        subject: "Reparación de laptop",
        message: "Mi laptop no enciende, necesito una cotización para la reparación.",
        status: "contactado",
        created_at: "2024-01-14T15:45:00Z",
      },
      {
        id: 3,
        name: "Luis Rodríguez",
        email: "luis@email.com",
        phone: "+1234567892",
        subject: "Compra de herramientas",
        message: "Quiero comprar el kit de soldadura profesional. ¿Está disponible?",
        status: "resuelto",
        created_at: "2024-01-13T09:20:00Z",
      },
    ]
    setContacts(mockContacts)
  }

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

  const updateStatus = (id: number, newStatus: Contact["status"]) => {
    setContacts(contacts.map((contact) => (contact.id === id ? { ...contact, status: newStatus } : contact)))
  }

  const openWhatsApp = (phone: string, name: string) => {
    const message = `Hola ${name}, te contactamos desde SMARTCELL ACADEMY en respuesta a tu consulta.`
    const url = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "nuevo":
        return "default"
      case "contactado":
        return "secondary"
      case "resuelto":
        return "outline"
      default:
        return "default"
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
          <Badge variant="default">{contacts.filter((c) => c.status === "nuevo").length} Nuevos</Badge>
          <Badge variant="secondary">{contacts.filter((c) => c.status === "contactado").length} En proceso</Badge>
          <Badge variant="outline">{contacts.filter((c) => c.status === "resuelto").length} Resueltos</Badge>
        </div>
      </div>

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
                  <SelectItem value="nuevo">Nuevos</SelectItem>
                  <SelectItem value="contactado">Contactados</SelectItem>
                  <SelectItem value="resuelto">Resueltos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Contactos */}
      <div className="grid gap-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">{contact.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(contact.status) as any}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
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

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openWhatsApp(contact.phone, contact.name)}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    WhatsApp
                  </Button>

                  <Select
                    value={contact.status}
                    onValueChange={(value: Contact["status"]) => updateStatus(contact.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuevo">Nuevo</SelectItem>
                      <SelectItem value="contactado">Contactado</SelectItem>
                      <SelectItem value="resuelto">Resuelto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay contactos</h3>
            <p className="text-gray-500">No se encontraron contactos que coincidan con los filtros aplicados.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
