"use client"

import { 
  Users, 
  UtensilsCrossed, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const statsCards = [
  {
    title: "Comensales Hoy",
    value: "248",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "bg-primary",
  },
  {
    title: "Platos Servidos",
    value: "186",
    change: "+8%",
    trend: "up",
    icon: UtensilsCrossed,
    color: "bg-accent",
  },
  {
    title: "Satisfacción",
    value: "94%",
    change: "+2%",
    trend: "up",
    icon: TrendingUp,
    color: "bg-chart-3",
  },
  {
    title: "Tiempo Promedio",
    value: "18 min",
    change: "-3 min",
    trend: "down",
    icon: Clock,
    color: "bg-chart-4",
  },
]

const recentOrders = [
  { id: 1, name: "Carlos Pérez", dept: "IT", meal: "Menú Ejecutivo", time: "12:30", status: "servido" },
  { id: 2, name: "María García", dept: "RRHH", meal: "Ensalada Premium", time: "12:45", status: "servido" },
  { id: 3, name: "Juan López", dept: "Finanzas", meal: "Menú Vegetariano", time: "13:00", status: "en proceso" },
  { id: 4, name: "Ana Martínez", dept: "Marketing", meal: "Menú Ejecutivo", time: "13:15", status: "pendiente" },
  { id: 5, name: "Pedro Rodríguez", dept: "Operaciones", meal: "Menú Light", time: "13:20", status: "pendiente" },
]

const todayMenu = [
  { type: "Entrada", name: "Crema de Verduras", available: true },
  { type: "Principal", name: "Pollo al Horno con Papas", available: true },
  { type: "Principal", name: "Pasta Alfredo", available: true },
  { type: "Vegetariano", name: "Risotto de Champiñones", available: true },
  { type: "Postre", name: "Flan de Vainilla", available: false },
]

export function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel Principal</h1>
          <p className="text-muted-foreground mt-1">Bienvenido de vuelta, Admin</p>
        </div>
        <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl shadow-sm border">
          <CalendarDays className="w-5 h-5 text-primary" />
          <span className="font-medium">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-primary' : 'text-accent'}`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-muted-foreground text-sm mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Pedidos Recientes</CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {recentOrders.length} pedidos
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-semibold text-primary">{order.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{order.name}</p>
                      <p className="text-sm text-muted-foreground">{order.dept} • {order.meal}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{order.time}</span>
                    <Badge 
                      className={
                        order.status === 'servido' 
                          ? 'bg-primary/20 text-primary hover:bg-primary/30' 
                          : order.status === 'en proceso' 
                            ? 'bg-accent/20 text-accent hover:bg-accent/30' 
                            : 'bg-muted text-muted-foreground'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Menu */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              Menú de Hoy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayMenu.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <Badge variant="outline" className="mb-1 text-xs">
                      {item.type}
                    </Badge>
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${item.available ? 'bg-primary' : 'bg-destructive'}`} />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Disponible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Agotado</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-primary to-primary/80">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-primary-foreground">
              <h3 className="text-xl font-bold">¿Necesitas ayuda?</h3>
              <p className="text-primary-foreground/80 mt-1">
                Accede a las guías rápidas o contacta soporte técnico
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-primary-foreground text-primary font-semibold rounded-xl hover:bg-primary-foreground/90 transition-colors">
                Ver Guías
              </button>
              <button className="px-6 py-3 bg-primary-foreground/20 text-primary-foreground font-semibold rounded-xl hover:bg-primary-foreground/30 transition-colors">
                Soporte
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
