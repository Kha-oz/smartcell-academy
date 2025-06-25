import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Carlos Mendoza",
      role: "Estudiante de Robótica",
      content:
        "El curso de robótica cambió mi perspectiva profesional. Los instructores son excelentes y el contenido muy práctico. Ahora trabajo en una empresa de automatización.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "María González",
      role: "Cliente de Reparación",
      content:
        "Llevé mi laptop que otros lugares dijeron que no tenía arreglo. En SmartCell la repararon perfectamente y con garantía. Servicio excepcional.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Luis Rodríguez",
      role: "Estudiante de Electrónica",
      content:
        "La metodología de enseñanza es increíble. Aprendes haciendo, no solo teoría. Los laboratorios están muy bien equipados y el ambiente es profesional.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ana Herrera",
      role: "Emprendedora",
      content:
        "Compré herramientas para mi taller y la calidad es excelente. Además, me dieron asesoría técnica que me ayudó mucho en mis proyectos.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Roberto Silva",
      role: "Técnico Certificado",
      content:
        "Después de tomar el curso de reparación de laptops, pude abrir mi propio negocio. La formación fue integral y muy práctica.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Patricia López",
      role: "Estudiante de PCs",
      content:
        "Los instructores tienen mucha experiencia y paciencia. Explican todo de manera clara y siempre están dispuestos a ayudar.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Testimonios y Casos de Éxito</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce las experiencias de nuestros estudiantes y clientes que han confiado en SMARTCELL ACADEMY para su
            formación y servicios tecnológicos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
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
          ))}
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
