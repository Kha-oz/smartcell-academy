"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = `Hola! Mi nombre es ${formData.name}.
    
Email: ${formData.email}
Teléfono: ${formData.phone}
Asunto: ${formData.subject}

Mensaje: ${formData.message}`

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const openWhatsApp = () => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = "Hola! Me gustaría obtener más información sobre sus servicios."
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Contáctanos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes preguntas sobre nuestros cursos o servicios? Estamos aquí para ayudarte. Contáctanos por cualquiera
            de nuestros medios disponibles.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Información de Contacto */}
          <div className="space-y-8">
            <Card className="border-2 hover:border-green-500 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-black">
                  <MapPin className="h-6 w-6 text-green-500" />
                  <span>Ubicación</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Av. Tecnología 123, Centro Comercial Tech Plaza
                  <br />
                  Local 45-46, Ciudad, País
                  <br />
                  Código Postal: 12345
                </p>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-gray-500">Mapa del local</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 hover:border-green-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-black mb-2">Teléfono</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-gray-600">+1 (555) 987-6543</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-green-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-black mb-2">Email</h3>
                  <p className="text-gray-600">info@smartcellacademy.com</p>
                  <p className="text-gray-600">cursos@smartcellacademy.com</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 hover:border-green-500 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-green-500" />
                  <h3 className="font-semibold text-black">Horarios de Atención</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos:</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button size="lg" className="bg-green-500 text-white hover:bg-green-600 px-8 py-3" onClick={openWhatsApp}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Contactar por WhatsApp
              </Button>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <Card className="border-2 hover:border-green-500 transition-colors">
            <CardHeader>
              <CardTitle className="text-black">Envíanos un Mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Nombre Completo *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-gray-300 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">Teléfono *</label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="border-gray-300 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Email *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-gray-300 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Asunto *</label>
                  <Input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="border-gray-300 focus:border-green-500"
                    placeholder="Ej: Consulta sobre curso de robótica"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-2">Mensaje *</label>
                  <Textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-gray-300 focus:border-green-500"
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                  />
                </div>

                <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 py-3">
                  Enviar Mensaje
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
