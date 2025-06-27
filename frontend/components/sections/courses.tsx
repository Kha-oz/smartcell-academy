"use client"

import { useCourses } from "@/hooks/admin/useCourses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Zap, Laptop, Monitor, Clock, Users, MapPin, Loader2, Star, User } from "lucide-react"

export default function Courses() {
  const { courses, loading, error } = useCourses()

  const openWhatsApp = (courseName: string) => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = `Hola! Me interesa el curso de ${courseName}. ¿Podrían darme más información?`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  // Función para obtener el icono según el título del curso
  const getCourseIcon = (title?: string) => {
    if (!title) return <Cpu className="h-6 w-6" /> // Icono por defecto si no hay título
    
    const lowerTitle = title.toLowerCase()
    if (lowerTitle.includes('robótica') || lowerTitle.includes('robot')) return <Cpu className="h-6 w-6" />
    if (lowerTitle.includes('electrónica') || lowerTitle.includes('digital')) return <Zap className="h-6 w-6" />
    if (lowerTitle.includes('laptop') || lowerTitle.includes('portátil')) return <Laptop className="h-6 w-6" />
    if (lowerTitle.includes('pc') || lowerTitle.includes('computadora')) return <Monitor className="h-6 w-6" />
    return <Cpu className="h-6 w-6" /> // Icono por defecto
  }

  if (loading) {
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
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Cargando cursos...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
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
          <div className="text-center py-8">
            <p className="text-red-500">Error al cargar los cursos: {error}</p>
          </div>
        </div>
      </section>
    )
  }

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
          {courses.length === 0 ? (
            <div className="col-span-2 text-center text-gray-400">Próximamente cursos disponibles...</div>
          ) : (
            courses.map((course) => (
              <Card key={course._id} className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      {getCourseIcon(course.title)}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-black">{course.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {course.level}
                      </Badge>
                      {!course.is_available && (
                        <Badge variant="destructive" className="mt-1 ml-2">
                          No disponible
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">{course.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">{course.rating}/5</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600">Presencial/Virtual</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-2xl font-bold text-green-600">${course.price}</div>
                    <Button 
                      className="bg-black text-white hover:bg-gray-800" 
                      onClick={() => openWhatsApp(course.title)}
                      disabled={!course.is_available}
                    >
                      {course.is_available ? "Inscribirse" : "No disponible"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

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
    </section>
  )
}
