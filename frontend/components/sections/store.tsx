"use client"

import { useProducts } from "@/hooks/admin/useProducts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, Zap, Cpu, ShoppingCart, Star, Package, Loader2 } from "lucide-react"

export default function Store() {
  const { products, loading, error } = useProducts()

  const openWhatsApp = (product: string) => {
    const phoneNumber = "1234567890" // Reemplaza con tu número
    const message = `Hola! Me interesa comprar ${product}. ¿Está disponible?`
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  // Función para obtener el icono según la categoría del producto
  const getProductIcon = (category?: string) => {
    if (!category) return <Package className="h-6 w-6" /> // Icono por defecto si no hay categoría
    
    const lowerCategory = category.toLowerCase()
    if (lowerCategory.includes('soldadura') || lowerCategory.includes('soldador')) {
      return <Wrench className="h-6 w-6" />
    }
    if (lowerCategory.includes('herramienta') || lowerCategory.includes('kit')) {
      return <Cpu className="h-6 w-6" />
    }
    if (lowerCategory.includes('medición') || lowerCategory.includes('multímetro')) {
      return <Zap className="h-6 w-6" />
    }
    return <Package className="h-6 w-6" /> // Icono por defecto
  }

  // Función para obtener el estado del stock
  const getStockStatus = (quantity: number) => {
    if (quantity > 10) return { text: "Disponible", color: "text-green-600" }
    if (quantity > 0) return { text: "Pocas unidades", color: "text-orange-600" }
    return { text: "Agotado", color: "text-red-600" }
  }

  // Filtrar solo productos disponibles
  const availableProducts = products.filter(product => product.is_available)
  


  if (loading) {
    return (
      <section id="tienda" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Tienda de Herramientas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas profesionales de la más alta calidad para estudiantes y profesionales. Precios especiales para
              alumnos de la academia.
            </p>
          </div>
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-500">Cargando productos...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="tienda" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Tienda de Herramientas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas profesionales de la más alta calidad para estudiantes y profesionales. Precios especiales para
              alumnos de la academia.
            </p>
          </div>
          <div className="text-center py-8">
            <p className="text-red-500">Error al cargar productos: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="tienda" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Tienda de Herramientas</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herramientas profesionales de la más alta calidad para estudiantes y profesionales. Precios especiales para
            alumnos de la academia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {availableProducts.length === 0 ? (
            <div className="col-span-3 text-center text-gray-400">Próximamente productos disponibles...</div>
          ) : (
            availableProducts.map((product) => {
              const stockStatus = getStockStatus(product.stock_quantity)
              return (
                <Card key={product._id} className="hover:shadow-lg transition-shadow border-2 hover:border-green-500">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-100 rounded-lg text-green-600">
                          {getProductIcon(product.category)}
                        </div>
                        <div>
                          <Badge variant="outline" className="mb-2">
                            {product.category}
                          </Badge>
                          <CardTitle className="text-lg text-black leading-tight">{product.name}</CardTitle>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{product.description}</p>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.rating})</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-green-600">${product.price}</span>
                          <span className="text-sm text-gray-500 line-through">${product.original_price}</span>
                        </div>
                        <div className={`text-xs ${stockStatus.color}`}>
                          {stockStatus.text}
                        </div>
                      </div>
                      <Button 
                        className="bg-black text-white hover:bg-gray-800" 
                        onClick={() => openWhatsApp(product.name)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Comprar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        <div className="bg-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-black mb-4">Beneficios de Comprar con Nosotros</h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Package className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Envío Gratis</h4>
              <p className="text-sm text-gray-600">En compras mayores a $50</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Calidad</h4>
              <p className="text-sm text-gray-600">Productos originales y garantizados</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Wrench className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-black mb-2">Soporte</h4>
              <p className="text-sm text-gray-600">Asesoría técnica incluida</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Badge className="h-8 w-8 text-green-600 rounded-full flex items-center justify-center">%</Badge>
              </div>
              <h4 className="font-semibold text-black mb-2">Descuentos</h4>
              <p className="text-sm text-gray-600">Precios especiales para estudiantes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
