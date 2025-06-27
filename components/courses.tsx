"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Zap, Laptop, Monitor, Clock, Users, MapPin, Loader2 } from "lucide-react"

// Tipo para los cursos
interface Course {
  id: number
  name: string
  description: string
  price: number
  duration: string
  level: "Básico" | "Intermedio" | "Avanzado"
  modality: "Presencial" | "Virtual" | "Presencial/Virtual"
  max_students: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Mapeo de iconos por nombre del curso
const getCourseIcon = (courseName: string) => {
  const name = courseName.toLowerCase()
  if (name.includes("robótica") || name.includes("robot")) return <Cpu className="h-8 w-8" />
  if (name.includes("electrónica") || name.includes("digital")) return <Zap className="h-8 w-8" />
  if (name.includes("laptop")) return <Laptop className="h-8 w-8" />
  if (name.includes("pc") || name.includes("computadora")) return <Monitor className="h-8 w-8" />
  return <Cpu className="h-8 w-8" /> // Icono por defecto
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Función para obtener cursos de la API
  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/courses')
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setCourses(data)
    } catch (err) {
      console.error('Error fetching courses:', err)
      setError(err instanceof Error ? err.message : 'Error al cargar los cursos')
    } finally {
      setLoading(false)
    }
  }

  // Cargar cursos al montar el componente
  useEffect(() => {
    fetchCourses()
  }, [])

  const openWhatsApp = (courseName: string) => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = `Hola! Me interesa el curso de ${courseName}. ¿Podrían darme más información?`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  // Función para formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  // Mostrar loading
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
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-green-500 mx-auto mb-4" />
              <p className="text-gray-600">Cargando cursos...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Mostrar error
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
          
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-red-500 mb-4">Error: {error}</p>
              <Button onClick={fetchCourses} className="bg-green-500 hover:bg-green-600">
                Reintentar
              </Button>
            </div>
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

        {courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No hay cursos disponibles en este momento.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-lg text-green-600">
                      {getCourseIcon(course.name)}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-black">{course.name}</CardTitle>
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
                    <div className="text-2xl font-bold text-green-600">{formatPrice(course.price)}</div>
                    <Button 
                      className="bg-black text-white hover:bg-gray-800" 
                      onClick={() => openWhatsApp(course.name)}
                    >
                      Inscribirse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

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
