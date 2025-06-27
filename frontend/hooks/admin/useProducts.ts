import { useState, useEffect } from "react"

export interface Product {
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

export interface ProductFormData {
  name: string
  description: string
  price: string
  original_price: string
  category: string
  stock_quantity: string
}

const initialFormData: ProductFormData = {
  name: "",
  description: "",
  price: "",
  original_price: "",
  category: "",
  stock_quantity: "",
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductFormData>(initialFormData)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
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

  const createProduct = (productData: Omit<Product, "id" | "is_available" | "rating">) => {
    const newProduct: Product = {
      id: Date.now(),
      ...productData,
      is_available: true,
      rating: 0,
    }
    setProducts(prev => [...prev, newProduct])
    return newProduct
  }

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === id ? { ...product, ...productData } : product
      )
    )
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id))
  }

  const toggleProductAvailability = (id: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, is_available: !product.is_available } : product
      )
    )
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
      updateProduct(editingProduct.id, productData)
    } else {
      createProduct(productData)
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
      deleteProduct(id)
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingProduct(null)
    setIsEditing(false)
  }

  const openCreateForm = () => {
    setIsEditing(true)
    setEditingProduct(null)
    setFormData(initialFormData)
  }

  return {
    // State
    products,
    isEditing,
    editingProduct,
    formData,
    
    // Actions
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateForm,
    toggleProductAvailability,
  }
} 