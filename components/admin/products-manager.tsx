"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Package } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: number
  original_price: number
  category: string
  stock_quantity: number
  is_available: boolean
  rating: number
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    original_price: "",
    category: "",
    stock_quantity: "",
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    // Datos de ejemplo (reemplazar con API real)
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Kit de Soldadura Profesional",
        description: "Estación de soldadura con temperatura regulable.",
        price: 89,
        original_price: 120,
        category: "Soldadura",
        stock_quantity: 15,
        is_available: true,
        rating: 4.8,
      },
      {
        id: 2,
        name: "Set de Herramientas Precisión",
        description: "Kit completo con destornilladores de precisión.",
        price: 45,
        original_price: 65,
        category: "Herramientas",
        stock_quantity: 25,
        is_available: true,
        rating: 4.9,
      },
      {
        id: 3,
        name: "Multímetro Digital Avanzado",
        description: "Multímetro profesional con pantalla LCD.",
        price: 75,
        original_price: 95,
        category: "Medición",
        stock_quantity: 3,
        is_available: true,
        rating: 4.7,
      },
    ]
    setProducts(mockProducts)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      original_price: Number.parseFloat(formData.original_price),
      stock_quantity: Number.parseInt(formData.stock_quantity),
    }

    if (editingProduct) {
      // Actualizar producto existente
      setProducts(
        products.map((product) => (product.id === editingProduct.id ? { ...product, ...productData } : product)),
      )
    } else {
      // Crear nuevo producto
      const newProduct: Product = {
        id: Date.now(),
        ...productData,
        is_available: true,
        rating: 0,
      }
      setProducts([...products, newProduct])
    }

    resetForm()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      original_price: product.original_price.toString(),
      category: product.category,
      stock_quantity: product.stock_quantity.toString(),
    })
    setIsEditing(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      setProducts(products.filter((product) => product.id !== id))
    }
  }

  const toggleAvailable = (id: number) => {
    setProducts(
      products.map((product) => (product.id === id ? { ...product, is_available: !product.is_available } : product)),
    )
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      original_price: "",
      category: "",
      stock_quantity: "",
    })
    setEditingProduct(null)
    setIsEditing(false)
  }

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Sin stock", color: "destructive" }
    if (quantity <= 5) return { label: "Stock bajo", color: "secondary" }
    return { label: "En stock", color: "default" }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Gestión de Productos</h2>
        <Button onClick={() => setIsEditing(true)} className="bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {/* Formulario */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProduct ? "Editar Producto" : "Nuevo Producto"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nombre del Producto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Precio Actual ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="original_price">Precio Original ($)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    step="0.01"
                    value={formData.original_price}
                    onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock_quantity">Cantidad en Stock</Label>
                  <Input
                    id="stock_quantity"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                  <Save className="h-4 w-4 mr-2" />
                  {editingProduct ? "Actualizar" : "Crear"} Producto
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Lista de Productos */}
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
                    <Button variant="outline" size="sm" onClick={() => toggleAvailable(product.id)}>
                      {product.is_available ? "Ocultar" : "Mostrar"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
