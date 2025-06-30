"use client"

import { Button } from "@/components/ui/button"
import { Plus, RefreshCw } from "lucide-react"
import { useProducts } from "@/hooks/admin/useProducts"
import { ProductForm } from "./ProductForm"
import { ProductList } from "./ProductList"

export default function ProductsManager() {
  const {
    products,
    isEditing,
    editingProduct,
    formData,
    loading,
    error,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateForm,
    toggleProductAvailability,
    loadProducts,
  } = useProducts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Gestión de Productos</h2>
        <div className="flex gap-2">
          <Button 
            onClick={loadProducts} 
            variant="outline" 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Recargar
          </Button>
          <Button onClick={openCreateForm} className="bg-green-500 hover:bg-green-600">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <ProductForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        isEditing={isEditing}
        editingProduct={editingProduct}
        loading={loading}
      />

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleAvailability={toggleProductAvailability}
        loading={loading}
      />
    </div>
  )
}
