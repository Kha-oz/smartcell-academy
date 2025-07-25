"use client"

import { useRepairs } from "@/hooks/admin/useRepairs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Laptop, Monitor, Clock, CheckCircle, Star, Loader2, Wrench } from "lucide-react"

export default function Repairs() {
  const { repairs, loading, error } = useRepairs()
  
  const openWhatsApp = (service: string) => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = `Hola! Necesito el servicio de ${service}. ¿Podrían ayudarme?`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  
  // Función para obtener el icono según la categoría del servicio
  const getServiceIcon = (category?: string) => {
    if (!category) return <Wrench className="h-8 w-8" /> // Icono por defecto si no hay categoría
    
    const lowerCategory = category.toLowerCase()
    if (lowerCategory.includes('celular') || lowerCategory.includes('smartphone') || lowerCategory.includes('móvil')) {
      return <Smartphone className="h-8 w-8" />
    }
    if (lowerCategory.includes('laptop') || lowerCategory.includes('portátil')) {
      return <Laptop className="h-8 w-8" />
    }
    if (lowerCategory.includes('pc') || lowerCategory.includes('computadora') || lowerCategory.includes('desktop')) {
      return <Monitor className="h-8 w-8" />
    }
    return <Wrench className="h-8 w-8" /> // Icono por defecto
  }

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
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Cargando servicios...</span>
          </div>
        </div>
      </section>
    )
  }

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
          <div className="text-center py-8">
            <p className="text-red-500">Error al cargar servicios: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Filtrar solo servicios disponibles
  const availableRepairs = repairs.filter(repair => repair.is_available)

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

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {availableRepairs.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400">Próximamente servicios disponibles...</div>
          ) : (
            availableRepairs.map((repair) => (
              <Card key={repair._id} className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      {getServiceIcon(repair.category)}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-black">{repair.service_name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{repair.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{repair.description}</p>

                  {repair.features && repair.features.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-black">Servicios incluidos:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {repair.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-xl font-bold text-green-600">${repair.price}</div>
                    <Button 
                      className="bg-black text-white hover:bg-gray-800" 
                      onClick={() => openWhatsApp(repair.service_name)}
                    >
                      Solicitar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

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
