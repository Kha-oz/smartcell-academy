"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Laptop, Monitor, Clock, CheckCircle, Star, Loader2 } from "lucide-react"

// Tipo para los servicios de reparación
interface RepairService {
  id: number
  title: string
  description: string
  time_estimate: string
  base_price: number
  price_display: string
  icon_name: string
  is_active: boolean
  created_at: string
  updated_at: string
  features: string[]
}

// Mapeo de iconos por nombre
const getServiceIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'smartphone':
      return <Smartphone className="h-8 w-8" />
    case 'laptop':
      return <Laptop className="h-8 w-8" />
    case 'monitor':
      return <Monitor className="h-8 w-8" />
    default:
      return <Smartphone className="h-8 w-8" />
  }
}

export default function Repairs() {
  const [services, setServices] = useState<RepairService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Función para obtener servicios de la API
  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/repair-services')
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setServices(data)
    } catch (err) {
      console.error('Error fetching repair services:', err)
      setError(err instanceof Error ? err.message : 'Error al cargar los servicios')
    } finally {
      setLoading(false)
    }
  }

  // Cargar servicios al montar el componente
  useEffect(() => {
    fetchServices()
  }, [])

  const openWhatsApp = (service: string) => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = `Hola! Necesito el servicio de ${service}. ¿Podrían ayudarme?`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  // Mostrar loading
  if (loading) {
    return (
      <section id="reparaciones" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Servicios de Reparación</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Servicios profesionales de reparación con garantía y los mejores tiempos de respuesta. Diagnóstico gratuito
              en todos nuestros servicios.
            </p>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">Cargando servicios...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Mostrar error
  if (error) {
    return (
      <section id="reparaciones" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Servicios de Reparación</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Servicios profesionales de reparación con garantía y los mejores tiempos de respuesta. Diagnóstico gratuito
              en todos nuestros servicios.
            </p>
          </div>
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <Button onClick={fetchServices} className="bg-green-500 hover:bg-green-600">
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="reparaciones" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Servicios de Reparación</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Servicios profesionales de reparación con garantía y los mejores tiempos de respuesta. Diagnóstico gratuito
            en todos nuestros servicios.
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No hay servicios disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      {getServiceIcon(service.icon_name)}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-black">{service.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{service.time_estimate}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{service.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-black">Servicios incluidos:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-xl font-bold text-green-600">{service.price_display}</div>
                    <Button 
                      className="bg-black text-white hover:bg-gray-800" 
                      onClick={() => openWhatsApp(service.title)}
                    >
                      Solicitar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-black mb-4">¿Por qué elegirnos?</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Garantía</h4>
              <p className="text-sm text-gray-600">3 meses de garantía en todas las reparaciones</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Rapidez</h4>
              <p className="text-sm text-gray-600">Tiempos de entrega competitivos</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Diagnóstico</h4>
              <p className="text-sm text-gray-600">Diagnóstico gratuito y sin compromiso</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Experiencia</h4>
              <p className="text-sm text-gray-600">Más de 1000 reparaciones exitosas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
