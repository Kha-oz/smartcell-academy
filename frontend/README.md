# SmartCell Academy

Plataforma web para SmartCell Academy, una academia especializada en robótica, electrónica y reparación de dispositivos.

## 🏗️ Arquitectura del Proyecto

### Estructura Refactorizada

```
smartcell-academy/
├── 📁 app/                    # Next.js App Router
│   ├── admin/                # Panel de administración
│   ├── globals.css           # Estilos globales
│   ├── layout.tsx            # Layout principal
│   └── page.tsx              # Página principal
├── 📁 components/            # Componentes React
│   ├── 📁 layout/           # Componentes de estructura
│   ├── 📁 sections/         # Secciones principales
│   ├── 📁 admin/            # Componentes del admin
│   ├── 📁 ui/               # Componentes UI reutilizables
│   ├── 📁 common/           # Componentes comunes
│   ├── index.ts             # Exportaciones centralizadas
│   └── README.md            # Documentación de componentes
├── 📁 hooks/                # Hooks personalizados
│   ├── 📁 admin/            # Hooks para el admin
│   └── index.ts             # Exportaciones de hooks
├── 📁 utils/                # Utilidades y helpers
│   ├── productUtils.ts      # Utilidades para productos
│   └── index.ts             # Exportaciones de utilidades
├── 📁 lib/                  # Configuraciones y librerías
└── 📁 public/               # Archivos estáticos
```

## 🎯 Principios de Diseño

### ✅ Separación de Responsabilidades
- **Hooks**: Lógica de negocio y estado
- **Componentes**: Solo UI y presentación
- **Utilidades**: Funciones auxiliares reutilizables

### ✅ Componentes Modulares
- **ProductForm**: Formulario de productos
- **ProductList**: Lista de productos
- **CourseForm**: Formulario de cursos
- **CourseList**: Lista de cursos

### ✅ Hooks Personalizados
- **useProducts**: Gestión completa de productos
- **useCourses**: Gestión completa de cursos

## 🚀 Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Radix UI** - Componentes accesibles
- **Lucide React** - Iconos

## 📦 Instalación

```bash
npm install
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting del código

## 📝 Convenciones

### Nomenclatura
- **Componentes**: PascalCase (ej: `ProductForm.tsx`)
- **Hooks**: camelCase con prefijo `use` (ej: `useProducts.ts`)
- **Utilidades**: camelCase (ej: `productUtils.ts`)

### Estructura de Archivos
- **Un componente por archivo**
- **Un hook por archivo**
- **Agrupación por funcionalidad**

## 🎨 Componentes UI

Componentes reutilizables basados en Radix UI:
- Button, Card, Input, Label
- Select, Textarea, Badge
- Separator, Tabs

## 🔐 Panel de Administración

Accesible en `/admin` con funcionalidades:
- Gestión de cursos
- Gestión de productos
- Gestión de contactos
- Gestión de reparaciones
- Estadísticas generales

## 📱 Responsive Design

Diseño completamente responsive optimizado para:
- 📱 Móviles
- 📱 Tablets
- 💻 Desktop

## 🔄 Estado del Proyecto

- ✅ **Frontend**: Completamente funcional
- ✅ **UI/UX**: Moderna y accesible
- ✅ **Arquitectura**: Refactorizada y escalable
- ⏳ **Backend**: Pendiente de implementación
- ⏳ **Base de Datos**: Pendiente de configuración

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
