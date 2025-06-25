"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Zap, Laptop, Monitor, Clock, Users, MapPin } from "lucide-react"

export default function Courses() {
  const openWhatsApp = (courseName: string) => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = `Hola! Me interesa el curso de ${courseName}. ¿Podrían darme más información?`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const courses = [
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Robótica Avanzada",
      description:
        "Aprende a diseñar, programar y construir robots desde cero. Incluye Arduino, sensores y actuadores.",
      duration: "3 meses",
      modality: "Presencial/Virtual",
      price: "$299",
      level: "Intermedio",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Electrónica Digital",
      description: "Domina los fundamentos de la electrónica digital, circuitos integrados y microcontroladores.",
      duration: "2 meses",
      modality: "Presencial/Virtual",
      price: "$249",
      level: "Básico",
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Reparación de Laptops",
      description: "Técnicas profesionales para diagnóstico y reparación de laptops. Incluye soldadura SMD.",
      duration: "6 semanas",
      modality: "Presencial",
      price: "$199",
      level: "Intermedio",
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Reparación de PCs",
      description: "Mantenimiento, diagnóstico y reparación de computadoras de escritorio y servidores.",
      duration: "4 semanas",
      modality: "Presencial/Virtual",
      price: "$149",
      level: "Básico",
    },
  ]

  return (
    <section id="cursos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Nuestros Cursos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Programas especializados diseñados para formar profesionales competentes en las tecnologías más demandadas
            del mercado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {courses.map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
              <CardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg text-green-600">{course.icon}</div>
                  <div>
                    <CardTitle className="text-xl text-black">{course.title}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {course.level}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">{course.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600">{course.modality}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-2xl font-bold text-green-600">{course.price}</div>
                  <Button className="bg-black text-white hover:bg-gray-800" onClick={() => openWhatsApp(course.title)}>
                    Inscribirse
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">¿Por qué elegir nuestros cursos?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="font-semibold text-black">Grupos Pequeños</div>
                <div className="text-sm text-gray-600">Máximo 10 estudiantes</div>
              </div>
              <div className="text-center">
                <Zap className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="font-semibold text-black">Práctica Real</div>
                <div className="text-sm text-gray-600">80% práctica, 20% teoría</div>
              </div>
              <div className="text-center">
                <Badge className="h-8 w-8 text-green-500 mx-auto mb-2 rounded-full flex items-center justify-center">
                  ✓
                </Badge>
                <div className="font-semibold text-black">Certificación</div>
                <div className="text-sm text-gray-600">Certificado oficial</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
