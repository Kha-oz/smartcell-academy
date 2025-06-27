# Estructura de Componentes

Esta carpeta contiene todos los componentes de la aplicación SmartCell Academy, organizados de manera modular y escalable.

## 📁 Estructura de Carpetas

### `/layout/`
Componentes de estructura y navegación de la aplicación:
- `header.tsx` - Barra de navegación principal
- `footer.tsx` - Pie de página con información de contacto

### `/sections/`
Componentes de las secciones principales de la página:
- `hero.tsx` - Sección principal con llamada a la acción
- `about.tsx` - Sección "Nosotros" con información de la empresa
- `courses.tsx` - Sección de cursos disponibles
- `repairs.tsx` - Sección de servicios de reparación
- `store.tsx` - Sección de tienda con productos
- `testimonials.tsx` - Sección de testimonios de clientes
- `contact.tsx` - Formulario de contacto

### `/admin/`
Componentes del panel de administración:
- `admin-login.tsx` - Formulario de login para administradores
- `admin-dashboard.tsx` - Dashboard principal del admin
- `courses-manager.tsx` - Gestión de cursos
- `contacts-manager.tsx` - Gestión de contactos
- `products-manager.tsx` - Gestión de productos
- `repairs-manager.tsx` - Gestión de reparaciones
- `stats-overview.tsx` - Vista general de estadísticas

### `/ui/`
Componentes de interfaz de usuario reutilizables:
- `button.tsx` - Botones con variantes
- `card.tsx` - Tarjetas contenedoras
- `input.tsx` - Campos de entrada
- `label.tsx` - Etiquetas para formularios
- `select.tsx` - Selectores desplegables
- `textarea.tsx` - Áreas de texto
- `badge.tsx` - Badges/etiquetas
- `separator.tsx` - Separadores visuales
- `tabs.tsx` - Componente de pestañas

### `/common/`
Componentes comunes utilizados en múltiples partes:
- `whatsapp-float.tsx` - Botón flotante de WhatsApp

## 🚀 Uso

### Importación Individual
```tsx
import Header from '@/components/layout/header'
import Hero from '@/components/sections/hero'
import { Button } from '@/components/ui/button'
```

### Importación desde el Índice
```tsx
import { Header, Hero, Button } from '@/components'
```

## 📝 Convenciones

1. **Nomenclatura**: Usar PascalCase para componentes (ej: `Header.tsx`)
2. **Organización**: Agrupar por funcionalidad en carpetas específicas
3. **Reutilización**: Los componentes UI deben ser genéricos y reutilizables
4. **Props**: Usar TypeScript para tipar las props de los componentes
5. **Estilos**: Usar Tailwind CSS para los estilos

## 🔧 Mantenimiento

- Mantener la estructura de carpetas organizada
- Documentar componentes complejos
- Seguir las convenciones de nomenclatura
- Actualizar este README cuando se agreguen nuevos componentes 