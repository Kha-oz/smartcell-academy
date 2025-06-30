"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

export default function StatsOverview() {
  const [stats, setStats] = useState({
    monthlyRevenue: 15420,
    totalStudents: 127,
    completedRepairs: 89,
    productsSold: 156,
    monthlyGrowth: 12.5,
    customerSatisfaction: 4.8,
  })

  const [monthlyData] = useState([
    { month: "Ene", contacts: 12, repairs: 8, sales: 15 },
    { month: "Feb", contacts: 19, repairs: 12, sales: 22 },
    { month: "Mar", contacts: 15, repairs: 10, sales: 18 },
    { month: "Abr", contacts: 25, repairs: 18, sales: 28 },
    { month: "May", contacts: 22, repairs: 15, sales: 25 },
    { month: "Jun", contacts: 30, repairs: 23, sales: 35 },
  ])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-black">Estadísticas y Reportes</h2>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos Mensuales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{stats.monthlyGrowth}%</span> vs mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estudiantes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Estudiantes activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reparaciones</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedRepairs}</div>
            <p className="text-xs text-muted-foreground">Completadas este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfacción</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customerSatisfaction}/5</div>
            <p className="text-xs text-muted-foreground">Calificación promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos y Análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.month}</span>
                  <div className="flex space-x-4 text-sm">
                    <span className="text-blue-600">{data.contacts} contactos</span>
                    <span className="text-green-600">{data.repairs} reparaciones</span>
                    <span className="text-purple-600">{data.sales} ventas</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumen de Servicios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Cursos más populares</span>
                <span className="text-sm font-semibold">Robótica (45%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Reparación más común</span>
                <span className="text-sm font-semibold">Pantallas (38%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Producto más vendido</span>
                <span className="text-sm font-semibold">Kit Soldadura (28%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Tiempo promedio reparación</span>
                <span className="text-sm font-semibold">3.2 días</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas y Notificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Stock bajo en productos</p>
                <p className="text-xs text-gray-600">3 productos con menos de 5 unidades</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Nuevas inscripciones</p>
                <p className="text-xs text-gray-600">5 estudiantes se inscribieron esta semana</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Meta mensual alcanzada</p>
                <p className="text-xs text-gray-600">Ingresos superaron la meta en 15%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
