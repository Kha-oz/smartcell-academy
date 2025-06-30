export interface StockStatus {
  label: string
  color: "default" | "secondary" | "destructive"
}

export function getStockStatus(quantity: number): StockStatus {
  if (quantity === 0) {
    return { label: "Sin stock", color: "destructive" }
  }
  if (quantity <= 5) {
    return { label: "Stock bajo", color: "secondary" }
  }
  return { label: "En stock", color: "default" }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

export function validateProductData(data: {
  name: string
  description: string
  price: string
  original_price: string
  category: string
  stock_quantity: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name.trim()) {
    errors.push("El nombre del producto es requerido")
  }

  if (!data.description.trim()) {
    errors.push("La descripción es requerida")
  }

  if (!data.category.trim()) {
    errors.push("La categoría es requerida")
  }

  const price = parseFloat(data.price)
  const originalPrice = parseFloat(data.original_price)
  const stockQuantity = parseInt(data.stock_quantity)

  if (isNaN(price) || price <= 0) {
    errors.push("El precio debe ser un número positivo")
  }

  if (isNaN(originalPrice) || originalPrice <= 0) {
    errors.push("El precio original debe ser un número positivo")
  }

  if (price > originalPrice) {
    errors.push("El precio actual no puede ser mayor al precio original")
  }

  if (isNaN(stockQuantity) || stockQuantity < 0) {
    errors.push("La cantidad en stock debe ser un número no negativo")
  }

  return {
    isValid: errors.length === 0,
    errors
  }
} 