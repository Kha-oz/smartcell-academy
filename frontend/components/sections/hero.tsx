"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Cpu, Wrench, ShoppingCart } from "lucide-react"

interface HeroProps {
  setActiveSection: (section: string) => void
}

export default function Hero({ setActiveSection }: HeroProps) {
  const openWhatsApp = (message: string) => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
                Aprende, Repara y<span className="text-green-500"> Innova</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Academia líder en tecnología, reparación y electrónica. Formamos profesionales del futuro con cursos
                especializados y servicios de calidad.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 px-8 py-3"
                onClick={() => setActiveSection("cursos")} // Cambiar esta línea
              >
                <Cpu className="mr-2 h-5 w-5" />
                Ver Cursos
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-black text-black hover:bg-black hover:text-white px-8 py-3"
                onClick={() => setActiveSection("reparaciones")} // Cambiar esta línea
              >
                <Wrench className="mr-2 h-5 w-5" />
                Reparaciones
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3"
                onClick={() => setActiveSection("tienda")} // Cambiar esta línea
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Tienda
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-black">500+</div>
                <div className="text-gray-600">Estudiantes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">1000+</div>
                <div className="text-gray-600">Reparaciones</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-black">5+</div>
                <div className="text-gray-600">Años</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="/images/smartcell-logo.png"
                alt="SmartCell Academy"
                width={400}
                height={400}
                className="w-full max-w-md mx-auto"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
