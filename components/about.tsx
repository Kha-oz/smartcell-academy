import { Target, Eye, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  return (
    <section className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Quiénes Somos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SMARTCELL ACADEMY es una institución líder en formación tecnológica y servicios de reparación, comprometida
            con la excelencia y la innovación.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-black">Nuestra Historia</h3>
            <p className="text-gray-600 leading-relaxed">
              Fundada con la visión de democratizar el conocimiento tecnológico, SMARTCELL ACADEMY ha formado a cientos
              de profesionales en el campo de la electrónica, reparación y robótica. Nuestro enfoque práctico y
              personalizado nos ha convertido en referente del sector.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Combinamos la enseñanza de calidad con servicios profesionales de reparación, creando un ecosistema
              completo para el aprendizaje y la práctica tecnológica.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-8 h-64 flex items-center justify-center">
              <div className="text-center">
                <Users className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">Foto del equipo o local</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-2 hover:border-green-500 transition-colors">
            <CardContent className="p-8 text-center">
              <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Misión</h3>
              <p className="text-gray-600">
                Formar profesionales competentes en tecnología y electrónica, brindando educación de calidad y servicios
                especializados que impulsen el desarrollo tecnológico.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-500 transition-colors">
            <CardContent className="p-8 text-center">
              <Eye className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-4">Visión</h3>
              <p className="text-gray-600">
                Ser la academia líder en formación tecnológica, reconocida por la excelencia educativa y la innovación
                en servicios de reparación y venta de herramientas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
