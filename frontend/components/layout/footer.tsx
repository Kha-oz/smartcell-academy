"use client"

import Image from "next/image"
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram, Youtube } from "lucide-react"

interface FooterProps {
  setActiveSection: (section: string) => void
}

export default function Footer({ setActiveSection }: FooterProps) {
  const openWhatsApp = () => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = "Hola! Me gustaría obtener más información sobre SMARTCELL ACADEMY."
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Logo y Descripción */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/smartcell-logo.png"
                alt="SmartCell Academy"
                width={40}
                height={40}
                className="w-10 h-10 filter invert"
              />
              <span className="text-xl font-bold">SMARTCELL</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Academia líder en formación tecnológica, reparación especializada y venta de herramientas profesionales.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setActiveSection("inicio")}
                  className="text-gray-300 hover:text-green-500 transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("nosotros")}
                  className="text-gray-300 hover:text-green-500 transition-colors"
                >
                  Quiénes Somos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("cursos")}
                  className="text-gray-300 hover:text-green-500 transition-colors"
                >
                  Cursos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("reparaciones")}
                  className="text-gray-300 hover:text-green-500 transition-colors"
                >
                  Reparaciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("tienda")}
                  className="text-gray-300 hover:text-green-500 transition-colors"
                >
                  Tienda
                </button>
              </li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nuestros Servicios</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Cursos de Robótica</li>
              <li>Electrónica Digital</li>
              <li>Reparación de Celulares</li>
              <li>Reparación de Laptops</li>
              <li>Reparación de PCs</li>
              <li>Venta de Herramientas</li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p>Av. Tecnología 123</p>
                  <p>Centro Comercial Tech Plaza</p>
                  <p>Local 45-46</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-500" />
                <div className="text-gray-300">
                  <p>+1 (555) 123-4567</p>
                  <p>+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-500" />
                <div className="text-gray-300">
                  <p>info@smartcellacademy.com</p>
                </div>
              </div>

              <button
                onClick={openWhatsApp}
                className="flex items-center space-x-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition-colors w-full justify-center"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">© 2024 SMARTCELL ACADEMY. Todos los derechos reservados.</div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <button className="hover:text-green-500 transition-colors">Política de Privacidad</button>
              <button className="hover:text-green-500 transition-colors">Términos de Servicio</button>
              <button className="hover:text-green-500 transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
