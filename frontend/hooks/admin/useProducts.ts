import { useState, useEffect } from "react"
import { apiService } from "../../lib/api"

export interface Product {
  _id?: string
  id?: number
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiService.getProducts()
      // Transformar los datos para mantener compatibilidad con el frontend
      const transformedProducts = data.map((product: any) => ({
        id: product._id, // Usar _id como id para compatibilidad
        _id: product._id,
        name: product.title || product.name || 'Producto sin nombre', // Backend usa 'title'
        description: product.description || 'Sin descripción',
        price: product.price || 0,
        original_price: product.originalPrice || product.original_price || product.price || 0, // Backend usa 'originalPrice'
        category: product.category || 'General',
        stock_quantity: product.stock === 'Disponible' ? 50 : product.stock === 'Pocas unidades' ? 5 : 0, // Convertir stock string a número
        is_available: product.is_available !== false, // Por defecto true
        rating: product.rating || 0,
      }))
      setProducts(transformedProducts)
    } catch (err) {
      setError('Error al cargar productos')
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (productData: Omit<Product, "id" | "is_available" | "rating">) => {
    setLoading(true)
    setError(null)
    try {
      // Mapear los datos del frontend al formato del backend
      const backendData = {
        title: productData.name, // Frontend usa 'name', backend usa 'title'
        description: productData.description,
        price: productData.price,
        originalPrice: productData.original_price, // Frontend usa 'original_price', backend usa 'originalPrice'
        category: productData.category,
        stock: productData.stock_quantity > 10 ? 'Disponible' : productData.stock_quantity > 0 ? 'Pocas unidades' : 'Agotado', // Convertir número a string
        rating: 0,
        is_available: true,
      }
      
      const newProduct = await apiService.createProduct(backendData)
      
      // Agregar el nuevo producto a la lista con el formato del frontend
      const transformedProduct = {
        id: newProduct._id,
        _id: newProduct._id,
        name: newProduct.title || productData.name,
        description: newProduct.description,
        price: newProduct.price,
        original_price: newProduct.originalPrice || newProduct.price,
        category: newProduct.category,
        stock_quantity: newProduct.stock === 'Disponible' ? 50 : newProduct.stock === 'Pocas unidades' ? 5 : 0,
        is_available: newProduct.is_available !== false,
        rating: newProduct.rating || 0,
      }
      setProducts(prev => [...prev, transformedProduct])
      return transformedProduct
    } catch (err) {
      setError('Error al crear producto')
      console.error('Error creating product:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (id: string, productData: Partial<Product>) => {
    setLoading(true)
    setError(null)
    try {
      // Mapear los datos del frontend al formato del backend
      const backendData: any = {}
      
      if (productData.name !== undefined) backendData.title = productData.name
      if (productData.description !== undefined) backendData.description = productData.description
      if (productData.price !== undefined) backendData.price = productData.price
      if (productData.original_price !== undefined) backendData.originalPrice = productData.original_price
      if (productData.category !== undefined) backendData.category = productData.category
      if (productData.stock_quantity !== undefined) {
        backendData.stock = productData.stock_quantity > 10 ? 'Disponible' : productData.stock_quantity > 0 ? 'Pocas unidades' : 'Agotado'
      }
      if (productData.is_available !== undefined) backendData.is_available = productData.is_available
      
      const updatedProduct = await apiService.updateProduct(id, backendData)
      
      // Actualizar el producto en la lista con el formato del frontend
      setProducts(prev => 
        prev.map(product => 
          product._id === id ? {
            ...product,
            name: updatedProduct.title || product.name,
            description: updatedProduct.description || product.description,
            price: updatedProduct.price || product.price,
            original_price: updatedProduct.originalPrice || updatedProduct.price || product.original_price,
            category: updatedProduct.category || product.category,
            stock_quantity: updatedProduct.stock === 'Disponible' ? 50 : updatedProduct.stock === 'Pocas unidades' ? 5 : 0,
            is_available: updatedProduct.is_available !== false,
            rating: updatedProduct.rating || product.rating,
          } : product
        )
      )
      return updatedProduct
    } catch (err) {
      setError('Error al actualizar producto')
      console.error('Error updating product:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await apiService.deleteProduct(id)
      setProducts(prev => prev.filter(product => product._id !== id))
    } catch (err) {
      setError('Error al eliminar producto')
      console.error('Error deleting product:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const toggleProductAvailability = async (id: string) => {
    const product = products.find(p => p._id === id)
    if (!product) return

    try {
      await updateProduct(id, { is_available: !product.is_available })
    } catch (err) {
      console.error('Error toggling product availability:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const productData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      original_price: Number.parseFloat(formData.original_price),
      stock_quantity: Number.parseInt(formData.stock_quantity),
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id!, productData)
      } else {
        await createProduct(productData)
      }
      resetForm()
    } catch (err) {
      // Error ya manejado en las funciones individuales
    }
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

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await deleteProduct(id)
      } catch (err) {
        // Error ya manejado en deleteProduct
      }
    }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setEditingProduct(null)
    setIsEditing(false)
    setError(null)
  }

  const openCreateForm = () => {
    setIsEditing(true)
    setEditingProduct(null)
    setFormData(initialFormData)
    setError(null)
  }

  return {
    // State
    products,
    isEditing,
    editingProduct,
    formData,
    loading,
    error,
    
    // Actions
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateForm,
    toggleProductAvailability,
    loadProducts,
  }
} 