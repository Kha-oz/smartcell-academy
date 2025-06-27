"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Wrench, Phone, Mail, Calendar, Save, X, RefreshCw, Loader2 } from "lucide-react"
import { useDateUser } from "@/hooks/admin/useRepairs"

export default function RepairsManager() {
  const {
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
  } = useDateUser()

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
        <div className="flex gap-2">
          <Button 
            onClick={loadDateUsers} 
            variant="outline" 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Recargar
          </Button>
          <Button onClick={openCreateForm} className="bg-green-500 hover:bg-green-600">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Reparación
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Formulario */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingDateUser ? "Editar Reparación" : "Nueva Reparación"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="service_name">Nombre del Servicio</Label>
                  <Input
                    id="service_name"
                    value={formData.service_name}
                    onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duración</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="features">Características (separadas por coma)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción del Problema</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="price">Costo Estimado ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {editingDateUser ? "Actualizar" : "Crear"} Reparación
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Reparaciones */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-black">Reparaciones Registradas</h3>
        {loading && dateUsers.length === 0 ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Cargando reparaciones...</span>
          </div>
        ) : dateUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay reparaciones registradas
          </div>
        ) : (
          dateUsers.map((repair) => (
            <Card key={repair._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Wrench className="h-5 w-5 text-gray-500" />
                      <h4 className="text-lg font-semibold text-black">{repair.service_name}</h4>
                      <Badge variant={getStatusColor(repair.service_name) as any}>{repair.service_name}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <strong>Duración:</strong> {repair.duration}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Categoría:</strong> {repair.category}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Características:</strong> {repair.features.join(', ')}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600">
                          <strong>Costo estimado:</strong> ${repair.price}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{repair.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(repair)}
                      disabled={loading}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => deleteDateUser(repair._id!)}
                      disabled={loading}
                    >
                      <X className="h-4 w-4" />
                    </Button>
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
