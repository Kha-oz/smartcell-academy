import { DateUser } from '../src/schemas/dateUser.schema';

export const dateUsersSeed: Partial<DateUser>[] = [
  {
    service_name: "Reparación de Pantalla iPhone",
    description: "Cambio completo de pantalla LCD para iPhone 12, incluye cristal y digitizer. Reparación profesional con garantía de 90 días.",
    price: 120.00,
    duration: "2-3 horas",
    category: "Smartphones",
    features: ["Pantalla original", "Garantía 90 días", "Reparación express", "Diagnóstico gratuito"]
  },
  {
    service_name: "Mantenimiento de Laptop",
    description: "Limpieza completa del sistema de ventilación, cambio de pasta térmica y optimización del sistema operativo.",
    price: 45.00,
    duration: "1-2 horas",
    category: "Laptops",
    features: ["Limpieza de ventiladores", "Cambio de pasta térmica", "Optimización de sistema", "Backup de datos"]
  },
  {
    service_name: "Reparación de Batería Samsung",
    description: "Reemplazo de batería para dispositivos Samsung Galaxy. Batería original con certificación de calidad.",
    price: 85.00,
    duration: "1 hora",
    category: "Smartphones",
    features: ["Batería original", "Garantía 6 meses", "Reparación rápida", "Prueba de funcionamiento"]
  },
  {
    service_name: "Recuperación de Datos",
    description: "Recuperación de archivos perdidos o eliminados de discos duros, SSDs y dispositivos móviles.",
    price: 150.00,
    duration: "24-48 horas",
    category: "Recuperación",
    features: ["Análisis gratuito", "Recuperación segura", "Garantía de éxito", "Entrega en USB"]
  },
  {
    service_name: "Reparación de Placa Madre PC",
    description: "Diagnóstico y reparación de placas madre para computadoras de escritorio. Incluye soldadura y reemplazo de componentes.",
    price: 200.00,
    duration: "3-5 horas",
    category: "PC Desktop",
    features: ["Diagnóstico detallado", "Componentes de calidad", "Garantía 3 meses", "Prueba completa"]
  },
  {
    service_name: "Instalación de Software",
    description: "Instalación y configuración de software de oficina, antivirus y programas especializados.",
    price: 30.00,
    duration: "1 hora",
    category: "Software",
    features: ["Instalación limpia", "Configuración optimizada", "Activación de licencias", "Capacitación básica"]
  },
  {
    service_name: "Reparación de Cámara iPad",
    description: "Reemplazo de módulo de cámara para iPad Air y iPad Pro. Incluye calibración de enfoque automático.",
    price: 95.00,
    duration: "2 horas",
    category: "Tablets",
    features: ["Cámara original", "Calibración profesional", "Garantía 90 días", "Prueba de fotos"]
  },
  {
    service_name: "Upgrade de RAM y SSD",
    description: "Actualización de memoria RAM y cambio a SSD para mejorar significativamente el rendimiento del equipo.",
    price: 180.00,
    duration: "2-3 horas",
    category: "Upgrades",
    features: ["Componentes premium", "Migración de datos", "Optimización de BIOS", "Prueba de velocidad"]
  }
]; 