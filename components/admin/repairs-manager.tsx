"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Wrench, Phone, Mail, Calendar, Save, X } from "lucide-react"

interface Repair {
  id: number
  client_name: string
  client_email: string
  client_phone: string
  device_type: string
  device_brand: string
  device_model: string
  problem_description: string
  estimated_cost: number
  status: "recibido" | "diagnostico" | "reparando" | "completado" | "entregado"
  created_at: string
}

export default function RepairsManager() {
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingRepair, setEditingRepair] = useState<Repair | null>(null)
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    device_type: "celular",
    device_brand: "",
    device_model: "",
    problem_description: "",
    estimated_cost: "",
  })

  useEffect(() => {
    loadRepairs()
  }, [])

  const loadRepairs = () => {
    // Datos de ejemplo (reemplazar con API real)
    const mockRepairs: Repair[] = [
      {
        id: 1,
        client_name: "Ana Herrera",
        client_email: "ana@email.com",
        client_phone: "+1234567893",
        device_type: "laptop",
        device_brand: "HP",
        device_model: "Pavilion 15",
        problem_description: "No enciende, posible problema con la fuente de poder",
        estimated_cost: 85,
        status: "diagnostico",
        created_at: "2024-01-15T08:30:00Z",
      },
      {
        id: 2,
        client_name: "Roberto Silva",
        client_email: "roberto@email.com",
        client_phone: "+1234567894",
        device_type: "celular",
        device_brand: "Samsung",
        device_model: "Galaxy S21",
        problem_description: "Pantalla rota, táctil no responde",
        estimated_cost: 120,
        status: "reparando",
        created_at: "2024-01-14T14:20:00Z",
      },
      {
        id: 3,
        client_name: "Patricia López",
        client_email: "patricia@email.com",
        client_phone: "+1234567895",
        device_type: "pc",
        device_brand: "Dell",
        device_model: "OptiPlex 7090",
        problem_description: "Lentitud extrema, posible virus",
        estimated_cost: 45,
        status: "completado",
        created_at: "2024-01-13T11:15:00Z",
      },
    ]
    setRepairs(mockRepairs)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const repairData = {
      ...formData,
      estimated_cost: Number.parseFloat(formData.estimated_cost) || 0,
    }

    if (editingRepair) {
      // Actualizar reparación existente
      setRepairs(repairs.map((repair) => (repair.id === editingRepair.id ? { ...repair, ...repairData } : repair)))
    } else {
      // Crear nueva reparación
      const newRepair: Repair = {
        id: Date.now(),
        ...repairData,
        status: "recibido",
        created_at: new Date().toISOString(),
      }
      setRepairs([...repairs, newRepair])
    }

    resetForm()
  }

  const handleEdit = (repair: Repair) => {
    setEditingRepair(repair)
    setFormData({
      client_name: repair.client_name,
      client_email: repair.client_email,
      client_phone: repair.client_phone,
      device_type: repair.device_type,
      device_brand: repair.device_brand,
      device_model: repair.device_model,
      problem_description: repair.problem_description,
      estimated_cost: repair.estimated_cost.toString(),
    })
    setIsEditing(true)
  }

  const updateStatus = (id: number, newStatus: Repair["status"]) => {
    setRepairs(repairs.map((repair) => (repair.id === id ? { ...repair, status: newStatus } : repair)))
  }

  const resetForm = () => {
    setFormData({
      client_name: "",
      client_email: "",
      client_phone: "",
      device_type: "celular",
      device_brand: "",
      device_model: "",
      problem_description: "",
      estimated_cost: "",
    })
    setEditingRepair(null)
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recibido":
        return "default"
      case "diagnostico":
        return "secondary"
      case "reparando":
        return "destructive"
      case "completado":
        return "outline"
      case "entregado":
        return "default"
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

  const openWhatsApp = (phone: string, name: string, deviceType: string) => {
    const message = `Hola ${name}, te contactamos desde SMARTCELL ACADEMY sobre la reparación de tu ${deviceType}.`
    const url = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Gestión de Reparaciones</h2>
        <Button onClick={() => setIsEditing(true)} className="bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Reparación
        </Button>
      </div>

      {/* Formulario */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingRepair ? "Editar Reparación" : "Nueva Reparación"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="client_name">Nombre del Cliente</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client_email">Email</Label>
                  <Input
                    id="client_email"
                    type="email"
                    value={formData.client_email}
                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="client_phone">Teléfono</Label>
                  <Input
                    id="client_phone"
                    value={formData.client_phone}
                    onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="device_type">Tipo de Dispositivo</Label>
                  <Select
                    value={formData.device_type}
                    onValueChange={(value) => setFormData({ ...formData, device_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="celular">Celular</SelectItem>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="pc">PC</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="device_brand">Marca</Label>
                  <Input
                    id="device_brand"
                    value={formData.device_brand}
                    onChange={(e) => setFormData({ ...formData, device_brand: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="device_model">Modelo</Label>
                  <Input
                    id="device_model"
                    value={formData.device_model}
                    onChange={(e) => setFormData({ ...formData, device_model: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="estimated_cost">Costo Estimado ($)</Label>
                  <Input
                    id="estimated_cost"
                    type="number"
                    step="0.01"
                    value={formData.estimated_cost}
                    onChange={(e) => setFormData({ ...formData, estimated_cost: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="problem_description">Descripción del Problema</Label>
                <Textarea
                  id="problem_description"
                  value={formData.problem_description}
                  onChange={(e) => setFormData({ ...formData, problem_description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  <Save className="h-4 w-4 mr-2" />
                  {editingRepair ? "Actualizar" : "Crear"} Reparación
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

      {/* Lista de Reparaciones */}
      <div className="grid gap-4">
        {repairs.map((repair) => (
          <Card key={repair.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Wrench className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{repair.client_name}</h3>
                    <p className="text-sm text-gray-500">
                      {repair.device_brand} {repair.device_model} ({repair.device_type})
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={getStatusColor(repair.status) as any}>
                    {repair.status.charAt(0).toUpperCase() + repair.status.slice(1)}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(repair.created_at)}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">{repair.problem_description}</p>
                {repair.estimated_cost > 0 && (
                  <p className="text-sm text-green-600 font-semibold mt-2">Costo estimado: ${repair.estimated_cost}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {repair.client_email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {repair.client_phone}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openWhatsApp(repair.client_phone, repair.client_name, repair.device_type)}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <Phone className="h-4 w-4 mr-1" />
                    Contactar
                  </Button>

                  <Select
                    value={repair.status}
                    onValueChange={(value: Repair["status"]) => updateStatus(repair.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recibido">Recibido</SelectItem>
                      <SelectItem value="diagnostico">Diagnóstico</SelectItem>
                      <SelectItem value="reparando">Reparando</SelectItem>
                      <SelectItem value="completado">Completado</SelectItem>
                      <SelectItem value="entregado">Entregado</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm" onClick={() => handleEdit(repair)}>
                    <Edit className="h-4 w-4" />
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
