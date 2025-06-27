import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { useEffect, useState } from "react"

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([])

  useEffect(() => {
    // Aquí deberías hacer fetch a la API real
    setTestimonials([])
  }, [])

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
          {testimonials.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400">Próximamente testimonios disponibles...</div>
          ) : (
            testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-green-500 mr-3" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-600">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
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
