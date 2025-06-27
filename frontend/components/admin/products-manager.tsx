"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useProducts } from "@/hooks/admin/useProducts"
import { ProductForm } from "./ProductForm"
import { ProductList } from "./ProductList"

export default function ProductsManager() {
  const {
    products,
    isEditing,
    editingProduct,
    formData,
    setFormData,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
    openCreateForm,
    toggleProductAvailability,
  } = useProducts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-black">Gestión de Productos</h2>
        <Button onClick={openCreateForm} className="bg-green-500 hover:bg-green-600">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      <ProductForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onCancel={resetForm}
        isEditing={isEditing}
        editingProduct={editingProduct}
      />

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleAvailability={toggleProductAvailability}
      />
    </div>
  )
}
