import { useState, useEffect } from "react";
import { apiService } from "../../lib/api";

export interface Repair {
  _id?: string;
  service_name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  is_available: boolean;
  features: string[];
}

export interface RepairFormData {
  service_name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  features: string;
}

const initialFormData: RepairFormData = {
  service_name: "",
  description: "",
  price: "",
  duration: "",
  category: "",
  features: "",
};

export function useRepairs() {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRepair, setEditingRepair] = useState<Repair | null>(null);
  const [formData, setFormData] = useState<RepairFormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRepairs();
  }, []);

  const loadRepairs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getRepairs();
      console.log("Informacion", data);

      setRepairs(data);
      
    } catch (err) {
      setError("Error al cargar servicios de reparación");
    } finally {
      setLoading(false);
    }
  };

  const createRepair = async (repairData: Omit<Repair, "_id">) => {
    setLoading(true);
    setError(null);
    try {
      const newRepair = await apiService.createRepair(repairData);
      setRepairs((prev) => [...prev, newRepair]);
      return newRepair;
    } catch (err) {
      setError("Error al crear servicio de reparación");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRepair = async (id: string, repairData: Partial<Repair>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedRepair = await apiService.updateRepair(id, repairData);
      setRepairs((prev) =>
        prev.map((repair) =>
          repair._id === id ? { ...repair, ...repairData } : repair
        )
      );
      return updatedRepair;
    } catch (err) {
      setError("Error al actualizar servicio de reparación");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRepair = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiService.deleteRepair(id);
      setRepairs((prev) => prev.filter((repair) => repair._id !== id));
    } catch (err) {
      setError("Error al eliminar servicio de reparación");
      console.error("Error deleting repair:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleRepairAvailability = async (id: string) => {
    const repair = repairs.find((r) => r._id === id);
    if (!repair) return;

    try {
      await updateRepair(id, { is_available: !repair.is_available });
    } catch (err) {
      console.error("Error toggling repair availability:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const repairData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f),
      is_available: true,
    };

    try {
      if (editingRepair) {
        await updateRepair(editingRepair._id!, repairData);
      } else {
        await createRepair(repairData);
      }
      resetForm();
    } catch (err) {
      // Error ya manejado en las funciones individuales
    }
  };

  const handleEdit = (repair: Repair) => {
    setEditingRepair(repair);
    setFormData({
      service_name: repair.service_name,
      description: repair.description,
      price: repair.price.toString(),
      duration: repair.duration,
      category: repair.category,
      features: repair.features.join(", "),
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "¿Estás seguro de que quieres eliminar este servicio de reparación?"
      )
    ) {
      try {
        await deleteRepair(id);
      } catch (err) {
        // Error ya manejado en deleteRepair
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingRepair(null);
    setIsEditing(false);
    setError(null);
  };

  const openCreateForm = () => {
    setIsEditing(true);
    setEditingRepair(null);
    setFormData(initialFormData);
    setError(null);
  };

  return {
    // State
    repairs,
    setRepairs,
    isEditing,
    editingRepair,
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
    toggleRepairAvailability,
    loadRepairs,
  };
}
