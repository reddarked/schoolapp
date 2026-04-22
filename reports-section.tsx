"use client"

import { useState } from "react"
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Users,
  UtensilsCrossed,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

const monthlyData = [
  { month: "Ene", meals: 4200, revenue: 35700 },
  { month: "Feb", meals: 3900, revenue: 33150 },
  { month: "Mar", meals: 4500, revenue: 38250 },
  { month: "Abr", meals: 4100, revenue: 34850 },
  { month: "May", meals: 4800, revenue: 40800 },
  { month: "Jun", meals: 4600, revenue: 39100 },
]

const topMeals = [
  { name: "Menú Ejecutivo", count: 1250, percentage: 35 },
  { name: "Pasta Alfredo", count: 890, percentage: 25 },
  { name: "Ensalada César", count: 680, percentage: 19 },
  { name: "Menú Vegetariano", count: 450, percentage: 13 },
  { name: "Menú Light", count: 280, percentage: 8 },
]

const departmentStats = [
  { name: "IT", meals: 520, employees: 45, avgMeals: 11.5 },
  { name: "RRHH", meals: 380, employees: 30, avgMeals: 12.7 },
  { name: "Finanzas", meals: 420, employees: 35, avgMeals: 12.0 },
  { name: "Marketing", meals: 310, employees: 25, avgMeals: 12.4 },
  { name: "Operaciones", meals: 480, employees: 40, avgMeals: 12.0 },
  { name: "Ventas", meals: 350, employees: 28, avgMeals: 12.5 },
]

const recentActivity = [
  { type: "peak", message: "Hora pico alcanzada: 248 comensales", time: "12:45 PM" },
  { type: "alert", message: "Stock bajo: Pollo al horno", time: "11:30 AM" },
  { type: "success", message: "Meta diaria cumplida: 200+ comensales", time: "1:00 PM" },
  { type: "info", message: "Nuevo menú agregado: Risotto Premium", time: "9:15 AM" },
]

export function ReportsSection() {
  const [period, setPeriod] = useState("month")

  const currentStats = {
    totalMeals: 4600,
    totalRevenue: 39100,
    avgSatisfaction: 94,
    avgWaitTime: 18,
    mealsChange: 8.5,
    revenueChange: 12.3,
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground mt-1">Análisis detallado del rendimiento del comedor</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mes</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Año</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-5 h-5 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <ArrowUpRight className="w-4 h-4" />
                {currentStats.mealsChange}%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">{currentStats.totalMeals.toLocaleString()}</p>
              <p className="text-muted-foreground text-sm mt-1">Comidas Servidas</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <ArrowUpRight className="w-4 h-4" />
                {currentStats.revenueChange}%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">${currentStats.totalRevenue.toLocaleString()}</p>
              <p className="text-muted-foreground text-sm mt-1">Ingresos Totales</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-chart-3 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <ArrowUpRight className="w-4 h-4" />
                2%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">{currentStats.avgSatisfaction}%</p>
              <p className="text-muted-foreground text-sm mt-1">Satisfacción Promedio</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-chart-4 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <ArrowDownRight className="w-4 h-4" />
                3 min
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">{currentStats.avgWaitTime} min</p>
              <p className="text-muted-foreground text-sm mt-1">Tiempo de Espera</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Tendencia Mensual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="w-10 text-sm font-medium text-muted-foreground">{data.month}</span>
                  <div className="flex-1">
                    <div className="h-8 bg-muted rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-lg transition-all duration-500"
                        style={{ width: `${(data.meals / 5000) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{data.meals.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">${data.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Meals */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              Platos Más Populares
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topMeals.map((meal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {index + 1}
                      </span>
                      <span className="font-medium">{meal.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">{meal.count.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm ml-2">({meal.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={meal.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Stats */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Consumo por Departamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departmentStats.map((dept, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{dept.name}</h4>
                    <Badge variant="outline">{dept.employees} empleados</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-primary">{dept.meals}</p>
                      <p className="text-xs text-muted-foreground">Comidas totales</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{dept.avgMeals}</p>
                      <p className="text-xs text-muted-foreground">Promedio/empleado</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'peak' ? 'bg-accent' :
                    activity.type === 'alert' ? 'bg-destructive' :
                    activity.type === 'success' ? 'bg-primary' : 'bg-chart-3'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Banner */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-primary/80">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-primary-foreground">
              <h3 className="text-xl font-bold">Genera reportes personalizados</h3>
              <p className="text-primary-foreground/80 mt-1">
                Exporta los datos en diferentes formatos: PDF, Excel, CSV
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/30">
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
