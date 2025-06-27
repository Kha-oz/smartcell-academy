import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Package } from "lucide-react"
import { Product } from "@/hooks/admin/useProducts"
import { getStockStatus } from "@/utils/productUtils"

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
  onToggleAvailability: (id: number) => void
}

export function ProductList({
  products,
  onEdit,
  onDelete,
  onToggleAvailability
}: ProductListProps) {
  return (
    <div className="grid gap-4">
      {products.map((product) => {
        const stockStatus = getStockStatus(product.stock_quantity)
        return (
          <Card key={product.id} className={!product.is_available ? "opacity-60" : ""}>
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
                    onClick={() => onToggleAvailability(product.id)}
                  >
                    {product.is_available ? "Ocultar" : "Mostrar"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onDelete(product.id)}>
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