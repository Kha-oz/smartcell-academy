import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Package, Loader2 } from "lucide-react"
import { Product } from "@/hooks/admin/useProducts"
import { getStockStatus } from "@/utils/productUtils"

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  onToggleAvailability: (id: string) => void
  loading?: boolean
}

export function ProductList({
  products,
  onEdit,
  onDelete,
  onToggleAvailability,
  loading = false
}: ProductListProps) {
  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Cargando productos...</span>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay productos disponibles
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {products.map((product) => {
        const stockStatus = getStockStatus(product.stock_quantity)
        return (
          <Card key={product._id} className={!product.is_available ? "opacity-60" : ""}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Package className="h-5 w-5 text-gray-500" />
                    <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                    <Badge variant="outline">{product.category}</Badge>
                    <Badge variant={stockStatus.color as any}>{stockStatus.label}</Badge>
                    {!product.is_available && <Badge variant="destructive">No disponible</Badge>}
                  </div>
                  <p className="text-gray-600 mb-3">{product.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Precio: ${product.price}</span>
                    <span>Precio original: ${product.original_price}</span>
                    <span>Stock: {product.stock_quantity} unidades</span>
                    <span>Rating: {product.rating}/5</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onToggleAvailability(product._id!)}
                    disabled={loading}
                  >
                    {product.is_available ? "Ocultar" : "Mostrar"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onEdit(product)}
                    disabled={loading}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onDelete(product._id!)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
} 