"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Laptop, Monitor, Clock, CheckCircle, Star } from "lucide-react"

export default function Repairs() {
  const openWhatsApp = (service: string) => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = `Hola! Necesito el servicio de ${service}. ¿Podrían ayudarme?`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const services = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Reparación de Celulares",
      description: "Reparamos pantallas, baterías, cámaras, puertos de carga y problemas de software.",
      time: "1-3 días",
      features: ["Pantallas", "Baterías", "Cámaras", "Software", "Puertos"],
      price: "Desde $25",
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Reparación de Laptops",
      description: "Diagnóstico y reparación de laptops, cambio de componentes y optimización.",
      time: "2-5 días",
      features: ["Pantallas", "Teclados", "Motherboard", "RAM", "Disco Duro"],
      price: "Desde $50",
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Reparación de PCs",
      description: "Mantenimiento, actualización y reparación de computadoras de escritorio.",
      time: "1-3 días",
      features: ["Hardware", "Software", "Limpieza", "Actualización", "Optimización"],
      price: "Desde $30",
    },
  ]

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
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg text-green-600">{service.icon}</div>
                  <div>
                    <CardTitle className="text-xl text-black">{service.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{service.time}</span>
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
                  <div className="text-xl font-bold text-green-600">{service.price}</div>
                  <Button className="bg-black text-white hover:bg-gray-800" onClick={() => openWhatsApp(service.title)}>
                    Solicitar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
