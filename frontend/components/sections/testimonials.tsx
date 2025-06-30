"use client"

import { useTestimonials } from "@/hooks/admin/useTestimonials"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, Loader2 } from "lucide-react"

export default function Testimonials() {
  const { testimonials, loading, error } = useTestimonials()

  if (loading) {
    return (
      <section id="testimonios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Testimonios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lo que opinan nuestros estudiantes y clientes sobre SmartCell Academy.
            </p>
          </div>
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Cargando testimonios...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="testimonios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Testimonios</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Lo que opinan nuestros estudiantes y clientes sobre SmartCell Academy.
            </p>
          </div>
          <div className="text-center py-8">
            <p className="text-red-500">Error al cargar testimonios: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Filtrar solo testimonios visibles
  const visibleTestimonials = testimonials.filter(testimonial => testimonial.is_visible)

  // Función para renderizar estrellas de manera segura
  const renderStars = (rating: number) => {
    // Validar que rating sea un número válido entre 0 y 5
    const validRating = Math.max(0, Math.min(5, Math.floor(rating || 0)))
    return Array.from({ length: validRating }, (_, i) => (
      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
    ))
  }

  return (
    <section id="testimonios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Testimonios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lo que opinan nuestros estudiantes y clientes sobre SmartCell Academy.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleTestimonials.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400">Próximamente testimonios disponibles...</div>
          ) : (
            visibleTestimonials.map((testimonial) => (
              <Card key={testimonial._id} className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-green-500 mr-3" />
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-600">
                        {(testimonial.name || 'A').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-black">{testimonial.name || 'Anónimo'}</div>
                      <div className="text-sm text-gray-500">{testimonial.role || 'Cliente'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-black mb-4">Nuestros Números Hablan</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Estudiantes Graduados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
              <div className="text-gray-600">Reparaciones Exitosas</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfacción del Cliente</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
              <div className="text-gray-600">Años de Experiencia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
